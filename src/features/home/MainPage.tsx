import { observer } from 'mobx-react-lite';
import MessangerPage from '../messanger/MessangerPage';
import { useStore } from '../../app/store/store';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const {userStore} = useStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (!userStore.isLoggedIn) {
      navigate('/login'); 
    }
  }, [userStore.isLoggedIn, navigate]);

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