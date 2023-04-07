import { Navigate, createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./private";

import { Root } from '../pages/Root'
import { Chatbot } from "../pages/Chatbot";
import { Authentication } from "../pages/Authentication";
import { Profile } from "../pages/Profile";
import { EditUser } from "../pages/Profile/EditUser";
import { ChatContent } from "../components/ChatContent";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'auth',
        element: <Authentication />
      },
      {
        path: '/chatbot',
        element: <PrivateRoute />,
        children: [
          {
            path: '/chatbot',
            element: <Chatbot />,
            children: [
              {
                path: ':chatId',
                element: <ChatContent />
              }
            ]
          }
        ]
      },
      {
        path: 'search',
        element: <h1>Search</h1>
      },
      {
        path: '/profile',
        element: <PrivateRoute />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
            children: [
              {
                index: true,
                element: <Navigate to="prompts" />
              },
              {
                path: 'prompts',
                element: <h1>Prompts</h1>
              },
              {
                path: 'favorites',
                element: <h1>Favoritos</h1>
              },
              {
                path: 'about',
                element: <h1>Sobre</h1>
              },
              {
                path: 'edit',
                element: <EditUser />
              },
            ]
          },
        ]
      },
      {
        path: 'menu',
        element: <h1>Menu</h1>
      }
    ]
  }
])