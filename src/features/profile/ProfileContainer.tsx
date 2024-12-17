import { observer } from "mobx-react-lite";
import { Profile } from "../../app/model/user";
import { useStore } from "../../app/store/store";
import React from "react";
import ExtendProfileContainer from "./ExtendProfileContainer";

interface ProfileProps {
    profile : Profile 
}

function ProfileContainer({profile} : ProfileProps){
    const { profileStore, modalStore} = useStore()
    
    return (
         <div 
          className="message"
          onClick={()=> {
            profileStore.setChoosenProfile(profile?.profileId)
            modalStore.openModal(
                <ExtendProfileContainer  />
            )
          }
            
           

          } 
          >
            <div>
              <strong>User {profile?.firstName}</strong> ({profile?.lastName})
            </div>
          </div>
    );
}

// 

export default observer(ProfileContainer);