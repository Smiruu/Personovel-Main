// Replies.jsx
import React from "react";

const Replies = ({ replies }) => {
  return (
    <div className="replies-container">
      <h5>Replies:</h5>
      <ul>
        {replies.map((reply) => (
          <li key={reply.reply_id}>{reply.reply_content}</li>
        ))}
      </ul>
    </div>
  );
};

export default Replies;
