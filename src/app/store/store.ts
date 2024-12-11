import { createContext, useContext } from "react";
import MessageStore from "./messageStore";

interface Store{
    messageStore: MessageStore
}

export const store : Store = {
    messageStore: new MessageStore()
}

export const StoreContext = createContext(store);

export function useStore() { 
    return useContext(StoreContext);
}