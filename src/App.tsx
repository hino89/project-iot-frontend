// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './index.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function App() {
  useEffect(() => {
    document.title = 'Home Page'; 
  }, []);
  
  return (
    <>
      <div className=" relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#40C0D0] to-[#2C8C99] p-8 overflow-hidden">
        <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat"></div>
        <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>

        <main className="relative z-10 flex w-full max-w-8xl p-32">
        
        {/* ==========================================================
            3. "Bagian Kiri" (Teks "Smart System Parking")
                set lebarnya 50% (w-3/4)
        ========================================================== */}
        <div className="flex w-4/4 flex-col justify-center text-white">
          <h1 className="text-9xl font-black text-shadow-lg/50">SMART SYSTEM</h1>
          <h1 className="text-9xl font-black text-cyanGrungeLight text-shadow-lg/50">PARKING</h1>
          <p className="mt-4 text-lg text-gray-200 pl-2 text-shadow-lg/75">
            Solusi parkir modern berbasis IoT. Silakan pilih kategori pengguna untuk melanjutkan.
          </p>
        </div>

        <div className="w-1/4 rounded-xl bg-white p-8  opacity-90">
          
            <h2 className="text-4xl font-black text-gray-800 tracking-[.5rem]">SELAMAT</h2>
            <p className="text-gray-600 font-bold tracking-[.25rem]">DATANG</p>
            <hr className="my-2" />
          
            <div className="space-y-5 mt-4">
              <Link to="/adminLogin" className="block w-full rounded-md bg-pinkGrungeLight p-3 mt-7 text-lg font-bold text-white shadow-lg hover:bg-pinkGrungeDark text-center">
                Admin Login
              </Link>
              <Link to="/login" className="block w-full rounded-md bg-pinkGrungeLight p-3 mt-7 text-lg font-bold text-white shadow-lg hover:bg-pinkGrungeDark text-center">
                User Login
              </Link>
            </div>
          </div>

        </main>

      </div>

    </>
  );
}
