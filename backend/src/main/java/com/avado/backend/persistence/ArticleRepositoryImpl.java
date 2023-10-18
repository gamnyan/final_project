package com.avado.backend.persistence;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.avado.backend.dto.PageResponseDto;
import com.avado.backend.model.Article;
import static com.avado.backend.model.QArticle.article;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class ArticleRepositoryImpl implements ArticleRepositoryCustom{

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<PageResponseDto> searchAll(Pageable pageable) {


    	 List<Article> content = queryFactory
                 .selectFrom(article)  // QArticle은 QueryDSL에서 자동 생성된 클래스입니다.
                 .orderBy(article.id.desc())  // QArticle을 사용하여 엔터티의 필드에 접근합니다.
                 .offset(pageable.getOffset())
                 .limit(pageable.getPageSize())
                 .fetch();

        List<PageResponseDto> pages = content
                .stream()
                .map(PageResponseDto::of)
                .collect(Collectors.toList());

        int totalSize = queryFactory
                .selectFrom(article)
                .fetch()
                .size();

        return new PageImpl<>(pages, pageable, totalSize);
    }


}