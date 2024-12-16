import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import LoginForm from "../../features/user/Login/LoginForm";
import HomePage from "../../features/home/HomePage";
import RegisterForm from "../../features/user/Register/RegisterForm";

export const routes: RouteObject [] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />
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