const express = require("express");
const router = express.Router();
const {
  addMessage,
  getMessagesForUser,
  getPendingChats,
  acceptChat,
  getMessagesByRoom,
} = require("../controllers/messageController");

// Add Message
router.post("/", addMessage);

// Get Messages for a specific user
router.get("/user/:userId", getMessagesForUser);

// Get pending chat requests
router.get("/pending", getPendingChats);

// Accept chat request
router.put("/accept/:id", acceptChat);

// Get Messages by Room ID
router.get("/:roomId", getMessagesByRoom);

module.exports = router;
