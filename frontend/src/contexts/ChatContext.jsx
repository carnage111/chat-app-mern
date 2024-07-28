import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

let ChatContext = createContext();

let ChatProvider = ({ children }) => {
  let [user, setUser] = useState(null);
  let [selectedChat, setSelectedChat] = useState(null);
  let [chats, setChats] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    let storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/", { replace: true });
    } else {
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSelectedChat(null);
    setChats([]);
    navigate("/login", { replace: true }); //here replace: true will replace the current history entry with the new one so that user can't go back to the chat page after logging out
  };

  return (
    <ChatContext.Provider value={{ user, setUser, chats, setChats, selectedChat, setSelectedChat, logout }}>
      {children}
    </ChatContext.Provider>
  );
};

export let ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;