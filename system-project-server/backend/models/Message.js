const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: String,
      required: true, // Ensure senderId is mandatory
    },
    receiverId: {
      type: String,
      default: null, // Can be null initially until assigned
    },
    roomId: {
      type: String,
      required: true, // Ensure roomId is mandatory
    },
    message: {
      type: String,
      required: true, // Ensure message is mandatory
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
