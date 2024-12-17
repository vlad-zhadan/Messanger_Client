import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable } from "mobx";
import { store } from "./store";
import { InitialData, Message } from "../model/message";
import { message } from "antd";

export default class ConnectionStore{
    hubConnection: HubConnection | null = null;
    loading = false;

    constructor () { 
        makeAutoObservable(this);
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    createHubConnection = () => {
        if (this.hubConnection && (this.hubConnection.state === HubConnectionState.Connected || this.hubConnection.state === HubConnectionState.Connecting)) {
            console.log("Hub connection already exists or is in progress.");
            return;
        }

        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44308/chat', {
                accessTokenFactory: () => store.userStore.user?.token!
            })
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.on('GetChats', (initialdata : InitialData) => {
            console.log(initialdata.chats)
            store.chatStore.addChats( initialdata.chats);
            store.messageStore.addMessages(initialdata.messages);
        })

        this.hubConnection.on('GetMessage', store.messageStore.getMessage)
        this.hubConnection.on('ReceiveDeletedMessage', store.messageStore.receiveDeleteMessage)
        this.hubConnection.on('ConfirmDeleteMessage', store.messageStore.confirmDeleteMessage)
        this.hubConnection.on('ReceiveEditedMessage', store.messageStore.receiveEditedMessage)
        this.hubConnection.on('ConfirmEditedMessage', store.messageStore.confirmEditedMessage)

        this.hubConnection.on('ConfirmCreatePersonalChat', store.chatStore.confirmCreatePersonalChat)
        this.hubConnection.on('NewPersonalChat', store.chatStore.addNewPersonalChat)

        this.hubConnection.on('ConfirmDeletePersonalChat', store.chatStore.confirmDeletePersonalChat)
        this.hubConnection.on('DeletedPersonalChat', store.chatStore.deleteLocalyPersonalChat)


        this.hubConnection.start().catch(error => console.log('Eror:', error));
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
}