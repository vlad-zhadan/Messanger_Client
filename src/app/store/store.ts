import { createContext, useContext } from "react";
import MessageStore from "./messageStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profilesStore";
import ModalStore from "./modalStore";

interface Store{
    messageStore: MessageStore
    userStore: UserStore
    commonStore : CommonStore
    profileStore : ProfileStore
    modalStore : ModalStore
}

export const store : Store = {
    messageStore: new MessageStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    profileStore: new ProfileStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() { 
    return useContext(StoreContext);
}