import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import socket from "../../services/socketService"; // Adjust path as per your structure

const PendingChats = () => {
  const [pendingChats, setPendingChats] = useState([]); // Pending chats state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // Navigation hook

  // Fetch pending chats grouped by user
  useEffect(() => {
    const fetchPendingChats = async () => {
      try {
        // API call to fetch pending chats
        const response = await axios.get(
          "http://localhost:5000/api/chats/pending"
        );

        console.log("API Response:", response.data); // Debugging
        const filteredChats = response.data.filter(
          (chat) => !chat.receiverId // Filter chats with null receiverId
        );
        console.log("Filtered Chats:", filteredChats); // Debugging
        setPendingChats(filteredChats); // Set filtered chats
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError("Failed to load pending chats.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchPendingChats();

  }, []); // Only runs once when component mounts

  // Accept Chat
  const handleAcceptChat = async (userId) => {
    try {
      // Send Volunteer ID (Assuming Authenticated Volunteer ID)
      await axios.put(`http://localhost:5000/api/chats/accept/${userId}`, {
        volunteerId: volunteerId, // Authenticated volunteer ID
      });
  
      // Emit event to update other volunteers' lists
      socket.emit("chatAccepted", userId);
  
      // Navigate to Chat Room
      navigate(`/volunteer/chat/${userId}`);
    } catch (err) {
      console.error("Error accepting chat:", err);
      alert("Failed to accept chat!");
    }
  };
  

  // Render loading state
  if (loading) return <p>Loading pending chats...</p>;
  // Render error state
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Chats</h2>

      {/* Display pending chats */}
      {pendingChats.length > 0 ? (
        <ul className="space-y-4">
          {pendingChats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => navigate(`/volunteer/chats/${chat._id}`)}
              className="cursor-pointer border p-4 rounded-lg bg-gray-50 shadow-md flex justify-between items-center hover:bg-gray-100"
            >
              <div>
                <p className="font-bold text-lg">User ID: {chat._id}</p>
                <p className="text-gray-600">{chat.message}</p>
                <p className="text-xs text-gray-400">
                  Last Message:{" "}
                  {new Date(chat.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Accept Chat Button */}
              <button
                onClick={() => handleAcceptChat(chat.senderId)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No pending chats.</p>
      )}
    </div>
  );
};

export default PendingChats;
