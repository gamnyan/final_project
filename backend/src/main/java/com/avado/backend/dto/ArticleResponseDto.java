package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import com.avado.backend.model.Article;
import com.avado.backend.model.Attachment;

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
	private Long clubId;
	private String memberNickname;
	private String articleTitle;
	private String articleContent;

	private String createdAt;
	private String updatedAt;
	private boolean isWritten;
	private List<AttachmentDto> attachment;
	private Article article;

	public static ArticleResponseDto of(Article article, boolean bool) {
		ArticleResponseDto rtn = ArticleResponseDto.builder()
				.articleId(article.getId())
				.clubId(article.getClub().getId())
				.memberNickname(article.getMember().getNickname())
				.articleTitle(article.getTitle())
				.articleContent(article.getContent())
				.createdAt(article.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.updatedAt(article.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isWritten(bool)
				.build();

		List<AttachmentDto> attachmentDtos = new ArrayList<>();
		for (Attachment a : article.getAttachedFiles()) {
			attachmentDtos.add(AttachmentDto.convertToDto(a));
		}

		rtn.setAttachment(attachmentDtos);

		return rtn;

	}

}
