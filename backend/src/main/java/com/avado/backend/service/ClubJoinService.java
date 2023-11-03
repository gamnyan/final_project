package com.avado.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ClubJoinDto;
import com.avado.backend.model.Club;
import com.avado.backend.model.ClubJoin;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ClubJoinRepository;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ClubJoinService {
    private final ClubRepository clubRepository;
    private final MemberRepository memberRepository;
    private final ClubJoinRepository clubJoinRepository;

    public ClubJoinDto allJoin(Long id){
        Club club = clubRepository.findById(id).orElseThrow(()->new RuntimeException("클럽이 없습니다."));
        List<ClubJoin> clubJoins = clubJoinRepository.findAllByClub(club);
        int size = clubJoins.size();
        if(size ==0){
            return ClubJoinDto.noOne();
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == "anonymousUser"){
            return new ClubJoinDto(size,false);
        }else{
            Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
            boolean result = clubJoins.stream().anyMatch(clubJoin -> clubJoin.getMember().equals(member));
            return new ClubJoinDto(size,result);
        }
    }

    @Transactional
    public void createClubJoin(Long id){
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        Club club = clubRepository.findById(id).orElseThrow(()-> new RuntimeException("클럽이 없습니다"));

        ClubJoin clubJoin = new ClubJoin(member, club);
        clubJoinRepository.save(clubJoin);
    }
    public void createClubJoin2(Long clubId, Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("해당 멤버를 찾을 수 없습니다"));
        Club club = clubRepository.findById(clubId).orElseThrow(() -> new RuntimeException("클럽이 없습니다"));
    
        ClubJoin clubJoin = new ClubJoin(member, club);
        clubJoinRepository.save(clubJoin);
    }
    

    @Transactional
    public void removeClubJoin(Long id){
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        Club club = clubRepository.findById(id).orElseThrow(() -> new RuntimeException("클럽이 없습니다."));
        ClubJoin clubJoin = clubJoinRepository.findAllByClub(club)
        .stream()
        .filter(r-> r.getMember().equals(member))
        .findFirst()
        .orElseThrow(()->new RuntimeException("가입하지 않았습니다."));

        clubJoinRepository.delete(clubJoin);

    }
}
