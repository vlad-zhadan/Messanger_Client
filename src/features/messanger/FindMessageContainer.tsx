import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import MessageItem from "./MessageItem";
import MessageSearchBar from "./MessageSearchBar";

function FindMesageContainer(){
    const {messageStore} = useStore()
    const {ArrayOfFoundMessages} = messageStore;

    const handleSearch = (searchText : string) => {
        messageStore.getMessagesFromSearch(searchText);
    };

    return (
        <div className="findMessageContainer">
            <div className="searchBarForMessages">
                <MessageSearchBar onSearch={handleSearch} />
            </div>

            <div className="messageContainer"> 
                <div className="messages">
                    <div className="resultsForSearchMessages">
                {ArrayOfFoundMessages.map((message, index) => (
                    <MessageItem key={index} message={message} />
                )) }
            </div>
                </div>
            
            </div>
            
        </div>
    )
}

export default observer(FindMesageContainer)