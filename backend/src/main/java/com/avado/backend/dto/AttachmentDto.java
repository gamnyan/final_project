package com.avado.backend.dto;

import com.avado.backend.model.Attachment;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AttachmentDto {

    private Long id;
    private String originFilename;
    private String storeFilename;
    private Long galleryId;
    private Long articleId;

    public static AttachmentDto convertToDto(Attachment attachment) {
        AttachmentDto attachmentDto = AttachmentDto.builder()
          .id(attachment.getId())
          .originFilename(attachment.getOriginFilename())
          .storeFilename(attachment.getStoreFilename())
          .build();
        
        if (attachment.getGallery() != null) {
            attachmentDto.setGalleryId(attachment.getGallery().getId());
        }
        
        if (attachment.getArticle() != null) {
            attachmentDto.setArticleId(attachment.getArticle().getId());
        }
        
        return attachmentDto;
    }

}
