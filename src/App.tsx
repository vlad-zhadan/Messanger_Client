import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useStore } from './app/store/store'
import { observer } from 'mobx-react-lite'
import { Message } from './app/model/message'

function App() {
  const {messageStore} = useStore();
  const {addMessage, messages} = messageStore;

  const [messageText, setMessageText] = useState(""); // Message input
  const [userOwnerId, setUserOwnerId] = useState(1); // User ID input
  const [chatId, setChatId] = useState(123); // Chat ID input

  useEffect(() => {
    messageStore.createHubConnection("aboba");
    return () => {
            messageStore.stopHubConnection();
        }
  }, [messageStore])

  // Handle input change for message text
  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  // Handle input change for userOwnerId
  const handleUserOwnerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserOwnerId(Number(e.target.value)); // Convert to number
  };

  // Handle input change for chatId
  const handleChatIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChatId(Number(e.target.value)); // Convert to number
  };

  // Handle form submission (sending the message)
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (messageText.trim() !== "") {
      const message: Message = {
        userOwnerId,
        text: messageText,
        chatId,
      };

      addMessage(message);
      setMessageText(""); // Clear message text after sending
    }
  };

  return (
    <>
      <div className="card">
        <form onSubmit={handleSendMessage}>
          <div>
            <label htmlFor="userOwnerId">User ID</label>
            <input
              type="number"
              id="userOwnerId"
              value={userOwnerId}
              onChange={handleUserOwnerIdChange}
              required
            />
          </div>

          <div>
            <label htmlFor="chatId">Chat ID</label>
            <input
              type="number"
              id="chatId"
              value={chatId}
              onChange={handleChatIdChange}
              required
            />
          </div>

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
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div>
              <strong>User {message.id}</strong> (Chat ID: {message.chatId})
            </div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    </>
  );
}


export default observer(App)
