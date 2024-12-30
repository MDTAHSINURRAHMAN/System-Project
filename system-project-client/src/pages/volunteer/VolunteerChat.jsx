import React, { useState, useEffect } from "react";
import axios from "axios";

const VolunteerChat = () => {
  const [chats, setChats] = useState([]); // List of available chats

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/chats");
      setChats(response.data); // Update state
    } catch (err) {
      console.error("Error fetching chats:", err);
    }
  };

  const acceptChat = async (roomId) => {
    try {
      await axios.put("http://localhost:5000/api/chats/accept", {
        roomId: roomId,
        volunteerId: volunteer.uid, // Pass volunteer's ID
      });
      alert("Chat accepted successfully!");
      fetchMessages(); // Reload messages after assignment
    } catch (err) {
      console.error("Error accepting chat:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Volunteer Chats</h2>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-4 mb-4 bg-white shadow rounded-lg flex justify-between items-center"
        >
          <div>
            <p className="font-bold">{chat.user}</p>
            <p>{chat.messages[0].message}</p>
          </div>
          <button
            onClick={() => handleAccept(chat._id)}
            className="btn bg-green-500 text-white"
          >
            Accept
          </button>
        </div>
      ))}
    </div>
  );
};

export default VolunteerChat;
