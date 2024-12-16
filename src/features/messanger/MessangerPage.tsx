import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Splitter } from 'antd';
import { useStore } from '../../app/store/store';
import { MessageToSend } from '../../app/model/message';
import '../../app/layout/App.css'
import SearchElement from '../search/SearchElement';
import ModalContainer from '../../app/common/modals/ModalContainer';


function MessangerPage() {
  const { messageStore } = useStore();
  const { sendMessage, userId, setUserId , groups, setChoosenChat, choosenChat,  MessagesInGroup, loadOldMessages, loading} = messageStore;

  const [messageText, setMessageText] = useState(""); // Message input
  const [userOwnerId, setUserOwnerId] = useState(1); // User ID input
  const [chatId, setChatId] = useState(1); // User ID input

  useEffect(() => {
    if (userId !== null) {
      messageStore.createHubConnection();
    }


    return () => {
      messageStore.stopHubConnection();
    };
  }, [messageStore, userId]);

    useEffect(() => {
      if (messageStore.choosenChat && !messageStore.groupsHistory.get(messageStore.choosenChat)) {
        loadOldMessages();  // Load messages when the chat is selected
      }
    }, [choosenChat]);

  // Handle setting userId
  const handleSubmitId = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedUserId = parseInt(userOwnerId.toString(), 10);
    if (!isNaN(parsedUserId)) {
      setUserId(parsedUserId); // Set the userId in the store
    } else {
      alert('Please enter a valid numeric User ID.');
    }
  };

    // Handle input change for userOwnerId
  const handleUserOwnerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserOwnerId(Number(e.target.value)); // Convert to number
  };

  // Handle input change for message text
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  // Handle form submission (sending the message)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (messageText.trim() !== "" && choosenChat !== null) {
      const message: MessageToSend = {
        userOwnerId,
        text: messageText,
        chatId: choosenChat!,
      };

      sendMessage(message);
      setMessageText(""); // Clear message text after sending
    }
  };

  const handleChatIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(Number(e.target.value)); // Convert to number
    setChoosenChat(Number(e.target.value));
  };


  if(loading) return <></>


  return (
    <>
    <ModalContainer />
    <Splitter className='spliter'>
    <Splitter.Panel defaultSize="40%" min="20%" max="70%" className='leftSpliter'>
       <div className="chats">

        <SearchElement />
        {groups.map((group, index) => (

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