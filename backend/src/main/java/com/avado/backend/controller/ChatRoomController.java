package com.avado.backend.controller;

import java.util.*;
import java.time.LocalDateTime;
import java.time.format.*;

import org.springframework.http.*;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.stereotype.*;
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
  
  //  /club/one/{clubId}/chat/room

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
    chatMessageDto.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

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
  public ResponseEntity<List<ChatRoomDto>> getRoomList() {
    return ResponseEntity.ok(chatService.findAllRoom());
  } // getRoomList

  // 특정 채팅방 조회
  @GetMapping("/chat/room/{roomid}")
  @ResponseBody
  public ResponseEntity<ChatRoomDto> getRoom(@PathVariable("roomid") Long roomid) {
    try {
      return ResponseEntity.ok().body(chatService.findOne(roomid));
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // getRoom

  // 특정 채팅방의 메세지 목록
  @GetMapping("/chat/room/{roomid}/message")
  @ResponseBody
  public ResponseEntity<List<ChatMessageDto>> getMessageList(@PathVariable("roomid") Long roomid) {
    return ResponseEntity.ok(chatService.findAllChatByRoomId(roomid));
  } // getMessageList

  // 특정 채팅방 수정 (roomName)
  @PutMapping("/chat/room/change/{roomid}")
  @ResponseBody
  public ResponseEntity<ChatRoomDto> changeRoomName(@PathVariable("roomid") Long roomid, @RequestBody ChatRoom chatRoom) {
    try {
      ChatRoomDto changeRoom = chatService.changeRoomName(roomid, chatRoom.getRoomName());
      return ResponseEntity.ok(changeRoom);
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  } // changeRoomName

} // ChatRoomController
