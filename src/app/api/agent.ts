import axios, { AxiosResponse } from "axios";
import { Message } from "../model/message";
import { LastSeen, Profile, User, UserLogin, UserRegister } from "../model/user";
import { store } from "../store/store";

const  sleep = (delay: number) =>{
    return new Promise((resolve) =>{
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'https://localhost:44308/api'

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    try{
        await sleep(1000);
        return response
    }catch(error) {
        console.log(error)
        return Promise.reject(error)
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    patch: <T>(url: string, body: {}) => axios.patch<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
}

const Messages = {
    list: (id: number) => requests.get<Message[]>(`/personalMessage/${id}`),
    find: (chatId: number, text: string) => requests.get<Message[]>(`/personalMessage/${chatId}/search/${text}`)

}

const Account  = {
    current : () => requests.get<User>('/account'),
    login: (userLogin: UserLogin) => requests.post<User>('/account/login', userLogin),
    register: (userRegister: UserRegister) => requests.post<User>('/account/register', userRegister)
}

const Profile = {
    search : (nameOrTag : string ) => requests.get<Profile[]>(`/profile/search/${nameOrTag}`),
    lastSeen : (profileId : number) => requests.get<LastSeen>(`/profile/${profileId}/lastSeen`)
}

const agent = {
    Messages,
    Account,
    Profile
}

export default agent;