import axios from "axios";
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import { UserProfile } from "../../components/Layout/MainNavigation";

const ChatRoom = () => {
  const storedToken = localStorage.getItem("token");
  const roomId = useParams();
  const [room, setRoom] = useState({});

  const userProfile = UserProfile();
  const writer = userProfile.nickname;

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [inputEnabled, setInputEnabled] = useState(false);
  const clientRef = useRef(null);

  /*   // roomData
  useEffect(() => {
    
  }, []); */

  // connect websocket
  useEffect(() => {
    axios
      .get(`/chat/room/${roomId.id}`, {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .then((res) => {
        setRoom(res.data);
      }); // axios.get end
    axios
      .get(`/chat/room/${roomId.id}/message`, {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .then((res) => {
        setMessages(res.data);
      });

    clientRef.current = new Client({
      brokerURL: "ws://localhost:80/ws/chat",
    }); // axios.get end

    clientRef.current.onConnect = (frame) => {
      clientRef.current.subscribe(
        `/topic/chat/room/${roomId.id}`,
        (message) => {
          const response = JSON.parse(message.body);
          console.log("Response:", response);
          setMessages((prevMessages) => [...prevMessages, response]);
        }
      );
      const user = UserProfile();
      setTimeout(function () {
        clientRef.current.publish({
          destination: `/app/enter/${roomId.id}`,
          headers: {},
          body: user.nickname,
        });
      }, 10);
    }; // onConnect end

    clientRef.current.onWebSocketError = (error) => {
      console.error("Error with websocket", error);
    }; // onWebSocketError end

    clientRef.current.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    clientRef.current.activate();
    return () => {
      clientRef.current.deactivate(); // 열리는 중이면 닫기 전까지 잠시 기다려줌.
    }; // activate end
  }, []); // fn useEffect end

  // 현재 시각 포맷 fn
  const formatTimeStamp = () => {
    let nowDate = new Date();
    let timeStamp =
      /* nowDate.getFullYear() +
      "-" +
      (nowDate.getMonth() + 1) +
      "-" + */
      nowDate.getDate() +
      " " +
      nowDate.getHours() +
      ":" +
      nowDate.getMinutes() +
      ":" +
      nowDate.getSeconds();
    return timeStamp;
  }; // fn timeStamp end

  // sendMessage
  const sendMessage = () => {
    const messageObject = {
      roomId: room.id,
      writer: writer,
      message: messageInput,
      //date: formatTimeStamp(),
      enter: "",
      leave: "",
    };

    clientRef.current.publish({
      destination: `/app/message/${room.id}`,
      headers: {},
      body: JSON.stringify(messageObject),
    });
    console.log(messageObject);
    setMessageInput("");
  }; // fn sendMessage end

  const enter = () => {
    clientRef.current.publish({
      destination: `/app/enter/${room.id}`,
      headers: {},
      body: writer,
    });
    //setInputEnabled(true);
  }; // fn end sendMessage

  // disconnect
  /*   const disconnect = () => {
    clientRef.current.publish({
      destination: `/app/leave/${room.id}`,
      headers: {},
      body: writer,
    });

    setTimeout(() => {
      clientRef.current.deactivate();
      setInputEnabled(false);
    }, 1500);
  }; // fn end disconnect */

  return (
    <Fragment>
      <Container>
        <h2>{room.roomName}</h2>
        <div className="content">
          <div className="">
            {messages.map((message, index) => (
              <div key={index}>
                {message.enter && (
                  <div>{message.enter}님이 입장하셨습니다!</div>
                )}
                <div>
                  {message.writer}님의 메세지: {message.message} /{" "}
                  {message.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            //disabled={!inputEnabled}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
        <button onClick={enter}>채팅 참가하기</button>
      </Container>
    </Fragment>
  );
}; // ChatRoom

export default ChatRoom;
