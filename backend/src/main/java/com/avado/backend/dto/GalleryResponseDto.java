package com.avado.backend.dto;


import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Gallery;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryResponseDto {
	private Long id;
	private Long memberId;
  private String content;
  private String GalleryFilename;
  private Integer viewCount;
  private String createdAt;
  private String updatedAt;
  private Boolean isWritten;
  
  public static GalleryResponseDto of(Gallery gallery, Boolean isWritten) {
    return GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .updatedAt(gallery.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .isWritten(isWritten)
      .build();
  } // of

  public static GalleryResponseDto load(Gallery gallery) {
    return GalleryResponseDto.builder()
        .id(gallery.getId())
        .memberId(gallery.getMember().getId())
        .content(gallery.getContent())
        .viewCount(gallery.getViewCount())
        .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
        .build();
  } // load


  
  
} // GalleryDto
