package com.avado.backend.dto;



import java.sql.Timestamp;

import com.avado.backend.model.Comment;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
	private long commentId;
	private String memberNickname;
	private String commentText;
	private Long createdAt;
	private boolean isWritten;
	
	public static CommentResponseDto of(Comment comment,boolean bool) {
		return CommentResponseDto.builder()
				.commentId(comment.getId())
				.memberNickname(comment.getMember().getNickname())
				.commentText(comment.getText())
				.createdAt(Timestamp.valueOf(comment.getCreatedAt()).getTime())
				.isWritten(bool)
				.build();
	}
}
