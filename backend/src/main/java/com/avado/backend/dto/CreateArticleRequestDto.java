package com.avado.backend.dto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateArticleRequestDto {
	private String title;
	private String content;
	private String nickname;
	private List<MultipartFile> files;
	//private String filename;
	//private MultipartFile file;
	
	
	@Builder
	public CreateArticleRequestDto(String title,String content,String nickname,List<MultipartFile> files) {
		this.title = title;
		this.content = content;
		this.nickname = nickname;
		this.files = files;
		//this.filename = filename;
		
	}
}
