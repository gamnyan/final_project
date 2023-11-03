package com.avado.backend.model;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chat_room")
@Entity
//@Builder
@JsonAutoDetect
public class ChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "member_id")
	@JsonIgnoreProperties("chat_room")
  private Member member;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "club_id")
  private Club club;
  
  @Column(name = "room_name", nullable = false)
  private String roomName;

  @OneToMany(mappedBy = "chatRoom", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "chatRoom" })
  private List<ChatMessage> chatMessagae;


} // ChatRoom
