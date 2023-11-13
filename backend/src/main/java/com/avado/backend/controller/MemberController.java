package com.avado.backend.controller;

import java.io.IOException;
import java.net.MalformedURLException;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.dto.ChangePasswordRequestDto;
import com.avado.backend.dto.EmailCheckRequestDto;
import com.avado.backend.dto.MemberRequestDto;
import com.avado.backend.dto.MemberResponseDto;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.FileStore;
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

    @ResponseBody
    @GetMapping("/img/{filename}")
    public ResponseEntity<Resource> processImg(@PathVariable String filename) throws MalformedURLException {
        FileStore fileStore = new FileStore();
        Resource resource = new UrlResource("file:" + fileStore.createPath(filename, AttachmentType.IMAGE));
        // System.out.println(resource);

        if (resource.exists() && resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
        } else {

            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/changep")
    public ResponseEntity<MemberResponseDto> changeMemPhoto(
            @ModelAttribute MemberResponseDto requestDto,
            @RequestPart(name = "file", required = false) MultipartFile file) {
        try {
            FileStore fileStore = new FileStore();

            // 파일이 업로드되었을 때만 파일을 저장합니다.
            String filename = null;
            if (file != null) {
                filename = fileStore.storeFile(file, AttachmentType.IMAGE).getStorePath();
            }

            MemberResponseDto responseDto = memberService.changeMemberPhoto2(
                    requestDto.getEmail(),
                    filename);
            return ResponseEntity.ok(responseDto);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
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