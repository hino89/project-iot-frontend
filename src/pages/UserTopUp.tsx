// src/pages/UserDenahParkir.tsx
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export function UserTopUp() {
    useEffect(() => {
        document.title = 'User Top Up'; 
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
  
            {/* Ini adalah "satu card" Anda, dengan style yang konsisten 
                dari halaman User Dashboard & Denah.
            */}
            <div className="w-full max-w-4xl p-8 bg-gray-100 rounded-2xl shadow-lg flex flex-col">
                
                {/* 1. Judul Halaman */}
                <h1 className="text-3xl font-black tracking-[.25rem] text-gray-900">TOP UP KREDIT</h1>
                <p className="text-lg text-gray-600 mt-1">
                Pilih metode pembayaran yang Anda inginkan.
                </p>

                {/* 2. Daftar Metode Pembayaran (sebagai tombol) */}
                <div className="mt-8 space-y-4">
                
                {/* Opsi 1: E-Wallet */}
                <button className="w-full p-6 rounded-lg border-2 border-gray-300 hover:border-cyanGrungeLight hover:bg-gray-50 transition-colors flex items-center gap-4">
                    {/* Ikon E-Wallet */}
                    <svg className="w-8 h-8 text-cyanGrungeLight flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0A2.25 2.25 0 0 0 18.75 9.75H5.25A2.25 2.25 0 0 0 3 12m18 0V6A2.25 2.25 0 0 0 18.75 3.75H5.25A2.25 2.25 0 0 0 3 6v6" />
                    </svg>
                    <div>
                    <div className="text-lg font-bold text-gray-900 text-left">E-Wallet</div>
                    <div className="text-md text-gray-600 text-left">Gopay, OVO, Dana</div>
                    </div>
                </button>

                {/* Opsi 2: Virtual Account */}
                <button className="w-full p-6 rounded-lg border-2 border-gray-300 hover:border-cyanGrungeLight hover:bg-gray-50 transition-colors flex items-center gap-4">
                    {/* Ikon Bank */}
                    <svg className="w-8 h-8 text-cyanGrungeLight flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l-3-3m3 3l3 3m-3-3v6m6-6l3 3m-3-3l-3-3m3 3v6" />
                    </svg>
                    <div>
                    <div className="text-lg font-bold text-gray-900 text-left">Virtual Account</div>
                    <div className="text-md text-gray-600 text-left">BCA, Mandiri, BRI</div>
                    </div>
                </button>

                {/* Opsi 3: Retail */}
                <button className="w-full p-6 rounded-lg border-2 border-gray-300 hover:border-cyanGrungeLight hover:bg-gray-50 transition-colors flex items-center gap-4">
                    {/* Ikon Retail */}
                    <svg className="w-8 h-8 text-cyanGrungeLight flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h2.64m-13.5 0H2.36m11.14 0H18m0 0h2.64m-13.5 0H2.36M9 11.25v1.5c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125v-1.5M9 11.25V7.5a3 3 0 0 1 6 0v3.75m0 0H9m6 0h.008v.008H15v-.008Z" />
                    </svg>
                    <div>
                    <div className="text-lg font-bold text-gray-900 text-left">Retail</div>
                    <div className="text-md text-gray-600 text-left">Alfamart, Indomaret</div>
                    </div>
                </button>
                </div>

                {/* 3. Tombol Kembali (menggunakan <Link>) */}
                <Link 
                to="/userDashboard" // <-- Ganti dengan rute dashboard Anda
                className="w-full p-4 mt-8 rounded-lg border-2 border-cyanGrungeLight text-gray-500 text-lg font-medium hover:border-cyanGrungeDark transition-colors text-center"
                >
                Kembali ke User Dashboard
                </Link>

            </div>
            </main>
        </div>
    );
}