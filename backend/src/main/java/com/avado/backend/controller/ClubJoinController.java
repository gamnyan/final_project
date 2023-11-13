package com.avado.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.ClubJoinDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.dto.PostClubJoinDto;
import com.avado.backend.service.ClubJoinService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/clubjoin")
public class ClubJoinController {
    private final ClubJoinService clubJoinService;
    
    @GetMapping("/list")
    public ResponseEntity<ClubJoinDto> getClubJoins(@RequestParam(name="id")Long id){
        return ResponseEntity.ok(clubJoinService.allJoin(id));
    }

    @PostMapping("/")
    public ResponseEntity<MessageDto> postClubJoin(@RequestBody PostClubJoinDto dto){
        clubJoinService.createClubJoin(dto.getId());
        return ResponseEntity.ok(new MessageDto("Success"));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessageDto> deleteClunJoin(@RequestParam(name="id")Long id){
        clubJoinService.removeClubJoin(id);
        return ResponseEntity.ok(new MessageDto("Success"));
    }
}
