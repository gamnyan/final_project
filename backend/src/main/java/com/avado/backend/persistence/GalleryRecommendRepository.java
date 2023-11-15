package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Gallery;
import com.avado.backend.model.GalleryRecommend;

public interface GalleryRecommendRepository extends JpaRepository<GalleryRecommend, Long> {
  List<GalleryRecommend> findAllByGallery(Gallery gallery);
} // GalleryRecommendRepository
