package com.avado.backend.dto;

import com.avado.backend.model.Club;
import com.avado.backend.model.Member;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ClubCreateRequestDto {
	
	private String name;
	private String filename;
	private String clubinfo;
	private String category;
	private String address;
	private Member member;
	
	
	@Builder
	public ClubCreateRequestDto(Member member,String name,String clubinfo,String category,String address,String filename) {
		this.member=member;
		this.name =name;
		this.clubinfo = clubinfo;
		this.category = category;
		this.address = address;
		this.filename = filename;
	}
	/*
	public Club toEntity() {
		return Club.builder()
				.member(member)
				.name(name)
				.clubinfo(clubinfo)
				.categoty(category)
				.address(address)
				.filenmae(filename)
				.build();
	}*/
}
