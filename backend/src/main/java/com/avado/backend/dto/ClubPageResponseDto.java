package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Club;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClubPageResponseDto {
	private Long memberId;
	private Long clubId;
	private String clubName;
	private String clubAddress;
	private String clubCategory;
	private String clubFilename;
	private String createdAt;
	private boolean isJoined;
	private ClubJoinDto clubjoin;
	
	public static ClubPageResponseDto of(Club club,boolean bool, ClubJoinDto clubJoinDto) {
		return ClubPageResponseDto.builder()
				.memberId(club.getMember().getId())
				.clubId(club.getId())
				.clubName(club.getName())
				.clubAddress(club.getAddress())
				.clubCategory(club.getCategory())
				.clubFilename(club.getFilename())
				.createdAt(club.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				.isJoined(bool)
				.clubjoin(clubJoinDto)
				.build();
	}

	public static ClubPageResponseDto of2(Club club) {
		return ClubPageResponseDto.builder()
				.memberId(club.getMember().getId())
				.clubId(club.getId())
				.clubName(club.getName())
				.clubAddress(club.getAddress())
				.clubCategory(club.getCategory())
				.clubFilename(club.getFilename())
				.createdAt(club.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				//.isJoined(bool)
				.build();
	}
}
