package com.avado.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ClubPageResponseDto;
import com.avado.backend.dto.ClubResponseDto;
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

	public List<ClubPageResponseDto> allClub(){
		List<Club> clubs = clubRepository.findAll();
		return clubs.stream().map(ClubPageResponseDto::of).collect(Collectors.toList());
	}

	public Page<ClubPageResponseDto> pageClub(int pageNum){
		return clubRepository.findAll(PageRequest.of(pageNum - 1, 20))
		.map(ClubPageResponseDto::of);
	}
	
	@Transactional
	public void createClub(Club club) {
		Member member = isMemberCurrent();
		club.setMember(member);
		clubRepository.save(club);
	}
	public ClubResponseDto oneClub(@PathVariable Long id) {
		Club club = clubRepository.findById(id).orElseThrow(()->new RuntimeException("글이없습니다"));
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if(authentication == null || authentication.getPrincipal()=="anonymousUser") {
			return ClubResponseDto.of(club, false);
		}else {
			Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
			boolean result = club.getMember().equals(member);
			return ClubResponseDto.of(club, result);
		}
	}
	
	
	
	@Transactional
	public ClubResponseDto changeClubf(Long id , String name, String Clubinfo,String Filename,String category,String address) {
	    Club club = authorizationClubWriter(id);
	    club.setName(name);
	    club.setClubinfo(Clubinfo);
	    club.setFilename(Filename);
	    club.setCategory(category);
	    club.setAddress(address);
	    
	    return ClubResponseDto.of(clubRepository.save(club), true);
	}

	
	@Transactional
	public void deleteClub(Long id) {
		Club club = authorizationClubWriter(id);
		clubRepository.delete(club);
	}
	public Club getClubById(Long id) {
        // 클럽을 ID를 사용하여 데이터베이스에서 가져오는 로직을 작성합니다.
        // 예시로 가정한 것이므로 실제 데이터베이스 접근 방법을 따라서 구현해야 합니다.
        return clubRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("해당 ID의 클럽을 찾을 수 없습니다."));
    }
	
	
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
