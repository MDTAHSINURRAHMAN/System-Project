import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../services/socketService"; // Import socket connection

const VolunteerChatroom = () => {
  const [acceptedChats, setAcceptedChats] = useState([]); // Accepted users
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); // Error handling
  const navigate = useNavigate(); // For navigating to chat

  // Fetch Accepted Users
  useEffect(() => {
    const fetchAcceptedChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chats/accepted"
        );
        console.log("Accepted Chats:", response.data); // Debugging
        setAcceptedChats(response.data); // Set data
      } catch (err) {
        console.error("Error fetching accepted chats:", err);
        setError("Failed to load accepted chats.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedChats();

    // Listen for new messages via socket
    socket.on("newMessage", (message) => {
      setAcceptedChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === message.roomId
            ? { ...chat, latestMessage: message.message } // Update latest message
            : chat
        )
      );
    });

    return () => socket.off("newMessage"); // Cleanup listener
  }, []);

  // Render Loading State
  if (loading) return <p>Loading accepted chats...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Accepted Chats</h2>

      {/* Display Accepted Users */}
      {acceptedChats.length > 0 ? (
        <ul className="space-y-4">
          {acceptedChats.map((chat) => (
            <li
              key={chat._id}
              className="cursor-pointer border p-4 rounded-lg bg-gray-50 shadow-md flex justify-between items-center hover:bg-gray-100"
              onClick={() => navigate(`/volunteer/chat/${chat._id}`)} // Navigate to chat page
            >
              <div>
                <p className="font-bold text-lg">User ID: {chat._id}</p>
                <p className="text-gray-600">{chat.latestMessage || "No messages yet."}</p>
                <p className="text-xs text-gray-400">
                  Last Message: {new Date(chat.latestTimestamp).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No accepted chats.</p>
      )}
    </div>
  );
};

export default VolunteerChatroom;
