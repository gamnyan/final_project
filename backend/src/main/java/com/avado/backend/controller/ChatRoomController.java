package com.avado.backend.controller;

import java.util.*;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.avado.backend.dto.ChatMessageDto;
import com.avado.backend.dto.ChatRoomDto;
import com.avado.backend.model.ChatRoom;
import com.avado.backend.service.ChatService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChatRoomController {
  private final ChatService chatService;
  

  // ChatRoom enter
  @MessageMapping("/enter/{roomId}")
  @SendTo(value = "/topic/chat/room/{roomId}")
  public ChatMessageDto enter(String nickName, @DestinationVariable Long roomId) throws Exception {
    Thread.sleep(1000);
    ChatMessageDto chatMessage = new ChatMessageDto();
    chatMessage.setRoomId(roomId);
    chatMessage.setWriter(nickName);
    chatMessage.setEnter(nickName);

    return chatMessage;
  } // enter

  @MessageMapping("/message/{roomId}")
  @SendTo(value = "/topic/chat/room/{roomId}")
  public ChatMessageDto sendMessage(@RequestBody ChatMessageDto messageDto) {
    ChatMessageDto chatMessageDto = new ChatMessageDto();
    chatMessageDto.setRoomId(messageDto.getRoomId());
    chatMessageDto.setWriter(messageDto.getWriter());
    chatMessageDto.setMessage(messageDto.getMessage());

    // db 저장
    chatService.createMessage(chatMessageDto);

    return chatMessageDto;
  } // sendMessage

  @MessageMapping("leave/{roomId}")
  @SendTo(value = "/topic/chat/room/{roomId}")
  public ChatMessageDto leave(String nickName, @DestinationVariable Long roomId) throws Exception {
    Thread.sleep(1000);
    ChatMessageDto chatMessage = new ChatMessageDto();
    chatMessage.setRoomId(roomId);
    chatMessage.setWriter(nickName);
    chatMessage.setLeave(nickName);

    return chatMessage;
  } // leave

  // 채팅방 목록
  @GetMapping("/chat/room")
  @ResponseBody
  public List<ChatRoomDto> getRoomList() {
    return chatService.findAllRoom();
  } // getRoomList

  // 특정 채팅방 조회
  @GetMapping("/chat/room/{roomid}")
  @ResponseBody
  public ChatRoomDto getRoom(@PathVariable("roomid") Long roomid) {
    return chatService.findOne(roomid);
  } // getRoom

  // 특정 채팅방의 메세지 목록
  @GetMapping("/chat/room/message/{roomid}")
  @ResponseBody
  public List<ChatMessageDto> getMessageList(@PathVariable("roomid") Long roomid) {
    return chatService.findAllChatByRoomId(roomid);
  } // getMessageList

  // 채팅방 생성
  @PostMapping("/chat/room")
  @ResponseBody
  public ChatRoom createRoom(@RequestBody ChatRoom ChatRoom) {
    return chatService.createRoom(ChatRoom.getRoomName());
  }

  // 채팅방 삭제
  @DeleteMapping("/chat/room/{roomid}")
  @ResponseBody
  public void deleteRoom(@PathVariable("roomid") Long roomid) {
    chatService.deleteRoom(roomid);
  } // delteRoom

} // ChatRoomController
