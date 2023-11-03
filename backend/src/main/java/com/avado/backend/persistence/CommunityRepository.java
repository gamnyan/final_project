package com.avado.backend.persistence;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Community;

public interface CommunityRepository extends JpaRepository<Community, Long> {
	Optional<Community> findById(Long id);
	boolean existsById(Long id);
} // CommunityRepository
