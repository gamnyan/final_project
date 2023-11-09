package com.avado.backend.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
  Page<Gallery> findByClubId(Long clubId, Pageable pageble);
} // GalleryRepository
