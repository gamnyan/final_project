package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.avado.backend.model.Article;

public interface ArticleRepository extends JpaRepository<Article, Long>, ArticleRepositoryCustom {
	/*@Query(value = "SELECT *\r\n"
			+ "FROM ARTICLE\r\n"
			+ "JOIN ATTACHMENT ON ARTICLE.ID = ATTACHMENT.ARTICLE_ID\r\n"
			+ "WHERE ARTICLE.ID = :id",nativeQuery = true)
	public List<Article> select(@Param(value="id") int id);*/
}