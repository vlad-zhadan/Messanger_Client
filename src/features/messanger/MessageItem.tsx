import { observer } from "mobx-react-lite"
import { Message, MessageStatus } from "../../app/model/message"
import { useStore } from "../../app/store/store";
import './Chat.css'
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { FileType } from "../../app/model/file";
import FileCard from "./FileCard";

interface MessageProps{
    message: Message
}

function MessageItem({message} : MessageProps){
    const { messageStore, userStore, fileStore } = useStore();
    const { deleteMessage, chooseMessegeToEdit} = messageStore;
    const {getFileById, getTypeOfFile, getNameOfFile} = fileStore
    
    const menu = (
    <Menu>
        <Menu.Item key="1">
            <button
                  className="delete-button"
                  onClick={() => deleteMessage(message.messageId)}
                >
                  Delete
                </button>
        </Menu.Item>
        <Menu.Item key="2">
            <button
                  className="edit-button"
                  onClick={() => chooseMessegeToEdit(message.messageId)}
                >
                  Edit
                </button>
        </Menu.Item>
    </Menu>
    );      

    return (
        <div  
            className={`message ${
            message.userOwnerId === userStore.user?.profile.profileId ? "myMessage" : ""
                }`
        }
        >   
            <div className="messageContainer">
                <div className="fileContainer">
                    {message.fileId && getTypeOfFile(message.fileId)! == FileType.Image && (
                        <img src={getFileById(message.fileId)} alt="Preview" className="imgContainer"/>
                    )}
                    {message.fileId && getTypeOfFile(message.fileId)! == FileType.File && (
                        <FileCard fileName={getNameOfFile(message.fileId)!} />
                    )}


                </div>

                <div className="messageText">
                    {message.text}
                </div>
                
                {message.status == MessageStatus.Edited && (
                    <div className="editedElement">
                        <p>edited</p>
                    </div>
                )}

               
            </div>
            

            {message.userOwnerId == userStore.user?.profile.profileId && (
                <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    className="threeDotsDropdown"
                >
                    <EllipsisOutlined className="threeDotsIconMessage" />
                </Dropdown>
            )}
        </div>
    )
}

export default observer(MessageItem)