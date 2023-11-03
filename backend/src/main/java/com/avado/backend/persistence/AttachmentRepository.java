package com.avado.backend.persistence;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Article;
import com.avado.backend.model.Attachment;
import com.avado.backend.model.Gallery;

public interface AttachmentRepository extends JpaRepository<Attachment,Long>{
	List<Attachment> findByArticle(Article article);
	List<Attachment> findByArticleId(Long articleId);
	List<Attachment> findByGallery(Gallery gallery);
	List<Attachment> findByGalleryId(Long galleryId);
}
