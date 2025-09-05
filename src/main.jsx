import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import OrderUser from './component/OrderUser/OrderUser.jsx'
import Login from './pages/login/login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
    {
    path: "/login",
    element: <Login/>,
  },
    {
    path: "/dashboard",
    element: <div>dashboard</div>,
  },
  {
    path: "/order",
    element: <OrderUser/>,
  },
  {
    path: "/setting",
    element: <div>Setting</div>,
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
