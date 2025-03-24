export interface ChatMessage {
    id: string,
    avatarUrl: string | undefined
    timestamp: string | number | Date
    name: string
    message: string
    messageType: ChatMessageType
}

export enum ChatMessageType {
    Student = "student",
    Agent = "agent"
}