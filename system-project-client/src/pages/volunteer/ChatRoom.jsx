import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to server

const ChatRoom = () => {
  const { roomId } = useParams(); // Get roomId from route
  const [messages, setMessages] = useState([]); // Messages state
  const [message, setMessage] = useState(""); // Current message state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/${roomId}`
        );
        setMessages(response.data.messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load chat!");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();

    // Join Socket Room
    socket.emit("joinRoom", { roomId });

    // Listen for Incoming Messages
    socket.on("chatMessage", (data) => {
      setMessages((prev) => [...prev, data]); // Append new messages
    });

    return () => {
      socket.disconnect(); // Clean up socket connection
    };
  }, [roomId]);

  // Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      sender: "volunteer", // Change sender dynamically based on user
      content: message,
    };

    // Emit Socket Message
    socket.emit("chatMessage", { roomId, ...newMessage });

    // Save Message to DB
    await axios.post("http://localhost:5000/api/chats/message", {
      chatId: roomId,
      sender: "volunteer", // Change as needed
      message,
    });

    setMessages((prev) => [...prev, newMessage]);
    setMessage(""); // Clear input
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Chat Room</h2>

      {loading && <p>Loading messages...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Chat Messages */}
      <div className="border p-4 h-80 overflow-y-auto mb-4 bg-white shadow-lg rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === "volunteer"
                ? "bg-blue-200 text-right"
                : "bg-gray-200"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        ))}
      </div>

      {/* Send Message */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
