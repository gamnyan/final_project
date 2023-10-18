package com.avado.backend.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name="gallery")
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
	private String filename;
	
	@Column(nullable = false)
	private String filepath;
	
	@Column(nullable = false)
	private Date createDate;
} // Gallery
