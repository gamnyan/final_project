package com.avado.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.avado.backend.dto.GalleryRecommendDto;
import com.avado.backend.service.GalleryRecommendService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/galleryRecommend")
public class GalleryRecommendController {
  private final GalleryRecommendService galleryRecommendService;

  @GetMapping("/list")
  public ResponseEntity<GalleryRecommendDto> getGalleryRecommend(@RequestParam(name = "id") Long id) {
    return ResponseEntity.ok(galleryRecommendService.allGalleryRecommend(id));
  } // getGalleryRecommend

  @PostMapping("/")
  public ResponseEntity<String> postGalleryRecommend(@RequestBody GalleryRecommendDto dto) {
    galleryRecommendService.createGalleryRecommend(dto.getId());
    return ResponseEntity.ok("Success");
  } // postGalleryRecommend

  @DeleteMapping("/delete")
  public ResponseEntity<String> deleteGalleryRecommend(@RequestParam(name = "id") Long id) {
    galleryRecommendService.removeGalleryRecommend(id);
    return ResponseEntity.ok("Succescc");
  }
} // GalleryRecommendController
