import { HubConnection, HubConnectionBuilder, HubConnectionState, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable } from "mobx";
import { Message } from "../model/message";

export default class MessageStore { 
    hubConnection: HubConnection | null = null;
    messages : Message[] = []

    constructor () { 
        makeAutoObservable(this);
    }

    createHubConnection = (id: string) => {
        if (this.hubConnection && (this.hubConnection.state === HubConnectionState.Connected || this.hubConnection.state === HubConnectionState.Connecting)) {
            console.log("Hub connection alr eady exists or is in progress.");
            return;
        }

        this.hubConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:44308/chat?messageId=' + id)
            .withAutomaticReconnect()
            .configureLogging(LogLevel.Information)
            .build();

        this.hubConnection.start().catch(error => console.log('Eror:', error));

        this.hubConnection.on('LoadComments', (conectString: string) => {
            console.log(conectString)
        })

         this.hubConnection.on('ReceiveMessage', (message : Message) => {
            this.messages.push(message);
        })
    }

    addMessage = async (message : Message) => {
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

}