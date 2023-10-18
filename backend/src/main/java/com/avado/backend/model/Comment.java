package com.avado.backend.model;

import jakarta.persistence.Entity;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name="comment")
public class Comment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "communityid")
	@JsonIgnoreProperties("community")
	private Community community;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "memberid")
	@JsonIgnoreProperties("community")
	private Member member;
	
	@Length(min = 1)
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private Date createDate;
	
	
} // Comment
