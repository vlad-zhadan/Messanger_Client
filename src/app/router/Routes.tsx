import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/user/Login/LoginForm";
import RegisterForm from "../../features/user/Register/RegisterForm";
import ChatContainer from "../../features/messanger/ChatContainer";
import MainPage from "../../features/home/MainPage";
import MessangerPage from "../../features/messanger/MessangerPage";

export const routes: RouteObject [] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <MainPage />,
                children: [
                    {
                        path: 'chat/:id',
                        element: <ChatContainer />
                        }
                    
                ]
            },
            {
                path: 'login',
                element: <LoginForm />
            },
            {
                path: 'register',
                element: <RegisterForm />
            }
            
            
        ]
    }

]

export const router = createBrowserRouter(routes);