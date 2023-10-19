package com.avado.backend.dto;


import java.util.*;

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
		private String body;
		private Date createDate;
		private Date updateDate;
		
		public static PostDto of(Post post) {
			return PostDto.builder()
					.id(post.getId())
					.member(post.getMember())
					.title(post.getTitle())
					.body(post.getBody())
					.build();
		} // of
		
} // PostDto
