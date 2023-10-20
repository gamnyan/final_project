package com.avado.backend.model;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "community")
public class Community {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "memberid")
	@JsonIgnoreProperties("community")
	private Member member;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "postid")
	@JsonIgnoreProperties("community")
	private Post post;

	@Length(min = 1)
	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	@CreationTimestamp
	@Column
	@Builder.Default
	private LocalDateTime createDate = LocalDateTime.now();

	@OneToMany(mappedBy = "community", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({ "community" })
	private List<Comment> comment;
} // Community
