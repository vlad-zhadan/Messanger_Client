import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Chat.css'

function ChatContainer () {
    const { messageStore, chatStore, profileStore } = useStore();
    const { MessagesInGroup} = messageStore;
    const {getFullNameOfProfile} = profileStore;
    const {getChatName} = chatStore
    const navigate = useNavigate();
      
    useEffect(() => {
        if (!chatStore.choosenChat) {
            navigate('/'); 
        }
    }, [chatStore.choosenChat, navigate]);

    
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [MessagesInGroup]);

    return (
         <div className="chatWithMessages">
            <div className="headerProfile">
                {getChatName(chatStore.choosenChat!)?.toString()}
            </div>
            <div className="messageContainer">
                <div className="messages">
                    {MessagesInGroup.map((message, index) => (
                            <MessageItem key={index} message={message} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="messageInputContainer">
                <MessageInput />
            </div>
           
      
        </div>
    );

}

export default observer(ChatContainer)