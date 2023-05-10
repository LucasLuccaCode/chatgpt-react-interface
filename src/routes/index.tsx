import { Navigate, createBrowserRouter } from 'react-router-dom';

import { PrivateRoute } from './private';

import Root from '../pages/Root'
import Home from '../pages/Home'
import Chatbot from '../pages/Chatbot'
import Authentication from '../pages/Authentication'
import Profile from '../pages/Profile'
import EditUser from '../pages/Profile/EditUser'
import ChatContent from '../components/ChatContent'

import { Prompts } from '../components/Prompts';
import { ShowFollowers } from '../pages/Profile/ShowFollowers';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'auth',
        element: <Authentication />
      },
      {
        path: '/:userId/chatbot',
        element: <PrivateRoute />,
        children: [
          {
            path: '/:userId/chatbot',
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
        path: '/:userId/profile/',
        element: <PrivateRoute />,
        children: [
          {
            path: '/:userId/profile/',
            element: <Profile />,
            children: [
              {
                index: true,
                element: <Prompts type='USER_ID' />
              },
              {
                path: 'followers',
                element: <ShowFollowers />
              },
              {
                path: 'following',
                element: <ShowFollowers />
              },
              {
                path: 'favorites',
                element: <Prompts type='FAVORITES' />
              },
              {
                path: 'privates',
                element: <Prompts type='PRIVATES' />
              },
              {
                path: 'saved',
                element: <Prompts type='SAVED' />
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
]);