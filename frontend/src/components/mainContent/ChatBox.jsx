import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ChatNav from './ChatNav';
import Chatusers from './Chatusers';
import ChatComponent from './ChatComponent';
import { ChatState } from '../../contexts/ChatContext';

const ChatBox = () => {
  let { user } = ChatState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    if (!users.find(u => u._id === user._id)) {
      setUsers([...users, user]);
    }
  };

  return (
    <Flex direction="column" h="100vh" bg="#242424">
      <Box>{user && <ChatNav user={user} onSelectUser={handleSelectUser} />}</Box>
      <Flex flex="1" overflow="hidden">
        <Box w={{ base: "full", md: "350px" }} bg="#242424" p="0rem 1rem 1rem 1rem" overflowY="auto">
          <Chatusers users={users} onSelectUser={handleSelectUser} />
        </Box>
        <Box flex="1" bg="#242424" p="0.5rem" overflowY="auto" color="white">
          <ChatComponent user={user} selectedUser={selectedUser} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default ChatBox;