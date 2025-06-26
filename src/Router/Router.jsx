import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Leyouts/Root/Root";
import AuthLayout from "../Pages/AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'coverage',
        element: <Coverage></Coverage>,
        // loader: () => fetch('/public/bd-districts.json')
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'register',
        element: <Register></Register>
      }
    ]
  }
]);