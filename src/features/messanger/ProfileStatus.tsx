import React from "react";
import { useStore } from "../../app/store/store";
import { observer } from "mobx-react-lite";

function ProfileStatus(){
    const {  chatStore, profileStore } = useStore();
    const {getStatusOfProfile} = profileStore;
    
    const isOnline = getStatusOfProfile(chatStore.choosenChat!);

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <span
                style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: isOnline ? "green" : "red",
                    marginRight: "8px",
                }}
            ></span>
        </div>
    );
};

export default observer(ProfileStatus);
