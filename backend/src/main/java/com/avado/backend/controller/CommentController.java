package com.avado.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.CommentRequestDto;
import com.avado.backend.dto.CommentResponseDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {
	private final CommentService commentService;
	
	@GetMapping("/list")
	public ResponseEntity<List<CommentResponseDto>> getComments(@RequestParam(name="id")Long id){
		return ResponseEntity.ok(commentService.getComment(id));
		
	}
	
	@PostMapping("/")
	public ResponseEntity<CommentResponseDto> postComment(@RequestBody CommentRequestDto request){
		return ResponseEntity.ok(commentService.createComment(request.getArticleId(), request.getText()));
	}
	
	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteComment(@RequestParam(name="id") Long id){
		commentService.removeComment(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
}