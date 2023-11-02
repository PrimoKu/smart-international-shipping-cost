import Dashboard from 'views/Dashboard.js';
import ShipperDashboard from 'views/Shipper/Dashboard.js';
import Checkout from "views/Checkout.js";
import Icons from 'views/Icons.js';
import Order from 'views/Order.js'
import Map from 'views/Map.js';
import Notifications from 'views/Notifications.js';
import TableList from 'views/TableList.js';
import Typography from 'views/Typography.js';
import UserProfile from 'views/UserProfile.js';
import Home from 'views/Home.js';
import GroupOrder from 'views/GroupOrder';
import ShipperMain from 'views/ShipperMain.js';

var routes = [ 
  {
    path: '/dashboard',
    name: 'Dashboard',
    type: 0, //User Role Type 0: Normal
    icon: 'tim-icons icon-chart-pie-36',
    component: <Dashboard />,
    layout: '/admin',
    hidden: false,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    type: 1, //User Role Type 1: Shipper
    icon: 'tim-icons icon-chart-pie-36',
    component: <ShipperDashboard />,
    layout: '/admin',
    hidden: false,
  },
  {
    path: '/groupOrder/:id',
    name: 'GroupOrder',
    type: 0,
    icon: 'tim-icons icon-paper',
    component: <GroupOrder />,
    layout: '/admin',
    hidden: true,
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    type: 0,
    icon: 'tim-icons icon-single-02',
    component: <UserProfile />,
    layout: '/admin',
    hidden: false,
  },
  {
    path: "/checkout/:id",
    name: "Checkout",
    type: 0,
    icon: "tim-icons icon-cart",
    component: <Checkout />,
    layout: "/admin",
    hidden: false,
  },
];

export default routes;
