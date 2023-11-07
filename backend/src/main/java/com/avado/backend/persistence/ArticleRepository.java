package com.avado.backend.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>/*, ArticleRepositoryCustom*/ {
	Page<Article> findByClubId(Long clubId,Pageable pageable);
	
}