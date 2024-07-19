import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, Avatar, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { getuserName } from "../../config/chatLogics.js";

const Chatusers = () => {
  let [loggedUser, setLoggedUser] = useState(null);
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)"
      padding="1em"
      borderRadius="0.5em"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text size="lg" fontWeight="bold" color="#fff">
          My Chats
        </Text>
        <Button iconSpacing="2" rightIcon={<AddIcon />}>
          New Group Chat
        </Button>
      </Box>
      <Box>
        <Stack display="flex" flexDirection="column" gap="0.1em">
          {chats.map((chat) => {
            const chatUser = chat.users.find(
              (user) => user._id !== loggedUser?.data._id
            );
            return (
              <Flex
                key={chat._id}
                marginTop="1em"
                borderRadius="0.5em"
                padding="0.7em"
                backgroundColor="teal"
                color="white"
                fontWeight="bold"
                _hover={{ backgroundColor: "#ddd" }}
                cursor="pointer"
                alignItems="center"
              >
                {!chat.isGroupChat && (
                  <Avatar name={chatUser?.name} src={chatUser?.photo} size="md" mr={4} />
                )}
                <Text fontWeight="bold">
                  {chat.isGroupChat
                    ? chat.chatName
                    : getuserName(loggedUser?.data._id, chat.users)}
                </Text>
              </Flex>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
};

export default Chatusers;
