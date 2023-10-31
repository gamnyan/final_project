package com.avado.backend.dto;

import com.avado.backend.model.Gallery;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryRequestDto {
  private Long id;
	private Long memberId;
  private String content;


  public static GalleryRequestDto of(Gallery gallery) {
    return GalleryRequestDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .content(gallery.getContent())
      .build();
  } // createGalleryDto

} // GalleryRequestDto
