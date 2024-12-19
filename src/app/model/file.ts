import { Message, MessageStatus, MessageToSend } from "./message";

export  interface MessageWithFileSend extends MessageToSend{
    fileName : string;
    fileContent : File;
    fileType: FileType
}

export interface MessageWithFileReceive extends Message {
    fileId: number;
    fileContent : string;
    fileType: FileType
}

export interface FileContent {
    fileId: number;
    fileContentUrl : string;
    fileType: FileType
}

export enum FileType {
    Image=0,
    File=1
}

export interface MessageWithFileCreated {
     fileId: number;
     messageId: number;
     chatId: number;
}