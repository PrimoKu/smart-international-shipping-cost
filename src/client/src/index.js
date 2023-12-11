import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home.js';
import AdminLayout from "./layouts/Admin/Admin.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import Checkout from './views/Checkout.js';
import ShipperMain from './views/ShipperMain.js';
import GroupOrderDetail from './views/Shipper/GroupOrderDetails.js'


import { AuthProvider } from "contexts/AuthContext.js"; 
import { PrimeReactProvider } from 'primereact/api';

import './assets/scss/black-dashboard-react.scss';
import './assets/demo/demo.css';
import './assets/css/nucleo-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ThemeContextWrapper from './components/ThemeWrapper/ThemeWrapper.js';
import BackgroundColorWrapper from './components/BackgroundColorWrapper/BackgroundColorWrapper.js';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
      <PrimeReactProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path='/' element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='*' element={<Home />} /> {/* Default route */}
          </Routes>
        </AuthProvider>
        </GoogleOAuthProvider>
        </PrimeReactProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
