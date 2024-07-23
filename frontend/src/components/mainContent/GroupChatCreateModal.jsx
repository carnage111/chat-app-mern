import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, FormControl, Input, useToast, Box, Spinner, flexbox } from "@chakra-ui/react";
import { useState } from "react";
import { ChatState } from "../../contexts/ChatContext";
import UserList from "./UserList";
import axios from "axios";
import UserBadge from "./UserBadge";

const GroupChatCreateModal = ({ children }) => {
  let [groupName, setGroupName] = useState("");
  let [selectedUsers, setSelectedUsers] = useState([]);
  let [searchUsers, setSearchUsers] = useState([]);
  let [search, setSearch] = useState("");
  let [loading, setLoading] = useState(false);
  let { user, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  let handleDelete = (id) => {
    let newUsers = selectedUsers.filter((user) => user._id !== id);
    setSelectedUsers(newUsers);
  };

  let fetchUsers = async (search) => {
    setSearch(search);
    if (!search) {
      return;
    }
    try {
      setLoading(true);
      let config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      let { data } = await axios.get(
        `http://localhost:5000/api/v1/user?search=${search}`,
        config
      );
      setLoading(false);
      setSearchUsers(data);
    } catch (error) {
      toast({
        title: "Couldn't fetch users",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length < 2) {
      toast({
        title: "Please fill all fields and select at least 2 users",
        status: "warning",
        duration: 5000,
        isClosable: true,
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
      let { data } = await axios.post(
        "http://localhost:5000/api/v1/chat/group",
        {
          chatName: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      console.log(JSON.stringify(selectedUsers));
      setChats([data, ...chats]);
      setSearch("")
      setSelectedUsers([])
      setGroupName("")
      onClose();
      toast({
        title: "Group Chat Created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Failed to Create Group Chat",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} justifyContent={'space-around'} alignItems={'center'}>
            Create Group Chat
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateGroup}
              isLoading={loading}
            >
              Create Group
            </Button>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Enter Group Name"
                mb={3}
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Search users eg: John,Tony"
                mb={3}
                value={search}
                onChange={(e) => fetchUsers(e.target.value)}
              />
            </FormControl>
            <Box display={"flex"} flexWrap="wrap">
              {selectedUsers.map((user) => (
                <UserBadge
                  key={user._id}
                  user={user}
                  handleFunction={() => handleDelete(user._id)}
                />
              ))}
            </Box>

            {loading ? (
              <Spinner />
            ) : (
              searchUsers.length > 0 && (
                <Box>
                  {searchUsers.map((user) => (
                    <UserList
                      key={user._id}
                      user={user}
                      handleFunction={() =>
                        setSelectedUsers((prev) => [...prev, user])
                      }
                    />
                  ))}
                </Box>
              )
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatCreateModal