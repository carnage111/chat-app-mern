import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import 'stream-chat-react/dist/css/index.css';
import { Channel } from 'stream-chat-react';
import { ChatState } from '../../contexts/ChatContext';
import ChatNav from './ChatNav'; // Assuming this is the correct path to ChatNav

const ChatComponent = () => {
  const { user } = ChatState();
  const [channel, setChannel] = useState(null);
  const [client, setClient] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null); // State to store selected user

  useEffect(() => {
    if (user) {
      const initializeChat = async () => {
        try {
          const client = new StreamChat('<YOUR_STREAM_API_KEY>'); // Replace with your Stream API key
          await client.connectUser(
            {
              id: user.data.id,
              name: user.data.name,
              image: user.data.avatar,
            },
            user.token
          );
          setClient(client);
        } catch (error) {
          console.error('Error connecting to Stream Chat:', error);
        }
      };

      initializeChat();
    }
  }, [user]);

  const createChannel = async () => {
    if (client && selectedUser) {
      try {
        if (!client.isConnected) {
          await client.connectUser(
            {
              id: user.data.id,
              name: user.data.name,
              image: user.data.avatar,
            },
            user.token
          );
        }

        const channel = client.channel('messaging', {
          members: [user.data.id, selectedUser.id],
        });
        setChannel(channel);
      } catch (error) {
        console.error('Error creating channel:', error);
      }
    }
  };

  useEffect(() => {
    createChannel();
  }, [client, selectedUser]);

  // Function to handle user selection
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <ChatNav user={user} handleSelectUser={handleSelectUser} />
      {channel ? (
        <Channel channel={channel}>
          {/* Add components for displaying messages, input form, etc. */}
        </Channel>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ChatComponent;