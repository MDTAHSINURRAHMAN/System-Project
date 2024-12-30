import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config"; // Firebase auth for volunteer info
import { onAuthStateChanged } from "firebase/auth";
import socket from "../../services/socketService"; // Import socket service

const PendingChatDetails = () => {
  const { userId } = useParams(); // Get user ID from route params
  const [messages, setMessages] = useState([]); // User messages
  const [loading, setLoading] = useState(true); // Page loading state
  const [accepting, setAccepting] = useState(false); // Accept button loading
  const [error, setError] = useState(""); // Error state
  const [volunteerId, setVolunteerId] = useState(null); // Volunteer ID
  const navigate = useNavigate(); // For navigation

  // 1. Check Authentication and Set Volunteer ID
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setVolunteerId(currentUser.uid); // Set volunteer UID
      } else {
        navigate("/volunteer-login"); // Redirect if not logged in
      }
      setLoading(false); // Stop loading
    });
    return () => unsubscribe(); // Cleanup listener
  }, [navigate]);

  // 2. Fetch Messages for the Specific User
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chats/messages/${userId}`
        );
        setMessages(response.data); // Store messages
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchMessages();

    // 3. Listen for Real-Time Message Updates
    socket.on("receiveMessage", (newMessage) => {
      if (newMessage.senderId === userId || newMessage.receiverId === userId) {
        setMessages((prev) => [...prev, newMessage]); // Add new message dynamically
      }
    });

    return () => socket.off("receiveMessage"); // Cleanup socket listener
  }, [userId]);

  // 4. Accept Chat Function
  const handleAcceptChat = async () => {
    if (!volunteerId) {
      alert("Volunteer ID is missing! Please try again.");
      return;
    }

    setAccepting(true); // Start loading
    try {
      // Accept the chat via API
      await axios.put(`http://localhost:5000/api/chats/accept/${userId}`, {
        volunteerId,
      });

      // Emit event to remove pending chat for others
      socket.emit("chatAccepted", userId);

      alert("Chat accepted successfully!");
      navigate(`/volunteer/chat/${userId}`); // Redirect to chat room
    } catch (err) {
      console.error("Error accepting chat:", err);
      alert("Failed to accept chat!");
    } finally {
      setAccepting(false); // Stop loading
    }
  };

  // 5. Render Loading or Error State
  if (loading) return <p>Loading messages...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  // 6. Render Chat Messages
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Messages from User</h2>

      {/* Messages List */}
      <div className="overflow-y-auto max-h-[400px] border p-4 rounded-lg bg-gray-50">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-md mb-3 ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white ml-auto w-max" // User Message
                  : "bg-gray-300 text-black mr-auto w-max" // Volunteer Message
              }`}
            >
              <p>{msg.message}</p>
              <span className="text-xs text-gray-400">
                {new Date(msg.createdAt).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages found.</p>
        )}
      </div>

      {/* Accept Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={handleAcceptChat}
          disabled={accepting} // Disable when loading
          className={`px-6 py-2 rounded-md ${
            accepting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {accepting ? "Accepting..." : "Accept Chat"}
        </button>
      </div>
    </div>
  );
};

export default PendingChatDetails;
