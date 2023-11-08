package com.avado.backend.service;

import java.util.*;
import java.time.*;

import org.springframework.data.domain.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.GalleryResponseDto;
import com.avado.backend.model.Club;
import com.avado.backend.model.Gallery;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ClubJoinRepository;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.GalleryRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GalleryService {
  private final GalleryRepository galleryRepository;
  private final MemberRepository memberRepository;
  private final ClubRepository clubRepository;
	private final ClubJoinRepository clubJoinRepository;

  // 갤러리 불러오기
  public List<GalleryResponseDto> findAllGallery() {
    List<Gallery> gallerys = galleryRepository.findAll();
    return gallerys.stream().map(GalleryResponseDto::load).toList();
  } // findAllGallery

  // 갤러리 불러오기
  public Page<GalleryResponseDto> pageGalleryByClub(Long clubId, int pageNum) {
    return galleryRepository.findByClubId(clubId, PageRequest.of(pageNum - 1, 20)).map(GalleryResponseDto::load);
  }


  // 특정 갤러리 불러오기
  public GalleryResponseDto findOne(Long id) {
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("갤러리가 없습니다."));
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
      return GalleryResponseDto.of(gallery, false);
    } else {
      Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
      // 클럽에 가입한 회원인지 확인
      boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(gallery.getClub().getId(), member.getId());

      if (isMemberOfClub) {
        Boolean result = gallery.getMember().equals(member);
        return GalleryResponseDto.of(gallery, result);
      } else {
        throw new RuntimeException("해당 게시글을 읽을 권한이 없습니다.");
      } // if end
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
  public void createGallery(Gallery gallery, Long clubId) {
    Member member = isMemberCurrent();
    boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(clubId, member.getId());
    if (!isMemberOfClub) {
        throw new RuntimeException("클럽에 가입한 멤버만 글을 작성할 수 있습니다.");
    }
    Club club = clubRepository.findById(clubId).orElseThrow(() -> new RuntimeException("해당 ID의 클럽을 찾을 수 없습니다."));
    gallery.setMember(member);
    gallery.setClub(club);
    gallery.setCreatedAt(LocalDateTime.now());

    galleryRepository.save(gallery);
  } // createGallery

  // 갤러리 수정
  @Transactional
  public Gallery changeGalleryF(Long id, String content) {
    try {
      Gallery gallery = authorizationGalleryWriter(id);
    gallery.setContent(content);
    gallery.setUpdatedAt(LocalDateTime.now());
    return galleryRepository.save(gallery);
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("갤러리 업데이트 중 오류가 발생했습니다.");
    }
  } // changeGalleryF

  // 갤러리 삭제
  @Transactional
  public void deleteGallery(Long id) {
    Gallery gallery = authorizationGalleryWriter(id);
    galleryRepository.delete(gallery);
  } // deleteGallery


} // GalleryService
