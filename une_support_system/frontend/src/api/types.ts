import { AxiosResponse } from "axios";
import { ChatMessage } from "src/types/types";

export interface ChatPostMessageRequest {
  session_id: string;
  message: string;
}
export interface ChatPostMessageResponse {
  status: AxiosResponse["status"];
  data: ChatMessage | null;
  error?: string | null;
}
