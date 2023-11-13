package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.GalleryComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryCommentDto {
  private Long id;
  private Long galleryId;
  private String memberNickname;
  private String comment;
  private String createdAt;
  private Boolean isWrite;

  public static GalleryCommentDto of(GalleryComment galleryComment, Boolean isWrite) {
    return GalleryCommentDto.builder()
        .id(galleryComment.getId())
        .galleryId(galleryComment.getGallery().getId())
        .memberNickname(galleryComment.getMember().getNickname())
        .comment(galleryComment.getComment())
        .createdAt(galleryComment.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
        .isWrite(isWrite)
        .build();
  } // of

  // public static GalleryCommentDto load(GalleryComment galleryComment) {
  // return GalleryCommentDto.builder()

  // } // load
} // GalleryCommentDto
