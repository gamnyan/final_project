package com.avado.backend.dto;

import java.util.Date;

import com.avado.backend.model.Member;
import com.avado.backend.model.Post;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PostDto {
		private Long id;
		private Member member;
		private String title;
		private String contents;
		private String fimename;
		private String filepath;
		private Date createDate;
		
		public static PostDto of(Post post) {
			return PostDto.builder()
					.id(post.getId())
					.member(post.getMember())
					.title(post.getTitle())
					.contents(post.getTitle())
					.filepath(post.getFilename())
					.filepath(post.getFilepath())
					.createDate(post.getCreateDate())
					.build();
		} // of
} // PostDto
