import { makeAutoObservable } from "mobx"
import {   Message, MessageToSend } from "../model/message";
import agent from "../api/agent";
import { store } from "./store";

export default class MessageStore { 
    messages = new Map<number, Map<number, Message>>();
  
    constructor () { 
        makeAutoObservable(this);
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

}