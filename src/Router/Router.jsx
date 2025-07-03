import {
  createBrowserRouter,
} from "react-router";
import Home from "../Pages/Home/Home";
import Root from "../Leyouts/Root/Root";
import AuthLayout from "../Pages/AuthLayout/AuthLayout";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";
import Coverage from "../Pages/Coverage/Coverage";
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayout from "../Pages/DashBoardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import TrackParcel from "../Pages/Dashboard/TrackParcel";
import BeARider from "../Pages/BeARider/BeARider";
import PendingRiders from "../Pages/Dashboard/pandingRiders/PandingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../Pages/MakeAdmin/MakeAdmin";

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
      },
      {
        path: 'sendParcel',
        element: <PrivateRoute>
          <SendParcel></SendParcel>
        </PrivateRoute>,
        loader: () => fetch('/bd-districts.json')
      },
      {
        path: 'beARider',
        element: <PrivateRoute><BeARider /></PrivateRoute>,
        loader: () => fetch('/bd-districts.json').then(res => res.json())
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
  },
  {
    path: 'dashboard',
    element: <PrivateRoute>
      <DashBoardLayout></DashBoardLayout>
    </PrivateRoute>,
    children: [
      {
        path: 'myParcels',
        element: <MyParcels></MyParcels>
      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path: '/dashboard/paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: '/dashboard/track',
        element: <TrackParcel></TrackParcel>
      },
      {
        path: '/dashboard/pendingRiders',
        element: <PendingRiders></PendingRiders>
      },
      {
        path: '/dashboard/activeRiders',
        element: <ActiveRiders></ActiveRiders>
      },
      {
        path: '/dashboard/makeAdmin',
        element: <MakeAdmin></MakeAdmin>
        
      }
    ]
  }
]);