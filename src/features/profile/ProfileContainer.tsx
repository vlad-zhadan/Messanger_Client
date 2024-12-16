import { observer } from "mobx-react-lite";
import { Profile } from "../../app/model/user";
import { useStore } from "../../app/store/store";
import React from "react";

interface ProfileProps {
    profile : Profile | undefined
}

function ProfileContainer({profile} : ProfileProps){
    const { profileStore, modalStore} = useStore()
    
    return (
         <div 
          className="message"
          onClick={()=> 
            
            modalStore.openModal(
                <ProfileContainer profile={profile}  />
            )

          } 
          >
            <div>
              <strong>User {profile?.firstName}</strong> ({profile?.lastName})
            </div>
          </div>
    );
}

// profileStore.setChoosenProfile(profile?.profileId)

export default observer(ProfileContainer);