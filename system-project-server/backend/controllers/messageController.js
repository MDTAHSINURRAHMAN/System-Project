const Message = require("../models/Message");

// Add Message
const addMessage = async (req, res) => {
    const { senderId, receiverId, roomId, message } = req.body;
  
    try {
      // Validate request data
      if (!senderId || !roomId || !message) {
        return res.status(400).json({ message: "Missing required fields!" });
      }
  
      const newMessage = new Message({
        senderId,
        receiverId: receiverId || null, // Set null if no volunteer assigned
        roomId,
        message,
      });
  
      await newMessage.save();
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error adding message:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// Get Messages for a Specific User
const getMessagesForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch messages where the user is either sender or receiver
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: 1 }); // Sort by creation time

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

// Get Pending Chats (Not Accepted)
const getPendingChats = async (req, res) => {
  try {
    // Fetch all messages where accepted = false
    const pendingChats = await Message.find({ accepted: false });
    res.status(200).json(pendingChats);
  } catch (error) {
    console.error("Error fetching pending chats:", error);
    res.status(500).json({ message: "Failed to fetch pending chats" });
  }
};

// Accept Chat Request
// Accept Chat Request
const acceptChat = async (req, res) => {
    const { roomId, volunteerId } = req.body; // Get roomId and volunteerId
  
    try {
      // Update all messages in the room to assign the volunteer ID
      await Message.updateMany(
        { roomId: roomId },
        { $set: { receiverId: volunteerId } }
      );
  
      res.status(200).json({ message: "Chat accepted by volunteer!" });
    } catch (error) {
      console.error("Error accepting chat:", error);
      res.status(500).json({ message: "Server error!" });
    }
  };

// Get Messages by Room ID
const getMessagesByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    // Fetch messages for a specific room ID
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages for room:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

module.exports = {
  addMessage,
  getMessagesForUser,
  getPendingChats,
  acceptChat,
  getMessagesByRoom,
};
