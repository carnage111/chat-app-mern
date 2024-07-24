import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, Avatar, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { getuserName } from "../../config/chatLogics.js";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import GroupChatCreateModal from "./GroupChatCreateModal.jsx";

const Chatusers = () => {
  let toast = useToast();
  let [loggedUser, setLoggedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const fetchChats = async () => {
    try {
      setLoading(true)
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get("http://localhost:5000/api/v1/chat", config);
      // console.log(data);
      if (data.length === 0) {
        toast({
          title: "No chats present, start a new chat!",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setChats(data);
    } catch (error) {
      toast({
        title: "Couldn't fetch chats",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchChats();
    }
  }, [user]);
  
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setLoggedUser(user);
  }, [user]);

  return (
    <Box
      width="100%"
      height="100%"
      boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)"
      padding="1em"
      borderRadius="0.5em"
      bg="#333"
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text size="lg" fontWeight="bold" color="#fff">
          My Chats
        </Text>
        <GroupChatCreateModal>
          <Button iconSpacing="2" rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatCreateModal>
      </Box>
      <Box
        maxH="90%"
        mt={4}
        overflowY="auto"
        sx={{
          overflowY: 'auto',
          scrollbarWidth: 'thin',
          scrollbarColor: '#000 #333',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#333',
            borderRadius: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#000',
            borderRadius: '10px',
            border: '2px solid #333',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
        }}
      >
        {loading ? (
          <ChatLoading />
        ) : (
          <Stack display="flex" flexDirection="column" gap="0.1em">
            {chats.map((chat) => {
              const chatUser = chat.users.find(
                (user) => user._id !== loggedUser?.data._id
              );
              return (
                <Flex
                  key={chat._id}
                  mb="1em"
                  borderRadius="0.5em"
                  padding="0.5em"
                  backgroundColor={selectedChat?._id === chat._id ? "black" : "transparent"}
                  color={selectedChat?._id === chat._id ? "white" : "white"}
                  fontWeight="bold"
                  cursor="pointer"
                  alignItems="center"
                  onClick={() => setSelectedChat(chat)}
                  _hover={{ backgroundColor: "black" , transition: "0s"}}
                >
                  {!chat.isGroupChat && (
                    <Avatar name={chatUser?.name} src={chatUser?.photo} size="md" mr={4} />
                  )}
                  <Text fontWeight="bold">
                    {chat.isGroupChat ? chat.chatName : getuserName(loggedUser?.data._id, chat.users)}
                  </Text>
                </Flex>
              );  
            })}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Chatusers;