import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";

// Connect to Socket Server
const socket = io("http://localhost:5000");

const Chat = () => {
  const { roomId } = useParams(); // Get Room ID from URL
  const [messages, setMessages] = useState([]); // Store Messages
  const [input, setInput] = useState(""); // Input Message
  const [sender, setSender] = useState("Volunteer"); // Dummy Sender

  // Join Room on Mount
  useEffect(() => {
    socket.emit("joinRoom", { roomId });

    // Listen for Incoming Messages
    socket.on("chatMessage", (data) => {
      console.log("New Message:", data);
      setMessages((prevMessages) => [...prevMessages, data]); // Append Messages
    });

    return () => {
      socket.disconnect(); // Cleanup when leaving
    };
  }, [roomId]);

  // Handle Send Message
  const sendMessage = () => {
    if (input.trim()) {
      const messageData = { roomId, sender, message: input };
      socket.emit("chatMessage", messageData); // Send message to server
      setMessages((prev) => [...prev, messageData]); // Update state locally
      setInput(""); // Clear input field
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      {/* Chat Header */}
      <h2 className="text-xl font-bold mb-4">Chat Room: {roomId}</h2>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4 bg-white shadow-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg mb-2 ${
              msg.sender === sender
                ? "bg-green-200 text-right"
                : "bg-blue-200 text-left"
            }`}
          >
            <p className="font-bold">{msg.sender}</p>
            <p>{msg.message}</p>
            <span className="text-xs text-gray-500">
              {new Date().toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {/* Chat Input */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
