const express = require("express");
const router = express.Router();
const {
  addMessage,
  getMessagesForUser,
  getPendingMessages,
  getUserMessages,
  getChatMessages,
  acceptChat,
  getAcceptedChats,
  getMessagesByRoom,
} = require("../controllers/messageController");

// Add Message
router.post("/", addMessage);

// Get Messages for a specific user
router.get("/user/:userId", getMessagesForUser);

// Get pending chat requests
router.get("/pending", getPendingMessages);

router.get("/messages/:userId", getUserMessages);

router.get("/chat/:userId/:volunteerId", getChatMessages);


// Accept chat request
router.put("/accept/:userId", acceptChat);

router.get("/accepted", getAcceptedChats);

// Get Messages by Room ID
router.get("/:roomId", getMessagesByRoom);

module.exports = router;
