// src/admin/AdminLogin.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, type FormEvent } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

// Interface untuk data di dalam token
interface JwtPayload {
  role: string;
}

// Alamat API Backend Anda
const API_BASE_URL = 'http://localhost:5111'; // Sesuaikan port jika beda

export function AdminLogin() {
  useEffect(() => {
    document.title = 'Admin Login';
  }, []);

  // --- STATE UNTUK FORM ---
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook untuk redirect

  // --- FUNGSI UNTUK HANDLE SUBMIT ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    setError(null); // Bersihkan error lama

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // 1. Cek jika login GAGAL (status 401 dari controller)
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      // 2. Cek jika login SUKSES
      const token = data.token;
      if (token) {
        // Decode token untuk cek role
        const decoded = jwtDecode<JwtPayload>(token);

        // 3. Cek apakah rolenya 'admin'
        if (decoded.role === 'admin') {
          // 4. Simpan token dan redirect
          localStorage.setItem('token', token);
          navigate('/adminDashboard');
        } else {
          // Jika role bukan admin (misal 'member')
          throw new Error('You do not have permission to access this page.');
        }
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    }
  };

  return (
    <div className=" relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-900 to-purple-700 p-8 overflow-hidden">
      {/* ... (background divs tetap sama) ... */}
      <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat"></div>
      <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
      
      <main className="relative z-10 flex w-full max-w-8xl p-32">
        {/* ... (Bagian Kiri Teks tetap sama) ... */}
        <div className="flex w-3/4 flex-col justify-center text-white">
          <h1 className="text-9xl font-black text-shadow-lg/50">SMART SYSTEM</h1>
          <h1 className="text-9xl font-black text-cyanGrungeLight text-shadow-lg/50">PARKING</h1>
          <p className="mt-4 text-lg text-gray-200 pl-2 text-shadow-lg/75">
            Solusi parkir modern berbasis IoT. Silakan login untuk melanjutkan.
          </p>
        </div>

        {/* --- BAGIAN KANAN (FORM) DIUBAH --- */}
        <div className="w-1/4 rounded-xl bg-white p-8  opacity-90">
          <h2 className="text-4xl font-black text-gray-800 tracking-[.5rem]">ADMIN</h2>
          <p className="text-gray-600 font-bold tracking-[.25rem]">DASHBOARD</p>
          <hr className="my-2" />
          
          {/* Ganti <div> dengan <form> */}
          <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
            <div>
              <label className="block font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                placeholder="username"
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Tambah state
                required
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                placeholder="password"
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Tambah state
                required
              />
            </div>

            {/* Tampilkan pesan error jika ada */}
            {error && (
              <div className="text-red-600 text-sm font-medium p-2 bg-red-100 rounded-md">
                {error}
              </div>
            )}

            {/* Ganti <Link> dengan <button> */}
            <button 
              type="submit" // Tipe submit
              className="block w-full rounded-md bg-cyanGrungeLight p-3 mt-7 text-lg font-bold text-white shadow-lg hover:bg-cyanGrungeDark text-center"
            >
              Login
            </button>
          </form>

          {/* ... (Link Lupa Password tetap sama) ... */}
        </div>
      </main>
    </div>
  );
}