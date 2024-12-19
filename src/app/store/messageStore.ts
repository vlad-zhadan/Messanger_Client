import { makeAutoObservable } from "mobx"
import {   Message, MessageDelete, MessageStatus, MessageToEdit, MessageToSend } from "../model/message";
import agent from "../api/agent";
import { store } from "./store";

export default class MessageStore { 
    messages = new Map<number, Map<number, Message>>();
    messageCurrent : Message  
    messageToEdit : Message | undefined;
    isEditingMessage = false
  
    constructor () { 
        makeAutoObservable(this);
        this.messageCurrent = this.createEmptyMessage()
    }

    get MessagesInGroup() {
        if (store.chatStore.choosenChat) {
            const chatMessages = this.messages.get(store.chatStore.choosenChat);
            if (chatMessages) {
                return Array.from(chatMessages.values()).sort((a, b) => a.messageId - b.messageId);
            }
        }
        return []; 
    }

    addMessages = (messages : Message[]) => {
        messages.forEach((message) => {
            this.addMessage(message);
        });
    }

    addMessage = (message : Message) => {
        if (!this.messages.has(message.chatId)) {
            this.messages.set(message.chatId, new Map());
        }

        const chatMessages = this.messages.get(message.chatId)!; 
        chatMessages.set(message.messageId, message);
    }

    sendMessage = async (message : MessageToSend) => {
        try {
            await store.connectionStore.hubConnection?.invoke('SendMessage', message);
        } catch (error) {
            console.log(error);
        }   
    }

    getMessage = (message : Message) =>{
        this.addMessage(message); 
        store.chatStore.chats.get(message.chatId)!.lastMessageId = message.messageId;
    }

    loadOldMessages = async () => {
        store.connectionStore.setLoading(true);
        if(store.chatStore.choosenChat){
            try {

                const messages = await agent.Messages.list(store.chatStore.choosenChat);
                
                messages.forEach(message => {
                    this.addMessage(message);
                });

                store.connectionStore.setLoading(false);
                store.chatStore.markHistoryFetched(store.chatStore.choosenChat!); 
     
            } catch (error) {
                console.log(error);
                store.connectionStore.setLoading(false);
            }  
        }
    }

    deleteMessage = async (messageId : number) => {
        try{
            await store.connectionStore.hubConnection?.invoke('DeleteMessage', messageId)
        }catch(error){
             console.log(error);
        }
    }

    confirmDeleteMessage = (messageId : number) => {
        if(messageId < 0) return console.log("error deleting message")
    }

    receiveDeleteMessage = (deleteMessage : MessageDelete) =>{
        const chatMessages = this.messages.get(deleteMessage.chatId)
        chatMessages?.delete(deleteMessage.messageId);

        if(store.chatStore.chats.get(deleteMessage.chatId)!.lastMessageId == deleteMessage.messageId) {
            this.updateLastMessage(deleteMessage.chatId)
        }
    }

    updateLastMessage = (chatId: number) => { 
        const chat = store.chatStore.chats.get(chatId)
        if(!chat) return console.log("chat doesnt exist")
        const newLastMessageId = this.getLastMessageIdForGroup(chatId)
        chat.lastMessageId = newLastMessageId;

        store.chatStore.chats.set(chat.chatId, chat)
    }

    getLastMessageIdForGroup = (chatId : number) => {
        const messagesForChat = this.messages.get(chatId);
        if (messagesForChat && messagesForChat.size > 0) {
            const messageIds = Array.from(messagesForChat.keys());
            const lastMessageId = Math.max(...messageIds);

            return lastMessageId;
        }
        return undefined; 
    }

    chooseMessegeToEdit = (messageId : number ) => {
        const messagesForChat = this.messages.get(store.chatStore.choosenChat!);
        const message = messagesForChat?.get(messageId)
        this.setMessageToEdit(message)
        this.setMessageText(message?.text!)
        this.setIsEditingMessage(true)
    }

    setIsEditingMessage = (status : boolean) => {
        this.isEditingMessage = status
        if(!status){
            this.setMessageToEdit(undefined);
            this.setMessageText(""); 
        }
    }

    setMessageToEdit = (message : Message | undefined) => {
        this.messageToEdit = message;
    }

    editMessage = async (message : MessageToEdit) => {
         try {
            await store.connectionStore.hubConnection?.invoke('EditMessage', message);
        } catch (error) {
            console.log(error);
        }   
    }

    confirmEditedMessage = (messageId : number) =>{
        if(messageId < 0) return console.log("error deleting message")
    }

    receiveEditedMessage = (message : Message) =>{
        console.log("get")
        const chatMessages = this.messages.get(message.chatId)
        const messageToEdit = chatMessages?.get(message.messageId);
        messageToEdit!.text = message.text
        messageToEdit!.status = message.status
    }


    createEmptyMessage = () =>{
        return {
            messageId: 0,
            chatId: 0,
            text: '',
            userOwnerId: 0,
            documentId: 0,
            timeSent: new Date().toISOString(),
            status: 0,
            receiverIds: []
        };
    }

    setMessageText = (messageText : string ) => {
        this.messageCurrent.text = messageText
    }

    handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.messageCurrent.text = e.target.value;
    }


    handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault(); 

        if (this.messageCurrent.text.trim() !== "" && store.chatStore.choosenChat !== null) {
        const message: MessageToSend = {
            text: this.messageCurrent.text,
            chatId: store.chatStore.choosenChat!,
        };

        this.sendMessage(message);
        this.setMessageText(""); 
        }
    }

    handleSendEdited = (e: React.FormEvent) => {
        e.preventDefault(); 

        if (this.messageCurrent.text.trim() !== "" && store.chatStore.choosenChat !== null && this.messageCurrent.text !== this.messageToEdit!.text) {
        const message: MessageToEdit = {
            newText: this.messageCurrent.text,
            messageId: this.messageToEdit!.messageId
        };

        this.editMessage(message);
        this.setMessageToEdit(undefined);
        this.setMessageText(""); 
        this.setIsEditingMessage(false);
        }
    }

    getMessagesFromSearch = async (text : string) => {
        if(store.chatStore.choosenChat){
            try {

                const messages = await agent.Messages.find(store.chatStore.choosenChat, text);

                console.log(messages)
     
            } catch (error) {
                console.log(error);
                
            }  
        }
    }

}