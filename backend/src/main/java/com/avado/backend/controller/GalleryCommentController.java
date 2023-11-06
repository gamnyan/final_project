package com.avado.backend.controller;

import java.util.*;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.avado.backend.dto.GalleryCommentDto;
import com.avado.backend.dto.GalleryCommentRequestDto;
import com.avado.backend.service.GalleryCommentService;

import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gallery/{galleryid}/comment")
public class GalleryCommentController {
  private final GalleryCommentService galleryCommentService;

  @GetMapping("/list")
  public ResponseEntity<List<GalleryCommentDto>> getGalleryComment(@PathVariable("galleryid") Long galleryid) {
    return ResponseEntity.ok(galleryCommentService.getGalleryComment(galleryid));
  } // getGalleryComment

  @PostMapping("/comment")
  public ResponseEntity<GalleryCommentDto> postGalleryComment(@PathVariable("galleryid") Long galleryid, @RequestBody GalleryCommentRequestDto galleryComment ) {
    return ResponseEntity.ok(galleryCommentService.createGalleryComment(galleryComment.getGalleryId(), galleryComment.getComment()));
  } // postGalleryComment

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteGalleryComment(@PathVariable("galleryid") Long galleryid) {
    galleryCommentService.removeGalleryComment(galleryid);
    //return ResponseEntity.ok().body(null);
    return ResponseEntity.ok("Success");
  } // deleteGalleryComment
} // GalleryCommentController
