package com.avado.backend.dto;

import lombok.Data;

@Data
public class CommentRequestDto {
	private Long articleId;
	private String text;
}
