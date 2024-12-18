import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import './ChatList.css'
import ChatItem from "./ChatItem";



function ChatList () {
    const {  chatStore, commonStore } = useStore();
    const {Chats} = chatStore;
    const {isSearch} = commonStore

    if(isSearch) return <></>

    return (
         <div className="chats">
            {Chats.map((chat, index) => (
                <ChatItem key={index} chat={chat} />
                
            ))}
        </div>
    ) 
}

export default observer(ChatList)