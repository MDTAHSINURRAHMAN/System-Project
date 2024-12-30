const Message = require("../models/Message");

// Add Message to Room
const addMessage = async (req, res) => {
  const { roomId, sender, message } = req.body;

  try {
    const newMessage = new Message({ roomId, sender, message });
    await newMessage.save();

    res.status(201).json({ success: true, data: newMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// Fetch Messages for Specific Room
const getMessagesByRoom = async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = { addMessage, getMessagesByRoom };
