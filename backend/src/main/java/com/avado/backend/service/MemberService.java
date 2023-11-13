package com.avado.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.EmailCheckRequestDto;
import com.avado.backend.dto.MemberResponseDto;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberResponseDto getMyInfoBySecurity() {
        return memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .map(MemberResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    }

    // 이메일 중복 체크
    public boolean isEmailDuplicate(EmailCheckRequestDto requestDto) {
        String email = requestDto.getEmail();
        return memberRepository.findByEmail(email).isPresent();
    }

    @Transactional
    public MemberResponseDto changeMemberNickname(String email, String nickname) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        member.setNickname(nickname);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto changeMemberPassword(String email, String exPassword, String newPassword) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(exPassword, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        member.setPassword(passwordEncoder.encode((newPassword)));
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto changeMemberPhoto1(String email, String Filename) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        member.setFilename(Filename);

        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto changeMemberPhoto2(String email, String filename) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("해당 이메일의 회원이 없습니다"));

        member.setFilename(filename);

        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public MemberResponseDto withdrawMember(String email, String password) {
        Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
        if (!passwordEncoder.matches(password, member.getPassword())) {
            throw new RuntimeException("비밀번호가 맞지 않습니다");
        }
        memberRepository.delete(member);
        return MemberResponseDto.of(member);
        // 회원 정보를 가져와서 비밀번호 일치 여부를 확인
        // Member member = memberRepository.findByEmail(email)
        // .orElseThrow(() -> new RuntimeException("해당 이메일의 회원이 존재하지 않습니다"));

        // if (!passwordEncoder.matches(password, member.getPassword())) {
        // throw new RuntimeException("비밀번호가 일치하지 않습니다");
        // }

        // // 회원 삭제
        // memberRepository.delete(member);

        // // 회원 탈퇴 후 응답할 정보를 MemberResponseDto로 생성
        // return MemberResponseDto.of(member);
    }

}