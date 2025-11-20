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
// ... (import user lainnya) ...

// --- IMPORT SEMUA KOMPONEN ADMIN ---
import { AdminLogin } from './admin/AdminLogin.tsx';
import { AdminDashboard } from './admin/AdminDashboard.tsx';
import { AdminDashboardMain } from './admin/AdminDashboardMain.tsx';
import { AdminDashboardSensors } from './admin/AdminDashboardSensors.tsx';
import { AdminDashboardStatistics } from './admin/AdminDashboardStatistics.tsx';
import { AdminDashboardUsers } from './admin/AdminDashboardUsers.tsx';
import { AdminDashboardDenah } from './admin/AdminDashboardDenah.tsx';
import { AdminDashboardRfid } from './admin/AdminDashboardRfid.tsx';
import { AdminDashboardTransactions } from './admin/AdminDashboardTransactions.tsx';

// --- IMPORT KOMPONEN PELINDUNG ---
import { AdminProtectedRoute } from './admin/AdminProtectedRoute.tsx';
import { AdminGuestRoute } from './admin/AdminGuestRoute.tsx';
import { UserDashboard } from './pages/UserDashboard.tsx';
import { UserDenahParkir } from './pages/UserDenahParkir.tsx';
import { UserTopUp } from './pages/UserTopUp.tsx';

// ==========================================================
// Routers
// ==========================================================
const router = createBrowserRouter([
  // ... (rute untuk '/', '/login', '/userDashboard', dll tetap sama) ...
  {
    path: "/", 
    element: <App />, 
  },
  {
    path: "/login", 
    element: <UserLoginPage />, // (Asumsi ini juga dibungkus GuestRoute user)
  },
  {
    path: "/userDashboard", 
    element: <UserDashboard />, // (Asumsi ini juga dibungkus ProtectedRoute user)
  },
  {
    path: "/userDenahParkir", 
    element: <UserDenahParkir />,
  },
  {
    path: "/userTopUp", 
    element: <UserTopUp />,
  },

  // --- INI BAGIAN PENTING YANG DIUBAH ---
  {
    path: "/adminLogin", 
    element: (
      <AdminGuestRoute>
        <AdminLogin />
      </AdminGuestRoute>
    ),
  },
  {
    path: "/adminDashboard", 
    element: (
      <AdminProtectedRoute>
        <AdminDashboard />
      </AdminProtectedRoute>
    ),
    // Semua children di sini OTOMATIS terproteksi
    // karena induknya (/adminDashboard) sudah diproteksi
    children: [
      {
        index: true, 
        element: <AdminDashboardMain />,
      },
      {
        path: 'sensors',
        element: <AdminDashboardSensors />,
      },
      {
        path: 'statistics',
        element: <AdminDashboardStatistics />,
      },
      {
        path: 'users',
        element: <AdminDashboardUsers />,
      },
      {
        path: 'denah',
        element: <AdminDashboardDenah />,
      },
      {
        path: 'rfid',
        element: <AdminDashboardRfid />,
      },
      {
        path: 'transactions',
        element: <AdminDashboardTransactions />,
      },
    ],
  }
  // Hapus rute /adminDashboard yang duplikat (jika ada)
]);
// ==========================================================

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} /> 
  </React.StrictMode>,
)