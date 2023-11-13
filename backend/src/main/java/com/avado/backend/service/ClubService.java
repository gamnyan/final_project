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
import com.avado.backend.dto.ClubJoinDto;
import com.avado.backend.dto.ClubPageResponseDto;
import com.avado.backend.dto.ClubResponseDto;
import com.avado.backend.model.Club;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ClubJoinRepository;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ClubService {
	private final ClubRepository clubRepository;
	private final MemberRepository memberRepository;
	private final ClubJoinRepository clubJoinRepository;
	private final ClubJoinService clubJoinService;

	public List<ClubPageResponseDto> getClubsOfCurrentUser() {
        Long currentUserId = SecurityUtil.getCurrentMemberId();
        return clubJoinRepository.findClubsByMemberId(currentUserId)
                .stream()
                .map(clubJoin -> ClubPageResponseDto.of2(clubJoin.getClub()))
                .collect(Collectors.toList());
    }

	 public List<ClubPageResponseDto> allClub2(){
		List<Club> clubs = clubRepository.findAll();
		return clubs.stream().map(ClubPageResponseDto::of2).collect(Collectors.toList());
	}

	public Page<ClubPageResponseDto> pageClub2(int pageNum){
		return clubRepository.findAll(PageRequest.of(pageNum - 1, 20))
		.map(ClubPageResponseDto::of2);
	} 
	
	public List<ClubPageResponseDto> allClub() {
		List<Club> clubs = clubRepository.findAll();
		return clubs.stream()
				.map(club -> ClubPageResponseDto.of(
						club,
						isUserJoined(club.getMember().getId(), club.getId()),
						getClubJoinDto(club.getMember().getId(), club.getId())
				))
				.collect(Collectors.toList());
	}
	
	public Page<ClubPageResponseDto> pageClub(int pageNum, Long memberId) {
		return clubRepository.findAll(PageRequest.of(pageNum - 1, 20))
				.map(club -> {
					boolean isJoined = isUserJoined(memberId, club.getId());
					ClubJoinDto clubJoinDto = getClubJoinDto(memberId, club.getId());
					return ClubPageResponseDto.of(club, isJoined, clubJoinDto);
				});
	}
	private boolean isUserJoined(Long memberId, Long clubId) {
		// 가상의 메서드: 데이터베이스에서 memberId와 clubId를 사용하여 가입 여부 조회
		// 여기에서는 가입 여부를 확인하는 가상의 메서드로 가정하겠습니다.
		// 실제로는 데이터베이스 조회 등을 사용하여 구현해야 합니다.
		// 이 메서드는 가입되어 있다면 true, 아니면 false를 반환
	
		// 예시: ClubJoinRepository는 Club과 Member 간의 가입 여부를 관리하는 Repository라고 가정
		// 해당 Repository에서 existsByClubIdAndMemberId 같은 메서드로 가입 여부를 확인할 수 있습니다.
		// 실제로는 이 부분을 데이터베이스 및 Repository에 맞게 수정해야 합니다.
		boolean isJoined = clubJoinRepository.existsByClubIdAndMemberId(clubId, memberId);
		return isJoined;
	}
	private ClubJoinDto getClubJoinDto(Long memberId, Long clubId) {
		// 여기에서 가입 정보를 가져오는 로직을 구현
		// memberId와 clubId를 사용하여 데이터베이스 또는 다른 방법으로 가입 정보를 가져옴
		// 가져온 정보를 사용하여 ClubJoinDto를 생성하여 반환
	
		// ClubJoinService의 allJoin 메서드를 사용하여 가입 정보를 가져오기
		ClubJoinDto clubJoinDto = clubJoinService.allJoin(clubId);
	
		// ClubJoinDto 반환
		return clubJoinDto;
	}
	
	/* private ClubJoinDto getClubJoinDto(Long memberId, Long clubId) {
		// 여기에서 가입 정보를 가져오는 로직을 구현
		// memberId와 clubId를 사용하여 데이터베이스 또는 다른 방법으로 가입 정보를 가져옴
		// 가져온 정보를 사용하여 ClubJoinDto를 생성하여 반환
	
		// 가상의 데이터: 여기에서는 일단 가입자 수를 0으로 초기화
		int joinedNum = 0;
	
		// isUserJoined 메서드를 사용하여 가입 여부 확인
		boolean isJoined = isUserJoined(memberId, clubId);
	
		// ClubJoinDto를 생성하여 반환
		return ClubJoinDto.builder()
				.joinedNum(joinedNum)
				.isJoined(isJoined)
				.build();
	} */

	
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
	public ClubResponseDto changeClubf(Long id , String name, String clubinfo,String Filename,String category,String address) {
	    Club club = authorizationClubWriter(id);
	    club.setName(name);
	    club.setClubinfo(clubinfo);
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
