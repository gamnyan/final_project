package com.avado.backend.dto;

import lombok.Getter;

@Getter
public class CreateArticleRequestDto {
	private String title;
	private String content;
	private String nickname;
	
}
