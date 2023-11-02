package com.avado.backend.dto;

import lombok.Data;

@Data
public class ChangeCommentRequestDto {
    private Long id;
    private String text;
}