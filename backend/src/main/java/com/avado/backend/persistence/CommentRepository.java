package com.avado.backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
	Optional<Comment> findById(Long id);
	boolean existsById(Long id);
} // CommentRepository
