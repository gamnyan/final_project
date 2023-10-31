package com.avado.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Club;

public interface ClubRepository extends JpaRepository<Club,Long> {
	
}
