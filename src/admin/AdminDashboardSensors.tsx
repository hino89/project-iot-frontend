// src/admin/AdminDashboardSensors.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook
import { io } from 'socket.io-client'; // Import Client Socket

// Alamat API Backend Anda
const API_BASE_URL = 'http://localhost:5111';

// Definisikan tipe datanya
interface SensorData {
  mq2: number;
  api: string;
  palang1: string;
  palang2: string;
  ultrasonic1: number;
  ultrasonic2: number;
  ultrasonic3: number;
  ultrasonic4: number;
  ultrasonic5: number;
  ultrasonic6: number;
}


// ==========================================================
// KOMPONEN UTAMA
// ==========================================================
export function AdminDashboardSensors() {
  
  // --- SEMUA HOOK DIPANGGIL DI DALAM SINI ---
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Ini adalah perbaikannya: Panggil hook di DALAM komponen
  const navigate = useNavigate(); 

  async function fetchInitialData() {
    try {
        // Helper kecil untuk fetch satu sensor
        const fetchOne = async (endpoint: string, dataKey: string, valueKey: string) => {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token');
            
            const res = await fetch(`${API_BASE_URL}${endpoint}?page=1&limit=1`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            
            if (res.status === 401) {
                localStorage.removeItem('token');
                navigate('/adminLogin');
                throw new Error('Unauthorized');
            }
            
            const json = await res.json();
            return (json[dataKey] && json[dataKey].length > 0) ? json[dataKey][0][valueKey] : 0;
        };

        // Panggil semua (Promise.all)
        const [us1, us2, us3, us4, us5, us6, mq2, api] = await Promise.all([
            fetchOne('/api/ultrasonic1', 'ultrasonics', 'distance'),
            fetchOne('/api/ultrasonic2', 'ultrasonics', 'distance'),
            fetchOne('/api/ultrasonic3', 'ultrasonics', 'distance'),
            fetchOne('/api/ultrasonic4', 'ultrasonics', 'distance'),
            fetchOne('/api/ultrasonic5', 'ultrasonics', 'distance'),
            fetchOne('/api/ultrasonic6', 'ultrasonics', 'distance'),
            fetchOne('/api/mq2', 'mq2s', 'value'),
            fetchOne('/api/flame_sensor', 'flame_sensors', 'value'),
        ]);

        setSensorData({
            ultrasonic1: us1, ultrasonic2: us2, ultrasonic3: us3,
            ultrasonic4: us4, ultrasonic5: us5, ultrasonic6: us6,
            mq2: mq2, api: api,
            palang1: us1 > 10 ? 'Terbuka' : 'Tertutup',
            palang2: us2 > 10 ? 'Terbuka' : 'Tertutup'
        });
    } catch (err) {
        console.error(err);
        // Jangan set error full page kalau gagal socket, cukup log saja
    } finally {
        setLoading(false);
    }
  }


  useEffect(() => {
    // 1. Ambil data awal via HTTP biasa (biar gak kosong pas loading)
    fetchInitialData();

    // 2. BUKA KONEKSI SOCKET
    const socket = io(API_BASE_URL);

    // 3. PASANG TELINGA (LISTENERS) UNTUK TIAP SENSOR
    
    // Dengar Ultrasonic 1
    socket.on('update_ultrasonic1', (newData) => {
        setSensorData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                ultrasonic1: newData.distance,
                // Update Palang 1 Real-time
                palang1: newData.distance > 10 ? 'Terbuka' : 'Tertutup' 
            };
        });
    });

    // Dengar Ultrasonic 2
    socket.on('update_ultrasonic2', (newData) => {
        setSensorData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                ultrasonic2: newData.distance,
                // Update Palang 2 Real-time
                palang2: newData.distance > 10 ? 'Terbuka' : 'Tertutup'
            };
        });
    });

    // Dengar Ultrasonic 3 s/d 6 (Pola sama)
    socket.on('update_ultrasonic3', (d) => setSensorData(prev => prev ? {...prev, ultrasonic3: d.distance} : null));
    socket.on('update_ultrasonic4', (d) => setSensorData(prev => prev ? {...prev, ultrasonic4: d.distance} : null));
    socket.on('update_ultrasonic5', (d) => setSensorData(prev => prev ? {...prev, ultrasonic5: d.distance} : null));
    socket.on('update_ultrasonic6', (d) => setSensorData(prev => prev ? {...prev, ultrasonic6: d.distance} : null));

    // Dengar MQ2
    socket.on('update_mq2_1', (d) => {
         setSensorData(prev => prev ? {...prev, mq2: d.value} : null);
    });

    // Dengar Flame
    socket.on('update_flame1', (d) => {
         setSensorData(prev => prev ? {...prev, api: d.value} : null); // Asumsi d.value (sesuai controller)
    });

    // 4. CLEANUP (Tutup koneksi saat pindah halaman)
    return () => {
        socket.disconnect();
    };
  }, []); // Dependency kosong

  
  // --- RENDER CONTENT (TIDAK BERUBAH) ---
  if (loading) {
    return <div className="p-24 text-white text-center">Loading sensor data...</div>;
  }
  if (error) {
    return <div className="p-24 text-red-500 text-center">Error: {error}</div>;
  }
  if (!sensorData) {
    return <div className="p-24 text-white text-center">No data found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-24">
        {/* --- Sensor Mq2 --- */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-lg font-bold text-black uppercase">Sensor Mq2</h3>
            <p className="text-sm text-gray-500 uppercase">Data</p>
            <div className="my-4 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300 relative">
                    <div className="absolute inset-4 rounded-full border-[12px] border-t-cyan-500 border-r-cyan-500 border-b-cyan-500 border-l-transparent transform -rotate-45"></div>
                </div>
            </div>
            <p className="text-center text-gray-900 text-lg">{sensorData.mq2} ppm</p>
        </div>

        {/* --- Sensor Api (Flame Sensor) --- */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
            <h3 className="text-lg font-bold text-black uppercase">Sensor Api</h3>
            <p className="text-sm text-gray-500 uppercase">Data</p>
            <div className="my-4 flex justify-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                    <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-3.867 8.21 8.21 0 0 0 3 -.52Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 3.75 3.75 0 0 0-1.993-1.11a3.75 3.75 0 0 0-1.423 1.11A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                </div>
            </div>
            <p className="text-center text-gray-900 text-lg capitalize">{sensorData.api}</p>
        </div>

        {/* --- Status Palang 1 & 2 --- */}
        <div className="grid grid-cols-2 gap-6 w-full mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Status Palang 1</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                        <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5v-1.5c0-.621.504-1.125 1.125-1.125h.008c.621 0 1.125.504 1.125 1.125v1.5" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg capitalize">{sensorData.palang1}</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Status Palang 2</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full bg-purple-100 flex items-center justify-center border-4 border-purple-200">
                        <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5v-1.5c0-.621.504-1.125 1.125-1.125h.008c.621 0 1.125.504 1.125 1.125v1.5" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg capitalize">{sensorData.palang2}</p>
            </div>
        </div>

        {/* --- Ultrasonic 1 & 2 (Debug) --- */}
        <div className="grid grid-cols-2 gap-6 w-full mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 1 // Palang 1</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-cyanGrungeLight">
                        <svg className="w-16 h-16 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic1} cm</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 2 // Palang 2</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-redGrungeLight">
                        <svg className="w-16 h-16 text-redGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic2} cm</p>
            </div>
        </div>

        {/* --- Ultrasonic 3 & 4 (Plot) --- */}
        <div className="grid grid-cols-2 gap-6 w-full mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 3 // Plot 1</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-yellowGrungeLight">
                        <svg className="w-16 h-16 text-yellowGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic3} cm</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 4 // Plot 2</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-purpleGrungeLight">
                        <svg className="w-16 h-16 text-purpleGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic4} cm</p>
            </div>
        </div>

        {/* --- Ultrasonic 5 & 6 (Plot) --- */}
        <div className="grid grid-cols-2 gap-6 w-full mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 5 // Plot 3</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-pinkGrungeLight">
                        <svg className="w-16 h-16 text-pinkGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic5} cm</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg text-gray-900">
                <h3 className="text-lg font-bold text-black uppercase">Ultrasonic 6 // Plot 4</h3>
                <p className="text-sm text-gray-500 uppercase">Data</p>
                <div className="my-4 flex justify-center">
                    <div className="w-32 h-32 mx-auto rounded-full flex items-center justify-center border-4 border-cyanGrungeLight">
                        <svg className="w-16 h-16 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                        </svg>
                    </div>
                </div>
                <p className="text-center text-gray-900 text-lg">{sensorData.ultrasonic6} cm</p>
            </div>
        </div>
    </div>
  );
}