const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// App Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Frontend URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const petRoutes = require("./routes/petRoutes");
const userRoutes = require("./routes/userRoutes");
const adoptionRoutes = require("./routes/adoptionRoutes"); // Added user routes
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatRoutes = require("./routes/chatRoutes");

app.use("/api/pets", petRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adoptions", adoptionRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chats", chatRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Pet Adoption System API is running...");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  // Join Room
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);
  });

  // Handle Incoming Messages for Specific Room
  socket.on("sendMessage", (data) => {
    const { roomId, sender, message } = data;
    const timestamp = new Date();
    io.to(roomId).emit("receiveMessage", { sender, message, timestamp });
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected:", socket.id);
  });
});

// Server Start
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
