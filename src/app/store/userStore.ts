import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserLogin, UserRegister } from "../model/user";
import { store } from "./store";
import { router } from "../router/Routes";

export default class UserStore {
    user: User | null = null;

    constructor () {
        makeAutoObservable(this);
    }

    get isLoggedIn(){
        return !!this.user;
    }

    login = async (creds: UserLogin) => {
        const user = await agent.Account.login(creds);
        store.commonStore.setToken(user.token);
        runInAction(() => {
            this.user = user;
        })
        router.navigate('/');
    }

    logout = () => {
        store.commonStore.setToken(null);
        this.user = null;
         router.navigate('/');
    }

    register = async (cred: UserRegister) => {
        console.log(cred)
        const user = await agent.Account.register(cred);
        store.commonStore.setToken(user.token);
        runInAction(() => {
            this.user = user;
        })
        router.navigate('/');
    }

    getUser = async () => {
        try{
            const user = await agent.Account.current();
            runInAction(() => 
                this.user = user);
        }catch(error){
            console.log(error);
        }
    }

    getFullName = () => {
        return `${this.user?.profile.firstName} ${this.user?.profile.lastName}`;
    }

    blockUser = async (profileId : number) => {
        try{
            await store.connectionStore.hubConnection?.invoke('BlockUser', profileId)
        }catch(error){
             console.log(error);
        }
    }

    confirmBlockUser = (profileId : number) => {
        if(profileId < 0){
            console.log('error deleting chat ')
            return
        } 

        store.profileStore.profiles.delete(profileId);
        const personalChat = store.chatStore.getPersonalChatForUser(profileId);

        store.chatStore.chats.delete(store.chatStore.choosenChat!);
        store.messageStore.messages.delete(store.chatStore.choosenChat!);

        if(store.chatStore.choosenChat == profileId){
            store.chatStore.choosenChat = undefined
        }
    }

    getBlockUser = (profileId : number) => { 
        store.profileStore.profiles.delete(profileId);
        const personalChat = store.chatStore.getPersonalChatForUser(profileId);
        if(personalChat){
            store.chatStore.chats.delete(personalChat);
            store.messageStore.messages.delete(personalChat);
        } 
        if(store.chatStore.choosenChat == profileId){
            store.chatStore.choosenChat = undefined
        }
    }

    cleanBlockUser = (profileId : number) => {
        
        
    }

}

