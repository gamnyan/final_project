package com.avado.backend.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
  
} // ChatMessageRepository
