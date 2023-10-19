package com.avado.backend.dto;

import java.time.LocalDateTime;
import java.util.Date;

import org.springframework.cglib.core.Local;

import com.avado.backend.model.Community;
import com.avado.backend.model.Member;
import com.avado.backend.model.Post;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommunityDto {
	private Long id;
	private Member member;
	private Post post;
	private String title;
	private String content;
	private LocalDateTime createDate = LocalDateTime.now();
	
	public static CommunityDto of(Community community) {
		return CommunityDto.builder()
				.id(community.getId())
				.member(community.getMember())
				.post(community.getPost())
				.title(community.getTitle())
				.content(community.getContent())
				.build();
	} // of
	
} // CommunityDto
