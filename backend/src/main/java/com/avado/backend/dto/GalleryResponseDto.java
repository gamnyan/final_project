package com.avado.backend.dto;

import java.util.*;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Attachment;
import com.avado.backend.model.Gallery;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryResponseDto {
	private Long id;
  private Long memberId;
  private Long clubId;
  private String nickName;
  private String content;
  private Integer viewCount;
  private String createdAt;
  private String updatedAt;
  private Boolean isWrite;
  private List<AttachmentDto> attachment;
  private Gallery gallery;
  
  public static GalleryResponseDto of(Gallery gallery, Boolean isWrite) {
    GalleryResponseDto rtn = GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .clubId(gallery.getClub().getId())
      .nickName(gallery.getMember().getNickname())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .updatedAt(gallery.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .isWrite(isWrite)
      .build();
      
    List<AttachmentDto> attachmentDtos = new ArrayList<>();
    for (Attachment a : gallery.getAttachedFiles()) {
      attachmentDtos.add(AttachmentDto.convertToDto(a));
    } // for end
    rtn.setAttachment(attachmentDtos);
    return rtn;
  } // of

  public static GalleryResponseDto load(Gallery gallery) {
    return GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .clubId(gallery.getId())
      .nickName(gallery.getMember().getNickname())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .build();
  } // load


  
  
} // GalleryDto
