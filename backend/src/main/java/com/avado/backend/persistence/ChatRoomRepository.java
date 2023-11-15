package com.avado.backend.persistence;
  
import org.springframework.data.jpa.repository.JpaRepository;

import com.avado.backend.model.ChatRoom;


public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

} // ChatRoomRepository
