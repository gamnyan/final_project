package com.avado.backend.service;

import java.util.*;
//import java.util.stream.*;

import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ChatMessageDto;
import com.avado.backend.dto.ChatRoomDto;
import com.avado.backend.model.ChatMessage;
import com.avado.backend.model.ChatRoom;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ChatMessageRepository;
import com.avado.backend.persistence.ChatRoomRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.*;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
  private final ChatRoomRepository chatRoomRepository;
  private final ChatMessageRepository chatMessageRepository;
  private final MemberRepository memberRepository;

  // 채팅방 불러오기
  public List<ChatRoomDto> findAllRoom() {
    List<ChatRoom> chatRooms = chatRoomRepository.findAll();
    Collections.reverse(chatRooms);
    return chatRooms.stream().map(ChatRoomDto::of).toList();
  } // findAllRoom

  // 채팅방 하나 불러오기
  public ChatRoomDto findOne(Long roomid) {
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    return ChatRoomDto.of(chatRoom);
  } // findById

  // 해당 채팅방의 채팅 내역 불러오기
  public List<ChatMessageDto> findAllChatByRoomId(Long roomid) {
    List<ChatMessage> chatMessageList = chatMessageRepository.findAll();
    return chatMessageList.stream().map(ChatMessageDto::load)
        .filter(message -> message.getRoomId() == roomid).toList();
    //return chatMessageList.stream().map(ChatMessageDto::load).toList();
  } // findAllChatByRoomId

  // 채팅내역 저장
  public ChatMessage createMessage(ChatMessageDto chatMessageDto) {
    Long roomid = chatMessageDto.getRoomId();
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setChatRoom(chatRoom);
    chatMessage.setWriter(chatMessageDto.getWriter());
    chatMessage.setMessage(chatMessageDto.getMessage());
    return chatMessageRepository.save(chatMessage);
  } // createMessage


  // 유저 정보 확인
  public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
      .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
  } // isMemberCurrent
  
  // 채팅방 생성
  @Transactional
  public ChatRoom createRoom(String roomName) {
    Member member = isMemberCurrent();
    ChatRoom chatRoom = new ChatRoom();
    chatRoom.setRoomName(roomName);
    chatRoom.setMember(member);
    return chatRoomRepository.save(chatRoom);
  } // createRoom

  // 채팅방 삭제
  @Transactional
  public void deleteRoom(Long roomid) {
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    chatRoomRepository.delete(chatRoom);
  } // deleteRoom



  // @PostConstruct
  // //의존관게 주입완료되면 실행되는 코드
  // private void init() {
  //     chatRooms = new LinkedHashMap<>();
  // }

  // //채팅방 불러오기
  // public List<ChatRoom> findAllRoom() {
  //     //채팅방 최근 생성 순으로 반환
  //     List<ChatRoom> result = new ArrayList<>(chatRooms.values());
  //     Collections.reverse(result);

  //     return result;
  // }

  // //채팅방 하나 불러오기
  // public ChatRoom findById(String roomId) {
  //     return chatRooms.get(roomId);
  // }

  // //채팅방 생성
  // public ChatRoom createRoom(String name) {
  //     ChatRoom chatRoom = ChatRoom.create(name);
  //     chatRooms.put(chatRoom.getRoomId(), chatRoom);
  //     return chatRoom;
  // }
} // ChatService
