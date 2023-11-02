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
   
    private Long articleId; 
    
    public static AttachmentDto convertToDto(Attachment attachment) {
        return AttachmentDto.builder()
                .id(attachment.getId())
                .originFilename(attachment.getOriginFilename())
                .storeFilename(attachment.getStoreFilename())
                
                .articleId(attachment.getArticle().getId())
                .build();
    }

}
