import { Chat } from "./chat"

export interface MessageToSend { 
    userOwnerId: number 
    text: string
    chatId: number
}

export interface Message { 
    messageId : number
    userOwnerId: number 
    text: string
    chatId: number
    timeSent: string
}

export interface MessageReceiver{
    messageId: number;
    profileReceiverId: number;
    timeRead: string
}

export interface InitialData {
    chats: Chat[], 
    messages: Message[], 
    recivers: MessageReceiver[]
}