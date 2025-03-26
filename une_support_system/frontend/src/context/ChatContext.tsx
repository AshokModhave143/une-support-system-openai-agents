import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";
import { ChatMessage, ChatMessageType } from "../types/types";
import {
  getUniqueMessageId,
  getUniqueSessionId,
  getUniqueStudentId,
} from "../utils/getUniqueId";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl: string;
}

export interface ChatContextProps {
  messages: ChatMessage[];
  activeStudent: Student | null;
  sessionId: string;
  addMessage?: (message: ChatMessage) => void;
}

// Added this as default student logged in.
const studentList: Student[] = [
  {
    id: getUniqueStudentId(),
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890",
    avatarUrl: "/assets/images/student_avatar.jpg",
  },
];

const ChatContext = createContext<ChatContextProps>({
  messages: [],
  activeStudent: studentList[0],
  sessionId: getUniqueSessionId(),
});

export interface ChatProviderProps extends PropsWithChildren {}

// This is test messages added to the chat.
export const testMessages: ChatMessage[] = [
  {
    id: getUniqueMessageId(),
    messageType: ChatMessageType.Student,
    name: `${studentList[0].firstName} ${studentList[0].lastName}`,
    avatarUrl: studentList[0].avatarUrl,
    message: "I have a question about my course",
    timestamp: new Date().getTime(),
  },
  {
    id: getUniqueMessageId(),
    messageType: ChatMessageType.Agent,
    name: "UNE_Support",
    avatarUrl: "/assets/images/ai_agent_avatar.jpg",
    message: "Hi, how can I help you today?",
    timestamp: new Date().getTime(),
  },
];

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [sessionId] = useState(getUniqueSessionId());
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, activeStudent: studentList[0], sessionId }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
