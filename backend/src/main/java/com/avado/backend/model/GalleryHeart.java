package com.avado.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@Table(name = "gallery_heart")
@Builder
public class GalleryHeart {

  @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  
  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("gallery_heart")
  private Member member;
  
  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "gallery_id")
	@JsonIgnoreProperties("gallery_heart")
  private Gallery gallery;


} // GalleryHeart
