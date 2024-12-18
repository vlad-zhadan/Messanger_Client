import { Dropdown, Menu } from "antd"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom";
import { useStore } from "../../app/store/store";
import { EllipsisOutlined } from '@ant-design/icons';
import { Chat } from "../../app/model/chat";

interface ChatItemProps {
  chat: Chat;
}

function ChatItem({chat} : ChatItemProps){
    const {  chatStore, commonStore} = useStore();
    const {choosenChat, setChoosenChat, getChatName, getChatLastCommentText, getChatLastCommentFullName} = chatStore;
    const {getRandomColor} = commonStore;
    const navigate = useNavigate();
    
    

    const menu = (
    <Menu>
        <Menu.Item key="1">
        <a onClick={() => chatStore.deletePersonalChat()}>Delete Chat</a>
        </Menu.Item>
    </Menu>
    );

    
    return (
         <div  className="chat">
                    <div 
                        onClick={() => {
                            setChoosenChat(chat.chatId)
                            navigate(`/chat/${chat.chatId}`);
                        } } 
                        className={`privateChat ${choosenChat === chat.chatId ? 'selected' : ''}`}
                    >   
                    <div className="photo">
                            <div 
                                className="circleLogo"
                                style={{ backgroundColor: getRandomColor(chat.chatId) }} 
                            >
                                {getChatName(chat.chatId)?.toString().charAt(0)}
                            </div>
                        </div>
                        
                        <div className="informPartChatItem">
                            <div className="nameOfTheGroup">
                                {getChatName(chat.chatId)?.toString()}
                            </div>
                            <div className="lastMessage">
                                <div className="lastMessageFullName">
                                    {getChatLastCommentFullName(chat.chatId)?.toString()}
                                </div>

                                <span> : </span>

                                <div className="lastMessageText">
                                    {getChatLastCommentText(chat.chatId)?.toString()}
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
    )
}

export default observer(ChatItem)