package com.avado.backend.controller;

import java.util.*;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import com.avado.backend.dto.GalleryCommentDto;
import com.avado.backend.dto.GalleryCommentRequestDto;
import com.avado.backend.model.GalleryComment;
import com.avado.backend.service.GalleryCommentService;

import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/gallery/comment")
public class GalleryCommentController {
  private final GalleryCommentService galleryCommentService;

  @GetMapping("/list")
  public ResponseEntity<List<GalleryCommentDto>> getGalleryComment(@RequestParam(name = "id") Long galleryid) {
    return ResponseEntity.ok(galleryCommentService.getGalleryComment(galleryid));
  } // getGalleryComment

  @PostMapping("/")
  public ResponseEntity<GalleryCommentDto> postGalleryComment(@RequestBody GalleryCommentRequestDto galleryComment) {
    return ResponseEntity
        .ok(galleryCommentService.createGalleryComment(galleryComment.getGalleryId(), galleryComment.getComment()));
  } // postGalleryComment

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteGalleryComment(@RequestParam(name = "id") Long galleryid) {
    galleryCommentService.removeGalleryComment(galleryid);
    return ResponseEntity.ok("Success");
  } // deleteGalleryComment

  @PutMapping("/change")
  public ResponseEntity<GalleryCommentDto> changeGalleryComment(@RequestBody GalleryCommentRequestDto requestDto) {
    try {
      GalleryComment galleryComment = galleryCommentService.changeGalleryComment(requestDto.getGalleryId(),
          requestDto.getComment());
      GalleryCommentDto responseDto = GalleryCommentDto.of(galleryComment, true);
      return ResponseEntity.ok(responseDto);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // changeGalleryComment

} // GalleryCommentController