import React, { useState, useRef } from "react";
import { 
  Avatar, Box, Button, Text, Drawer, DrawerBody, DrawerFooter, DrawerHeader, 
  DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Input, List, 
  ListItem, useToast, Flex, Menu, MenuButton, MenuList, MenuItem, MenuDivider, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, 
  ModalCloseButton 
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../../contexts/ChatContext";

const ChatNav = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const toast = useToast();
  const btnRef = useRef();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);

  const { user, chats, setChats, selectedChat, setSelectedChat } = ChatState();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  const accessChat = async (id) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.post(
        `http://localhost:5000/api/v1/chat/`,
        { userId: id },
        config
      );
      console.log(data);
      if (!chats.find((chat) => chat._id === data._id))
        setChats([...chats, data]);
      setSelectedChat(data);
      setLoading(false);
      onDrawerClose();
    } catch (error) {
      toast({
        title: "Couldn't access chat",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      toast({
        title: 'Search query is empty',
        description: 'Please enter a search query',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user?search=${search}`,
        config
      );
      console.log(data);

      if (data.length !== 0) {
        toast({
          title: 'Search successful',
          description: `${data.length} users found`,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      } else {
        toast({
          title: 'User not found',
          description: "User with the specified name doesn't exist",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }

      setLoading(false);
      setSearchUsers(data);
      setSearch("");
    } catch (error) {
      toast({
        title: 'Search failed',
        description: 'An error occurred while fetching users',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    }
  };

  const clearSearchResults = () => {
    setSearch("");
    setSearchUsers([]);
  };

  return (
    <Box display="flex" justifyContent="space-between" padding="0.5em" alignItems="center" boxShadow="5px 5px 5px rgba(0,0,0,0.4)">
      <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onDrawerOpen}>Search Users/Add users</Button>
      <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="#fff"/>
          <DrawerHeader backgroundColor="#333333" color="white" mb={-3}>Search users</DrawerHeader>
          <DrawerBody backgroundColor="#333333" overflow="hidden">
            <Input
              color="white"
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button mt={3} mb={2} colorScheme="blue" onClick={handleSearch}>Search</Button>
            <Box maxH="80%" overflowY="auto">
              {loading ? (
                <ChatLoading />
              ) : (
                <List spacing={3} mt={1}>
                  {searchUsers.map((user) => (
                    <ListItem
                      key={user._id}
                      display="flex"
                      alignItems="center"
                      p={2}
                      pl={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                      _hover={{ boxShadow: 'md', bg: 'gray.50' }}
                      backgroundColor='#bccfce'
                      cursor="pointer"
                      onClick={() => accessChat(user._id)}
                    >
                      <Avatar name={user.name} src={user.photo} size="md" mr={4} />
                      <Flex direction="column">
                        <Text fontSize="lg" fontWeight="bold" textTransform="capitalize">{user.name}</Text>
                        <Text fontSize="md" color="gray.600">{user.email}</Text>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </DrawerBody>

          <DrawerFooter backgroundColor="#333333">
            <Button variant="outline" mr={3} color="white" onClick={clearSearchResults}>Clear</Button>
            <Button colorScheme="blue" onClick={onDrawerClose}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text display="flex" color='black' fontWeight="bolder" gap="9px" textAlign="center" backgroundColor='#EDF2F7' padding="0.5em" borderRadius="0.3em">
        <img width="30px" src="/logo6-rmg.png" alt="Chattastrophe Logo"/>
        Chattastrophe
      </Text>
      <Box display="flex" gap="1em" justifyContent="space-between" alignItems="center">
        <Menu>
          <MenuButton as={Button}><BellIcon w={8} h={5} /></MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user && (<Avatar name={user.data.name || ""} src={user.data.photo || ""} size="sm" />)}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onModalOpen}>Profile</MenuItem>
            <Modal isOpen={isModalOpen} onClose={onModalClose}>
              <ModalOverlay />
              <ModalContent textAlign="center">
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="1em">
                  <Text fontSize="2xl">{user?.data.email}</Text>
                  <Avatar name={user?.data.name || ""} src={user?.data.photo || ""} size="2xl" />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onModalClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            <MenuDivider />
            <MenuItem onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChatNav;
