// src/admin/AdminProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Definisikan interface untuk data di dalam token
interface JwtPayload {
  id: string;
  username: string;
  role: string; // Ini yang paling penting
  iat: number;
}

const isAdmin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false; // Tidak ada token
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    // Cek apakah rolenya 'admin'
    return decoded.role === 'admin';
  } catch (error) {
    console.error("Failed to decode token:", error);
    return false; // Token tidak valid
  }
};

export const AdminProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAdmin()) {
    // Jika bukan admin, tendang ke halaman login
    return <Navigate to="/adminLogin" replace />;
  }

  // Jika admin, tampilkan halaman yang diminta (misal: dashboard)
  return <>{children}</>;
};