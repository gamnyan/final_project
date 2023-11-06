package com.avado.backend.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.persistence.AttachmentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ArticleServiceImpl {

    private final AttachmentRepository attachmentRepositoty;

    public Map<AttachmentType, List<Attachment>> findAttachments() {
        List<Attachment> attachments = attachmentRepositoty.findAll();
        Map<AttachmentType, List<Attachment>> result = attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));

        return result;
    }
}
