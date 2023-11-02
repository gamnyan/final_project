package com.avado.backend.service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Attachment;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.model.FileStore;
import com.avado.backend.persistence.AttachmentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;
    private final FileStore fileStore;

    public List<Attachment> saveAttachment(Map<AttachmentType, List<MultipartFile>> multipartFileListMap)
            throws IOException {
        List<MultipartFile> imageFiles = multipartFileListMap.getOrDefault(AttachmentType.IMAGE,
                Collections.emptyList());
        System.out.println(imageFiles);
        List<Attachment> imageAttachments = fileStore.storeFiles(imageFiles, AttachmentType.IMAGE);
        System.out.println(imageAttachments);
        return imageAttachments;
    }

    public Map<AttachmentType, List<Attachment>> findAttachments() {
        List<Attachment> attachments = attachmentRepository.findAll();
        Map<AttachmentType, List<Attachment>> result = attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));

        return result;
    }

    /*
     * public List<Attachment> saveAttachments(List<MultipartFile> multipartFiles,
     * AttachmentType attachmentType) throws IOException {
     * return fileStore.storeFiles(multipartFiles, attachmentType);
     * }
     */
    public Attachment saveAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    public Map<AttachmentType, List<Attachment>> findAttachmentss() {
        List<Attachment> attachments = attachmentRepository.findAll();
        return attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));
    }

}
