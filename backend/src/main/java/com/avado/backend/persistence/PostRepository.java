package com.avado.backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
	Optional<Post> findById(Long id);
	boolean existsById(Long id);
} // PostRepository
