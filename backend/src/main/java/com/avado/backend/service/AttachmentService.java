package com.avado.backend.service;

import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Article;
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
	
	/*
	public List<Attachment> saveAttachment(Map<AttachmentType, List<MultipartFile>> multipartFileListMap) throws IOException {
        List<MultipartFile> imageFiles = multipartFileListMap.getOrDefault(AttachmentType.IMAGE, Collections.emptyList());
        System.out.println(imageFiles);
        List<Attachment> imageAttachments = fileStore.storeFiles(imageFiles, AttachmentType.IMAGE);
        System.out.println(imageAttachments);
        return imageAttachments;
    }*/

    public Map<AttachmentType, List<Attachment>> findAttachments() {
        List<Attachment> attachments = attachmentRepository.findAll();
        Map<AttachmentType, List<Attachment>> result = attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));

        return result;
    }
    /*
    public List<Attachment> saveAttachments(List<MultipartFile> multipartFiles, AttachmentType attachmentType) throws IOException {
        return fileStore.storeFiles(multipartFiles, attachmentType);
    }*/
    public Attachment saveAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
    }

    public Map<AttachmentType, List<Attachment>> findAttachmentss() {
        List<Attachment> attachments = attachmentRepository.findAll();
        return attachments.stream()
                .collect(Collectors.groupingBy(Attachment::getAttachmentType));
    }
    public List<Attachment> getAttachmentsByArticle(Article article) {
        return attachmentRepository.findByArticle(article);
    }
    
    @Transactional
    public void deleteAttachmentsByArticleId(Long articleId) {
        List<Attachment> attachmentsToDelete = attachmentRepository.findByArticleId(articleId);

        for (Attachment attachment : attachmentsToDelete) {
            String uploadDir = "C:\\Temp\\img"; // 첨부 파일이 저장된 경로
            File fileToDelete = new File(uploadDir + "\\" + attachment.getStoreFilename());
            if (fileToDelete.exists()) {
                fileToDelete.delete();
            }
        }

        attachmentRepository.deleteAll(attachmentsToDelete);
    }
    /*
    public Attachment changeAttachment(Long id, AttachmentType type, MultipartFile file) throws IOException {
        Attachment existingAttachment = attachmentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid attachment id: " + id));

        // 기존 파일을 삭제하고 새로운 파일로 업데이트합니다.
        fileStore.deleteFile(existingAttachment.getFileName());
        Attachment newAttachment = fileStore.storeFile(file, type);

        // 기존 Attachment 정보를 업데이트합니다.
        existingAttachment.setFileName(newAttachment.getFileName());
        existingAttachment.setFileType(newAttachment.getFileType());
        existingAttachment.setAttachmentType(newAttachment.getAttachmentType());

        return attachmentRepository.save(existingAttachment);
    }
	 */
}
