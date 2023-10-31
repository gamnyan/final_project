package com.avado.backend.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.avado.backend.dto.GalleryResponseDto;

public interface GalleryRepositoryCustom {
  Page<GalleryResponseDto> searchAll(Pageable pageable);
} // GalleryRepositoryCustom
