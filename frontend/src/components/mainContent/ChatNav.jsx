import React from 'react';
import { Box, Input, Text, Flex } from '@chakra-ui/react';

const ChatNav = ({ selectedUser }) => {
  return (
    <Box bg="#444" p="1rem" borderBottom="1px solid #333">
      <Flex justify="space-between" align="center">
        <Input placeholder="Search users" bg="#333" border="none" color="#fff" />
        {selectedUser && (
          <Box>
            <Text color="#fff">{selectedUser.displayName}</Text>
            <Text color="#aaa" fontSize="sm">{selectedUser.email}</Text>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default ChatNav;
