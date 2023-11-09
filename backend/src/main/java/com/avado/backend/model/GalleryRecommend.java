package com.avado.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class GalleryRecommend {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "member_id")
  private Member member;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "gallery_id")
  private Gallery gallery;

  public GalleryRecommend(Member member, Gallery gallery) {
    this.member = member;
    this.gallery = gallery;
  }
} // GalleryRecommend
