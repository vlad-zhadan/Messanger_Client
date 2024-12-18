import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";

function MessageInput () {
    const { messageStore } = useStore();
    const { handleSendMessage,  messageCurrent, handleMessageChange, isEditingMessage, handleSendEdited} = messageStore;
    
          

    return (
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
    )
}

export default observer(MessageInput)