import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Col, Row } from 'antd';
import { useStore } from '../../app/store/store';
import { MessageStatus} from '../../app/model/message';
import '../../app/layout/App.css'
import SearchElement from '../search/SearchElement';
import ChatList from '../chat/ChatList';
import SearchProfiles from '../search/SearchProfiles';
import NavBar from '../user/NavBar/NavBar';
import ChatContainer from './ChatContainer';
import { Outlet } from 'react-router-dom';



function MessangerPage() {
  const { messageStore, chatStore, connectionStore, userStore } = useStore();
  const { loadOldMessages} = messageStore;
  const {choosenChat} = chatStore;


  useEffect(() => {
    if(userStore.user){
        connectionStore.createHubConnection();
    }
    
    return () => {
      connectionStore.stopHubConnection();
    };
  }, [connectionStore, userStore.user]);

  useEffect(() => {
    if (chatStore.choosenChat && !chatStore.chatsHistory.get(chatStore.choosenChat)) {
      loadOldMessages();
    }
  }, [choosenChat]);

  ;

  if(connectionStore.loading) return <></>

  return (

    <div className="messangerContainer">
      <NavBar />

      <Row className="messangerGrid">
        <Col className="rightSpliter" xs={{ span: 8}} lg={{ span: 8}}>
          <SearchElement />
          <SearchProfiles />
          <ChatList />
        </Col>

        <Col className="leftSpliter" xs={{ span: 16}} lg={{ span: 16}}>
          <Outlet />
          
        </Col>
      </Row>

    </div>

    
  );

    
}

export default observer(MessangerPage);