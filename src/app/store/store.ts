import { createContext, useContext } from "react";
import MessageStore from "./messageStore";
import UserStore from "./userStore";
import CommonStore from "./commonStore";
import ProfileStore from "./profilesStore";
import ModalStore from "./modalStore";
import ChatStore from "./chatStore";
import ConnectionStore from "./connectionStore";
import FileStore from "./fileStore";

interface Store{
    messageStore: MessageStore
    userStore: UserStore
    commonStore : CommonStore
    profileStore : ProfileStore
    modalStore : ModalStore
    chatStore : ChatStore
    connectionStore : ConnectionStore
    fileStore : FileStore
}

export const store : Store = {
    messageStore: new MessageStore(),
    userStore: new UserStore(),
    commonStore: new CommonStore(),
    profileStore: new ProfileStore(),
    modalStore: new ModalStore(),
    chatStore: new ChatStore(),
    connectionStore : new ConnectionStore(),
    fileStore : new FileStore()
}

export const StoreContext = createContext(store);

export function useStore() { 
    return useContext(StoreContext);
}