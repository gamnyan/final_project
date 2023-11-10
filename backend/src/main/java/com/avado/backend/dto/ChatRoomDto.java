package com.avado.backend.dto;

import com.avado.backend.model.ChatRoom;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRoomDto {
  private Long id;
  private Long memberId;
  private String roomName;
  private Boolean isWrite;

  public static ChatRoomDto of(ChatRoom chatRoom) {
    return ChatRoomDto.builder()
      .id(chatRoom.getId()) 
      .memberId(chatRoom.getMember().getId())
      .roomName(chatRoom.getRoomName())
      .build();
  } // ChatRoomDto

} // ChatRoomDto
