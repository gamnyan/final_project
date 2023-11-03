package com.avado.backend.dto;

import com.avado.backend.model.Comment;
import com.avado.backend.model.Community;
import com.avado.backend.model.Member;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDto {
	private Long id;
	private Community community;
	private Member member;
	private String text;

	public static CommentDto of(Comment comment) {
		return CommentDto.builder()
				.id(comment.getId())
				//.community(comment.getCommunity())
				.member(comment.getMember())
				.text(comment.getText())
				.build();
	} // of
} // CommentDto
