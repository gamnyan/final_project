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

  private ClubJoinDto clubjoin;
	private String errorMessage;

  public static ChatRoomDto of(ChatRoom chatRoom) {
    return ChatRoomDto.builder()
      .id(chatRoom.getId()) 
      .memberId(chatRoom.getMember().getId())
      .roomName(chatRoom.getRoomName())
      .build();
  } // ChatRoomDto

  public static ChatRoomDto checkClubJoin(ChatRoom chatRoom, Boolean bool, ClubJoinDto clubJoinDto) {
    return ChatRoomDto.builder()
      .id(chatRoom.getId()) 
      .memberId(chatRoom.getMember().getId())
      .roomName(chatRoom.getRoomName())
      .isWrite(bool)
      .clubjoin(clubJoinDto)
      .build();
  } // checkClubJoin

  // 에러 메시지 설정 메서드
    public void setErrorMessage(String errorMessage) {
      this.errorMessage = errorMessage;
    }

    // 에러 메시지 가져오기 메서드
    public String getErrorMessage() {
      return errorMessage;
    }

} // ChatRoomDto
