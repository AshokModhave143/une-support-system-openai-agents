import { ChatMessage, ChatMessageType } from "../../types/types";
import styles from "./ChatMessageItem.module.scss";

export interface ChatMessageItemProps {
  message: ChatMessage;
}

export const ChatMessageItem = ({ message }: ChatMessageItemProps) => {
  console.log(message);

  return (
    <div
      className={`${styles.messageItem} ${
        message.messageType === ChatMessageType.Student
          ? styles.messageItem__sent
          : styles.messageItem__received
      }`}
    >
      <img
        src={message?.avatarUrl}
        alt={`${message.name}'s avatar`}
        className={styles.messageItem__avatar}
        loading="lazy"
      />
      <div className={styles.messageItem__content}>
        <div className={styles.messageItem__agentName}>{message.name}</div>
        <div className={styles.messageItem__timestamp}>
          {new Date(message.timestamp).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle: "medium",
          })}
        </div>
        <div className={styles.messageItem__content__text}>
          {message.message}
        </div>
      </div>
    </div>
  );
};
