import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NewOrder from "./component/NewApp/NewOrder.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import Login from "./pages/login/login.jsx";
import NewApp from "./component/NewApp/NewApp.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx"
import NewProductCategories from "./component/ProductCategories/NewProductCategories.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      {
        index:true,
        element:<NewApp /> 
      },
      {
        path: "/product",
        element: <NewApp />,
      },
      {
        path: "/product-categorie",
        element: <NewProductCategories />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/order",
        element: <NewOrder />,
      },
      {
        path: "/setting",
        element: <div>Setting</div>,
      },
    ],
  },  
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />, 
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
