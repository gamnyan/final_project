package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Club;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClubPageResponseDto {
	private Long clubId;
	private String clubName;
	private String clubAddress;
	private String clubCategory;
	private String clubFilename;
	private String createdAt;
	private boolean isJoined;
	
	public static ClubPageResponseDto of(Club club) {
		return ClubPageResponseDto.builder()
				.clubId(club.getId())
				.clubName(club.getName())
				.clubAddress(club.getAddress())
				.clubCategory(club.getCategory())
				.clubFilename(club.getFilename())
				.createdAt(club.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
				//.isJoined(club.getMember().getId())
				.build();
	}
}
