package com.avado.backend.dto;

import com.avado.backend.model.ChatMessage;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatMessageDto {
  private Long id;
  private Long roomId;
  private String writer;
  private String message;
  private String enter;
  private String leave;

  public static ChatMessageDto of(ChatMessage chatMessage) {
    return ChatMessageDto.builder()
      .id(chatMessage.getId())
      .roomId(chatMessage.getChatRoom().getId())
      .writer(chatMessage.getWriter())
      .message(chatMessage.getMessage())
      .enter(chatMessage.getWriter())
      .leave(chatMessage.getWriter())
      .build();
  }
  public static ChatMessageDto load(ChatMessage chatMessage) {
    return ChatMessageDto.builder()
      .id(chatMessage.getId())
      .roomId(chatMessage.getChatRoom().getId())
      .writer(chatMessage.getWriter())
      .message(chatMessage.getMessage())
      .build();
  }
} // ChatMessageResponse
