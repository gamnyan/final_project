package com.avado.backend.dto;

import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryRecommendDto {
  private Long id;
  private Integer galleryRecommendNum;
  private Boolean isRecommended;
  
  public static GalleryRecommendDto noOne() {
    return GalleryRecommendDto.builder()
      .galleryRecommendNum(0)
      .isRecommended(false)
      .build();
  } // noOne

   public GalleryRecommendDto(Integer galleryRecommendNum, Boolean isRecommended) {
     this.galleryRecommendNum = galleryRecommendNum;
     this.isRecommended = isRecommended;
  } // of

  // public static GalleryRecommendDto postRecommend(Long id) {
    
  // }
} // GalleryRecommendDto
