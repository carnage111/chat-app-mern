import React, { useState, useRef, useEffect } from "react";
import {
  Avatar, Box, Button, Text, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, useDisclosure, Input, List, ListItem, useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatNav = ({ user }) => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const btnRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
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
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`http://localhost:5000/api/v1/user?search=${search}`, config);
      console.log(data);
      if(data.length!=0){
        toast({
          title: 'Search successful',
          description: `${data.length} users found`,
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }else{
        toast({
          title: 'User not found',
          description: "User with the specified name doesn't exist",
          status: 'error',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }
      setSearchResults(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast({
        title: 'Search failed',
        description: 'An error occurred while fetching users',
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      padding="1em"
      alignItems="center"
      boxShadow="5px 5px 5px rgba(0,0,0,0.4)"
    >
      <Button leftIcon={<SearchIcon />} ref={btnRef} onClick={onDrawerOpen}>
        Search
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search users</DrawerHeader>
          <DrawerBody>
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button mt={4} colorScheme="blue" onClick={handleSearch}>
              Search
            </Button>
            <List spacing={3} mt={4}>
              {searchResults.map((user) => (
                <ListItem key={user._id} display="flex" alignItems="center">
                  <Avatar name={user.name} src={user.photo} size="sm" mr={2} />
                  <Text>{user.name}</Text>
                </ListItem>
              ))}
            </List>
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={onDrawerClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Text>Chat app</Text>
      <Box
        display="flex"
        gap="1em"
        justifyContent="space-between"
        alignItems="center"
      >
        <Menu>
          <MenuButton as={Button}>
            <BellIcon w={8} h={5} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user && (
              <Avatar
                name={user.data.name || ""}
                src={user.data.photo || ""}
                size="sm"
              />
            )}
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onModalOpen}>Profile</MenuItem>
            <Modal isOpen={isModalOpen} onClose={onModalClose}>
              <ModalOverlay />
              <ModalContent textAlign="center">
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  gap="1em"
                >
                  <Text fontSize="2xl">{user?.data.email}</Text>
                  <Avatar
                    name={user?.data.name || ""}
                    src={user?.data.photo || ""}
                    size="2xl"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                    Close
                  </Button>
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
