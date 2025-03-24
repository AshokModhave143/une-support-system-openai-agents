import { ChatMessageInput } from "../ChatMessageInput";
import { useChat } from "../../context/ChatContext";
import { ChatMessage } from "../../types/types";
import { ChatMessageList } from "../ChatMessageList/ChatMessageList";
import { ChatHeader } from "../ChatHeader";
import styles from "./ChatContainer.module.scss";
import { AiAgentsApiService } from "../../api/services/aiAgentsApi";
import { useState } from "react";

interface MessageContainerProps {}

export const ChatContainer = (_props: MessageContainerProps) => {
  const { addMessage, messages, activeStudent } = useChat();
  const [error, setError] = useState<string | null>(null);

  const handleMessageSend = async (chatMessage: ChatMessage) => {
    setError(null);
    addMessage?.(chatMessage);

    const response = await AiAgentsApiService.post(chatMessage.message);

    if (response.error) {
      setError(response.error);
    }

    response.data && addMessage?.(response.data);
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHeader}>
        <ChatHeader activeStudent={activeStudent} />
      </div>
      <div className={styles.chatContent}>
        <ChatMessageList messages={messages} />
      </div>
      <div className={styles.chatFooter}>
        <ChatMessageInput onSend={handleMessageSend} />
      </div>
    </div>
  );
};
