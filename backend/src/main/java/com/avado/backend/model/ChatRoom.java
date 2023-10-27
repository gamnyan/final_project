package com.avado.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.*;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "chatroom")
@Entity
@Builder
public class ChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "memberid")
	@JsonIgnoreProperties("chatroom")
  private Member member;
  
  @Column(name = "roomname", nullable = false)
  private String roomName;

  @OneToMany(mappedBy = "chatRoom", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
  @JsonIgnoreProperties({ "chatroom" })
  private List<ChatMessage> chatMessage;

} // ChatRoom
