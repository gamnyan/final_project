package com.avado.backend.service;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ArticleResponseDto;
import com.avado.backend.dto.ClubJoinDto;
import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.model.Article;
import com.avado.backend.model.Club;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ArticleRepository;
import com.avado.backend.persistence.ClubJoinRepository;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ArticleService {
	private final ArticleRepository articleRepository;
	private final MemberRepository memberRepository;
	private final ClubRepository clubRepository;
	private final ClubJoinRepository clubJoinRepository;

	public List<PageResponseDto> allArticle() {
		List<Article> articles = articleRepository.findAll();
		return articles.stream().map(PageResponseDto::of).collect(Collectors.toList());
	}
	
	public Page<PageResponseDto> pageArticleByClub(Long clubId, int pageNum) {
		return articleRepository.findByClubId(clubId, PageRequest.of(pageNum - 1, 20))
				.map(PageResponseDto::of);
	}
	

	
	/*public ArticleResponseDto oneArticle(Long id) {
	    Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
	    if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
	        return ArticleResponseDto.of(article, false);
	    } else {
	        Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();

	        // 클럽에 가입한 회원인지 확인
	        boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(article.getClub().getId(), member.getId());

	        if (isMemberOfClub) {
	            boolean result = article.getMember().equals(member);
	            return ArticleResponseDto.of(article, result);
	        } else {
	            throw new RuntimeException("해당 게시글을 읽을 권한이 없습니다.");
	        }
	    }
	}*/
	/*
	public ArticleResponseDto oneArticle(Long id) {
	    Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
	    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	    if (authentication == null || authentication.getPrincipal() instanceof AnonymousAuthenticationToken) {
	        ClubJoinDto clubJoinDto = getClubJoinDto(article.getClub().getId()); // 클럽 가입 정보를 가져옴
	        return ArticleResponseDto.of(article, false, clubJoinDto);
	    } else {
	        Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();

	        // 클럽에 가입한 회원인지 확인
	        boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(article.getClub().getId(), member.getId());

	        if (isMemberOfClub) {
	            boolean result = article.getMember().equals(member);
	            ClubJoinDto clubJoinDto = getClubJoinDto(article.getClub().getId()); // 클럽 가입 정보를 가져옴
	            return ArticleResponseDto.of(article, result, clubJoinDto);
	        } else {
	            throw new RuntimeException("해당 게시글을 읽을 권한이 없습니다.");
	        }
	    }
	}*/
	
	public ArticleResponseDto oneArticle(Long id) {
	    try {
	        Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
	        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

	        if (authentication == null || authentication.getPrincipal() instanceof AnonymousAuthenticationToken) {
	            ClubJoinDto clubJoinDto = getClubJoinDto(article.getClub().getId()); // 클럽 가입 정보를 가져옴
	            return ArticleResponseDto.of(article, false, clubJoinDto);
	        } else {
	            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();

	            // 클럽에 가입한 회원인지 확인
	            boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(article.getClub().getId(), member.getId());

	            if (isMemberOfClub) {
	                boolean result = article.getMember().equals(member);
	                ClubJoinDto clubJoinDto = getClubJoinDto(article.getClub().getId()); // 클럽 가입 정보를 가져옴
	                return ArticleResponseDto.of(article, result, clubJoinDto);
	            } else {
	                throw new RuntimeException("해당 게시글을 읽을 권한이 없습니다.");
	            }
	        }
	    } catch (Exception e) {
	        ArticleResponseDto responseDto = new ArticleResponseDto();
	        responseDto.setErrorMessage(e.getMessage()); // 에러 메시지 설정
	        return responseDto;
	    }
	}

	
	
	
	private ClubJoinDto getClubJoinDto(Long clubId) {
	    // 가상의 예시 데이터를 사용한 코드입니다. 실제 데이터 조회 로직을 여기에 구현해야 합니다.
	    int joinedNum = 0; // 예시: 클럽에 현재 10명이 가입되어 있는 상황
	    boolean isJoined = true; // 예시: 현재 사용자가 클럽에 가입되어 있는 상황

	    return ClubJoinDto.builder()
	            .joinedNum(joinedNum)
	            .isJoined(isJoined)
	            .build();
	}

	
	@Transactional
	public void postArticle(Article article, Long clubId) {
	    Member member = isMemberCurrent();
	    
	    boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(clubId, member.getId());
	    if (!isMemberOfClub) {
	        throw new RuntimeException("클럽에 가입한 멤버만 글을 작성할 수 있습니다.");
	    }
	    Club club = clubRepository.findById(clubId)
	            .orElseThrow(() -> new RuntimeException("해당 ID의 클럽을 찾을 수 없습니다."));
	    article.setMember(member);
	    article.setClub(club); // 게시글과 클럽을 연결
	    articleRepository.save(article);
	}

	
	
	@Transactional
	public Article changeArticleF(Long id, String title, String content) {
		try {
			Article article = authorizationArticleWriter(id);
			article.setTitle(title);
			article.setContent(content);
		
			return articleRepository.save(article);
	       
	       
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        throw new RuntimeException("게시글 업데이트 중 오류가 발생했습니다.");
	    }
	   
	}
	

	@Transactional
	public void deleteArticle(Long id) {
		Article article = authorizationArticleWriter(id);
		articleRepository.delete(article);
	}

	public Article authorizationArticleWriter(Long id) {
		Member member = isMemberCurrent();
		Article article = articleRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		if (!article.getMember().equals(member)) {
			throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
		}
		return article;
	}
	public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}
}