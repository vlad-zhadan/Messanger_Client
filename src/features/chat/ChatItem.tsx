import { Button } from "antd"
import { observable } from "mobx"
import { observer } from "mobx-react-lite"

function ChatItem(){
    return (
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
    )
}

export default observer(ChatItem)