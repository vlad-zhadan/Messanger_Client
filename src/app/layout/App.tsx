import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";
import { useStore } from "../store/store";
import { useEffect } from "react";



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
    <>
      <Outlet />
    </>
  )
}


export default observer(App);
