import { useState } from "react";
import { MapPin, Navigation, Map as MapIcon, Globe, Radio, Sparkles } from "lucide-react";

export default function InteractiveMap() {
  const [activeTab, setActiveTab] = useState<"blueprint" | "satellite">("blueprint");
  const [selectedPoint, setSelectedPoint] = useState<string>("HQ");

  const landmarks = [
    {
      id: "HQ",
      name: "KAFY Tech Head Office Office",
      desc: "Jl. Pengampon 2 No. 8, Surabaya",
      time: "Markas Utama Tim",
      coords: { x: "50%", y: "45%" },
      details: "Pusat komando respons insiden, laboratorium pemulihan bencana, dan gudang persediaan fisik perangkat hardware cadangan perusahaan."
    },
    {
      id: "Semut",
      name: "Stasiun Surabaya Kota (Semut)",
      desc: "Kecamatan Pabean Cantian",
      time: "2 Menit Perjalanan (0.5 km)",
      coords: { x: "32%", y: "30%" },
      details: "Gerbang logistik kereta terdekat. Sering digunakan untuk mobilisasi pengiriman darurat perangkat keras ke area luar kota."
    },
    {
      id: "JMP",
      name: "Jembatan Merah Plaza & Perkantoran",
      desc: "Kawasan Bisnis Surabaya Utara",
      time: "5 Menit Respons SLA (1.2 km)",
      coords: { x: "20%", y: "60%" },
      details: "Kawasan sentral perkantoran hukum, perdagangan retail, dan komersial Surabaya Utara. Wilayah jangkauan darurat langsung luar jaringan."
    },
    {
      id: "Darmo",
      name: "Kawasan Bisnis Jl. Raya Darmo",
      desc: "Surabaya Selatan / Pusat",
      time: "15 Menit Respons SLA (5.4 km)",
      coords: { x: "70%", y: "80%" },
      details: "Koridor bisnis utama Surabaya. Terkoneksi via tim bermotor taktis kami dengan peralatan pemulihan enkripsi forensik ringkas."
    }
  ];

  const currentInfo = landmarks.find(l => l.id === selectedPoint) || landmarks[0];

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-md p-6 relative overflow-hidden">
      
      {/* Tab selection menu */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="font-display font-semibold text-slate-900 text-lg flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-600 animate-bounce" />
            Peta Lokasi Kantor KAFY Tech
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Mencakup wilayah Surabaya Utara (Jl. Pengampon 2 No. 8) dengan jangkauan respons cepat seluruh Jawa Timur.
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-stretch sm:self-auto">
          <button
            onClick={() => setActiveTab("blueprint")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === "blueprint" 
                ? "bg-white text-slate-900 shadow-sm font-semibold" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <MapIcon className="w-3.5 h-3.5 text-red-600" />
            Blueprint Respons
          </button>
          <button
            onClick={() => setActiveTab("satellite")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              activeTab === "satellite" 
                ? "bg-white text-slate-900 shadow-sm font-semibold" 
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            Live Map (OSM)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Side: Map Render Area */}
        <div className="col-span-1 lg:col-span-8 min-h-[350px] md:min-h-[420px] bg-slate-950 rounded-xl relative overflow-hidden border border-slate-800">
          
          {activeTab === "blueprint" ? (
            /* Cyber Tech Grid Blueprint Representing Surabaya Area */
            <div className="absolute inset-0 bg-slate-950 flex items-center justify-center select-none">
              
              {/* Radar pulsing lines background */}
              <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
              <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-800/60 animate-ping opacity-20 pointer-events-none" />
              <div className="absolute w-[180px] h-[180px] rounded-full border border-red-900/10 pointer-events-none" />

              {/* Grid outline representations of Roads (Surabaya Kota style) */}
              <svg className="absolute inset-0 w-full h-full stroke-slate-800/40 opacity-80" xmlns="http://www.w3.org/2000/svg">
                {/* Jl Pengampon */}
                <line x1="10%" y1="45%" x2="90%" y2="45%" strokeWidth="18" strokeLinecap="round" />
                <line x1="10%" y1="45%" x2="90%" y2="45%" stroke="#0f172a" strokeWidth="2" strokeDasharray="3 3" />
                
                {/* Jl Pahlawan crossing */}
                <line x1="30%" y1="10%" x2="30%" y2="90%" strokeWidth="14" strokeLinecap="round" />
                
                {/* Stasiun Semut curve */}
                <path d="M 12 110 Q 320 200 480 50" fill="transparent" strokeWidth="6" strokeDasharray="5 5" />
                
                {/* Suramadu toll lane heading north */}
                <line x1="80%" y1="10%" x2="80%" y2="90%" strokeWidth="8" strokeLinecap="round" />
              </svg>

              {/* Legend title in corner */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/75 px-3 py-1.5 rounded border border-slate-800 font-mono text-[9px] text-zinc-400">
                <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                SURABAYA SELAKU POS UTAMA (ACTIVE GRID 2026)
              </div>

              {/* Render Interactive Landmark Buttons */}
              {landmarks.map((point) => {
                const isHQ = point.id === "HQ";
                const isSelected = selectedPoint === point.id;
                
                return (
                  <button
                    key={point.id}
                    onClick={() => setSelectedPoint(point.id)}
                    style={{ left: point.coords.x, top: point.coords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10 transition-all p-1.5 focus:outline-none cursor-pointer"
                    aria-label={`Point landmark ${point.name}`}
                  >
                    <span className="relative flex h-10 w-10 items-center justify-center">
                      {isHQ ? (
                        <>
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-60"></span>
                          <span className="relative inline-flex rounded-full h-7 w-7 bg-red-600 hover:bg-red-500 items-center justify-center border-2 border-white shadow-xl">
                            <Radio className="w-3.5 h-3.5 text-white" />
                          </span>
                        </>
                      ) : (
                        <>
                          {isSelected && <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-indigo-500 opacity-40"></span>}
                          <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center border shadow-md transition-all ${
                            isSelected 
                              ? "bg-indigo-600 border-white text-white" 
                              : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                          }`}>
                            <span className="text-[10px] font-mono font-bold leading-none">{point.id[0]}</span>
                          </span>
                        </>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            /* Reliable openstreetmap iframe without needing client token keys */
            <div className="absolute inset-0 w-full h-full">
              <iframe
                title="Peta Lokasi Kantor KAFY Tech Jl. Pengampon Surabaya"
                src="https://www.openstreetmap.org/export/embed.html?bbox=112.74000%2C-7.24350%2C112.74850%2C-7.23700&amp;layer=mapnik&amp;marker=-7.24075%2C112.74412"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
              />
              {/* Floating Link in bottom to open larger map representation */}
              <div className="absolute bottom-2 left-2 bg-white/95 px-2 py-1 rounded text-[10px] font-mono text-slate-600 border border-slate-200 z-10">
                <a 
                  href="https://www.openstreetmap.org/?mlat=-7.24075&amp;mlon=112.74412#map=17/-7.24075/112.74412" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-red-600 transition"
                >
                  Lihat Peta Lebih Besar
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Informative Card Detail */}
        <div className="col-span-1 lg:col-span-4 flex flex-col justify-between bg-slate-50 border border-slate-200/60 rounded-xl p-5">
          
          <div className="space-y-4">
            
            <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase tracking-widest bg-slate-200/60 px-2.5 py-1 rounded self-start">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Titik Wilayah Logistik
            </div>

            <div>
              <h4 className="font-display font-bold text-slate-900 text-base">
                {currentInfo.name}
              </h4>
              <p className="text-slate-500 font-mono text-xs mt-1 bg-slate-200/40 px-2 py-1 rounded-md border border-slate-200/20 inline-block font-medium">
                {currentInfo.desc}
              </p>
            </div>

            <div className="border-t border-slate-200/60 pt-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold block">INTEGRASI RESPON TIM:</span>
              <p className="text-red-700 font-mono text-xs font-bold flex items-center gap-1.5 mt-1">
                <Navigation className="w-3.5 h-3.5 text-red-600 animate-pulse" />
                {currentInfo.time}
              </p>
            </div>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed border-t border-slate-200/60 pt-3 font-sans">
              {currentInfo.details}
            </p>
          </div>

          <div className="border-t border-slate-200/80 pt-4 mt-6">
            <p className="text-slate-400 text-[10px] font-mono leading-normal">
              *Respons fisik darurat area Surabaya bergaransi SLA di bawah **30 Menit** untuk kontrak premium Managed IT Services.
            </p>
            
            {/* Legend guide for blueprint map */}
            {activeTab === "blueprint" && (
              <div className="flex gap-2.5 mt-3 pt-3 border-t border-dashed border-slate-200">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 block" />
                  <span className="text-[9px] font-mono text-slate-500">HQ KAFY</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-indigo-600 block" />
                  <span className="text-[9px] font-mono text-slate-500">Hub Terkait</span>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
