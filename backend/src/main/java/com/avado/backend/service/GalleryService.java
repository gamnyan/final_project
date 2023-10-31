package com.avado.backend.service;

import java.util.*;

import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.GalleryRequestDto;
import com.avado.backend.dto.GalleryResponseDto;
import com.avado.backend.model.Gallery;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.GalleryRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GalleryService {
  private final GalleryRepository galleryRepository;
  private final MemberRepository memberRepository;

  // 갤러리 불러오기
  private List<GalleryResponseDto> findAllGallery() {
    List<Gallery> gallerys = galleryRepository.findAll();
    return gallerys.stream().map(GalleryResponseDto::load).toList();
  } // findAllGallery

  // 갤러리 불러오기 
  public Page<GalleryResponseDto> pageGallery(int pageNum) {
    return galleryRepository.searchAll(PageRequest.of(pageNum - 1, 20));
  } // pageGallery

  // 특정 갤러리 불러오기
  public GalleryResponseDto findOne(Long id) {
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("갤러리가 없습니다."));
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
      return GalleryResponseDto.of(gallery, false);
    } else {
      Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
      Boolean result = gallery.getMember().equals(member);
      return GalleryResponseDto.of(gallery, result);
    } // if end
  } // findOne

  // 유저 정보 확인
  public Member isMemberCurrent() {
    return memberRepository.findById(SecurityUtil.getCurrentMemberId())
      .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
  } // isMemberCurrent

  public Gallery authorizationGalleryWriter(Long id) {
    Member member = isMemberCurrent();
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("갤러리가 없습니다."));
    if (!gallery.getMember().equals(member)) {
      throw new RuntimeException("로그인한 유저와 작성 유저가 같지 않습니다.");
    }
    return gallery;
  } // authorizationGalleryWriter

  
  // 갤러리 생성
  @Transactional
  public void createGallery(Gallery gallery) {
    Member member = isMemberCurrent();
    gallery.setMember(member);
    galleryRepository.save(gallery);
  } // createGallery

  // 갤러리 수정
  @Transactional
  public GalleryRequestDto changeGallery(Long id, String content) {
    Gallery gallery = authorizationGalleryWriter(id);
    gallery.setContent(content);
    return GalleryRequestDto.of(galleryRepository.save(gallery));
  } // changeGallery

  // 갤러리 삭제
  @Transactional
  public void deleteGallery(Long id) {
    Gallery gallery = authorizationGalleryWriter(id);
    galleryRepository.delete(gallery);
  } // deleteGallery


} // GalleryService
