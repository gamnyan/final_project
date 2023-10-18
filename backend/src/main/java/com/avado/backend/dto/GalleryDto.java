package com.avado.backend.dto;

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
	private String filename;
	private String filepath;
	private Date createDate;
	
	public static GalleryDto of(Gallery gallery) {
		return GalleryDto.builder()
				.id(gallery.getId())
				.member(gallery.getMember())
				.post(gallery.getPost())
				.filename(gallery.getFilename())
				.filepath(gallery.getFilepath())
				.createDate(gallery.getCreateDate())
				.build();
	} // of
} // GalleryDto
