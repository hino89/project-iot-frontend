// src/pages/LoginPage.tsx
// import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export function UserDashboard() {
  useEffect(() => {
    document.title = 'User Dashboard'; 
  }, []);
      
  return (
    <div className=" relative flex h-screen w-screen items-center justify-center bg-gradient-to-br from-[#40C0D0] to-[#2C8C99] p-8 overflow-hidden">
      <div className="absolute -top-3/12 -left-1/12 w-[60vw] h-[60vw] transform -rotate-10 bg-[url('/public/BG-CAR.png')] bg-contain bg-center bg-no-repeat"></div>
      <div className="absolute -top-3/4 -left-1/4 w-[100vw] h-[100vw] transform -rotate-10 bg-black opacity-50"></div>
      
      {/* ==========================================================
            2. "1 main container"
                pakai 'flex' untuk nge-split "3 bagian"
      ========================================================== */}
      {/* Container <main> ini adalah 'halaman' Anda, dengan padding.
      Saya tambahkan 'flex-col items-center' untuk menengahkan card.
      */}
      <main className="relative z-10 w-full max-w-8xl p-32 flex flex-col items-center">
        
        {/* Ini adalah Card Dashboard utama dari gambar.
          Dia ada DI DALAM <main> dan sekarang dibagi 2 kolom (1/3 dan 2/3).
        */}
        <div className="flex w-full max-w-6xl rounded-2xl overflow-hidden shadow-lg bg-gray-100">
          
          {/* KOLOM 1 (KIRI)
            - w-1/3: Lebarnya sepertiga
            - flex flex-col: Menumpuk "2 kotak" secara vertikal
            - justify-start: Memulai tumpukan dari atas
            - gap-8: Memberi jarak antar "2 kotak"
          */}
          <div className="w-1/3 p-8 bg-gray-200 border-r-1 border-gray-400 flex flex-col justify-start gap-8">
            
            {/* --- KOTAK 1: PROFIL --- */}
            <div className="flex flex-col border-b border-gray-400 items-center w-full">
              {/* 'overflow-hidden' ditambahkan ke div untuk "memotong" 
                sudut gambar yang kotak.
              */}
              <div className="w-32 h-32 bg-gray-400 rounded-full mb-4 overflow-hidden">
                  <img 
                      src="https://arknights.wiki.gg/images/thumb/Ch%27en_Skin_2_icon.png/120px-Ch%27en_Skin_2_icon.png?6bb5cd" 
                      alt="Profile Picture" 
                      // 'w-full h-full' membuat gambar mengisi div
                      // 'object-cover' memastikan gambar menutupi area tanpa terdistorsi
                      className="w-full h-full object-cover" 
                  />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-8">
                (( NAMA USER ))
              </h2>
            </div>

            {/* --- KOTAK 2: LOKASI --- */}
            <div className="w-full">
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-wider">Lokasi Parkir Saat Ini</h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Placeholder Ikon Lokasi */}
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-800">Mall XYZ</span>
                </div>
                <div className="flex items-center gap-3">
                  {/* Placeholder Ikon Peta */}
                  <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-.553-.894L15 2m0 15V2" />
                  </svg>
                  <span className="text-gray-800">Bandar Lampung, Lampung</span>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM 2 (KANAN)
            - Ini adalah "1 kotak" Anda, sekarang diisi dengan konten dari gambar baru.
          */}
          <div className="w-2/3 p-8">
            
            {/* --- KOTAK 3: DASHBOARD --- */}
            <h1 className="text-3xl font-black text-gray-900 tracking-[.25rem]">USER DASHBOARD</h1>
            <p className="text-lg text-gray-600 mt-1">
              Selamat datang, {/* Ganti {userName} dengan data Anda */}
            </p>

            {/* Konten Waktu Parkir (Box Ungu dari style sebelumnya) */}
            <div className="mt-8 bg-pinkGrungeLight text-white p-6 rounded-xl flex items-center gap-4">
              {/* Placeholder Ikon Waktu */}
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <span className="text-sm uppercase opacity-80">Waktu Parkir (Sesi Ini)</span>
                <div className="text-4xl font-bold tracking-[.25rem]">08:10:54</div>
              </div>
            </div>

            {/* --- Elemen Baru Di Bawah Timer --- */}
            
            {/* Grid untuk Sisa Kredit & Status Parkir */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <span className="text-sm uppercase text-gray-500">Sisa Kredit Anda</span>
                <div className="text-3xl font-bold text-gray-900">Rp 50.000</div>
              </div>
              <div>
                <span className="text-sm uppercase text-gray-500">Status Parkir</span>
                {/* Menggunakan warna ungu primer untuk status 'INSIDE' */}
                <div className="text-3xl font-bold text-pinkGrungeLight">INSIDE</div>
              </div>
            </div>

            {/* Total Waktu Parkir */}
            <div className="mt-8">
              <span className="text-sm uppercase text-gray-500">Total Waktu Parkir (Bulan Ini)</span>
              <div className="text-3xl font-bold text-gray-900">48.5 Jam</div>
            </div>

            {/* Grup Tombol */}
            <div className="flex flex-col gap-4 mt-12">
              
              {/* Baris untuk Tombol Aksi Utama */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Tombol Primer (sekarang <Link>) */}
                <Link 
                  to="/userTopUp" // <-- Ganti dengan rute Anda
                  className="w-full p-4 rounded-lg bg-cyanGrungeLight text-white text-lg font-medium hover:bg-cyanGrungeDark transition-colors flex items-center justify-center gap-2"
                >
                  {/* Ikon Top Up (BanknotesIcon) */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m3-3.75l-3-3m3 3l3 3m-3-3v6m6-6l3 3m-3-3l-3-3m3 3v6" />
                  </svg>
                  Top Up Kredit
                </Link>
                
                {/* Tombol Sekunder (sekarang <Link>) */}
                <Link 
                  to="/userDenahParkir" // <-- Ganti dengan rute Anda (misal: /user-denah)
                  className="w-full p-4 rounded-lg border-2 border-cyanGrungeLight text-gray-500 text-lg font-medium hover:border-cyanGrungeDark transition-colors flex items-center justify-center gap-2"
                >
                  {/* Ikon Denah (MapIcon) */}
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-.553-.894L15 2m0 15V2" />
                  </svg>
                  Lihat Denah Parkir
                </Link>
              </div>

              {/* Baris untuk Tombol Logout (sekarang <Link>) */}
              <div className="flex justify-end w-full mt-4">
                <Link 
                  to="/login" // <-- Ganti dengan rute Anda
                  className="px-4 py-2 rounded-lg text-purpleGrungeLight text-lg font-bold hover:underline transition-colors"
                >
                  Logout
                </Link>
              </div>

            </div>
            
          </div>
        </div>
      </main>
    </div>
  );
}