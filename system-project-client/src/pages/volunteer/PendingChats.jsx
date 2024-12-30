import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PendingChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Pending Chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chats/pending"
        );
        setChats(response.data);
      } catch (err) {
        console.error("Error fetching chats:", err);
        setError("Failed to fetch chats!");
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, []);

  // Handle Accept Chat
  const handleAccept = async (chatId) => {
    try {
      const volunteerId = "volunteerObjectId"; // Replace with actual volunteer ID
      await axios.put("http://localhost:5000/api/chats/accept", {
        chatId,
        volunteerId,
      });
      alert("Chat Accepted!");
      navigate(`/volunteer/chat/${chatId}`); // Redirect to chat page
    } catch (err) {
      console.error("Error accepting chat:", err);
      alert("Failed to accept chat!");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Pending Chat Requests</h2>

      {loading && <p>Loading chats...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && chats.length > 0 && (
        <ul className="space-y-4">
          {chats.map((chat) => (
            <li
              key={chat._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
            >
              <div>
                <p className="text-lg font-bold">{chat.userId.name}</p>
                <p className="text-sm text-gray-500">{chat.messages[0].content}</p>
              </div>
              <button
                onClick={() => handleAccept(chat._id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && chats.length === 0 && (
        <p>No pending chat requests.</p>
      )}
    </div>
  );
};

export default PendingChats;
