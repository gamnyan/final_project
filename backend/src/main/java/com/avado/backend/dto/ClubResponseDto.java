package com.avado.backend.dto;

import java.time.format.DateTimeFormatter;

import com.avado.backend.model.Club;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClubResponseDto {
	private Long clubId;
	private String clubName;
	private String clubInfo;
	private String clubFilename;
	private String clubCategory;
	private String clubAddress;
	private String createdAt;
	private boolean isWritten;
	private Club club;
	
	public static ClubResponseDto of(Club club,boolean bool) {
		return ClubResponseDto.builder()
				.clubId(club.getId())
				.clubName(club.getName())
				.clubInfo(club.getClubinfo())
				.clubFilename(club.getFilename())
				.clubCategory(club.getCategory())
				.clubAddress(club.getAddress())
				.createdAt(club.getCreatedAt().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))
				.isWritten(bool)
				.build();
	}
}
