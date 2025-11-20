// src/admin/AdminDashboard.tsx
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'; // 1. Import useState
import { jwtDecode } from 'jwt-decode'; // 2. Import jwt-decode

// Interface untuk Title
interface TitleInfo {
  main: string;
  sub: string;
}

// Interface untuk data di dalam token
interface JwtPayload {
  username: string;
  role: string;
}

const routeTitles: Record<string, TitleInfo> = {
  "/adminDashboard": { main: "Main", sub: "DASHBOARD" },
  "/adminDashboard/sensors": { main: "Sensors", sub: "DASHBOARD" },
  "/adminDashboard/users": { main: "User List", sub: "DASHBOARD" },
  "/adminDashboard/denah": { main: "Denah", sub: "DASHBOARD" },
  "/adminDashboard/statistics": { main: "Statistics", sub: "DASHBOARD" },
  "/adminDashboard/transactions": { main: "Transactions", sub: "DASHBOARD" },
  "/adminDashboard/rfid": { main: "RFID Tables", sub: "DASHBOARD" }
};

export function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // 3. Buat state baru untuk menyimpan nama user
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const currentTitle = routeTitles[location.pathname] || { main: "Main", sub: "DASHBOARD" };

  useEffect(() => {
      document.title = `Admin - ${currentTitle.main}`; 
  }, [currentTitle]);

  // 4. Gunakan useEffect untuk mengambil nama user dari token
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Cek jika token ada
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setActiveUser(decoded.username); // Simpan username ke state
      } catch (error) {
        // Jika token rusak atau tidak valid
        console.error("Failed to decode token:", error);
        handleLogout(); // Tendang user jika token bermasalah
      }
    } else {
      // Jika tidak ada token (seharusnya sudah dicegah ProtectedRoute,
      // tapi ini untuk keamanan ganda)
      handleLogout();
    }
  }, []); // [] berarti useEffect ini hanya berjalan sekali saat komponen dimuat

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/adminLogin');
  };

  return (
    <div className=" relative flex h-screen w-screen bg-gradient-to-br from-blue-900 to-purple-700 overflow-hidden text-white">
      {/* ... (background divs tetap sama) ... */}
      <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat opacity-30"></div>
      <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
      
      {/* ==========================================================
            Sidebar
      ========================================================== */}
      <aside className="relative z-10 w-64 flex-shrink-0 p-6 flex flex-col bg-white/90 backdrop-blur-sm">
          
          {/* Sidebar Title (Tetap sama) */}
          <div className="pb-4 border-b border-gray-900/30">
              <h1 className="text-gray-900 text-lg font-black tracking-[.25rem] uppercase">ADMIN</h1>
              <h2 className="text-gray-700 text-sm uppercase opacity-70">DASHBOARD</h2>
          </div>

          {/* Nav Menu (Tetap sama, 'flex-grow' PENTING) */}
          {/* 'flex-grow' akan mendorong elemen di bawahnya ke dasar sidebar */}
          <nav className="flex-grow mt-8 space-y-2">
            <Link to="/adminDashboard" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Main
              </Link>
              <Link to="/adminDashboard/sensors" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Sensors
              </Link>
              <Link to="/adminDashboard/users" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  User List
              </Link>
              <Link to="/adminDashboard/transactions" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Transactions
              </Link>
              <Link to="/adminDashboard/rfid" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  RFID Tables
              </Link>
              <Link to="/adminDashboard/statistics" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Statistics
              </Link>
          </nav>

          {/* ==========================================================
                5. TAMPILAN USER BARU (DI BAWAH)
          ========================================================== */}
          <div className="pt-4 border-t border-gray-900/30">
              <p className="text-xs text-gray-500">Selamat Datang,</p>
              
              {/* 'capitalize' akan mengubah "tamaAdmin" -> "Tamaadmin" */}
              {/* 'truncate' akan memberi '...' jika namanya terlalu panjang */}
              <p className="text-gray-900 font-bold capitalize truncate">
                  {activeUser ? activeUser : 'Memuat...'}
              </p>
          </div>
      </aside>

      {/* ==========================================================
            Content Area
      ========================================================== */}
      <div className="relative z-10 flex-1 flex flex-col h-full">
          {/* --- TOP BAR (STATIS) --- */}
          <header className="flex-shrink-0 border-b border-gray-900/30 p-6 pb-4 flex justify-between items-center bg-white/90 backdrop-blur-sm ml-1">
              <div>
                  <h1 className="text-xl font-black tracking-[.25rem] text-gray-900 uppercase">{currentTitle.main}</h1>
                  <h2 className="text-sm text-gray-500 uppercase">{currentTitle.sub}</h2>
              </div>
              
              {/* Tombol Logout (Tetap sama) */}
              <button 
                onClick={handleLogout}
                className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors shadow-lg">
                  Logout
              </button>
          </header>

          {/* --- KONTEN UTAMA (SCROLLABLE) --- */}
          <div className="flex-1 p-8 overflow-y-auto">
                <Outlet />
          </div> 
      </div> 
    </div>
  );
}