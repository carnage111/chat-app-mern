import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { getuserName } from "../../config/chatLogics.js";

const Chatusers = () => {
  let [loggedUser,setLoggedUser]=useState(null)
  const { chats, setChats, selectedChat, setSelectedChat } = ChatState();

  useEffect(() => {
      let user = JSON.parse(localStorage.getItem("user"));
      setLoggedUser(user);
    }, []);
    // setLoggedUser(JSON.parse(localStorage.getItem("user")));


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
          {
            chats.map((chat) => {
              return (
                <Box
                  key={chat._id}
                  marginTop="1em"
                  borderRadius="0.5em"
                  padding="1em"
                  backgroundColor="teal"
                  color="white"
                  fontWeight="bold"
                  _hover={{ backgroundColor: "#ddd" }}
                  cursor="pointer"
                >
                  <Text fontWeight="bold">{chat.isGroupChat?chat.chatName:getuserName(loggedUser.data._id,chat.users)}</Text>
                </Box>
              );
            })
          }
        </Stack>
      </Box>
    </Box>
  );
};

export default Chatusers;