package com.avado.backend.dto;

import lombok.Data;

@Data
public class ChangeClubRequestDto {
    private Long id;
    private String name;
    private String clubinfo;
    private String filename;
    private String address;
    private String category;
}
