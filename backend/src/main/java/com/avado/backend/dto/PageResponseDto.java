package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Article;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PageResponseDto {
	private Long articleId;
	private Long clubId;
	private String clubName;
	private String articleTitle;
	private String memberNickname;
	private String createdAt;
	
	public static PageResponseDto of(Article article) {
		return PageResponseDto.builder()
				.articleId(article.getId())
				.clubId(article.getClub().getId())
				.clubName(article.getClub().getName())
				.articleTitle(article.getTitle())
				.memberNickname(article.getMember().getNickname())
				.createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.build();
	}
}
