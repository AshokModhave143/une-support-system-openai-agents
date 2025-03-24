export interface ChatPostMessageRequest {
    message: string;
}
export interface ChatPostMessageResponse {
    agentName: string;
    response: string;
    error?: string;
}