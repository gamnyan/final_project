package com.avado.backend.dto;

import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;

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
    //private AttachmentType attachmentType;
    private Long articleId; 
    
    public static AttachmentDto convertToDto(Attachment attachment) {
        return AttachmentDto.builder()
                .id(attachment.getId())
                .originFilename(attachment.getOriginFilename())
                .storeFilename(attachment.getStoreFilename())
                //.attachmentType(attachment.setAttachmentType(AttachmentType.IMAGE))
                .articleId(attachment.getArticle().getId())
                .build();
    }

}
