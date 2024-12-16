import { observer } from 'mobx-react-lite';
import MessangerPage from '../messanger/MessangerPage';
import { useStore } from '../../app/store/store';
import { Button } from 'antd';
import { Link } from 'react-router-dom';


function MainPage() {
    const {userStore} = useStore()

  return (
    <>
        {userStore.isLoggedIn ? (
            <> 
                <MessangerPage />
            </>

            
        ) : (
            <>
                <Link to='/login'>
                    <Button>
                        Login
                    </Button>
                </Link>
                <Link to='/register'>
                    <Button>
                        Register
                    </Button>
                </Link>
            </>
           
        )}
        
    </>
    
  )
    
}

export default observer(MainPage);