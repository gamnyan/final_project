package com.avado.backend.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Club {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column
	private String name;
	@Column
	private String Filename;
	@Column
	private String Storename;
	@Column
	private String clubinfo;

	@Column
	private String Category;
	@Column
	private String Address;

	@CreationTimestamp
	@Column
	private LocalDateTime createdAt = LocalDateTime.now();

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "club", cascade = CascadeType.REMOVE)
	private List<Article> articles = new ArrayList<>();

	@OneToMany(mappedBy = "club", cascade = CascadeType.REMOVE)
	private List<Gallery> gallery = new ArrayList<>();

	@OneToOne(mappedBy = "club", cascade = CascadeType.REMOVE)
	private ChatRoom chatRoom;

	@OneToMany(mappedBy = "club", cascade = CascadeType.REMOVE)
	private List<ClubJoin> clubJoins = new ArrayList<>();

	public List<ClubJoin> getClubJoins() {
		return clubJoins;
	}

	public static Club changeClub(Club club, String name, String Filename, String clubinfo, String Category,
			String Address) {
		club.name = name;
		club.Filename = Filename;
		club.clubinfo = clubinfo;
		club.Category = Category;
		club.Address = Address;

		return club;
	}

}
