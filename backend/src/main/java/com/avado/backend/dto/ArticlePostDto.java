package com.avado.backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ArticlePostDto {
    private String title;
    private String content;
    private String nickname;
}
