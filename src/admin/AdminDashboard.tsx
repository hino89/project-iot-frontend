// src/pages/AdminDashboard.tsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

interface TitleInfo {
  main: string;
  sub: string;
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
    // 2. GUNAKAN hook useLocation
    const location = useLocation();

    // 3. Tentukan judul berdasarkan location.pathname
    // Cari judul yang cocok, atau gunakan default 'Main' jika tidak ketemu
    const currentTitle = routeTitles[location.pathname] || { main: "Main", sub: "DASHBOARD" };

    useEffect(() => {
        // 4. (Opsional) Setel judul dokumen juga
        document.title = `Admin - ${currentTitle.main}`; 
    }, [currentTitle]); // Update judul saat currentTitle berubah

  return (
    <div className=" relative flex h-screen w-screen bg-gradient-to-br from-blue-900 to-purple-700 overflow-hidden text-white">
      <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat opacity-30"></div>
      <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
      
      {/* ==========================================================
            2. "Sidebar"
            Teks dan garis diubah menjadi gelap
      ========================================================== */}
      <aside className="relative z-10 w-64 flex-shrink-0 p-6 flex flex-col bg-white/90 backdrop-blur-sm">
          
          {/* Sidebar Title (Teks diubah ke 'text-gray-900', border ke 'border-gray-900/30') */}
          <div className="pb-4 border-b border-gray-900/30">
              <h1 className="text-gray-900 text-lg font-black tracking-[.25rem] uppercase">ADMIN</h1>
              <h2 className="text-gray-700 text-sm uppercase opacity-70">DASHBOARD</h2>
          </div>

          {/* Nav Menu (Teks diubah ke 'text-gray-600', hover ke 'hover:bg-black/10' dan 'hover:text-black') */}
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
              <Link to="/adminDashboard/denah" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Denah
              </Link>
              <Link to="/adminDashboard/statistics" className="block p-3 rounded-md text-gray-600 font-medium hover:bg-black/10 hover:text-black transition-colors">
                  Statistik
              </Link>
          </nav>
      </aside>

      {/* ==========================================================
            3. "Content Area"
      ========================================================== */}
      <div className="relative z-10 flex-1 flex flex-col h-full">
          {/* --- TOP BAR (STATIS) --- */}
          <header className="flex-shrink-0 border-b border-gray-900/30 p-6 pb-4 flex justify-between items-center bg-white/90 backdrop-blur-sm ml-1">
              <div>
                {/* 5. GUNAKAN variabel currentTitle di sini */}
                  <h1 className="text-xl font-black tracking-[.25rem] text-gray-900 uppercase">{currentTitle.main}</h1>
                  <h2 className="text-sm text-gray-500 uppercase">{currentTitle.sub}</h2>
              </div>
              <Link to="/adminLogin" className="px-6 py-2 rounded-lg bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-colors shadow-lg">
                  Logout
              </Link>
          </header>

          {/* --- KONTEN UTAMA (SCROLLABLE) --- */}
          <div className="flex-1 p-8 overflow-y-auto">
                <Outlet />
          </div> 
      </div> 
    </div>
  );
}