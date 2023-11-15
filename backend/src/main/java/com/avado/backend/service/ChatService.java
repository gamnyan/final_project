package com.avado.backend.service;

import java.util.*;
import java.time.*;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.avado.backend.config.SecurityUtil;
import com.avado.backend.dto.ChatMessageDto;
import com.avado.backend.dto.ChatRoomDto;
import com.avado.backend.dto.ClubJoinDto;
import com.avado.backend.model.ChatMessage;
import com.avado.backend.model.ChatRoom;
import com.avado.backend.model.Club;
import com.avado.backend.model.Member;
import com.avado.backend.persistence.ChatMessageRepository;
import com.avado.backend.persistence.ChatRoomRepository;
import com.avado.backend.persistence.ClubJoinRepository;
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
  private final ClubJoinRepository clubJoinRepository;

  // 채팅방 불러오기
  public List<ChatRoomDto> findAllRoom() {
    List<ChatRoom> chatRooms = chatRoomRepository.findAll();
    Collections.reverse(chatRooms);
    return chatRooms.stream().map(ChatRoomDto::of).toList();
  } // findAllRoom

  // 채팅방 하나 불러오기
  public ChatRoomDto findOne(Long roomid) {
    try{
      ChatRoom chatRoom = chatRoomRepository.findById(roomid).orElseThrow(() -> new RuntimeException("방이 없습니다."));
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication == null || authentication.getPrincipal() instanceof AnonymousAuthenticationToken) {
        ClubJoinDto clubJoinDto = getClubJoinDto(chatRoom.getClub().getId()); // 클럽 가입 정보를 가져옴
        return ChatRoomDto.checkClubJoin(chatRoom, false, clubJoinDto);
      } else {
        Member member = memberRepository.findById(Long.parseLong(authentication.getName())).orElseThrow();
        // 클럽 가입 여부 판단
        Boolean isMemberOfClub = clubJoinRepository.existsByClubIdAndMemberId(chatRoom.getClub().getId(),
            member.getId());
        if (isMemberOfClub) {
          Boolean result = chatRoom.getMember().equals(member);
          ClubJoinDto clubJoinDto = getClubJoinDto(chatRoom.getClub().getId());
          return ChatRoomDto.checkClubJoin(chatRoom, result, clubJoinDto);
        } else {
          throw new RuntimeException("해당 채팅방에 들어갈 권한이 없습니다.");
        } // if end
      }
    } catch (Exception e) {
      ChatRoomDto chatRoomDto = new ChatRoomDto();
      chatRoomDto.setErrorMessage(e.getMessage());
      return chatRoomDto;
    }
  } // findById

  private ClubJoinDto getClubJoinDto(Long clubId) {
    // 가상의 예시 데이터를 사용한 코드입니다. 실제 데이터 조회 로직을 여기에 구현해야 합니다.
    int joinedNum = 0; // 예시: 클럽에 현재 10명이 가입되어 있는 상황
    boolean isJoined = true; // 예시: 현재 사용자가 클럽에 가입되어 있는 상황

    return ClubJoinDto.builder()
      .joinedNum(joinedNum)
      .isJoined(isJoined)
      .build();
	} // getClubJoinDto

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
