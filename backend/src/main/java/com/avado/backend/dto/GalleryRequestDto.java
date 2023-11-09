package com.avado.backend.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryRequestDto {
  private Long id;
  private Long memberId;
  private Long clubId;
  private String content;

} // GalleryRequestDto
