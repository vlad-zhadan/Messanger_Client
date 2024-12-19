import { makeAutoObservable, reaction, runInAction } from "mobx";
import { MessageWithFileSend, FileContent, MessageWithFileReceive, FileType } from "../model/file";
import { store } from "./store";
import { Message, MessageStatus, MessageToSend } from "../model/message";
import agent from "../api/agent";


export default class FileStore{
    files = new Map<number, FileContent>;
    selectedFile : File | undefined
    loadMessage: number | undefined;
    isUploadingFile = false

    constructor (){
        makeAutoObservable(this)

        reaction(
            () => this.loadMessage,
            async (messageId : number) => {
                if (messageId !== undefined) {
                    await this.getMessageWithPhotoApi(messageId);
                }
            }
        );
    }

    setIsUploadingFile = (status : boolean) => {
        this.isUploadingFile = status;
    }

    setSelectedFile= (selectedFile : File | undefined) => {
        this.selectedFile = selectedFile;
    }

    handleSendMessageWithPhoto  = async (e: React.FormEvent) => {
        e.preventDefault(); 
  

        if ( store.chatStore.choosenChat && this.selectedFile) {
            let fileType: FileType;

            if (this.selectedFile.type.startsWith('image/')) {
                fileType = FileType.Image;
            } else {
                fileType = FileType.File;
            }



            const messageWithFile: MessageWithFileSend = {
                text: store.messageStore.messageCurrentWithMedia.text,
                chatId: store.chatStore.choosenChat!,
                fileName: this.selectedFile!.name,
                fileContent: this.selectedFile,
                fileType: fileType,
            };

            console.log( messageWithFile);

            // this.sendMessageWithPhoto(messageWithFile);
            await this.sendMessageWithPhotoApi(messageWithFile)
            this.setSelectedFile(undefined);
            store.messageStore.setMessageMediaText("");
            this.setIsUploadingFile(false)
            store.modalStore.closeModal()
    
        }
    }

    sendMessageWithPhotoApi = async (messageWithFile: MessageWithFileSend) => {
        try {
                const messageCreated = await agent.Messages.sendWithFile(messageWithFile);
                
                this.sendMessageWithPhoto(messageCreated.messageId)

                const savedMessageFile : FileContent = {
                    fileId: messageCreated.fileId,
                    fileContentUrl : URL.createObjectURL(messageWithFile.fileContent) ,
                    fileType: messageWithFile.fileType
                }
                this.addFileContent(savedMessageFile)

                const savedMessageText : Message = {
                    messageId : messageCreated.messageId,
                    chatId: messageCreated.chatId,
                    text: messageWithFile.text,
                    userOwnerId:  store.userStore.user?.profile.profileId!,
                    fileId : messageCreated.fileId,
                    timeSent: Date.now.toString(),
                    status : MessageStatus.Normal
                }
                store.messageStore.addMessage(savedMessageText)
     
            } catch (error) {
                console.log(error);
            }  
    }

    sendMessageWithPhoto = async (messageId : number) => {
        try {
            await store.connectionStore.hubConnection?.invoke('SendMessageWithPhoto', messageId);
        } catch (error) {
            console.log(error);
        }   
    }

    confirmSendingMessageWithPhoto = (messageId : number) => {
        if(messageId < 0){
            console.log("error sending photo")
        }
    }

    getFileById = ( fileId : number) => {
        return this.files.get(fileId)?.fileContentUrl
    }

    getMessageWithPhoto = async (messageId : number) => {
        console.log('get the immage ', messageId)
        if(!store.messageStore.isMessageLoaded(messageId)){
            this.loadMessage = messageId;
            
        }
        
    }

    base64ToUint8Array = (base64: string) => {
        const binaryString = atob(base64); 
        const length = binaryString.length;
        const bytes = new Uint8Array(length);
        for (let i = 0; i < length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

    getMessageWithPhotoApi = async (messageId : number) => {
        const message = await agent.Messages.getWithFile(messageId);
        store.messageStore.addMessage(message);

        const fileContentBlob = new Blob([this.base64ToUint8Array(message.fileContent)], { type: 'application/octet-stream' });

        const fileContent : FileContent = {
            fileId: message.fileId,
            fileContentUrl : URL.createObjectURL(fileContentBlob),
            fileType: message.fileType
        }
        this.addFileContent(fileContent);
        console.log(fileContent.fileContentUrl)
    }

    addFilesContent = (filesContent : FileContent []) => {
        filesContent.forEach((fileContent) => {
            this.addFileContent(fileContent);
        })
    }

    addFileContent  = (fileContent : FileContent) => { 
        this.files.set(fileContent.fileId, fileContent);
    }

    deleteFileContent = (fileId : number) => {
        const fileContent = this.files.get(fileId)?.fileContentUrl
        if(fileContent){
            URL.revokeObjectURL(fileContent)
        }
        
        this.files.delete(fileId)
    }

    
}