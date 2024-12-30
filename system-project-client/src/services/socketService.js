import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const joinRoom = (roomId) => {
  socket.emit("joinRoom", { roomId });
};

export const sendMessage = (roomId, sender, message) => {
  socket.emit("chatMessage", { roomId, sender, message });
};

export const receiveMessage = (callback) => {
  socket.on("chatMessage", callback);
};

export const disconnectSocket = () => {
  socket.disconnect();
};

export default socket;
