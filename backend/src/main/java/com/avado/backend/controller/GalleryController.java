package com.avado.backend.controller;

import java.io.*;
import java.util.*;
import java.net.MalformedURLException;

import org.springframework.core.io.*;
import org.springframework.data.domain.*;
import org.springframework.http.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.avado.backend.dto.GalleryRequestDto;
import com.avado.backend.dto.GalleryResponseDto;
import com.avado.backend.model.Attachment;
import com.avado.backend.model.FileStore;
import com.avado.backend.model.Gallery;
import com.avado.backend.model.Attachment.AttachmentType;
import com.avado.backend.service.AttachmentService;
import com.avado.backend.service.GalleryService;

import lombok.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/club/one/{clubId}/gallery")
public class GalleryController {

  public final GalleryService galleryService;
  private final AttachmentService attachmentService;

  // 갤러리 목록
  @GetMapping("/page")
  @ResponseBody
  public ResponseEntity<Page<GalleryResponseDto>> getGalleryListByClub(@PathVariable("clubId") Long clubId,
      @RequestParam(name = "page") int page) {
    return ResponseEntity.ok(galleryService.pageGalleryByClub(clubId, page));
  } // pageGallery

  // 특정 갤러리 조회
  /*
   * @GetMapping("/feed")
   * 
   * @ResponseBody
   * public ResponseEntity<GalleryResponseDto> getGallery(@RequestParam("id") Long
   * galleryid) {
   * return ResponseEntity.ok(galleryService.findOne(galleryid));
   * }
   */// getGellery

  @GetMapping("/feed")
  @ResponseBody
  public ResponseEntity<GalleryResponseDto> getGallery(@RequestParam("id") Long galleryid) {
    try {
      GalleryResponseDto responseDto = galleryService.findOne(galleryid);
      if (responseDto.getErrorMessage() != null) {
        return ResponseEntity.ok().body(responseDto); // 200 OK로 설정
      }
      return ResponseEntity.ok(responseDto);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }

  // 이미지 로딩
  @GetMapping("/img/{storeFilename}")
  @ResponseBody
  public ResponseEntity<Resource> processImg(@PathVariable String storeFilename) throws MalformedURLException {
    FileStore fileStore = new FileStore();
    Resource resource = new UrlResource("file:" + fileStore.createPath(storeFilename, AttachmentType.IMAGE));
    if (resource.exists() && resource.isReadable()) {
      return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(resource);
    } else {
      return ResponseEntity.notFound().build();
    } // if end
  } // processImg

  // 갤러리 저장 has Img
  @PostMapping("/uploadimg")
  @ResponseBody
  public ResponseEntity<GalleryResponseDto> createGalleryHasImg(
      @PathVariable Long clubId,
      @ModelAttribute GalleryRequestDto galleryRequestDto,
      @RequestPart(name = "files", required = false) List<MultipartFile> files) {
    try {
      // 갤러리 생성
      System.out.println(files);
      Gallery gallery = new Gallery();
      gallery.setContent(galleryRequestDto.getContent());
      galleryService.createGallery(gallery, clubId);
      // 파일 저장
      List<String> macAndWin = new ArrayList<>();
      macAndWin.add("/Users/diaz/java/Temp/img/");
      macAndWin.add("C:/Temp/img/");
      String uploadDir = macAndWin.get(1);
      if (files != null && !files.isEmpty()) {
        System.out.println(files);

        for (MultipartFile file : files) {
          System.out.println(file);

          String originalFilename = file.getOriginalFilename();
          String storeFilename = gallery.getId() + "_" + originalFilename;
          File dest = new File(uploadDir + "/" + storeFilename);
          file.transferTo(dest);

          // 첨부 파일 정보 생성
          Attachment attachment = new Attachment("gallery");
          attachment.setGallery(gallery);
          attachment.setOriginFilename(originalFilename);
          attachment.setStoreFilename(storeFilename);
          attachment.setAttachmentType(AttachmentType.IMAGE);

          attachmentService.saveAttachment(attachment);
        } // for end
      } // if end
      return ResponseEntity.ok(GalleryResponseDto.of(gallery, true));
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // createGalleryHasImg

  // @GetMapping("/change")
  // @ResponseBody
  // public ResponseEntity<GalleryResponseDto>
  // changeGallery(@PathVariable("galleryid") Long id) {
  // return ResponseEntity.ok(galleryService.findOne(id));
  // } // changeGallery

  @GetMapping("/changef")
  @ResponseBody
  public ResponseEntity<GalleryResponseDto> changeGalleryHasImg(@RequestParam(name = "id") Long id) {
    try {
      GalleryResponseDto galleryResponseDto = galleryService.findOne(id);
      return ResponseEntity.ok(galleryResponseDto);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // changeGalleryHasImg

  // 갤러리 수정
  @PutMapping("/change")
  @ResponseBody
  public ResponseEntity<GalleryResponseDto> changeGallery(
      @ModelAttribute GalleryRequestDto galleryRequestDto,
      @RequestPart(name = "files", required = false) List<MultipartFile> files) {
    try {
      Gallery gallery = galleryService.changeGalleryF(galleryRequestDto.getId(), galleryRequestDto.getContent());

      // 파일 저장
      List<String> macAndWin = new ArrayList<>();
      macAndWin.add("/Users/diaz/java/Temp/img/");
      macAndWin.add("C:/Temp/img/");
      String uploadDir = macAndWin.get(1);
      if (files != null && !files.isEmpty() && !files.get(0).isEmpty()) {
        attachmentService.deleteAttachmentsByGalleryId(galleryRequestDto.getId());
        for (MultipartFile file : files) {
          String originalFilename = file.getOriginalFilename();
          String storeFilename = gallery.getId() + "_" + originalFilename;
          File dest = new File(uploadDir + "/" + storeFilename);
          file.transferTo(dest);

          // 첨부 파일 정보 생성
          Attachment attachment = new Attachment("gallery");
          attachment.setGallery(gallery);
          attachment.setOriginFilename(originalFilename);
          attachment.setStoreFilename(storeFilename);
          attachment.setAttachmentType(AttachmentType.IMAGE);

          attachmentService.saveAttachment(attachment);
        } // for end
      } // if end
      return ResponseEntity.ok(null);
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // changeGallery

  // 갤러리 삭제
  @DeleteMapping("/delete")
  @ResponseBody
  public ResponseEntity<String> deleteGallery(@RequestParam(name = "id") Long galleryid) {
    galleryService.deleteGallery(galleryid);
    return ResponseEntity.ok("Success");
  } // deleteGallery
} // GalleryController
