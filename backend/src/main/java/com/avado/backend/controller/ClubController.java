package com.avado.backend.controller;



import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.dto.ClubCreateRequestDto;
import com.avado.backend.dto.ClubResponseDto;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.Club;
import com.avado.backend.model.FileStore;
import com.avado.backend.service.ClubService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/club")
public class ClubController {
	private final ClubService clubService;
	
	@PostMapping("/create")
	public ResponseEntity<ClubResponseDto> createClub(@ModelAttribute ClubCreateRequestDto requestDto, 
		@RequestPart("file") MultipartFile file){
		try {
		 	FileStore fileStore = new FileStore();
	        
	        String filename = fileStore.storeFile(file, AttachmentType.IMAGE).getStorePath();
	        Club club = new Club();
	        club.setName(requestDto.getName());
	        club.setCategory(requestDto.getCategory());
	        club.setClubinfo(requestDto.getClubinfo());
	        club.setAddress(requestDto.getAddress());
	        club.setFilename(filename);
	        club.setStorename(filename);
	        clubService.createClub(club);
	        

	        return ResponseEntity.ok(ClubResponseDto.of(club, true));
	    } catch (IOException e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
  }


