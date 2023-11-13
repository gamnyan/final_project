package com.avado.backend.persistence;



import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Club;


public interface ClubRepository extends JpaRepository<Club,Long> {
	Page<Club> findAll(Pageable pageable);
	Optional<Club> findByName(String name);

}
