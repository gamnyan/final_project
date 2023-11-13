package com.avado.backend.model;

import java.time.*;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chat_message")
@Entity
@Builder
@JsonAutoDetect
public class ChatMessage {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  // 채팅방 ID
  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "room_id")
	@JsonIgnoreProperties("chat_message")
  private ChatRoom chatRoom;

  // 보내는 사람
	@Column(name = "writer")
  private String writer;

  // 내용
  @Column(nullable = false)
  private String message;

  // 시간
  @CreationTimestamp
  @Column(name = "create_at")
  private LocalDateTime createdAt;

} // Message
