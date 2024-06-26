import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import ChatNav from './ChatNav';
import Chatusers from './Chatusers';
import Chat from './Chat';

const ChatBox = () => {
  const [users] = useState([
    { id: "1", name: 'Bob', avatar: 'https://bit.ly/ryan-florence', displayName: 'User 1', email: 'bob@example.com' },
    { id: "2", name: 'Timmy', avatar: 'https://bit.ly/dan-abramov', displayName: 'User 2', email: 'timmy@example.com' },
    // Add more users as needed
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <Flex direction="column" h="100vh" bg="#242424">
      <Box>
        <ChatNav selectedUser={selectedUser} />
      </Box>
      <Flex flex="1" overflow="hidden">
        <Box
          w={{ base: "full", md: "300px" }}
          borderRight="1px solid #444"
          bg="#333"
          p="1rem"
          overflowY="auto"
        >
          <Chatusers users={users} onSelectUser={handleSelectUser} />
        </Box>
        <Box flex="1" bg="#242424" p="1rem" overflowY="auto">
          <Chat selectedUser={selectedUser} />
        </Box>
      </Flex>
    </Flex>
  );
}

export default ChatBox;
