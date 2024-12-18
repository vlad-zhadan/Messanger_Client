import { observer } from "mobx-react-lite"
import { Message, MessageStatus } from "../../app/model/message"
import { useStore } from "../../app/store/store";
import './Chat.css'

interface MessageProps{
    message: Message
}

function MessageItem({message} : MessageProps){
    const { messageStore, userStore } = useStore();
    const { deleteMessage, chooseMessegeToEdit} = messageStore;
    
          

    return (
        <div  
            className={`message ${
            message.userOwnerId === userStore.user?.profile.profileId ? "myMessage" : ""
                }`
        }
        >
              <div>
                <strong>User {message.userOwnerId}</strong>
              </div>
              <div>{message.text}</div>
              {message.status == MessageStatus.Edited && (
                <p>edited</p>
              )}
              {message.userOwnerId == userStore.user?.profile.profileId && (
                <>
                  <button
                  className="delete-button"
                  onClick={() => deleteMessage(message.messageId)}
                >
                  Delete
                </button>

                <button
                  className="edit-button"
                  onClick={() => chooseMessegeToEdit(message.messageId)}
                >
                  Edit
                </button>
                </>
                
              )}
            </div>
    )
}

export default observer(MessageItem)