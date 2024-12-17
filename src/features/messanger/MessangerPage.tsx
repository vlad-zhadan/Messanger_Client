import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Splitter } from 'antd';
import { useStore } from '../../app/store/store';
import { MessageToSend } from '../../app/model/message';
import '../../app/layout/App.css'
import SearchElement from '../search/SearchElement';
import ModalContainer from '../../app/common/modals/ModalContainer';


function MessangerPage() {
  const { messageStore, chatStore, connectionStore } = useStore();
  const { sendMessage, userId, setUserId ,  MessagesInGroup, loadOldMessages} = messageStore;
  const {choosenChat, setChoosenChat, Chats} = chatStore;

  const [messageText, setMessageText] = useState(""); // Message input

  useEffect(() => {
    if (userId !== null) {
      connectionStore.createHubConnection();
    }

    return () => {
      connectionStore.stopHubConnection();
    };
  }, [connectionStore, userId]);

  useEffect(() => {
    if (chatStore.choosenChat && !chatStore.chatsHistory.get(chatStore.choosenChat)) {
      loadOldMessages();
    }
  }, [choosenChat]);

    useEffect(() => {
      console.log("Chats in MessengerPage:", Chats); // Log Chats whenever it updates
  }, [messageStore]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (messageText.trim() !== "" && choosenChat !== null) {
      const message: MessageToSend = {
        text: messageText,
        chatId: choosenChat!,
      };

      sendMessage(message);
      setMessageText(""); // Clear message text after sending
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

          </div>
        ))}
      </div>
    </Splitter.Panel>
    <Splitter.Panel className='rightSpliter'>
        <div className="card">
        <form onSubmit={handleSendMessage} className='messageBox'>
          
          

          <div>
            <label htmlFor="messageText">Message</label>
            <input
              type="text"
              id="messageText"
              value={messageText}
              onChange={handleMessageChange}
              placeholder="Type a message..."
              required
            />
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>

      <div className="messages">
        {MessagesInGroup.map((message, index) => (
          <div key={index} className="message">
            <div>
              <strong>User {message.userOwnerId}</strong> (Chat ID: {message.chatId})
            </div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    </Splitter.Panel>
  </Splitter>
    </>

    
  );

    
}

export default observer(MessangerPage);