// import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import hook
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

export function AdminDashboardMain() {

    // --- SEMUA HOOK DIPANGGIL DI DALAM SINI ---
      const [sensorData, setSensorData] = useState<SensorData | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      
      // Ini adalah perbaikannya: Panggil hook di DALAM komponen
      const navigate = useNavigate(); 
    
      
      // --- FUNGSI HELPER JUGA PINDAH KE DALAM SINI ---
      // (Ini diperlukan agar fungsi ini bisa 'melihat' const 'navigate')
      
      /**
       * Helper function untuk fetch data terbaru dari endpoint paginasi
       */
      async function fetchLatestSensorData(endpoint: string, dataKey: string, valueKey: string) {
        const token = localStorage.getItem('token');
    
        if (!token) {
          navigate('/adminLogin'); // Sekarang 'navigate' bisa diakses
          throw new Error('No token found');
        }
        
        const response = await fetch(`${API_BASE_URL}${endpoint}?page=1&limit=1`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem('token');
          navigate('/adminLogin'); // 'navigate' juga bisa diakses di sini
          throw new Error('Token is invalid or expired');
        }
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${endpoint}`);
        }
        
        const data = await response.json();
        
        if (data[dataKey] && data[dataKey].length > 0) {
          return data[dataKey][0][valueKey];
        } else {
          console.warn(`No data items found for ${endpoint} in key ${dataKey}`);
          return 0; // Kembalikan 0 jika tidak ada data
        }
      }
    
      
      // --- USE EFFECT TETAP DI DALAM SINI ---
      useEffect(() => {
        async function fetchData() {
          try {
            // Panggil helper function yang sekarang ada di dalam scope
            const [
              us1_distance,
              us2_distance,
              us3_distance,
              us4_distance,
              us5_distance,
              us6_distance,
              mq2_value,
              api_status
            ] = await Promise.all([
              // (endpoint, dataKey, valueKey)
              // Verifikasi 'dataKey' dan 'valueKey' ini di browser Anda!
              fetchLatestSensorData('/api/ultrasonic1', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/ultrasonic2', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/ultrasonic3', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/ultrasonic4', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/ultrasonic5', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/ultrasonic6', 'ultrasonics', 'distance'),
              fetchLatestSensorData('/api/mq2', 'mq2s', 'value'), // <-- ASUMSI
              fetchLatestSensorData('/api/flame_sensor', 'flame_sensors', 'value'), // <-- ASUMSI
            ]);
    
            // Interpretasikan data palang
            const palang1Status = us1_distance > 10 ? 'Terbuka' : 'Tertutup'; // <-- GANTI LOGIKA 10cm
            const palang2Status = us2_distance > 10 ? 'Terbuka' : 'Tertutup'; // <-- GANTI LOGIKA 10cm
    
            // Susun objek SensorData
            setSensorData({
              mq2: mq2_value,
              api: api_status,
              palang1: palang1Status,
              palang2: palang2Status,
              ultrasonic1: us1_distance,
              ultrasonic2: us2_distance,
              ultrasonic3: us3_distance,
              ultrasonic4: us4_distance,
              ultrasonic5: us5_distance,
              ultrasonic6: us6_distance,
            });
    
          } catch (e) {
            if (e instanceof Error) {
              setError(e.message);
            } else {
              setError('An unknown error occurred');
            }
          } finally {
            setLoading(false);
          }
        }
    
        fetchData(); // Panggil sekali saat load
        const intervalId = setInterval(fetchData, 2000); // Ulangi tiap 5 detik
        
        // Bersihkan interval
        return () => clearInterval(intervalId); 
        
      }, [navigate]); // Tambahkan 'navigate' sebagai dependency
    
      
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
    <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">

            <div className="w-full max-w-6xl p-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg flex flex-col col-span-2 row-span-3">
            
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
                        <h3 className="text-sm font-bold text-black uppercase">Ultrasonic 3 // Plot 1</h3>
                        <p className="text-sm text-gray-500 uppercase">Data</p>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">{sensorData.ultrasonic3} cm</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Ultrasonic 4 // Plot 2</h3>
                        <p className="text-sm text-gray-500 uppercase">Data</p>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">{sensorData.ultrasonic4} cm</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Ultrasonic 5 // Plot 3</h3>
                        <p className="text-sm text-gray-500 uppercase">Data</p>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">{sensorData.ultrasonic5} cm</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg text-gray-900">
                        <h3 className="text-sm font-bold text-black uppercase">Ultrasonic 6 // Plot 4</h3>
                        <p className="text-sm text-gray-500 uppercase">Data</p>
                        <div className="my-4 flex justify-center">
                            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center border-2 border-cyanGrungeLight">
                                <svg className="w-6 h-6 text-cyanGrungeLight" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h18m-7.5-3L21 9m0 0L16.5 4.5M21 9H3" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-center text-gray-900 text-sm">{sensorData.ultrasonic6} cm</p>
                    </div>
                </div>

            </div>
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
                <p className="text-center text-gray-900 text-lg">{sensorData.api}</p>
            </div>

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
                    <p className="text-center text-gray-900 text-lg">{sensorData.palang1}</p>
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
                    <p className="text-center text-gray-900 text-lg">{sensorData.palang2}</p>
                </div>
            </div>

            
        </div> 

    </div>
    
    
  );
}