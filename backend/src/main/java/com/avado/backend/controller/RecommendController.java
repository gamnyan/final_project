package com.avado.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.MessageDto;
import com.avado.backend.dto.PostRecommendDto;
import com.avado.backend.dto.RecommendDto;
import com.avado.backend.service.RecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/recommend")
public class RecommendController {
	private final RecommendService recommendService;
	
	@GetMapping("/list")
	public ResponseEntity<RecommendDto> getRecommends(@RequestParam(name="id") Long id){
		return ResponseEntity.ok(recommendService.allRecommend(id));
	}
	
	@PostMapping("/")
	public ResponseEntity<MessageDto> postRecommend(@RequestBody PostRecommendDto dto){
		recommendService.createRecommend(dto.getId());
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteRecommend(@RequestParam(name = "id")Long id){
		recommendService.removeRecommend(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}
