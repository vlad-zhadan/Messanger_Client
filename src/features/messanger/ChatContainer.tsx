import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import MessageInput from "./MessageInput";
import MessageItem from "./MessageItem";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './Chat.css'
import ProfileStatus from "./ProfileStatus";
import { Dropdown, Menu } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';

function ChatContainer () {
    const { messageStore, chatStore, profileStore, userStore } = useStore();
    const { MessagesInGroup} = messageStore;
    const {getFullNameOfProfile, getStatusOfProfile} = profileStore;
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

    const menu = (
    <Menu>
        <Menu.Item key="1">
            <button
                className="delete-button"
                onClick={() => {userStore.blockUser(profileStore.getIdOfSecondProfileInPersonalChat(chatStore.choosenChat!)!)}}
            >
                Block
            </button>
            <button
                className="delete-button"
                onClick={() => {messageStore.getMessagesFromSearch("aboba")}}
            >
               Search
            </button>
        </Menu.Item>
    </Menu>
    );      

    return (
         <div className="chatWithMessages">
            <div className="headerProfile">
                <div className="nameOfChat">
                    {getChatName(chatStore.choosenChat!)?.toString()}
                </div>
                <div className="statusOfOnline">
                    <ProfileStatus />
                </div>
                <div className="profileOptions">
                        <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        className="threeDotsBlockOptions"
                    >
                        <EllipsisOutlined style={{ transform: 'rotate(90deg)', fontSize: '20px' }} className="threeDotsBlockOptions" />
                </Dropdown>
                </div>
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