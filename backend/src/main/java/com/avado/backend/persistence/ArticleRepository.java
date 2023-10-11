package com.avado.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.avado.backend.model.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    Article findByTitle(String title);
}