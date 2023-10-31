package com.avado.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.*;

import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.service.AttachmentService;
import com.avado.backend.service.GalleryService;

import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/club/gallery")
public class GalleryController {

  public final GalleryService gallerySerice;
  private final AttachmentService attachmentService;
  
  // 갤러리 목록
  // @GetMapping("/photos")
  // @ResponseBody
  // public Page<PageResponseDto> pageGallery() {
  //   return gallerySerice.();
  // } // 

} // GalleryController
