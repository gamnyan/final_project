package com.avado.backend.service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
	
	
	/*public List<Attachment> saveAttachment(Map<AttachmentType,List<MultipartFile>>multipartFileListMap) throws IOException{
		
		List<Attachment> imageFiles = fileStore.storeFiles(multipartFileListMap.get(AttachmentType.IMAGE), AttachmentType.IMAGE);
		List<Attachment> generalFiles = fileStore.storeFiles(multipartFileListMap.get(AttachmentType.GENERAL), AttachmentType.GENERAL);
		List<Attachment> result = Stream.of(imageFiles,generalFiles)
				.flatMap(t->t.stream())
				.collect(Collectors.toList());
		
		return result;
	}*/
	public List<Attachment> saveAttachment(Map<AttachmentType,List<MultipartFile>>multipartFileListMap) throws IOException{
	    List<MultipartFile> imageFiles = multipartFileListMap.getOrDefault(AttachmentType.IMAGE, Collections.emptyList());
	    List<MultipartFile> generalFiles = multipartFileListMap.getOrDefault(AttachmentType.GENERAL, Collections.emptyList());

	    List<Attachment> imageAttachments = fileStore.storeFiles(imageFiles, AttachmentType.IMAGE);
	    List<Attachment> generalAttachments = fileStore.storeFiles(generalFiles, AttachmentType.GENERAL);

	    List<Attachment> result = Stream.concat(imageAttachments.stream(), generalAttachments.stream())
	            .collect(Collectors.toList());

	    return result;
	}

		


	public Map<AttachmentType, List<Attachment>> findAttachments() {
	        List<Attachment> attachments = attachmentRepository.findAll();
	        Map<AttachmentType, List<Attachment>> result = attachments.stream()
	                .collect(Collectors.groupingBy(Attachment::getAttachmentType));

	        return result;
	    }
	 
	 
}
