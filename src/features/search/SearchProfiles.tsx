import { observer } from "mobx-react-lite"
import { useStore } from "../../app/store/store"
import ProfileContainer from "../profile/ProfileContainer"

function SearchProfiles(){
    const { profileStore, commonStore} = useStore()
    const {isSearch} = commonStore

    if(!isSearch) return <></>

    return (
        <div className="profiles">
            {profileStore.SearchResultProfiles.map((profile, index) => (
                <ProfileContainer  
                    key={index}  
                    profile={profile}         
                    />
        ))}
      </div> 
    )

}

export default observer(SearchProfiles)