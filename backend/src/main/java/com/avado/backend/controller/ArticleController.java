package com.avado.backend.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.ArticleResponseDto;
import com.avado.backend.dto.ChangeArticleRequestDto;
import com.avado.backend.dto.CreateArticleRequestDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.service.ArticleService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {
	private final ArticleService articleService;
	
	  @GetMapping("/page")
	    public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
	        return ResponseEntity.ok(articleService.pageArticle(page));
	    }
	  
	  @GetMapping("/one")
	    public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
	        return ResponseEntity.ok(articleService.oneArticle(id));
	    }
	  
	  @PostMapping("/")
	  public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request){
		  return ResponseEntity.ok(articleService.postArticle(request.getTitle(), request.getContent(),request.getNickname()));
		  
	  }
	  
	  @GetMapping("/change")
	  public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id){
		  return ResponseEntity.ok(articleService.oneArticle((id)));
	  }
	  
	  @PutMapping("/")
	  public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request){
		  return ResponseEntity.ok(articleService.changeArticle(request.getId(),request.getTitle(), request.getContent()));

	  }
	  
	  @DeleteMapping("/delete")
	  public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name="id")Long id){
		  articleService.deleteArticle(id);
		  return ResponseEntity.ok(new MessageDto("Success"));
	  }
	  
	  
}
