import React, { useEffect, useState } from "react";
import {
  Chat as StreamChat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat as StreamChatClient } from "stream-chat";
import "stream-chat-react/dist/css/index.css";

const apiKey = import.meta.env.VITE_STREAM_CHAT_API_KEY;
const user = {
  id: import.meta.env.VITE_STREAM_CHAT_USERID,
  name: import.meta.env.VITE_STREAM_CHAT_USERNAME,
  image: import.meta.env.VITE_STREAM_CHAT_USER_IMAGE,
};

const chatClient = StreamChatClient.getInstance(apiKey);

const ChatComponent = () => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const connectUser = async () => {
      await chatClient.connectUser(user, chatClient.devToken(user.id));
      const newChannel = chatClient.channel("messaging", "channel-id", {
        name: "Chat App",
        members: [user.id],
      });
      await newChannel.watch();
      setChannel(newChannel);
    };

    connectUser();

    return () => {
      chatClient.disconnectUser();
    };
  }, []);

  if (!channel) return <div>Loading...</div>;

  return (
    <StreamChat client={chatClient} theme="messaging light">
      <Channel channel={channel}>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </StreamChat>
  );
};

export default ChatComponent;