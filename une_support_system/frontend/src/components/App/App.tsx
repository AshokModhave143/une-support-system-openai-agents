import { ChatContainer } from "../ChatContainer";
import { ChatProvider } from "../../context/ChatContext";
import { AppHeader } from "./elements/AppHeader";

export const App = () => (
  <ChatProvider>
    <AppHeader />
    <ChatContainer />
  </ChatProvider>
);
