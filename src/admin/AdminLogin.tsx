// src/pages/LoginPage.tsx
// import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export function AdminLogin() {
    useEffect(() => {
        document.title = 'Admin Login'; 
      }, []);
  return (
    // ==========================================================
    // 1. "background halaman nya"
    // 100% layar (h-screen w-screen)
    // 'flex' untuk nge-center 'main container'
    // 3 layer background, bg-gradient, bg-img, bg-black-opacity
    // ==========================================================
    <div className=" relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-blue-900 to-purple-700 p-8 overflow-hidden">
        <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat"></div>
        <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
      
      {/* ==========================================================
            2. "1 main container"
                pakai 'flex' untuk nge-split "2 bagian"
      ========================================================== */}
      <main className="relative z-10 flex w-full max-w-8xl p-32">
        
        {/* ==========================================================
            3. "Bagian Kiri" (Teks "Smart System Parking")
                set lebarnya 50% (w-3/4)
        ========================================================== */}
        <div className="flex w-3/4 flex-col justify-center text-white">
          <h1 className="text-9xl font-black text-shadow-lg/50">SMART SYSTEM</h1>
          <h1 className="text-9xl font-black text-cyanGrungeLight text-shadow-lg/50">PARKING</h1>
          <p className="mt-4 text-lg text-gray-200 pl-2 text-shadow-lg/75">
            Solusi parkir modern berbasis IoT. Silakan login untuk melanjutkan.
          </p>
        </div>

        {/* ==========================================================
            4. "Bagian Kanan" (Card Login)
                set lebar card putih 25% (w-1/4) di kanan.
        ========================================================== */}
        <div className="w-1/4 rounded-xl bg-white p-8  opacity-90">
          
          <h2 className="text-4xl font-black text-gray-800 tracking-[.5rem]">ADMIN</h2>
          <p className="text-gray-600 font-bold tracking-[.25rem]">DASHBOARD</p>
          <hr className="my-2" />
          
          {/* Ini adalah "struktur dasar" form-nya */}
          <div className="space-y-5 mt-4">
            <div>
              <label className="block font-medium text-gray-700">Username</label>
              <input 
                type="text" 
                placeholder="username"
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm" 
              />
            </div>
            <div>
              <label className="block font-medium text-gray-700">Password</label>
              <input 
                type="password" 
                placeholder="password"
                className="mt-1 w-full rounded-md border border-gray-300 p-3 shadow-sm" 
              />
            </div>
            <Link to="/adminDashboard" className="block w-full rounded-md bg-cyanGrungeLight p-3 mt-7 text-lg font-bold text-white shadow-lg hover:bg-cyanGrungeDark text-center">
              Login
            </Link>
          </div>

          {/* Link kembali ke Home */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-cyanGrungeLight hover:underline">
              Lupa Password?
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}