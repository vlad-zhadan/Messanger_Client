import { observer } from "mobx-react-lite";
import { Profile } from "../../app/model/user";
import { useStore } from "../../app/store/store";
import React from "react";
import ExtendProfileContainer from "./ExtendProfileContainer";
import './Profile.css'

interface ProfileProps {
    profile : Profile 
}

function ProfileContainer({profile} : ProfileProps){
    const { profileStore, modalStore, commonStore, chatStore} = useStore()
    const {getChatName} = chatStore;
    const {getRandomColor} = commonStore;
    
    return (
         <div 
            className="profile"
            onMouseDown={(e) => e.preventDefault()}
            onClick={()=> {
              profileStore.setChoosenProfile(profile?.profileId)
              
              modalStore.openModal(
                  <ExtendProfileContainer  />
              )
            }} 
          >
            <div className="photo">
                <div 
                    className="circleLogo"
                    style={{ backgroundColor: getRandomColor(profile?.profileId) }} 
                >
                    {profileStore.getFullNameOfProfile(profile?.profileId)?.toString().charAt(0)}
                </div>
            </div>
            <div>
              {profileStore.getFullNameOfProfile(profile?.profileId)}
            </div>
          </div>
    );
}

// 

export default observer(ProfileContainer);