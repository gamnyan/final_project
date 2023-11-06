package com.avado.backend.service;

import java.time.*;
import java.util.*;
import java.util.stream.*;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.GalleryCommentDto;
import com.avado.backend.model.Gallery;
import com.avado.backend.model.GalleryComment;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.GalleryCommentRepository;
import com.avado.backend.persistence.GalleryRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.Transactional;
import lombok.*;

@Service
@Transactional
@RequiredArgsConstructor
public class GalleryCommentService {
  private final GalleryRepository galleryRepository;
  private final MemberRepository memberRepository;
  private final GalleryCommentRepository galleryCommentRepository;

  // 코멘트 가져오기
  public List<GalleryCommentDto> getGalleryComment(Long id) {
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
    List<GalleryComment> galleryComments = galleryCommentRepository.findAllByGallery(gallery);
    if (galleryComments.isEmpty()) {
      return Collections.emptyList();
    } // if end
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication == null || authentication.getPrincipal() == "anonymousUser") {
      return galleryComments.stream().map(comment -> GalleryCommentDto.of(comment, false)).toList();
    } else {
      Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
      Map<Boolean, List<GalleryComment>> collect = galleryComments.stream()
          .collect(Collectors.partitioningBy(comment -> comment.getMember().equals(member)));
      List<GalleryCommentDto> tCollect = collect.get(true).stream().map(t -> GalleryCommentDto.of(t, true)).toList();
      List<GalleryCommentDto> fCollect = collect.get(true).stream().map(f -> GalleryCommentDto.of(f, false)).toList();
      return Stream.concat(tCollect.stream(), fCollect.stream())
          .sorted(Comparator.comparing(GalleryCommentDto::getId))
          .collect(Collectors.toList());
    } // if end
  } // getGalleryComment

  // 갤러리 코멘트 저장
  @Transactional
  public GalleryCommentDto createGalleryComment(Long id, String comment) {
    Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    Gallery gallery = galleryRepository.findById(id).orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
    
    GalleryComment galleryComment = GalleryComment.builder()
      .member(member)
      .gallery(gallery)
      .comment(comment)
      .createdAt(LocalDateTime.now())
      .build();
    return GalleryCommentDto.of(galleryCommentRepository.save(galleryComment), true);
  } // createGalleryComment

  // 갤러리 코멘트 삭제
  @Transactional
  public void removeGalleryComment(Long id) {
    Member member = memberRepository.findById(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("로그인 하십시오"));
    
    GalleryComment galleryComment = galleryCommentRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("댓글이 없습니다."));
    if (!galleryComment.getMember().equals(member)) {
      throw new RuntimeException("작성자가 아닙니다.");
    } // if end
    galleryCommentRepository.delete(galleryComment);
  } // removeGalleryComment
  
} // GalleryCommentService