import { GET, POST, PUT, DELETE } from "./Fetch-auth-action";

// token 생성
const createTokenHeader = (token) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}; // createTokenHeader

// roomId == clubId

// 특정 채팅방 가져오기
export const getOneChatRoomByClub = (roomId, token) => {
  const URL = `/chat/room/${roomId}`;
  if (!token) {
    const response = GET(URL, {});
    return response;
  } else {
    const response = GET(URL, createTokenHeader(token));
    return response;
  } // if end
}; // getOneChatRoom

// 채팅방 이름 수정
export const changeChatRoomName = (roomId, formData, token) => {
  const URL = `/chat/room/change/${roomId}`;
  const response = POST(URL, formData, createTokenHeader(token));
  return response;
}; // changeChatRoomName

// 특정 채팅방 메세지 내역 불러오기
export const getRoomMessages = (roomId, token) => {
  const URL = `/chat/room/${roomId}/message`;
  const response = GET(URL, createTokenHeader(token));
  return response;
}; // getRoomMessages
