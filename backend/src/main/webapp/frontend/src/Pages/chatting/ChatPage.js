import React, { Fragment, useRef, useState, useEffect } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChatPage = () => {
  const storedToken = localStorage.getItem("token");
  const [roomName, setRoomName] = useState("");
  const changeRoomName = useRef("");
  const [chatRoomList, setChatRoomList] = useState([]);

  useEffect(() => {
    axios
      .get("/chat/room", {
        headers: {
          Authorization: "Bearer " + storedToken,
        },
      })
      .then((res) => {
        setChatRoomList(res.data);
        console.log(chatRoomList);
      });
  }, []);

  const handleRoomNameChange = (e) => {
    changeRoomName.current = e.target.value;
  }; // handleRoomNameChange

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setRoomName(changeRoomName.current);
    }
  }; // handleKeyDown

  const sendRoomName = () => {
    setRoomName(changeRoomName.current);
    axios
      .post(
        "chat/room",
        {
          roomName: changeRoomName.current,
        },
        {
          headers: {
            Authorization: "Bearer " + storedToken,
          },
        }
      )
      .then(
        axios
          .get("/chat/room", {
            headers: {
              Authorization: "Bearer " + storedToken,
            },
          })
          .then((res) => {
            setChatRoomList(res.data);
          })
      );
  }; // sendRoomName

  return (
    <Fragment>
      <Container>
        <h2>Create ChatRoom</h2>
        <input
          type="text"
          ref={changeRoomName}
          onKeyDown={handleKeyDown}
          onChange={handleRoomNameChange}
        />
        <button onClick={sendRoomName}>send</button>

        <div>
          <ul>
            {chatRoomList.map((chatRoom, i) => {
              return (
                <li key={i}>
                  <Link to={`/chat/room/${chatRoom.id}`}>
                    {chatRoom.roomName}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </Fragment>
  );
};

export default ChatPage;
