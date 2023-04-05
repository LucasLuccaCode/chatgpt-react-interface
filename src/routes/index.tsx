import { createBrowserRouter } from "react-router-dom";
import { PrivateRoute } from "./private";

import { Root } from '../pages/Root'
import { Chatbot } from "../pages/Chatbot";
import { Authentication } from "../pages/Authentication";
import { Profile } from "../pages/Profile";
import { EditUser } from "../pages/Profile/EditUser";

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
            element: <Chatbot />
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
                path: 'edit',
                element: <EditUser />
              }
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