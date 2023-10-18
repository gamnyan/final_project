package com.avado.backend.dto;

import java.util.Date;

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
	private String title;
	private Date createDate;
	
	public static CommentDto of(Comment comment) {
		return CommentDto.builder()
				.id(comment.getId())
				.community(comment.getCommunity())
				.member(comment.getMember())
				.title(comment.getTitle())
				.createDate(comment.getCreateDate())
				.build();
	} // of
} // CommentDto
