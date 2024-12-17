import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Profile } from "../model/user";
import { store } from "./store";


export default class ProfileStore {
    profiles = new Map<number , Profile >();
    searchProfiles : number[] = [];
    choosenProfile : number | undefined;

    constructor(){
        makeAutoObservable(this);
    }

    get SearchResultProfiles (){
        return this.searchProfiles
        .map(profileId => this.profiles.get(profileId))
        .filter(profile => profile !== undefined) as Profile[]; 
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