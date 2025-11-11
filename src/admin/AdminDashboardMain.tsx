// import { Link } from 'react-router-dom';

export function AdminDashboardMain() {
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
                        <p className="text-center text-gray-900 text-sm">25 cm</p>
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
                        <p className="text-center text-gray-900 text-sm">25 cm</p>
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
                        <p className="text-center text-gray-900 text-sm">25 cm</p>
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
                        <p className="text-center text-gray-900 text-sm">25 cm</p>
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
                <p className="text-center text-gray-900 text-lg">600 ppm</p>
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
                <p className="text-center text-gray-900 text-lg">safe</p>
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
                    <p className="text-center text-gray-900 text-lg">terbuka</p>
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
                    <p className="text-center text-gray-900 text-lg">terbuka</p>
                </div>
            </div>

            
        </div> 

    </div>
    
    
  );
}