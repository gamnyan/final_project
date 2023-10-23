package com.avado.backend.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.Member;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticleAddForm {
    @NotBlank
    private String title;
    @NotBlank
    private String content;
    private List<MultipartFile> imageFiles;
    private List<MultipartFile> generalFiles;

    @Builder
    public ArticleAddForm(String title, String content, List<MultipartFile> imageFiles) {
        this.title = title;
        this.content = content;
        this.imageFiles = (imageFiles != null) ? imageFiles : new ArrayList<>();
        
    }

    public ArticlePostDto createArticlePostDto(Member member) {
        Map<AttachmentType, List<MultipartFile>> attachments = getAttachmentTypeListMap();
        return ArticlePostDto.builder()
                .title(title)
                .content(content)
                .attachmentFiles(attachments)
                .build();
    }

    private Map<AttachmentType, List<MultipartFile>> getAttachmentTypeListMap() {
        Map<AttachmentType, List<MultipartFile>> attachments = new ConcurrentHashMap<>();
        attachments.put(AttachmentType.IMAGE, imageFiles);
        
        return attachments;
    }
}
