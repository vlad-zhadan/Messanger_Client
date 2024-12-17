import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import SearchElement from "../search/SearchElement";
import './ChatList.css'
import ChatItem from "./ChatItem";
import { Button, Dropdown, Menu } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";


function ChatList () {
    const {  chatStore, commonStore } = useStore();
    const {choosenChat, setChoosenChat, Chats, getChatName, getChatLastCommentText, getChatLastCommentFullName} = chatStore;
    const {isSearch} = commonStore
    const navigate = useNavigate();
    
    const getRandomColor = (chatId: number) => {
        const colors = ['#ff5733', '#33ff57', '#3357ff', '#f1c40f', '#8e44ad', '#e74c3c'];
        return colors[chatId % colors.length]; 
    };

    const menu = (
    <Menu>
        <Menu.Item key="1">
        <a onClick={() => chatStore.deletePersonalChat()}>Delete Chat</a>
        </Menu.Item>
    </Menu>
    );

    if(isSearch) return <></>

    return (
         <div className="chats">
            

            {Chats.map((group, index) => (
                // <ChatItem />
                 <div key={index} className="chat">
                    <div 
                        onClick={() => {
                            setChoosenChat(group.chatId)
                            navigate(`/chat/${group.chatId}`);
                        } } 
                        className={`privateChat ${choosenChat === group.chatId ? 'selected' : ''}`}
                    >   
                    <div className="photo">
                            <div 
                                className="circleLogo"
                                style={{ backgroundColor: getRandomColor(group.chatId) }} 
                            >
                                {getChatName(group.chatId)?.toString().charAt(0)}
                            </div>
                        </div>
                        
                        <div className="informPartChatItem">
                            <div className="nameOfTheGroup">
                                {getChatName(group.chatId)?.toString()}
                            </div>
                            <div className="lastMessage">
                                <div className="lastMessageFullName">
                                    {getChatLastCommentFullName(group.chatId)?.toString()}
                                </div>

                                <span> : </span>

                                <div className="lastMessageText">
                                    {getChatLastCommentText(group.chatId)?.toString()}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        className="threeDotsDropdown"
                    >
                        <EllipsisOutlined className="threeDotsIcon" />
                    </Dropdown>
                </div>
            ))}
        </div>
    )

    
}

export default observer(ChatList)