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

}

