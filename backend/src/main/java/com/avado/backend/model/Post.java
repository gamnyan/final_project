package com.avado.backend.model;

import java.util.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.*;

import com.fasterxml.jackson.annotation.*;

import jakarta.persistence.*;
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
	private String body;
	
	@Column
	private String img;
	
	@CreationTimestamp
	@Column
	private Date createDate;
	
	@UpdateTimestamp
	@Column
  private Date updateDate;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"post"})
	private List<Community> community;
	
	@OneToMany(mappedBy = "post", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JsonIgnoreProperties({"post"})
	private List<Gallery> gallery;

	public static Post createPost(Member member, String title, String body, String img) {
		Post post = new Post();
		post.member = member;
		post.title = title;
		post.body = body;
		post.img = img;
		post.createDate = new Date();
		return post;
	} // createPost

	public static Post changePost(Post post, String title, String body, String img){
		post.title = title;
		post.body = body;
		post.img = img;
		post.updateDate = new Date();
		return post;
	} // changePost
		
	
} // Post

//https://m.blog.naver.com/rudnfskf2/222150927977


/* 
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목1', '게시글 내용1', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목2', '게시글 내용2', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목3', '게시글 내용3', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목4', '게시글 내용4', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목5', '게시글 내용5', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목6', '게시글 내용6', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목7', '게시글 내용7', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목8', '게시글 내용8', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ('게시글 제목9', '게시글 내용9', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목10', '게시글 내용10', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목11', '게시글 내용11', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목12', '게시글 내용12', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목13', '게시글 내용13', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목14', '게시글 내용14', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목15', '게시글 내용15', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목16', '게시글 내용16', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목17', '게시글 내용17', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목18', '게시글 내용18', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목19', '게시글 내용19', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목20', '게시글 내용20', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목21', '게시글 내용21', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목22', '게시글 내용22', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목23', '게시글 내용23', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목24', '게시글 내용24', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목25', '게시글 내용25', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목26', '게시글 내용26', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목27', '게시글 내용27', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목28', '게시글 내용28', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목29', '게시글 내용29', 'NOW()', '');
INSERT INTO post (TITLE, body, createDate, upadateDate)
VALUES ( '게시글 제목30', '게시글 내용30', 'NOW()', '');
 */