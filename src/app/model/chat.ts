import { Profile } from "./user"

export interface Chat {
    chatId: number
    type: ChatType
    lastMessageId: number | undefined
    numberOfUnreadMessages: number
    createdAt : string
    lastMessageTime : Date

    secondUserId: number | undefined

    description: string | undefined
    pictureId: number | undefined
    name: string | undefined
}

export interface NewChat{
    newPersonalChat: Chat
    profiles: Profile[]
}

enum ChatStatus{
    Ok = 0,
    Blocked = 1,
    Blocking = 2
}

export enum ChatType{
    PersonalChat = 0,
    GroupChat = 1,
    Channel = 2
}