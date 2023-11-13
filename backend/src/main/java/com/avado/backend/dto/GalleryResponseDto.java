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
  private ClubJoinDto clubjoin;
  private String errorMessage;
  
  public static GalleryResponseDto of(Gallery gallery, Boolean isWrite) {
    GalleryResponseDto rtn = GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .clubId(gallery.getClub().getId())
      .nickName(gallery.getMember().getNickname())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
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

  public static GalleryResponseDto of2(Gallery gallery, Boolean isWrite,ClubJoinDto clubJoinDto) {
    GalleryResponseDto rtn = GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .clubId(gallery.getClub().getId())
      .nickName(gallery.getMember().getNickname())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .updatedAt(gallery.getUpdatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .isWrite(isWrite)
      .clubjoin(clubJoinDto)
      .build();
      
    List<AttachmentDto> attachmentDtos = new ArrayList<>();
    for (Attachment a : gallery.getAttachedFiles()) {
      attachmentDtos.add(AttachmentDto.convertToDto(a));
    } // for end
    rtn.setAttachment(attachmentDtos);
    return rtn;
  } // of2

  public static GalleryResponseDto load(Gallery gallery) {
    return GalleryResponseDto.builder()
      .id(gallery.getId())
      .memberId(gallery.getMember().getId())
      .clubId(gallery.getClub().getId())
      .nickName(gallery.getMember().getNickname())
      .content(gallery.getContent())
      .viewCount(gallery.getViewCount())
      .createdAt(gallery.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
      .build();
  } // load

  // 에러 메시지 설정 메서드
  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
}

// 에러 메시지 가져오기 메서드
public String getErrorMessage() {
    return errorMessage;
}

public static GalleryResponseDto error(String errorMessage) {
  return GalleryResponseDto.builder()
      .errorMessage(errorMessage)
      .build();
}  
  
} // GalleryDto
