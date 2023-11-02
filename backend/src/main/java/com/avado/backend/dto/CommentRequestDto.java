package com.avado.backend.dto;

import lombok.Getter;

@Getter
public class CommentRequestDto {
	private Long articleId;
	private String text;
}
