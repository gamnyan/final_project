import React, { useState } from "react";
import * as chatAction from "./Chat-action";

const ChatContext = React.createContext({
  chatRoom: undefined,
  messages: undefined,
  isGetUpdateSuccess: false,
  isSuccess: false,

  getOneChatRoom: () => {},
  getChatMessages: () => {},
  updateRoomName: () => {},
});

// roomId == clubId

export const ChatContextProvider = (props) => {
  const [chatRoom, setChatRoom] = useState();
  const [messages, setMessages] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGetUpdateSuccess, setIsGetUpdateSuccess] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 특정 채팅방 조회
  const getOneChatRoomHandler = (roomId, token) => {
    setIsSuccess(false);
    setIsError(false); // 에러 상태 초기화
    setErrorMessage(""); // 에러 메시지 초기화

    const data = token
      ? chatAction.getOneChatRoomByClub(roomId, token)
      : chatAction.getOneChatRoomByClub(roomId);
    data
      .then((result) => {
        if (result != null) {
          const chat = result.data;
          setChatRoom(chat);
          setIsSuccess(true);
        } else {
          setIsError(true);
          setErrorMessage("해당 채팅방에 입장할 수 없습니다.");
        } // if end
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error.message);
      });
    setIsSuccess(true);
  }; // getOneChatRoomHandler

  // 채팅방 이름 수정
  const updateChatRoomNameHandler = (chatRoom, token) => {
    setIsSuccess(false);
    const formData = new FormData();
    formData.append("roomName", chatRoom.roomName);
    const data = chatAction.changeChatRoomName(chatRoom.id, formData, token);
    data.then((result) => {
      if (result !== null) {
        console.log(isSuccess);
        setIsGetUpdateSuccess(result.data);
      } // if end
    });
    setIsSuccess(true);
  }; // updateChatRoomNameHandler

  // 특정 채팅방 메세지 내역 불러오기
  const getChatMessagesHandler = async (roomId, token) => {
    setIsSuccess(false);
    const data = chatAction.getRoomMessages(roomId, token);
    data.then((result) => {
      if (result !== null) {
        setMessages(result.data);
      } // if end
    });
    setIsSuccess(true);
  }; // getChatMessagesHandler

  const contextValue = {
    chatRoom,
    messages,
    isSuccess,
    isGetUpdateSuccess,

    getOneChatRoom: getOneChatRoomHandler,
    getChatMessages: getChatMessagesHandler,
    updateRoomName: updateChatRoomNameHandler,
  }; // contextValue

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
}; // ChatContextProvider

export default ChatContext;
