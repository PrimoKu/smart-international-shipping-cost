import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Home from './layouts/Home/Home.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import CreateOrder from './components/CreateOrder/CreateOrder.js';
import AdminLayout from './layouts/Admin/Admin.js';

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
        <Routes>
          <Route path='/admin/*' element={<AdminLayout />} />
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/createorder' element={<CreateOrder />} />
          <Route path='*' element={<Home />} /> {/* Default route */}
        </Routes>
      </BrowserRouter>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>
);
