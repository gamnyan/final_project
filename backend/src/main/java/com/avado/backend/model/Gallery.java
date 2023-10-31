package com.avado.backend.model;

import java.util.*;
import java.time.LocalDateTime;

import org.hibernate.annotations.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "gallery")
@Builder
public class Gallery {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("gallery")
	private Member member;

	// @ManyToOne(fetch = FetchType.EAGER)
	// @JoinColumn(name = "articleid")
	// @JsonIgnoreProperties("gallery")
    // private Article article;
  
  @Column(name = "content", nullable = false)
  private String content;
  
  @ColumnDefault("0")
  @Column(name = "view_count", nullable = false)
  private Integer viewCount;

  @CreationTimestamp
  @Column(name = "created_at")
  private LocalDateTime createdAt = LocalDateTime.now();

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt = LocalDateTime.now();


  @OneToMany(mappedBy = "gallery", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "gallery" })
  private List<Attachment> attachedFiles;

  @OneToMany(mappedBy = "gallery", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "gallery" })
  private List<GalleryComment> galleryComment;

  @OneToMany(mappedBy = "gallery", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "gallery" })
  private List<GalleryHeart> galleryHeart;

} // Gallery
