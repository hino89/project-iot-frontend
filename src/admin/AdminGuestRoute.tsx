// src/admin/AdminGuestRoute.tsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: string;
}

const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
};

export const AdminGuestRoute = ({ children }: { children: React.ReactNode }) => {
  if (isAdmin()) {
    // Jika sudah login admin, tendang ke dashboard
    return <Navigate to="/adminDashboard" replace />;
  }

  // Jika belum login, tampilkan halaman (misal: login)
  return <>{children}</>;
};