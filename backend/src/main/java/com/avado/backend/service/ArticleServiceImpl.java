package com.avado.backend.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.FileStore;
import com.avado.backend.persistence.ArticleRepository;
import com.avado.backend.persistence.AttachmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl {

	private final ArticleRepository articleRepository;
    private final AttachmentRepository attachmentRepositoty;
    private final FileStore fileStore;

    public List<Attachment> saveAttachments(Map<AttachmentType, List<MultipartFile>> multipartFileListMap) throws IOException {
        List<Attachment> imageFiles = fileStore.storeFiles(multipartFileListMap.get(AttachmentType.IMAGE), AttachmentType.IMAGE);

        return imageFiles;
    }

    public Map<AttachmentType, List<Attachment>> findAttachments() {
        List<Attachment> attachments = attachmentRepositoty.findAll();
        Map<AttachmentType, List<Attachment>> result = attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));

        return result;
    }
}
