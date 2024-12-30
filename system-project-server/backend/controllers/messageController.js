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

// Get Pending Chats Grouped by User
const getPendingMessages = async (req, res) => {
  try {
    const pendingChats = await Message.aggregate([
      { $match: { receiverId: null } }, // Only unassigned messages
      {
        $group: {
          _id: "$senderId", // Group by senderId (user)
          messages: { $push: "$message" }, // Collect all messages
          latestMessage: { $last: "$message" }, // Get the latest message
          latestTimestamp: { $last: "$createdAt" }, // Get the latest timestamp
        },
      },
      { $sort: { latestTimestamp: -1 } }, // Sort by latest timestamp
    ]);

    res.status(200).json(pendingChats);
  } catch (error) {
    console.error("Error fetching pending chats:", error);
    res.status(500).json({ message: "Server error!" });
  }
};
// Get All Messages from a Specific User (Pending Chat)
const getUserMessages = async (req, res) => {
  const { userId } = req.params; // Extract userId from params

  try {
    const messages = await Message.find({
      senderId: userId, // Fetch messages sent by this user
      receiverId: null, // Ensure it's still pending
    }).sort({ createdAt: 1 }); // Sort messages by time (oldest first)

    res.status(200).json(messages); // Return messages
  } catch (error) {
    console.error("Error fetching user messages:", error);
    res.status(500).json({ message: "Server error!" });
  }
};

// Accept Chat Request
// Accept Chat Request

const acceptChat = async (req, res) => {
    const { userId } = req.params; // Get User ID from params
    const { volunteerId } = req.body; // Volunteer ID from frontend
  
    try {
      // Update all messages to assign volunteerId as receiverId
      await Message.updateMany(
        { senderId: userId }, // Find all messages sent by this user
        { receiverId: volunteerId } // Assign volunteer as receiver
      );
  
      res.status(200).json({ message: "Chat accepted and assigned!" });
    } catch (error) {
      console.error("Error accepting chat:", error);
      res.status(500).json({ message: "Failed to accept chat!" });
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
  getPendingMessages,
  getUserMessages,
  acceptChat,
  getMessagesByRoom,
};
