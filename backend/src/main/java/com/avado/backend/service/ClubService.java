package com.avado.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.model.Club;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ClubService {
	private final ClubRepository clubRepository;
	private final MemberRepository memberRepository;
	
	@Transactional
	public void createClub(Club club) {
		Member member = isMemberCurrent();
		club.setMember(member);
		clubRepository.save(club);
	}
	
	/*
	@Transactional
    public ClubResponseDto postClub(String name, String clubinfo,String category, String filename) {
        Member member = isMemberCurrent();
        Article article = Article.createArticle(title, content, nickname,filename, member);
        return ArticleResponseDto.of(articleRepository.save(article), true);
    }*/
	
	public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
				.orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
	}
	
	public Club authorizationClubWriter(Long id) {
		Member member = isMemberCurrent();
		Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다."));
		if (!club.getMember().equals(member)) {
			throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
		}
		return club;
	}
}
