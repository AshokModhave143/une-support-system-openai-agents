import { ChatMessage, ChatMessageType } from "../../types/types";
import { getUniqueMessageId } from "../../utils/getUniqueId";
import axios from "axios";
import { ChatPostMessageRequest, ChatPostMessageResponse } from "../types";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_ENDPOINT = "/api/agent/";

export const AiAgentsApiService = {
  post: async (
    payload: ChatPostMessageRequest
  ): Promise<ChatPostMessageResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}${API_ENDPOINT}`, payload, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status !== 200) {
        console.error("Error in sending message to AI agent:", response);
        return {
          status: response.status,
          error: response.statusText,
          data: null,
        };
      }

      const { agentName, response: responseMessage } = response.data;

      const agentMessage: ChatMessage = {
        id: getUniqueMessageId(),
        messageType: ChatMessageType.Agent,
        name: agentName,
        avatarUrl: "/assets/images/ai_agent_avatar.jpg",
        message: responseMessage,
        timestamp: new Date().getTime(),
      };

      return {
        status: response.status,
        error: null,
        data: agentMessage,
      };
    } catch (error) {
      console.error("Error in sending message to AI agent:", error);
      return {
        status: 500,
        error: `Error in sending message to AI agent: ${error}`,
        data: null,
      };
    }
  },
};
