package com.avado.backend.model;

import java.util.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;

@DynamicInsert
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gallery")
//@Builder
public class Gallery {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("gallery")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private Club club;
  
  @Column(name = "content", nullable = false)
  private String content;
  
  @ColumnDefault("0")
  @Column(name = "view_count")
  private Integer viewCount;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;


  @OneToMany(mappedBy = "gallery",fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  //@JsonIgnoreProperties({ "gallery" })
  private List<Attachment> attachedFiles = new ArrayList<>();

  @OneToMany(mappedBy = "gallery", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private List<GalleryComment> galleryComment;

  @OneToMany(mappedBy = "gallery", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
  private List<GalleryHeart> galleryHeart;

  public static Gallery changeGallery(Gallery gallery, String content) {
    gallery.content = content;
    return gallery;
  } // changeGallery

} // Gallery
