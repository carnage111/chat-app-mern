import { Box } from '@chakra-ui/react'
import React from 'react'
import ChatComponent from './ChatComponent'

const ChatWindow = () => {
  return (
    <Box 
      display="flex" 
      justifyContent="center"
      alignItems="center"
      minHeight="100%"
      boxShadow="0 5px 5px 5px rgba(0,0,0,0.4)"
      padding="1em"
      width="100%"
      bg="#333"
      borderRadius="0.5em"
    >
      <ChatComponent />
    </Box>
  )
}

export default ChatWindow;