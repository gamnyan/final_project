package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.avado.backend.model.Article;
import com.avado.backend.model.Recommend;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend,Long> {
List<Recommend> findAllByArticle(Article article);
}
