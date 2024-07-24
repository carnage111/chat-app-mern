import React from "react";
import { ChatState } from "../../contexts/ChatContext";
import { Box, IconButton, Text } from "@chakra-ui/react";
import { getUser, getuserName } from "../../config/chatLogics";
import { ViewIcon } from "@chakra-ui/icons";
import ProfileModal from "./ProfileModal";

const SingleChat = () => {
  let { user, selectedChat, setSelectedChat } = ChatState();
  console.log("selectedChat", selectedChat);
  return (
    <>
      {!selectedChat ? (
        <Box >
          <Text fontSize="1em" fontWeight="500" bg="black" p={1} borderRadius="2em">Select a chat to start messaging</Text>
        </Box>
      ) : (
          <>
        {
            selectedChat.isGroupChat?(
                <Box display="flex" justifyContent="space-between" p={3}  borderColor="gray.200" alignItems="center">
                    <Text fontSize="1em" fontWeight="500">{selectedChat.chatName.toUpperCase()}</Text>
                    <IconButton icon={<ViewIcon/>}/>
                </Box>
            ):(
              <Box display="flex" justifyContent="space-between" p={3}  borderColor="gray.200" alignItems={"center"}>
                <Text fontSize="1em" fontWeight="500">{getuserName(user.data._id, selectedChat.users).toUpperCase()}</Text>
                <ProfileModal user={getUser(user.data._id, selectedChat.users)} >
                  <IconButton icon={<ViewIcon/>}/>
                </ProfileModal>
              </Box>  
            )
        }
        </>
      )
      }
    </>
  );
};

export default SingleChat;