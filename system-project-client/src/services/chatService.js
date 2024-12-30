// Fetch chat history from the backend
export const getChatHistory = async (roomId) => {
    const response = await fetch(`/api/chats/${roomId}`);
    const data = await response.json();
    return data;
  };
  
  // Save a new message to the backend
  export const saveMessage = async (roomId, sender, message) => {
    const response = await fetch(`/api/chats`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomId, sender, message }),
    });
    return response.json();
  };
  
  // ================== Socket.IO Integration ==================
  
  import { io } from "socket.io-client";
  
  // Initialize Socket.IO connection
  const socket = io("http://localhost:5000");
  
  // Join a specific chat room
  export const joinRoom = (roomId) => {
    socket.emit("joinRoom", { roomId });
  };
  
  // Send a real-time message
  export const sendMessage = (roomId, sender, message) => {
    socket.emit("chatMessage", { roomId, sender, message });
  };
  
  // Listen for incoming real-time messages
  export const receiveMessage = (callback) => {
    socket.on("chatMessage", callback);
  };
  
  // Disconnect socket on component unmount
  export const disconnectSocket = () => {
    socket.disconnect();
  };
  