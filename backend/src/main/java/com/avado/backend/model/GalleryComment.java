package com.avado.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@Table(name = "gallery_comment")
@Builder
public class GalleryComment {

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("gallery_comment")
  private Member member;
  
  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "gallery_id")
	@JsonIgnoreProperties("gallery_comment")
  private Gallery gallery;

  @Column(name = "comment", nullable = false)
  private String comment;
  
} // GalleryComment
