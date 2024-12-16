import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { Group, InitialData, Message, MessageReceiver, MessageToSend } from "../model/message";
import agent from "../api/agent";
import { store } from "./store";

export default class MessageStore { 
    hubConnection: HubConnection | null = null;
    messages = new Map<number, Message[]>();
    userId: number | undefined
    loading = false;
    groups: Group[] = []
    groupsHistory = new Map<number, boolean>();
    choosenChat: number | undefined

    constructor () { 
        makeAutoObservable(this);
    }

    get MessagesInGroup(){
        if(this.choosenChat){
            console.log("REAL VALUES:", this.messages.get(this.choosenChat))
            return this.messages.get(this.choosenChat) || [];
        }


       return [];
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

     setUserId = (id: number) => {
        this.userId = id;
    }

    setChoosenChat = (id: number) =>{
        console.log(id)
        this.choosenChat = id;
        

        console.log(this.messages.get(this.choosenChat))

    }

    createHubConnection = () => {
        if (this.hubConnection && (this.hubConnection.state === HubConnectionState.Connected || this.hubConnection.state === HubConnectionState.Connecting)) {
            console.log("Hub connection alr eady exists or is in progress.");
            return;
        }

        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44308/chat', {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Eror:', error));

        this.hubConnection.on('GetChats', (initialdata : InitialData) => {
            this.groups = initialdata.chats;
            console.log(initialdata.chats)
            this.groups.forEach(group => {
                this.groupsHistory.set(group.chatId, false)
            })
        })

         this.hubConnection.on('GetMessage', (message : Message) => {
            this.addMessage(message); 
            })
    }

    addMessage = (message : Message) => {
        if (!this.messages.has(this.choosenChat!)) {
            this.messages.set(this.choosenChat!, []); 
        }
        this.messages.get(this.choosenChat!)?.push(message); 
        console.log(this.messages.get(this.choosenChat!));
    }


    sendMessage = async (message : MessageToSend) => {
        try {
            await this.hubConnection?.invoke('SendMessage', message);
        } catch (error) {
            console.log(error);
        }   
    }

    stopHubConnection = () => {
        // this.hubConnection?.stop().catch(error => console.log('Error stopping connection: ', error));

        if (this.hubConnection && this.hubConnection.state !== HubConnectionState.Disconnected) {
        this.hubConnection.stop()
            .then(() => {
                console.log("SignalR connection stopped.");
            })
            .catch((error) => {
                console.error("Error while stopping SignalR connection: ", error);
            });
    }
    }

    markHistoryFetched = (chatId: number) =>{
        this.groupsHistory.set(chatId, true)
    }

    loadOldMessages = async () => {
        this.setLoading(true);
        if(this.choosenChat){
            try {

                const messages = await agent.Messages.list(this.choosenChat);
                
                messages.forEach(message => {
                    console.log(message)
                    this.addMessage(message);
                    
                });
                this.setLoading(false);
                this.markHistoryFetched(this.choosenChat!); 
                

                 
            } catch (error) {
                console.log(error);
                this.setLoading(false);
            }

            

          
            
        }
    }

}