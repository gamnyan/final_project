package com.avado.backend.persistence;

import java.util.*;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Gallery;
import com.avado.backend.model.GalleryComment;

public interface GalleryCommentRepository extends JpaRepository<GalleryComment, Long> {
  List<GalleryComment> findAllByGallery(Gallery gallery);
} // GalleryCommentRepository
