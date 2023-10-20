package com.avado.backend.dto;

import lombok.Getter;

@Getter
public class ChangeArticleRequestDto {
	private Long id;
	private String title;
	private String content;
	private String filename;
}
