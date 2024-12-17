export interface Chat {
    chatId: number
    type: ChatType
    lastMessageId: number | undefined
    numberOfUnreadMessages: number
    createdAt : string
    lastMessageTime : Date
}

export interface PersonalChat extends Chat {
    secondUserId: number
}

export interface GroupChat extends Chat {
    description: string | undefined
    pictureId: number | undefined
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