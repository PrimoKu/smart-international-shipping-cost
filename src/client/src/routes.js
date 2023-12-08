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
import Coupon from 'views/Coupon.js';
import Home from 'views/Home.js';
import GroupOrder from 'views/GroupOrder';
import ShipperMain from 'views/ShipperMain.js';
import GroupOrderDetails from 'views/Shipper/GroupOrderDetails.js';
import ShipperProfile from 'views/Shipper/ShipperProfile.js';


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
    path: '/groupOrder/:id', // Define the path with a parameter for the group order ID
    name: 'Group Order Details',
    type: 1, // type 1 is for Shipper role
    icon: 'tim-icons icon-bullet-list-67', // Choose an appropriate icon?
    component: <GroupOrderDetails />,
    layout: '/admin',
    hidden: true, // Set true because don't want it to show in a sidebar or navigation menu
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
    path: '/user-profile',
    name: 'User Profile',
    type: 1, //shipper
    icon: 'tim-icons icon-single-02',
    component: <ShipperProfile />,
    layout: '/admin',
    hidden: false,
  },
  {
    path: '/coupon',
    name: 'Coupon',
    type: 0,
    icon: 'tim-icons icon-gift-2',
    component: <Coupon/>,
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
    hidden: true,
  },
];

export default routes;
