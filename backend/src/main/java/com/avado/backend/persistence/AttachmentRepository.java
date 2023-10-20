package com.avado.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.Attachment;

public interface AttachmentRepository extends JpaRepository<Attachment,Long>{

}
