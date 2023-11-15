package com.avado.backend.dto;

import lombok.Data;

@Data
public class ChangeCommentRequestDto {
    private Long commentId;
    private String commentText;
}