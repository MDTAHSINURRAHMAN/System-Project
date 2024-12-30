import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import socket from "../../services/socketService"; // Import socket service
import { auth } from "../../firebase.config"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth";

const VolunteerSpecificChatRoom = () => {
  const { userId } = useParams(); // Get user ID from URL
  const [messages, setMessages] = useState([]); // Store messages
  const [message, setMessage] = useState(""); // New message input
  const [volunteer, setVolunteer] = useState(null); // Volunteer details
  const [loading, setLoading] = useState(true); // Loading state

  const cleanUserId = userId.replace("room-", ""); // Extract clean user ID

  // Fetch Volunteer Authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setVolunteer(currentUser); // Set volunteer
      }
      setLoading(false); // End loading
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  // Fetch Chat Messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!volunteer || !volunteer.uid) return; // Wait for volunteer UID

      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/chat/${cleanUserId}/${volunteer.uid}`
        );
        console.log("Fetched Messages:", response.data); // Debugging
        setMessages(response.data); // Set all messages in state
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();

    // Listen for incoming messages
    socket.on("receiveMessage", (data) => {
      if (
        (data.senderId === cleanUserId && data.receiverId === volunteer.uid) ||
        (data.senderId === volunteer.uid && data.receiverId === cleanUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, data]); // Append new messages instantly
      }
    });

    return () => socket.off("receiveMessage"); // Cleanup
  }, [cleanUserId, volunteer]); // Dependency on userId and volunteer

  // Send Message
  const sendMessage = async () => {
    if (!message.trim()) return; // Avoid empty messages

    const newMessage = {
      senderId: volunteer.uid, // Volunteer ID
      receiverId: cleanUserId, // User ID
      roomId: `room-${cleanUserId}`, // Room ID
      message, // Message content
    };

    // Add message locally for instant update
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        ...newMessage,
        createdAt: new Date().toISOString(), // Add timestamp immediately
      },
    ]);

    try {
      // Save message to database
      await axios.post("http://localhost:5000/api/chats", newMessage);

      // Emit message via socket
      socket.emit("sendMessage", newMessage);

      // Clear input field
      setMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Show Loading Spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#C52546]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <h2 className="text-2xl font-bold p-4 bg-gray-800 text-white">
        Chat with User
      </h2>

      {/* Chat Messages */}
      <div className="overflow-y-auto h-[500px] bg-gray-100 p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md mb-3 ${
                msg.senderId === cleanUserId
                  ? "bg-blue-500 text-white ml-auto w-max" // Messages by user
                  : "bg-gray-300 text-black mr-auto w-max" // Messages by volunteer
              }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No messages yet.</p>
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
        <button
          onClick={sendMessage}
          className="btn bg-blue-500 text-white px-4 py-2"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default VolunteerSpecificChatRoom;
