package com.avado.backend.model;

import java.sql.*;
import java.sql.Date;
import java.util.*;

import org.hibernate.validator.constraints.*;

import com.fasterxml.jackson.annotation.*;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name="post")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "memberid")
	@JsonIgnoreProperties("post")
	private Member member;
	
	@Length(min = 1)
	@Column(nullable = false)
	private String title;
	
	@Column(nullable = false)
	private String contents;
	
	@Column
	private String filename;
	
	@Column
	private String filepath;
	
	@Temporal(TemporalType.DATE)
  private Date createDate;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"post"})
	private List<Community> community;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"post"})
	private List<Gallery> gallery;

	
} // Post

//https://m.blog.naver.com/rudnfskf2/222150927977
