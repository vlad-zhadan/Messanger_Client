import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { MessageStatus } from "../../app/model/message";

function ChatContainer () {
      const { messageStore, userStore } = useStore();
      const { handleSendMessage,  MessagesInGroup, deleteMessage, messageCurrent, handleMessageChange, chooseMessegeToEdit, isEditingMessage, handleSendEdited} = messageStore;

      
    return (
         <div className="chatWithMessages">
        <div className="card">
          <form onSubmit={isEditingMessage ? handleSendEdited : handleSendMessage} className='messageBox'>
    
            <div>
              <label htmlFor="messageText">Message</label>
              <input
                type="text"
                id="messageText"
                value={messageCurrent?.text}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                required
              />
            </div>

            

            {isEditingMessage ? (
              <>
                <button type="submit">Send Edited</button>
                <button type="submit">Cancel</button>
              </>
              
            ) : (
              <button type="submit">Send Message</button>
            )}
          </form>
        </div>

        <div className="messages">
          {MessagesInGroup.map((message, index) => (
            <div key={index} className="message">
              <div>
                <strong>User {message.userOwnerId}</strong>
              </div>
              <div>{message.text}</div>
              {message.status == MessageStatus.Edited && (
                <p>edited</p>
              )}
              {message.userOwnerId === userStore.user?.profile.profileId && (
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
          ))}
        </div>
      
      </div>
    );

}

export default observer(ChatContainer)