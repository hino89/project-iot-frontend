// src/pages/UserDenahParkir.tsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function UserDenahParkir() {
    useEffect(() => {
        document.title = 'User Denah Parkir'; 
    }, []);
 
    return (
        // Background Halaman
        <div className=" relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#40C0D0] to-[#2C8C99] p-8 overflow-hidden">
        <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat"></div>
        <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
        
        {/* ==========================================================
            2. "1 main container"
            ========================================================== */}

        {/* Kontainer <main> ini adalah 'halaman' dengan padding,
            yang menengahkan 'card' di dalamnya.
        */}
        <main className="relative z-10 w-full max-w-8xl p-32 flex flex-col items-center">

            {/* Ini adalah "satu bagian" (card) seperti di gambar,
                dengan styling yang sudah ada.
            */}
            <div className="w-full max-w-6xl p-8 bg-gray-100 rounded-2xl shadow-lg flex flex-col">
            
                {/* 1. Judul Halaman (style dari User Dashboard) */}
                <h1 className="text-3xl font-black tracking-[.25rem] text-gray-900">DENAH PARKIR</h1>
                <p className="text-lg text-gray-600 mt-1">
                    Peta layout area parkir.
                </p>

                {/* 2. Placeholder Peta (style dari User Dashboard) */}
                <div className="w-full h-[500px] rounded-lg mt-8 flex items-center justify-center bg-[url('/public/Parkingx4.png')] bg-contain bg-center bg-no-repeat">

                </div>
                <div className="grid grid-cols-4 gap-2 pt-6 w-full mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Plot 1</h3>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">Kosong</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Plot 2</h3>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">Kosong</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Plot 3</h3>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">Kosong</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Plot 4</h3>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">Kosong</p>
                    </div>
                </div>

                {/* 3. Tombol Kembali (style dari tombol sekunder) */}
                <Link 
                    to="/userDashboard" // Ganti dengan rute dashboard Anda yang benar
                    className="w-full p-4 mt-8 rounded-lg border-2 border-cyanGrungeLight text-gray-500 text-lg font-medium hover:border-cyanGrungeDark transition-colors text-center"
                >
                    Kembali ke User Dashboard
                </Link>

            </div>
        </main>
        </div>
    );
}