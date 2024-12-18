import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import './Chat.css'
import { Button } from "antd";
import { CloseOutlined, SendOutlined } from '@ant-design/icons';

function MessageInput () {
    const { messageStore } = useStore();
    const { handleSendMessage,  messageCurrent, handleMessageChange, isEditingMessage, handleSendEdited, setIsEditingMessage} = messageStore;
    
          

    return (
         <div className="mesesageContainer">
            <form onSubmit={isEditingMessage ? handleSendEdited : handleSendMessage} className='messageBox'>
                <div className="messageBoxText">
                    <label htmlFor="messageText"></label>
                    <input
                    type="text"
                    id="messageText"
                    value={messageCurrent?.text}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                    required
                    />
                </div>
                <div className="messageBoxButtons">
                    {isEditingMessage ? (
                        <>
                            <Button
                                htmlType="submit" 
                                className="submitEditedMessage submitButton"
                                icon={<SendOutlined />}
                            />
                            <Button 
                                htmlType="button" 
                                className="cancelSubmit submitButton" 
                                icon={<CloseOutlined />} 
                                onClick={() => setIsEditingMessage(false)}
                                danger 
                            />  
                        </>
                        
                    ) : (
                        <Button
                         htmlType="submit" 
                         className="submitMessage submitButton"
                          icon={<SendOutlined />}
                           />
                    )}
                </div>
            </form>
        </div>
    )
}

export default observer(MessageInput)