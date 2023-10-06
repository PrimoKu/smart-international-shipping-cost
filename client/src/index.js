import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import CreateOrder from './views/CreateOrder.js';
import Home from './views/Home.js';
import AdminLayout from "./layouts/Admin/Admin.js";
import Login from "./views/Login.js";
import Register from "./views/Register.js";
import Checkout from './views/Checkout.js';

import { AuthProvider } from "contexts/AuthContext.js"; 

import './assets/scss/black-dashboard-react.scss';
import './assets/demo/demo.css';
import './assets/css/nucleo-icons.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import ThemeContextWrapper from './components/ThemeWrapper/ThemeWrapper';
import BackgroundColorWrapper from './components/BackgroundColorWrapper/BackgroundColorWrapper';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path='/' element={<Home />} />
            <Route path='/createorder' element={<CreateOrder />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path='*' element={<Home />} /> {/* Default route */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
