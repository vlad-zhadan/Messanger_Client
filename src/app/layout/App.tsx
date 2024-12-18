import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "../store/store";
import { useEffect } from "react";
import './App.css'



function App(){
  const {commonStore, userStore} = useStore();

  useEffect(()=>{
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded())
    }else{
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <></>

  return(
    <div className="mainContainer">
        <Outlet />
    </div>
  )
}


export default observer(App);
