package com.avado.backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "gallery")
public class Gallery {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "memberid")
	@JsonIgnoreProperties("gallery")
	private Member member;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "postid")
	@JsonIgnoreProperties("gallery")
	private Post post;

	@Column(nullable = false)
	private String img;

	@CreationTimestamp
	@Column
	@Builder.Default
	private LocalDateTime createDate = LocalDateTime.now();
} // Gallery
