import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const UserList = ({ user, handleFunction }) => {
  return (
    <Box
      key={user._id}
      display="flex"
      alignItems="center"
      p={2}
      pl={3}
      gap={1}
      m="1"
      mb={2}
      bg="white"
      borderRadius="md"
      boxShadow="sm"
      _hover={{ boxShadow: 'md', bg: 'gray.50' }}
      backgroundColor='#bccfce'
      cursor="pointer"
      onClick={handleFunction}
    >
      <Avatar name={user.name} src={user.photo} size="md" mr={4} />
      <Flex direction="column">
        <Text fontSize="lg" fontWeight="bold" textTransform="capitalize">{user.name}</Text>
        <Text fontSize="md" color="gray.600">{user.email}</Text>
      </Flex>
    </Box>
  );
};

export default UserList;