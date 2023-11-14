package com.avado.backend.service;

import java.io.File;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.model.Attachment;

import com.avado.backend.persistence.AttachmentRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AttachmentService {
    private final AttachmentRepository attachmentRepository;

    public Attachment saveAttachment(Attachment attachment) {
        return attachmentRepository.save(attachment);
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
    
    @Transactional
    public void deleteAttachmentsByGalleryId(Long galleryId) {
        List<Attachment> attachmentsToDelete = attachmentRepository.findByGalleryId(galleryId);

        for (Attachment attachment : attachmentsToDelete) {
            String uploadDir = "C:\\Temp\\img"; // 첨부 파일이 저장된 경로
            File fileToDelete = new File(uploadDir + "\\" + attachment.getStoreFilename());
            if (fileToDelete.exists()) {
                fileToDelete.delete();
            }
        }

        attachmentRepository.deleteAll(attachmentsToDelete);
    }
   
}
