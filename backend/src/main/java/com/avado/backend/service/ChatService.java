package com.avado.backend.service;

import java.util.*;
import java.time.*;

import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ChatMessageDto;
import com.avado.backend.dto.ChatRoomDto;
import com.avado.backend.model.ChatMessage;
import com.avado.backend.model.ChatRoom;
import com.avado.backend.model.Club;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ChatMessageRepository;
import com.avado.backend.persistence.ChatRoomRepository;
import com.avado.backend.persistence.ClubRepository;
import com.avado.backend.persistence.MemberRepository;

import jakarta.transaction.*;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ChatService {
  private final ChatRoomRepository chatRoomRepository;
  private final ChatMessageRepository chatMessageRepository;
  private final MemberRepository memberRepository;
  private final ClubRepository clubRepository;

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
    return chatMessageList.stream().map(ChatMessageDto::load).filter(message -> message.getRoomId() == roomid).toList();
  } // findAllChatByRoomId

  // 채팅내역 저장
  public ChatMessage createMessage(ChatMessageDto chatMessageDto) {
    Long roomid = chatMessageDto.getRoomId();
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    ChatMessage chatMessage = new ChatMessage();
    chatMessage.setChatRoom(chatRoom);
    chatMessage.setWriter(chatMessageDto.getWriter());
    chatMessage.setMessage(chatMessageDto.getMessage());
    chatMessage.setCreatedAt(LocalDateTime.now());
    return chatMessageRepository.save(chatMessage);
  } // createMessage


  // 유저 정보 확인
  public Member isMemberCurrent() {
		return memberRepository.findById(SecurityUtil.getCurrentMemberId())
      .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
  } // isMemberCurrent
  
  // 채팅방 생성
  @Transactional
  public ChatRoom createRoom(String roomName, Long clubId, Member member) {
    Club club = clubRepository.findById(clubId).orElseThrow(() -> new RuntimeException("해당 ID의 클럽을 찾을 수 없습니다."));
    ChatRoom chatRoom = new ChatRoom();
    chatRoom.setRoomName(roomName);
    chatRoom.setMember(member);
    chatRoom.setClub(club);
    return chatRoomRepository.save(chatRoom);
  } // createRoom

  // 채팅방 수정
  @Transactional
  public ChatRoomDto changeRoomName(Long roomid, String roomName) {
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    Member member = isMemberCurrent();
    try {
      if (member.getId() != chatRoom.getMember().getId()) {
        System.out.println(member.getId());
        System.out.println(chatRoom.getMember().getId());
        throw new RuntimeException("채팅방 업데이트 중 오류가 발생했습니다.");
      } else {
        chatRoom.setRoomName(roomName);
        return ChatRoomDto.of(chatRoomRepository.save(chatRoom));
      }
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException("채팅방 업데이트 중 오류가 발생했습니다.");
    }
  } // changeRoomName

  // 채팅방 삭제
  @Transactional
  public void deleteRoom(Long roomid) {
    ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
    chatRoomRepository.delete(chatRoom);
  } // deleteRoom




} // ChatService
