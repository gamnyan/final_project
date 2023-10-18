package com.avado.backend.dto;

import java.util.Date;

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
	private Date createDate;
	
	public static CommunityDto of(Community community) {
		return CommunityDto.builder()
				.id(community.getId())
				.member(community.getMember())
				.post(community.getPost())
				.title(community.getTitle())
				.content(community.getContent())
				.createDate(community.getCreateDate())
				.build();
	} // of
	
} // CommunityDto
