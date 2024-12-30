import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { auth } from "../firebase.config"; // Import Firebase Auth
import { onAuthStateChanged } from "firebase/auth";

const socket = io("http://localhost:5000"); // Connect to the server

const UserChat = () => {
  const [message, setMessage] = useState(""); // Input message
  const [messages, setMessages] = useState([]); // List of messages
  const [roomId, setRoomId] = useState(""); // Room ID (unique for the user)
  const [volunteerId, setVolunteerId] = useState(null); // Assigned volunteer ID
  const [loading, setLoading] = useState(true); // Loading state
  const [user, setUser] = useState(null); // Store authenticated user

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setRoomId(`room-${currentUser.uid}`); // Set Room ID
      }
      setLoading(false); // Stop loading after auth check
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Fetch Messages and Listen for Updates
  useEffect(() => {
    if (!roomId) return; // Prevent fetching without roomId

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/${roomId}` // Fetch messages for specific room
        );
        setMessages(response.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      if (data.roomId === roomId) {
        // Add new messages only for this room
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => socket.off("receiveMessage"); // Cleanup socket
  }, [roomId]);

  // Send Message
  const sendMessage = async () => {
    if (!message.trim()) return; // Prevent empty messages
  
    const newMessage = {
      senderId: user.uid, // Ensure this is dynamically set from Firebase auth
      receiverId: volunteerId || null, // Initially null, assigned later
      roomId, // Use the generated roomId
      message,
    };
  
    try {
      // Send the message via API
      await axios.post("http://localhost:5000/api/chats", newMessage);
  
      // **ADD THIS LINE** - Update local state immediately
      setMessages((prev) => [...prev, newMessage]);
  
      // Emit the message to other clients
      socket.emit("sendMessage", newMessage);
  
      // Clear input field
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };
  

  // **Show Loading Spinner**
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C52546]"></div>
      </div>
    );
  }

  // **Show Auth Error if User Not Logged In**
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">Please log in to access chat.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="mb-3">
              <p
                className={`p-2 rounded-md ${
                  msg.senderId === user.uid
                    ? "bg-blue-500 text-white ml-auto w-max"
                    : "bg-gray-300 text-black mr-auto w-max"
                }`}
              >
                <strong>
                  {msg.senderId === user.uid ? "You" : "Volunteer"}:
                </strong>{" "}
                {msg.message}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered w-full p-2"
        />
        <button onClick={sendMessage} className="btn bg-blue-500 text-white">
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChat;
