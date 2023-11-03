package com.avado.backend.dto;

import java.util.*;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.model.Gallery;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GalleryRequestDto {
  private Long id;
	private Long memberId;
  private String content;
 


  

} 
