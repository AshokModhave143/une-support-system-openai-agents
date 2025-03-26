import { ChatMessageInput } from "../ChatMessageInput";
import { useChat } from "../../context/ChatContext";
import { ChatMessage } from "../../types/types";
import { ChatMessageList } from "../ChatMessageList/ChatMessageList";
import { ChatHeader } from "../ChatHeader";
import styles from "./ChatContainer.module.scss";
import { AiAgentsApiService } from "../../api/services/aiAgentsApi";
import { useState } from "react";
import { ChatAlertMessage } from "../ChatErrorMessage";

interface MessageContainerProps {}

export const ChatContainer = (_props: MessageContainerProps) => {
  const { addMessage, messages, activeStudent, sessionId } = useChat();
  const [error, setError] = useState<string | null>(null);

  const handleMessageSend = async (chatMessage: ChatMessage) => {
    setError(null);
    addMessage?.(chatMessage);

    const payload = { session_id: sessionId, message: chatMessage.message };
    const response = await AiAgentsApiService.post(payload);

    if (response.error) {
      setError(response.error);
    }

    response.data && addMessage?.(response.data);
  };

  return (
    <div className={styles.chat}>
      <div className={styles.chatContainer}>
        <div className={styles.chatHeader}>
          <ChatHeader activeStudent={activeStudent} />
        </div>
        <div className={styles.chatContent}>
          <ChatMessageList messages={messages} />
          {error && (
            <ChatAlertMessage message={{ type: "error", description: error }} />
          )}
        </div>
        <div className={styles.chatFooter}>
          <ChatMessageInput onSend={handleMessageSend} />
        </div>
      </div>
    </div>
  );
};
