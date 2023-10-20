package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Article;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ArticleResponseDto {
	private Long articleId;
	private String memberNickname;
	private String articleTitle;
	private String articleContent;
	private String articleFilename;
	private String createdAt;
	private String updatedAt;
	private boolean isWritten;
	
	public static ArticleResponseDto of(Article article, boolean bool) {
        return ArticleResponseDto.builder()
                .articleId(article.getId())
                .memberNickname(article.getMember().getNickname())
                .articleTitle(article.getTitle())
                .articleContent(article.getContent())
                .articleFilename(article.getFilename())
                .createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .updatedAt(article.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .isWritten(bool)
                .build();
    }
}
