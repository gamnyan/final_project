package com.avado.backend.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.CommentResponseDto;
import com.avado.backend.model.Article;
import com.avado.backend.model.Comment;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ArticleRepository;
import com.avado.backend.persistence.CommentRepository;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
	private final ArticleRepository articleRepository;
	private final MemberRepository memberRepository;
	private final CommentRepository commentRepository;
	
	public List<CommentResponseDto> getComment(Long id){
		Article article = articleRepository.findById(id).orElseThrow(()-> new RuntimeException("댓글이 없습니다."));
		List<Comment> comments = commentRepository.findAllByArticle(article);
		if(comments.isEmpty()) {
			return Collections.emptyList();
		}
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication == null || authentication.getPrincipal()=="anonymousUser") {
			return comments.stream().map(comment -> CommentResponseDto.of(comment,false))
					.collect(Collectors.toList());
		}else {
			 Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			Map<Boolean,List<Comment>> collect = comments.stream().collect(
					Collectors.partitioningBy(comment->comment.getMember().equals(member)
							)
					);
			
			List<CommentResponseDto> tCollect = collect.get(true).stream()
                    .map(t -> CommentResponseDto.of(t, true))
                    .collect(Collectors.toList());
			
			List<CommentResponseDto> fCollect = collect.get(false).stream()
					.map(f -> CommentResponseDto.of(f, false))
					.collect(Collectors.toList());
			
			return Stream
					.concat(tCollect.stream(), fCollect.stream())
					.sorted(Comparator.comparing(CommentResponseDto::getCommentId))
					.collect(Collectors.toList());
					
					
					
		}
		
	}
	
	@Transactional
	public CommentResponseDto createComment(Long id,String text) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(()->new RuntimeException("로그인 유저 정보가 없습니다."));
		Article article = articleRepository.findById(id).orElseThrow(()->new RuntimeException("댓글이 없습니다."));
		
		Comment comment = Comment.builder()
				.text(text)
				.article(article)
				.member(member)
				.build();
		return CommentResponseDto.of(commentRepository.save(comment), true);
		
	}
	
	@Transactional
	public Comment changeComment(Long id, String text) {
		try {
			Comment comment = authorizationCommentWriter(id);
			comment.setText(text);
			
			return commentRepository.save(comment);
		}catch(Exception e) {
			 e.printStackTrace();
		        throw new RuntimeException("댓글 업데이트 중 오류가 발생했습니다.");
		}
	}
	
	
	@Transactional
	public void removeComment(Long id) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(()->new RuntimeException("로그인 하십시오"));
		
		Comment comment = commentRepository.findById(id).orElseThrow(()-> new RuntimeException("댓글이 없습니다."));
		if(!comment.getMember().equals(member)) {
			throw new RuntimeException("작성자와 로그인이 일치하지 않습니다");
		}
		commentRepository.delete(comment);
	}
	
	public Comment authorizationCommentWriter(Long id) {
		Member member = isMemberCurrent();
		Comment comment = commentRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		if (!comment.getMember().equals(member)) {
			throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
		}
		return comment;
	}
	public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}
}
