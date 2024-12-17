import { makeAutoObservable } from "mobx";
import { Chat, ChatType, PersonalChat } from "../model/chat";
import { store } from "./store";

export default class ChatStore { 
    chats = new Map<number, Chat>()
    chatsHistory = new Map<number, boolean>();
    choosenChat: number | undefined
    chatLoading = false

     constructor () { 
            makeAutoObservable(this);
    }

    get Chats() {
        
        return Array.from(this.chats.values())
            .map(chat => {
                const lastMessage = chat.lastMessageId !== undefined 
                    ? store.messageStore.messages.get(chat.chatId)?.get(chat.lastMessageId)
                    : undefined;

                return {
                    ...chat,
                    lastMessageTime: lastMessage ? new Date(lastMessage.timeSent) : new Date(chat.createdAt)
                };
            })
            .sort((a, b) => {
                return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
            });
    }

    addChats = (chats : Chat[]) => {
        chats.forEach(chat => {
            store.chatStore.chats.set(chat.chatId, chat)
        });

        
        
        store.chatStore.chats.forEach(chat => {
            store.chatStore.chatsHistory.set(chat.chatId, false)
        })

        store.connectionStore.setLoading(false);
    }

    setChoosenChat = (id: number) =>{
            this.choosenChat = id; 
    }

    markHistoryFetched = (chatId: number) =>{
        this.chatsHistory.set(chatId, true)
    }

    getPersonalChatIdForUser = ()=> {
        if(!store.profileStore.choosenProfile){
            return undefined
        }
        
        const chat = Array.from(this.chats.values())
        .find(chat => chat.type === ChatType.PersonalChat &&
            (chat as PersonalChat).secondUserId === store.profileStore.choosenProfile);


        return chat ? (chat as PersonalChat).chatId : undefined;  
    }

    createPersonalChat = async ( ) => {
        try{

            await store.connectionStore.hubConnection?.invoke('CreatePersonalChat', store.profileStore.choosenProfile)
        }catch(error){
             console.log(error);
        }
    }

    confirmCreatePersonalChat = (chat : Chat | undefined) => {
        if(!chat){
            console.log('error creating chat ')
            return;
        } 
        this.chats.set(chat.chatId, chat);
    }

    addNewPersonalChat = (chat : Chat) => {
        if(this.chats.get(chat.chatId)){
            return
        }
        this.chats.set(chat.chatId, chat);
    }

    deletePersonalChat = async () => {
        if(!this.choosenChat) return 
        try{
            console.log(this.choosenChat)
            await store.connectionStore.hubConnection?.invoke('DeletePersonalChat', this.choosenChat)
        }catch(error){
             console.log(error);
        }
    }

    confirmDeletePersonalChat = (chatId : number | undefined) => {
        if(!chatId){
            console.log('error deleting chat ')
            return;
        } 
        this.chats.delete(chatId);
    }

    deleteLocalyPersonalChat = (chatId : number) => {
        if(!this.chats.get(chatId)){
            return
        }
        this.chats.delete(chatId);
    }

}