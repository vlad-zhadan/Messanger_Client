import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    // error : ServerError | null = null ;
    token: string | null = localStorage.getItem('jwt');
    appLoaded = false;
    isSearch = false;

    constructor(){
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if(token){
                    localStorage.setItem('jwt', token)
                }else{
                    localStorage.removeItem('jwt')
                }
            }
        )
    }

    setToken = (token : string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }

    setSearch = (state : boolean) => {
        this.isSearch = state;
    }

    getRandomColor = (chatId: number) => {
        const colors = ['#ff5733', '#33ff57', '#3357ff', '#f1c40f', '#8e44ad', '#e74c3c'];
        return colors[chatId % colors.length]; 
    };

}