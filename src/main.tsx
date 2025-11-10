// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 

import './index.css' 

import { App } from './App.tsx' 
import { UserLoginPage } from './pages/UserLoginPage.tsx' 
import { UserDashboard } from './pages/UserDashboard.tsx';
import { AdminLogin } from './admin/AdminLogin.tsx';
import { AdminDashboard } from './admin/AdminDashboard.tsx';
import { UserDenahParkir } from './pages/UserDenahParkir.tsx';
import { UserTopUp } from './pages/UserTopUp.tsx';
import { AdminDashboardMain } from './admin/AdminDashboardMain.tsx';
import { AdminDashboardSensor } from './admin/AdminDashboardSensors.tsx';
import { AdminDashboardStatistics } from './admin/AdminDashboardStatistics.tsx';

// ==========================================================
// Routers
// ==========================================================
const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/login", 
    element: <UserLoginPage />,
  },
  {
    path: "/userDashboard", 
    element: <UserDashboard />,
  },
  {
    path: "/adminLogin", 
    element: <AdminLogin />,
  },
  {
    path: "/adminDashboard", 
    element: <AdminDashboard />,
  },
  {
    path: "/userDenahParkir", 
    element: <UserDenahParkir />,
  },
  {
    path: "/userTopUp", 
    element: <UserTopUp />,
  },
  {
    path: '/adminDashboard',
      element: <AdminDashboard />, // Ini adalah elemen layout/induk
      children: [
        {
          index: true, // <-- "index: true" berarti ini halaman default untuk /admin
          element: <AdminDashboardMain />,
        },
        {
          path: 'sensors', // <-- Perhatikan: 'sensors', BUKAN '/admin/sensors'
          element: <AdminDashboardSensor />,
        },
        {
          path: 'statistics',
          element: <AdminDashboardStatistics />,
        },
        // {
        //   path: 'users',
        //   element: <UserListPage />,
        // },
        // {
        //   path: 'denah',
        //   element: <DenahPage />,
        // },
      ],
    }
]);
// ==========================================================


// React DOM stuff
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)