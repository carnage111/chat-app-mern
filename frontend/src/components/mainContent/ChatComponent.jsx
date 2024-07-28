import React, { useState, useRef } from "react";
import { ChatState } from "../../contexts/ChatContext";
import { Box, IconButton, Text, Flex, Input, Button, useToast, Avatar } from "@chakra-ui/react";
import { getUser, getuserName } from "../../config/chatLogics";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";
import { ChatFeed, Message } from "react-chat-ui";

const users = {
  0: "You",
  Bob: "Bob",
  2: "Timmy",
};

const ChatComponent = () => {
  const { user, selectedChat } = ChatState();
  const [messages, setMessages] = useState([
    new Message({ id: "Bob", message: "Hey guys!", senderName: "Bob" }),
    new Message({
      id: 2,
      message: (
        <span>
          <span>11:50:</span>Hey! Timmy here.
        </span>
      ),
      senderName: "Timmy",
    }),
  ]);
  const [currUser, setCurrUser] = useState(0);
  const messageInput = useRef(null);
  const toast = useToast();

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const input = messageInput.current;
    if (!input.value) {
      return;
    }
    pushMessage(currUser, input.value);
    input.value = "";
  };

  const pushMessage = (recipient, message) => {
    const newMessage = new Message({
      id: recipient,
      message,
      senderName: users[recipient],
    });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
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
            // flex="1"
            p="1rem"
            bg="#1a1a1a"
            borderRadius="10px"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
          >
            <Box
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
              <ChatFeed
                messages={messages}
                showSenderName
                bubblesCentered={false}
                bubbleStyles={{
                  text: {
                    fontSize: 16,
                    color: '#fff',
                  },
                  chatbubble: {
                    borderRadius: 20,
                    padding: "1rem",
                    marginBottom: "0.5rem",
                    backgroundColor: "#0a84ff",
                    color: "#fff",
                  },
                }}
              />
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
                />
                <Button
                  type="submit"
                  bg="#0084FF"
                  color="#fff"
                  borderRadius="20px"
                  px="1.5rem"
                  _hover={{ bg: "#006edc" }}
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