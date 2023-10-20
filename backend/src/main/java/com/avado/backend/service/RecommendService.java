package com.avado.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.RecommendDto;
import com.avado.backend.model.Article;
import com.avado.backend.model.Member;
import com.avado.backend.model.Recommend;
import com.avado.backend.persistence.ArticleRepository;
import com.avado.backend.persistence.MemberRepository;
import com.avado.backend.persistence.RecommendRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RecommendService {
	
	private final ArticleRepository articleRepository;
	private final  RecommendRepository recommendRepository;
	private final  MemberRepository memberRepository;
	
	
	public RecommendDto allRecommend (Long id) {
		Article article = articleRepository.findById(id).orElseThrow(()->new RuntimeException("글이 없습니다"));
		List<Recommend> recommends = recommendRepository.findAllByArticle(article);
		int size = recommends.size();
		if(size == 0) {
			return RecommendDto.noOne();
		}
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		if(authentication  == null || authentication.getPrincipal() == "anonymousUser") {
			return new RecommendDto(size,false);
			
		}else {
			Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			boolean result = recommends.stream().anyMatch(recommend -> recommend.getMember().equals(member));
			return new RecommendDto(size,result);
		}
	}
	
	
	@Transactional
	public void createRecommend(Long id) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId()).orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다"));
		Article article = articleRepository.findById(id).orElseThrow(()->new RuntimeException("글이 없습니다"));
		
		Recommend recommend = new Recommend(member,article);
		recommendRepository.save(recommend);
		
	}
	
	@Transactional
	public void removeRecommend(Long id) {
		Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(()-> new RuntimeException("로그인 유저 정보가 없습니다"));
		Article article = articleRepository.findById(id).orElseThrow(()->new RuntimeException("글이 없습니다"));
		Recommend recommend = recommendRepository.findAllByArticle(article)
				.stream()
				.filter(r -> r.getMember().equals(member))
				.findFirst()
				.orElseThrow(()-> new RuntimeException("추천이 없습니다"));
		
		recommendRepository.delete(recommend);
	}
}
