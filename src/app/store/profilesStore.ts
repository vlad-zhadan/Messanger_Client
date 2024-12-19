import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { LastSeen, Profile } from "../model/user";
import { store } from "./store";
import { ChatType } from "../model/chat";


export default class ProfileStore {
    profiles = new Map<number , Profile >();
    searchProfiles : number[] = [];
    choosenProfile : number | undefined;
    statusOnline = new Map<number , LastSeen >();

    constructor(){
        makeAutoObservable(this);
    }

    get SearchResultProfiles (){
        return this.searchProfiles
        .map(profileId => this.profiles.get(profileId))
        .filter(profile => profile !== undefined) as Profile[]; 
    }

    getFullNameOfProfile = (profileId : number) => {
        const profile = store.profileStore.profiles.get(profileId);
        return profile ? `${profile.firstName} ${profile.lastName}` : "Unknown User";
    }

    getIdOfSecondProfileInPersonalChat = (chatId : number) => {
        const chat = store.chatStore.chats.get(chatId);
        if(chat?.type != ChatType.PersonalChat){
            return 
        }

        return chat.secondUserId
    }

    getStatusOfProfile = (chatId : number) => {
        const chat = store.chatStore.chats.get(chatId);
        if(chat?.type != ChatType.PersonalChat){
            return 
        }

        const status = this.statusOnline.get(chat.secondUserId!)?.isOnline
        return status 
    }

    addProfile = async (profile : Profile) => {
        this.profiles.set(profile.profileId, profile);
        this.subscribeToLastSeenUpdate(profile.profileId)
        await this.getLastSeenUpdate(profile.profileId)
    }

    addProfiles = (profiles : Profile[]) => {
        profiles.forEach(profile => {
            this.addProfile(profile);
        })
    }

    getLastSeenUpdate = async (profileId : number) => {
        const lastSeen = await agent.Profile.lastSeen(profileId);
        
        runInAction(() => {
            console.log("profile ", profileId, " status ", lastSeen.isOnline )
            this.statusOnline.set(lastSeen.profileId, lastSeen)
        })
    }

    subscribeToLastSeenUpdate = async (profileId : number) =>{
        try{
            console.log("follow ", profileId)
            await store.connectionStore.hubConnection?.invoke('SubscribeToLastSeenUpdate', profileId)
        }catch(error){
             console.log(error);
        }
    }

    receiveLastSeenUpdate = (lastSeen : LastSeen) => {
        console.log("lastSeen ", lastSeen)
        this.statusOnline.set(lastSeen.profileId, lastSeen)
    }

    searchProfilesByTag = async (nameOrTag : string) => {
        const profiles = await agent.Profile.search(nameOrTag);
        runInAction(() => {
            this.searchProfiles.length = 0;
            profiles.forEach(profile => {
                this.searchProfiles.push(profile.profileId);
                if(!this.profiles.get(profile.profileId)){
                    this.profiles.set(profile.profileId, profile);
                } 
            })
        })

    }

    setChoosenProfile = (profileId : number | undefined) => {
        this.choosenProfile = profileId;
    }

    get ChoosenProfile(){
        if(!this.choosenProfile) return undefined
        return this.profiles.get(this.choosenProfile);
    }
}