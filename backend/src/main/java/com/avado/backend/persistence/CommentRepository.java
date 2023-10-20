package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Article;
import com.avado.backend.model.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {
	List<Comment> findAllByArticle(Article article);
}
