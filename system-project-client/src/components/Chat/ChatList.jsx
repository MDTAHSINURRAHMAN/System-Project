import React from "react";

const ChatList = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}:</strong> {msg.message} <em>{new Date(msg.timestamp).toLocaleTimeString()}</em>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
