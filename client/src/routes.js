import Dashboard from 'views/Dashboard.js';
import Checkout from "views/Checkout.js";
import Icons from 'views/Icons.js';
import Order from 'views/Order.js'
import Map from 'views/Map.js';
import Main from 'views/Main.js'
import Notifications from 'views/Notifications.js';
import TableList from 'views/TableList.js';
import Typography from 'views/Typography.js';
import UserProfile from 'views/UserProfile.js';
import Home from 'views/Home.js';

var routes = [
  {
    path: '/home',
    name: 'Home',
    icon: 'tim-icons icon-chart-pie-36',
    component: <Home />,
    layout: '/',
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'tim-icons icon-chart-pie-36',
    component: <Dashboard />,
    layout: '/admin',
  },
  {
    path: '/icons',
    name: 'Icons',
    icon: 'tim-icons icon-atom',
    component: <Icons />,
    layout: '/admin',
  },
  {
    path: '/map',
    name: 'Map',
    icon: 'tim-icons icon-pin',
    component: <Map />,
    layout: '/admin',
  },
  {
    path: '/notifications',
    name: 'Notifications',
    icon: 'tim-icons icon-bell-55',
    component: <Notifications />,
    layout: '/admin',
  },
  {
    path: '/user-profile',
    name: 'User Profile',
    icon: 'tim-icons icon-single-02',
    component: <UserProfile />,
    layout: '/admin',
  },
  {
    path: "/checkout",
    name: "Checkout",
    icon: "tim-icons icon-cart",
    component: <Checkout />,
    layout: "/admin",
  },
  {
    path: "/main",
    name: "Main",
    icon: "tim-icons icon-cart",
    component: <Main />,
    layout: "/admin",
  },
  {
    path: '/order',
    name: 'Order',
    icon: 'tim-icons icon-bell-55',
    component: <Order />,
    layout: '/admin',
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: <TableList />,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Typography',
    icon: 'tim-icons icon-align-center',
    component: <Typography />,
    layout: '/admin',
  },
];
export default routes;
