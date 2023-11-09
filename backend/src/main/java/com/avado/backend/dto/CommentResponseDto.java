package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
	private Long commentId;
	private Long articleId;
	private String memberNickname;
	private String commentText;
	private String createdAt;
	private boolean isWritten;

	public static CommentResponseDto of(Comment comment, boolean bool) {
		return CommentResponseDto.builder()
				.commentId(comment.getId())
				.articleId(comment.getArticle().getId())
				.memberNickname(comment.getMember().getNickname())
				.commentText(comment.getText())
				.createdAt(comment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isWritten(bool)
				.build();
	}
}
