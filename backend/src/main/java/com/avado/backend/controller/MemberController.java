package com.avado.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.ChangePasswordRequestDto;
import com.avado.backend.dto.EmailCheckRequestDto;
import com.avado.backend.dto.MemberRequestDto;
import com.avado.backend.dto.MemberResponseDto;
import com.avado.backend.dto.WithdrawRequestDto;
import com.avado.backend.service.MemberService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/me")
    public ResponseEntity<MemberResponseDto> getMyMemberInfo(@AuthenticationPrincipal OAuth2User principal) {
        // OAuth2User principal을 이용하여 현재 로그인한 사용자의 정보를 가져옵니다.
        MemberResponseDto myInfoBySecurity = memberService.getMyInfoBySecurity();
        // System.out.println(myInfoBySecurity.getNickname());
        return ResponseEntity.ok((myInfoBySecurity));
        // return ResponseEntity.ok(memberService.getMyInfoBySecurity());
    }

    @PostMapping("/nickname")
    public ResponseEntity<MemberResponseDto> setMemberNickname(@RequestBody MemberRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberNickname(request.getEmail(), request.getNickname()));
    }

    @PostMapping("/password")
    public ResponseEntity<MemberResponseDto> setMemberPassword(@RequestBody ChangePasswordRequestDto request) {
        return ResponseEntity.ok(memberService.changeMemberPassword(request.getEmail(), request.getExPassword(),
                request.getNewPassword()));
    }

    @PostMapping("/check-email")
    public ResponseEntity<Boolean> checkEmailDuplicate(@RequestBody EmailCheckRequestDto request) {
        boolean isDuplicate = memberService.isEmailDuplicate(request);
        return ResponseEntity.ok(isDuplicate);
    }

    @PostMapping("/withdraw")
    public ResponseEntity<MemberResponseDto> withdrawMember(@RequestBody WithdrawRequestDto request) {
        return ResponseEntity.ok(memberService.withdrawMember(request.getEmail(), request.getPassword()));
        // String email = request.getEmail();
        // String password = request.getPassword();

        // // 회원 탈퇴 로직을 호출하고 결과를 받아옴
        // MemberResponseDto withdrawnMember = memberService.withdrawMember(email,
        // password);

        // return ResponseEntity.ok(withdrawnMember);
    }
}