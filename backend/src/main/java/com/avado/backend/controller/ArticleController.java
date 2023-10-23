package com.avado.backend.controller;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.dto.ArticlePostDto;
import com.avado.backend.dto.ArticleResponseDto;
import com.avado.backend.dto.ChangeArticleRequestDto;
import com.avado.backend.dto.CreateArticleRequestDto;
import com.avado.backend.dto.MessageDto;
import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.model.Article;
import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.service.ArticleService;
import com.avado.backend.service.AttachmentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/article")
public class ArticleController {
	private final ArticleService articleService;
	private final AttachmentService attachmentService;

	@GetMapping("/page")
	public ResponseEntity<Page<PageResponseDto>> pageArticle(@RequestParam(name = "page") int page) {
		return ResponseEntity.ok(articleService.pageArticle(page));
	}

	@GetMapping("/one")
	public ResponseEntity<ArticleResponseDto> getOneArticle(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(articleService.oneArticle(id));
	}

	@PostMapping("/postArticle")
	public ResponseEntity<ArticleResponseDto> postArticle(
			@ModelAttribute ArticlePostDto articlePostDto,
			@RequestPart("files") MultipartFile[] files) {
		try {

			// 게시글 생성
			Article article = new Article();
			article.setTitle(articlePostDto.getTitle());
			article.setContent(articlePostDto.getContent());
			article.setNickname(articlePostDto.getNickname());

			articleService.postArticle(article);
			// 파일 저장
			String uploadDir = "C:\\Temp\\img";
			if (files != null && files.length > 0) {
				for (MultipartFile file : files) {
					String originalFilename = file.getOriginalFilename();
					String storeFilename = article.getId() + "_" + originalFilename;
					File dest = new File(uploadDir + "/" + storeFilename);
					file.transferTo(dest);

					// 첨부 파일 정보 생성
					Attachment attachment = new Attachment();

					attachment.setArticle(article);
					attachment.setOriginFilename(originalFilename);
					attachment.setStoreFilename(storeFilename);
					// attachment.setMember(member);

					System.out.println(attachment);
					// 저장 로직 (attachmentService.saveAttachment 등)
					attachmentService.saveAttachment(attachment);
				}

			}
			return ResponseEntity.ok(ArticleResponseDto.of(article, true));
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@PostMapping("/")
	public ResponseEntity<ArticleResponseDto> createArticleOneImg(@ModelAttribute CreateArticleRequestDto request,
			@RequestPart("file") MultipartFile file) {
		try {

			// 게시글 생성
			List<Attachment> attachments = attachmentService.saveAttachment(
					Collections.singletonMap(AttachmentType.IMAGE, Collections.singletonList(file)));
			String filename = attachments.get(0).getStorePath();

			ArticleResponseDto responseDto = articleService.postArticleOneImage(
					request.getTitle(), request.getContent(), request.getNickname(), filename);

			return ResponseEntity.ok(responseDto);
		} catch (IOException e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
		}
	}

	@GetMapping("/change")
	public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(articleService.oneArticle((id)));
	}

	@PutMapping("/")
	public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request) {
		return ResponseEntity.ok(articleService.changeArticle(request.getId(), request.getTitle(), request.getContent(),
				request.getFilename()));

	}

	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "id") Long id) {
		articleService.deleteArticle(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}

}
