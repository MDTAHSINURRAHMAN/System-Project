import React, { useState, useEffect } from "react";
import ChatList from "./ChatList";
import ChatInput from "./ChatInput";
import { joinRoom, sendMessage, receiveMessage, disconnectSocket } from "../../services/chatService";

const ChatRoom = ({ roomId, sender }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    joinRoom(roomId); // Join room on load

    // Fetch chat history
    fetch(`/api/chats/${roomId}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error(err));

    // Real-time message listener
    receiveMessage((data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      disconnectSocket(); // Cleanup on unmount
    };
  }, [roomId]);

  const handleSendMessage = (message) => {
    sendMessage(roomId, sender, message);
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender, message, timestamp: new Date() },
    ]);
  };

  return (
    <div>
      <h2>Chat Room</h2>
      <ChatList messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
