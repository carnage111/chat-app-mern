import React, { useState, useRef, useEffect } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { Box, IconButton, Text, Flex, Input, Button, useToast, Avatar, Spinner } from "@chakra-ui/react";
import { getUser, getuserName } from "../../config/chatLogics";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import ChatLoading from "./ChatLoading";
import axios from "axios";
import dayjs from "dayjs";

const ChatComponent = () => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messageInput = useRef(null);
  const messageEndRef = useRef(null);
  const messageContainerRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      const handleClick = (e) => {
        e.stopPropagation();
      };
      messageContainer.addEventListener('click', handleClick);
      return () => {
        messageContainer.removeEventListener('click', handleClick);
      };
    }
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/v1/message/${selectedChat._id}`, config);
      setMessages(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error fetching messages",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onMessageSubmit = async (e) => {
    e.preventDefault();
    const input = messageInput.current;
    if (!input.value) {
      return;
    }
    setSending(true);
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("http://localhost:5000/api/v1/message", {
        content: input.value,
        chatId: selectedChat._id,
      }, config);
      setMessages((prevMessages) => [...prevMessages, data.data]);
      input.value = "";
      setSending(false);
      setTimeout(() => {
        if (messageInput.current) {
          messageInput.current.focus();
        }
      }, 0);
    } catch (error) {
      setSending(false);
      toast({
        title: "Error sending message",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessage = (message) => {
    const isSentByCurrentUser = message.sender._id === user.data._id;
    return (
      <Box
        key={message._id}
        display="flex"
        flexDirection="column"
        alignItems={isSentByCurrentUser ? "flex-end" : "flex-start"}
        mb="0.5rem"
      >
        <Box
          borderRadius="20px"
          padding="0.2rem 0.5rem"
          backgroundColor={isSentByCurrentUser ? "#0084FF" : "#000"}
          color="#fff"
          maxWidth="80%"
        >
          {message.content}
        </Box>
        <Text fontSize="xs" color="gray.400" p="0.2em 0.5em">
          {dayjs(message.createdAt).format('h:mm A')}
        </Text>
      </Box>
    );
  };

  return (
    <Box minHeight="100%" width="100%" display="flex" flexDirection="column" bg="#1a1a1a">
      {!selectedChat ? (
        <Box display="flex" alignItems="center" justifyContent="center" bg="#333" height="100%">
          <Text fontSize="1em" fontWeight="500" bg="black" p={2} borderRadius="0.5em">
            Select a chat to start messaging...
          </Text>
        </Box>
      ) : (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="#2a2a2a"
            p={2}
            pl={4}
            borderBottom="1px solid #444"
          >
            <Box display="flex" alignItems="center">
              {!selectedChat.isGroupChat ? (
                <Avatar name={getUser(user.data._id, selectedChat.users).name} src={getUser(user.data._id, selectedChat.users).photo} size="sm" mr={3} />
              ) : (
                <Avatar name="default-group-pic" src="/groupchat.png" size="sm" mr={3} />
              )}
              <Text fontSize="1em" fontWeight="bold" color="white">
                {selectedChat.isGroupChat
                  ? selectedChat.chatName.toUpperCase()
                  : getuserName(user.data._id, selectedChat.users).toUpperCase()}
              </Text>
            </Box>
            {selectedChat.isGroupChat ? (
              <IconButton icon={<ViewIcon />} bg="#444" color="white" />
            ) : (
              <ProfileModal user={getUser(user.data._id, selectedChat.users)}>
                <IconButton icon={<ViewIcon />} bg="#444" color="white" />
              </ProfileModal>
            )}
          </Box>
          <Flex
            direction="column"
            p="1rem"
            bg="#1a1a1a"
            borderRadius="10px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
          >
            <Box
              ref={messageContainerRef}
              p="1rem"
              bg="#2a2a2a"
              borderRadius="10px"
              boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
              overflowY="auto"
              mb="1rem"
              height="68vh"
              sx={{
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: '#1a1a1a',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              {loading ? <ChatLoading /> : messages.map(renderMessage)}
              <div ref={messageEndRef} />
            </Box>
            <form onSubmit={onMessageSubmit}>
              <Flex>
                <Input
                  ref={messageInput}
                  color="#fff"
                  placeholder="Type a message..."
                  bg="#3a3a3a"
                  borderColor="#555"
                  _hover={{ borderColor: "#777" }}
                  _focus={{ borderColor: "#999" }}
                  mr="0.5rem"
                  borderRadius="20px"
                  p="1rem"
                  isDisabled={sending}
                />
                <Button
                  type="submit"
                  bg="#0084FF"
                  color="#fff"
                  borderRadius="20px"
                  px="1.5rem"
                  _hover={{ bg: "#006edc" }}
                  isLoading={sending}
                  loadingText="Sending"
                >
                  Send
                </Button>
              </Flex>
            </form>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default ChatComponent;