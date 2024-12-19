import { Chat } from "./chat"
import { Profile } from "./user"

export interface MessageToSend { 
    text: string
    chatId: number
}

export interface Message { 
    messageId : number
    chatId: number
    text: string
    userOwnerId: number 
    fileId : number | undefined
    timeSent: string
    // receiverIds : number[]
    status : MessageStatus
}

export enum MessageStatus
{
    Normal=0,
    Edited=1,
    Deleted=2,
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
    recivers: MessageReceiver[],
    profiles:  Profile[]
}

export interface MessageDelete{
    messageId : number
    chatId: number
}