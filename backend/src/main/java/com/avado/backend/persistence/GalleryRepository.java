package com.avado.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Gallery;

public interface GalleryRepository extends JpaRepository<Gallery, Long> {
  
} // GalleryRepository
