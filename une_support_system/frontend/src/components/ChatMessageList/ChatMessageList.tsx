import React from "react";
import { ChatMessage, ChatMessageType } from "../../types/types";
import { ChatMessageItem } from "../ChatMessageItem";
import { NoMessagesAvailable } from "./elements/NoMessagesAvailable";
import styles from "./ChatMessageList.module.scss";

export interface ChatMessageListProps {
  messages: ChatMessage[];
}

export const ChatMessageList = ({ messages }: ChatMessageListProps) => {
  if (messages.length === 0) {
    return <NoMessagesAvailable />;
  }

  return (
    <div className={styles.messageList}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.messageItemContainer} ${
            message.messageType === ChatMessageType.Student
              ? styles.alignRight
              : styles.alignLeft
          }`}
        >
          <ChatMessageItem key={message.id} message={message} />
        </div>
      ))}
    </div>
  );
};
