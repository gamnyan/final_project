package com.avado.backend.dto;

import java.time.LocalDateTime;
import java.util.Date;

import com.avado.backend.model.Gallery;
import com.avado.backend.model.Member;
import com.avado.backend.model.Post;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryDto {
	private Long id;
	private Member member;
	private Post post;
	private String img;
	private LocalDateTime createDate = LocalDateTime.now();
	
	public static GalleryDto of(Gallery gallery) {
		return GalleryDto.builder()
				.id(gallery.getId())
				.member(gallery.getMember())
				.post(gallery.getPost())
				.img(gallery.getImg())
				.build();
	} // of
} // GalleryDto
