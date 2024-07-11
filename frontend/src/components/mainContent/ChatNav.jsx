import React, { useRef } from "react";
import {Avatar,Box,Button,Text,Drawer,DrawerBody,DrawerFooter,DrawerHeader,DrawerOverlay,DrawerContent,DrawerCloseButton,useDisclosure,Input,} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Menu,MenuButton,MenuList,MenuItem,MenuDivider,} from "@chakra-ui/react";
import { Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ChatNav = ({ user }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const btnRef = useRef();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
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
            <Input placeholder="Type here..." />
          </DrawerBody>
          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
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