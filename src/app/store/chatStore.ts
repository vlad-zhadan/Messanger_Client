import { Chat, ChatType, PersonalChat } from "../model/chat";
import { store } from "./store";

export default class ChatStore { 
    chats = new Map<number, Chat>()
    chatsHistory = new Map<number, boolean>();
    choosenChat: number | undefined
    chatLoading = false

    get Chats() {
        console.log(Array.from(this.chats.values()))
        return Array.from(this.chats.values())
            // .map(chat => {
            //     const lastMessage = chat.lastMessageId !== undefined 
            //         ? store.messageStore.messages.get(chat.chatId)?.get(chat.lastMessageId)
            //         : undefined;

            //     return {
            //         ...chat,
            //         lastMessageTime: lastMessage ? new Date(lastMessage.timeSent) : new Date(chat.createdAt)
            //     };
            // })
            // .sort((a, b) => {
            //     return b.lastMessageTime.getTime() - a.lastMessageTime.getTime();
            // });
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
            console.log(id)
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
            console.log(store.profileStore.choosenProfile)
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
        console.log("confirm create");
        this.chats.set(chat.chatId, chat);
    }

    addNewPersonalChat = (chat : Chat) => {
        if(this.chats.get(chat.chatId)){
            return
        }
        console.log("i get new personal chat");
        this.chats.set(chat.chatId, chat);
    }



}