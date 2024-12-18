import { observer } from "mobx-react-lite";
import { Profile } from "../../app/model/user";
import { useStore } from "../../app/store/store";

import { Button } from "antd";
import { Link } from "react-router-dom";

interface ProfileProps {
    profile : Profile 
}

function ExtendProfileContainer(){
    const { chatStore, modalStore, profileStore} = useStore()
    
    return (
         <div >
            <div>
              <strong>User {profileStore.ChoosenProfile?.firstName}</strong> ({profileStore.ChoosenProfile?.lastName})
            </div>
            {chatStore.getPersonalChatIdForUser() ? 
            (
                <Link to={`/chat/${chatStore.getPersonalChatIdForUser()}`}>
                    <Button
                        onClick={() => {
                            modalStore.closeModal()
                            chatStore.setChoosenChat(chatStore.getPersonalChatIdForUser()!)
                        }}
                    >
                        Go to the chat
                    </Button>
                </Link>
            ) 
            
            : (
                <Button onClick={() => {
                modalStore.closeModal()
                chatStore.createPersonalChat()
                }}>
                        Create chat
                </Button>
            )
            }
          </div>
    );
}

// profileStore.setChoosenProfile(profile?.profileId)

export default observer(ExtendProfileContainer);