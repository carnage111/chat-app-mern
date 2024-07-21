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
      navigate("/login", { replace: true });
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setSelectedChat(null);
    setChats([]);
    navigate("/login", { replace: true });
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