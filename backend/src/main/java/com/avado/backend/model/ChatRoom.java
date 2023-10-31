package com.avado.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chat_room")
@Entity
@Builder
public class ChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("chat_room")
  private Member member;

  // @ManyToOne(fetch = FetchType.EAGER)
  // @JoinColumn(name = "articleid")
  // @JsonIgnoreProperties
  // private Article article;
  
  @Column(name = "room_name", nullable = false)
  private String roomName;

  @OneToMany(mappedBy = "chat_room", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "chat_room" })
  private List<ChatMessage> chatMessage;

} // ChatRoom
