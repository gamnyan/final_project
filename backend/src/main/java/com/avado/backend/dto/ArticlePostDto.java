package com.avado.backend.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Article;
import com.avado.backend.model.Attachment.AttachmentType;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticlePostDto {
	private String title;
	private String content;
	private String nickname;
	private Map<AttachmentType, List<MultipartFile>> attachmentFiles = new ConcurrentHashMap<>();

    @Builder
    public ArticlePostDto( String title, String content,String nickname, Map<AttachmentType, List<MultipartFile>> attachmentFiles) {
        
        this.title = title;
        this.content = content;
        this.nickname = nickname;
        this.attachmentFiles = attachmentFiles;
    }
    
    public Article createArticle() {
        return Article.builder()
                .title(title)
                .content(content)
                .nickname(nickname)
                .attachedFiles(new ArrayList<>())
                .build();
    }

    
	
}
