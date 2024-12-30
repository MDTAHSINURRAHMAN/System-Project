import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL);

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
