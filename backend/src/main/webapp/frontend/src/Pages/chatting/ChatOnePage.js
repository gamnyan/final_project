import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import ChatOne from "../../components/chat/ChatOne";
import { ChatContextProvider } from "../../Store/Chat-context";

const ChatOnePage = () => {
  let { roomId, clubId } = useParams();

  return (
    <Fragment>
      <ChatContextProvider>
        <ChatOne roomId={roomId} clubId={clubId} />
      </ChatContextProvider>
    </Fragment>
  );
}; // ChatOnePage

export default ChatOnePage;
