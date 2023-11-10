package com.avado.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.avado.backend.dto.GalleryChangeCommentRequestDto;
import com.avado.backend.dto.GalleryCommentDto;
import com.avado.backend.dto.GalleryCommentRequestDto;
import com.avado.backend.model.GalleryComment;
import com.avado.backend.service.GalleryCommentService;

import lombok.RequiredArgsConstructor;

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

  @GetMapping("/changec")
  public ResponseEntity<GalleryCommentDto> getChangeGalleryComment(@RequestParam(name="id")Long id){
    try{
      GalleryCommentDto responseDto = galleryCommentService.oneGalleryComment(id);
      return ResponseEntity.ok(responseDto);
    }catch(Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
  }

  @PutMapping("/change")
  public ResponseEntity<GalleryCommentDto> changeGalleryComment(@RequestBody GalleryChangeCommentRequestDto requestDto) {
    try {
      GalleryComment galleryComment = galleryCommentService.changeGalleryComment(requestDto.getId(),
          requestDto.getComment());
      GalleryCommentDto responseDto = GalleryCommentDto.of(galleryComment, true);
      return ResponseEntity.ok(responseDto);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // changeGalleryComment

} // GalleryCommentController