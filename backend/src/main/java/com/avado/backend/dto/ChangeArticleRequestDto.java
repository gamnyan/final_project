package com.avado.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangeArticleRequestDto {
	private Long id;
	private String title;
	private String content;
	
}
