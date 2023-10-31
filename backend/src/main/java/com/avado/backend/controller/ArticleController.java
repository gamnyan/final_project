package com.avado.backend.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
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
import com.avado.backend.model.FileStore;
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
	
	@GetMapping("/oneone")
	public ResponseEntity<ArticleResponseDto> getOneArticleWithFiles(@RequestParam(name = "id") Long id) {
	    try {
	        ArticleResponseDto responseDto = articleService.oneArticle(id);
	        //System.out.println(responseDto);
	        /*
	        Article article = responseDto.getArticle();
	        
	        System.out.println(article);
	        List<Attachment> attachment = attachmentService.getAttachmentsByArticle(article);
	        System.out.println(attachment);
	        responseDto.setAttachments(attachment);
	        List<Attachment> attachment = attachmentService.getAttachmentsByArticle(article);
	        List<AttachmentDto> attachmentDtoList = attachment.stream()
	                .map(AttachmentDto::convertToDto) // 변경된 부분
	                .collect(Collectors.toList());

	        responseDto.setAttachments(attachmentDtoList);
	        */

	        return ResponseEntity.ok(responseDto);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	/*
	@ResponseBody
	@GetMapping("/img1/{filename}")
	public Resource processImg1(@PathVariable String filename) throws MalformedURLException {
		FileStore fileStore = new FileStore();
	    return new UrlResource("file:" + fileStore.createPath(filename));
	}*/
	
	@ResponseBody
	@GetMapping("/img/{storeFilename}")
	public	ResponseEntity<Resource> processImg(@PathVariable String storeFilename) throws MalformedURLException {
		FileStore fileStore = new FileStore();
	Resource resource = new UrlResource("file:" + fileStore.createPath(storeFilename,AttachmentType.IMAGE));
	//System.out.println(resource);
	
	if (resource.exists() && resource.isReadable()) {
	return ResponseEntity.ok()
			.contentType(MediaType.IMAGE_JPEG)
			.body(resource);
	}
	else {
	
	return ResponseEntity.notFound().build();
	}
	}
	
	@PostMapping("/noimg")
    public ResponseEntity<ArticleResponseDto> createArticle(@RequestBody CreateArticleRequestDto request) {
        return ResponseEntity.ok(articleService.postArticleNoImg(request.getTitle(), request.getContent(),request.getNickname()));
    }

	@PostMapping("/uploadimg")
	public ResponseEntity<ArticleResponseDto> postArticle(
			@ModelAttribute ArticlePostDto articlePostDto,
			@RequestPart(name = "files", required = false) List<MultipartFile> files) {
		try {
			
			//System.out.println(files);
			// 게시글 생성
			Article article = new Article();
			article.setTitle(articlePostDto.getTitle());
			article.setContent(articlePostDto.getContent());
			article.setNickname(articlePostDto.getNickname());
			articleService.postArticle(article);

			
			// 파일 저장
			String uploadDir = "C:\\Temp\\img";
			if (files != null && !files.isEmpty()) {
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
					attachment.setAttachmentType(AttachmentType.IMAGE);
					// attachment.setMember(member);

					//System.out.println(attachment);
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

	@GetMapping("/changef")
	public ResponseEntity<ArticleResponseDto> getChangeArticleWithFiles(@RequestParam(name = "id") Long id) {
	    try {
	        ArticleResponseDto responseDto = articleService.oneArticle(id);
	      
	     
	        return ResponseEntity.ok(responseDto);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}

	@GetMapping("/change")
	public ResponseEntity<ArticleResponseDto> getChangeArticle(@RequestParam(name = "id") Long id) {
		return ResponseEntity.ok(articleService.oneArticle((id)));
	}
	
	@PutMapping("/change")
	public ResponseEntity<ArticleResponseDto> changeArticle(
			@ModelAttribute ChangeArticleRequestDto changeArticlePostDto,
			@RequestPart(name = "files", required = false) List<MultipartFile> files) {
		
		try {
			
		
			Article article = articleService.changeArticleF(changeArticlePostDto.getId(),changeArticlePostDto.getTitle(),changeArticlePostDto.getContent());
			
			
			// 파일 저장
			String uploadDir = "C:\\Temp\\img";
			 if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
					
					attachmentService.deleteAttachmentsByArticleId(changeArticlePostDto.getId());
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
					attachment.setAttachmentType(AttachmentType.IMAGE);
					// attachment.setMember(member);

					//System.out.println(attachment);
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

	@PutMapping("/")
	public ResponseEntity<ArticleResponseDto> putChangeArticle(@RequestBody ChangeArticleRequestDto request) {
		return ResponseEntity.ok(articleService.changeArticle(request.getId(), request.getTitle(), request.getContent()
				));

	}

	@DeleteMapping("/delete")
	public ResponseEntity<MessageDto> deleteArticle(@RequestParam(name = "id") Long id) {
		articleService.deleteArticle(id);
		return ResponseEntity.ok(new MessageDto("Success"));
	}
	
	/*
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
	}*/

}
