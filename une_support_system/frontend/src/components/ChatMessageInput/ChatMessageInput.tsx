import React, { useState } from "react";
import { ChatMessage, ChatMessageType } from "../../types/types";
import { getUniqueMessageId } from "../../utils/getUniqueId";
import styles from "./ChatMessageInput.module.scss";
import { useChat } from "../../context/ChatContext";

interface ChatMessageInputProps {
  onSend: (message: ChatMessage) => void;
}

export const ChatMessageInput = ({ onSend }: ChatMessageInputProps) => {
  const [message, setMessage] = useState<string>("");
  const { activeStudent } = useChat();

  const handleSend = () => {
    if (message.trim()) {
      const payload: ChatMessage = {
        id: getUniqueMessageId(),
        messageType: ChatMessageType.Student,
        name: `${activeStudent?.firstName} ${activeStudent?.lastName}`,
        message: message,
        avatarUrl: "/assets/images/student_avatar.jpg",
        timestamp: new Date().toISOString(),
      };
      onSend(payload);
      setMessage("");
    }
  };

  return (
    <div className={styles.messageInputContainer}>
      <input
        type="text"
        placeholder="Type your message..."
        className={styles.messageInput}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className={styles.sendButton} onClick={handleSend}>
        Send
      </button>
    </div>
  );
};
