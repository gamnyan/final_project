package com.avado.backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.GalleryRecommendDto;
import com.avado.backend.model.Gallery;
import com.avado.backend.model.GalleryRecommend;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.GalleryRecommendRepository;
import com.avado.backend.persistence.GalleryRepository;
import com.avado.backend.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
//@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GalleryRecommendService {
  private final GalleryRepository galleryRepository;
  private final GalleryRecommendRepository galleryRecommendRepository;
  private final MemberRepository memberRepository;

  public GalleryRecommendDto allGalleryRecommend(Long id) {
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));
    List<GalleryRecommend> galleryRecommends = galleryRecommendRepository.findAllByGallery(gallery);
    Integer size = galleryRecommends.size();
    if (size == 0) {
      return GalleryRecommendDto.noOne();
    }

    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
      return new GalleryRecommendDto(size, false);
    } else {
      Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
      Boolean result = galleryRecommends.stream().anyMatch(recommend -> recommend.getMember().equals(member));
      return new GalleryRecommendDto(size, result);
    } // if end
  } // allGalleryRecommend

  @Transactional
  public void createGalleryRecommend(Long id) {
    Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));
    
    GalleryRecommend recommend = new GalleryRecommend(member, gallery);
    galleryRecommendRepository.save(recommend);
  } // createGalleryRecommend

  @Transactional
  public void removeGalleryRecommend(Long id) {
    Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다"));
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("글이 없습니다"));
    GalleryRecommend galleryRecommend = galleryRecommendRepository.findAllByGallery(gallery)
      .stream()
      .filter(recommend -> recommend.getMember().equals(member))
      .findFirst()
      .orElseThrow(() -> new RuntimeException("추천이 없습니다"));
    galleryRecommendRepository.delete(galleryRecommend);

  } // removeGalleryRecommend
  
} // GalleryRecommendService
