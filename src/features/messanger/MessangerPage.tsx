import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Splitter } from 'antd';
import { useStore } from '../../app/store/store';
import { MessageStatus, MessageToEdit, MessageToSend } from '../../app/model/message';
import '../../app/layout/App.css'
import SearchElement from '../search/SearchElement';
import ModalContainer from '../../app/common/modals/ModalContainer';


function MessangerPage() {
  const { messageStore, chatStore, connectionStore, userStore } = useStore();
  const { sendMessage,  MessagesInGroup, loadOldMessages, deleteMessage, messageCurrent, handleMessageChange, setMessageText, chooseMessegeToEdit, isEditingMessage, messageToEdit , editMessage, setMessageToEdit, setIsEditingMessage} = messageStore;
  const {choosenChat, setChoosenChat, Chats} = chatStore;

  // const [messageText, setMessageText] = useState(""); 

  useEffect(() => {
    if(userStore.user){
        connectionStore.createHubConnection();
    }
    
    return () => {
      connectionStore.stopHubConnection();
    };
  }, [connectionStore, userStore.user]);

  useEffect(() => {
    if (chatStore.choosenChat && !chatStore.chatsHistory.get(chatStore.choosenChat)) {
      loadOldMessages();
    }
  }, [choosenChat]);

    useEffect(() => {
      console.log("Chats in MessengerPage:", Chats); // Log Chats whenever it updates
  }, [messageStore]);

  // const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMessageText(e.target.value);
  // };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (messageCurrent.text.trim() !== "" && choosenChat !== null) {
      const message: MessageToSend = {
        text: messageCurrent.text,
        chatId: choosenChat!,
      };

      sendMessage(message);
      setMessageText(""); 
    }
  };

  const handleSendEdited = (e: React.FormEvent) => {
    e.preventDefault(); 

    if (messageCurrent.text.trim() !== "" && choosenChat !== null && messageCurrent.text !== messageToEdit!.text) {
      const message: MessageToEdit = {
        newText: messageCurrent.text,
        messageId: messageToEdit!.messageId
      };

      editMessage(message);
      setMessageToEdit(undefined);
      setMessageText(""); 
      setIsEditingMessage(false);
    }
  };

  if(connectionStore.loading) return <></>



  return (
    <>
    <ModalContainer />
    <Splitter className='spliter'>
    <Splitter.Panel defaultSize="40%" min="20%" max="70%" className='leftSpliter'>
       <div className="chats">

        <SearchElement />
        {Chats.map((group, index) => (

          <div key={index} className="group">
            <div 
              onClick={()=> setChoosenChat(group.chatId)} 
               className={`privateChat ${choosenChat === group.chatId ? 'selected' : ''}`}
            >
              <strong>Group {group.chatId}</strong> 
            </div>
            <Button onClick={() => chatStore.deletePersonalChat()}>
              Delete Chat
            </Button>

          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel className='rightSpliter'>
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
    </Splitter.Panel>
  </Splitter>
    </>

    
  );

    
}

export default observer(MessangerPage);