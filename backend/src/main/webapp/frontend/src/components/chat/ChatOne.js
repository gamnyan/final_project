import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "@stomp/stompjs";
import ChatContext from "../../Store/Chat-context";
import AuthContext from "../../Store/Auth-context";

import { UserProfile } from "../../components/Layout/MainNavigation";
import { Col, Container } from "react-bootstrap";
import axios from "axios";
import ClubItemNavigation from "../Layout/ClubItemNavigation";

import "../../css/chat.css";

const ChatOne = (props) => {
  let navigate = useNavigate();
  const [chatRoom, setChatRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const chatCtx = useContext(ChatContext);

  const userProfile = UserProfile();
  const writer = userProfile.nickname;
  const clientRef = useRef(null);

  const id = props.roomId;
  const roomId = props.clubId;

  // websocket 연결
  // 채팅 메세지 불러오기
  useEffect(() => {
    setIsLoading(false);
    // 로그인 여부
    let isLogin = authCtx.isLoggedIn;
    /*     isLogin
      ? chatCtx.getOneChatRoom(roomId, authCtx.token)
      : chatCtx.getOneChatRoom(roomId);
    isLogin
      ? chatCtx.getChatMessages(roomId, authCtx.token)
      : chatCtx.getChatMessages(roomId); */

    if (!isLogin) {
      alert("로그인이 필요한 서비스 입니다..");
      navigate(`/login`);
    }

    if (isLogin) {
      axios
        .get(`/chat/room/${roomId}`, {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        })
        .then((res) => {
          if (!res.data.id) {
            alert("클럽에 가입해 주세요");
            navigate("/club/clubpage/1");
          }
          setChatRoom(res.data);
        }); // axios.get end
      axios
        .get(`/chat/room/${roomId}/message`, {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        })
        .then((res) => {
          setMessages(res.data);
        });

      clientRef.current = new Client({
        // localhost로 하면 본인 웹에서만 실시간 채팅 가능
        // 본인의 ip주소로 했을 시 해당 ip로 접속했을 때 채팅 가능
        brokerURL: "ws://localhost:80/ws/chat",
      });

      console.log(clientRef.current);

      // onConnect
      clientRef.current.onConnect = (frame) => {
        clientRef.current.subscribe(`/topic/chat/room/${roomId}`, (message) => {
          const response = JSON.parse(message.body);
          console.log("Response:", response);
          setMessages((prevMessages) => [...prevMessages, response]);
        });
      }; // onConnect end

      clientRef.current.onWebSocketError = (error) => {
        console.error("Error with websocket", error);
      }; // onWebSocketError end

      clientRef.current.onStompError = (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      };

      setIsLoading(true);

      clientRef.current.activate();
      return () => {
        clientRef.current.deactivate(); // 열리는 중이면 닫기 전까지 잠시 기다려줌.
      }; // activate end
    } // if end
  }, []);

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

  const keyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  // 메세지 보내기
  const sendMessage = () => {
    const messageObject = {
      roomId: roomId,
      writer: writer,
      message: messageInput,
      //date: formatTimeStamp(),
      enter: "",
      leave: "",
    };

    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: `/app/message/${roomId}`,
        headers: {},
        body: JSON.stringify(messageObject),
      });
      setMessageInput("");
    } else {
      console.error("Websocket is not connected.");
    }
  }; // fn sendMessage end

  // 채팅 입장
  const enter = () => {
    clientRef.current.publish({
      destination: `/app/enter/${roomId}`,
      headers: {},
      body: writer,
    });
    //setInputEnabled(true);
  }; // fn end enter

  let content = <p>Loading</p>;

  return (
    <Fragment>
      <Col xs={12}>
        <ClubItemNavigation clubId={props.clubId} />
        <h2>{chatRoom && chatRoom.roomName}</h2>
        <div className="content">
          <Container>
            <div className="message-container">
              {messages &&
                messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.enter ? "enter-message" : "regular-message"
                    }
                  >
                    {message.enter && (
                      <div className="enter-message">
                        {message.enter}님이 입장하셨습니다!
                      </div>
                    )}
                    <div>
                      <span className="message-sender">{message.writer}:</span>{" "}
                      {message.message} / {message.date}
                    </div>
                  </div>
                ))}
            </div>
          </Container>
        </div>

        <div className="input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => keyPress(e)}
            //disabled={!inputEnabled}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </Col>
    </Fragment>
  );
}; // ChatOne

export default ChatOne;
