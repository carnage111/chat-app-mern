import React, { useState, useRef } from "react";
import { ChatFeed, Message } from "react-chat-ui";
import {
  Box,
  Flex,
  Input,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

const users = {
  0: "You",
  Bob: "Bob",
  2: "Timmy"
};

const Chat = () => {
  const [messages, setMessages] = useState([
    new Message({ id: "Bob", message: "Hey guys!", senderName: "Bob" }),
    new Message({
      id: 2,
      message: (
        <span>
          <span>11:50:</span>Hey! TImmy here.
        </span>
      ),
      senderName: "Timmy"
    })
  ]);
  const [currUser, setCurrUser] = useState(0);
  const messageInput = useRef(null);
  const bg = useColorModeValue("#f0f0f0", "#242424");
  const chatBg = useColorModeValue("#fff", "#333");
  const inputBg = useColorModeValue("#fff", "#444");
  const borderColor = useColorModeValue("#ddd", "#555");
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
      senderName: users[recipient]
    });
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <Flex
      direction="column"
      h="85vh"
      p="1rem"
      bg={bg}
      borderRadius="10px"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
    >
      <Box
        flex="1"
        p="1rem"
        bg={chatBg}
        borderRadius="10px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        overflowY="auto"
        mb="1rem"
      >
        <ChatFeed
          messages={messages}
          showSenderName
          bubblesCentered={false}
          bubbleStyles={{
            text: {
              fontSize: 16
            },
            chatbubble: {
              borderRadius: 20,
              padding: "1rem",
              marginBottom: "0.5rem",
              backgroundColor: useColorModeValue("#0084FF", "#0a84ff"),
              color: "#fff"
            }
          }}
        />
      </Box>
      <form onSubmit={onMessageSubmit}>
        <Flex>
          <Input
            ref={messageInput}
            placeholder="Type a message..."
            bg={inputBg}
            borderColor={borderColor}
            _hover={{ borderColor: "#bbb" }}
            _focus={{ borderColor: "#888" }}
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
  );
};

export default Chat;
