import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { Avatar, Wrap, WrapItem } from '@chakra-ui/react';

const Chatusers = ({ users, onSelectUser }) => {
  return (
    <Box>
      {users.map((user) => (
        <Flex
          key={user.id}
          alignItems="center"
          mb="1rem"
          bg="#444"
          p="0.5rem"
          borderRadius="5px"
          color="#f0f0f0"
          cursor="pointer"
          onClick={() => onSelectUser(user)}
        >
          <Wrap>
            <WrapItem>
              <Avatar size='sm' name={user.name} src={user.avatar} mr="0.5rem" />
            </WrapItem>
          </Wrap>
          <Text>{user.displayName}</Text>
        </Flex>
      ))}
    </Box>
  );
}

export default Chatusers;
