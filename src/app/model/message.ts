import { Chat } from "./chat"

export interface MessageToSend { 
    text: string
    chatId: number
}

export interface Message { 
    messageId : number
    chatId: number
    text: string
    userOwnerId: number 
    documentId : number
    timeSent: string
    receiverIds : number[]
}

export interface MessageToEdit{
    messageId : number
    newText : string 
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