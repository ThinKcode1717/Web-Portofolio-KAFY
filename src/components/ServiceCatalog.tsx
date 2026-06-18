import { useState } from "react";
import { Calculator, ShieldCheck, Check, Info, FileSpreadsheet, ChevronRight, ArrowDownRight, Tag } from "lucide-react";
import { ServiceItem } from "../types";

interface ServiceCatalogProps {
  onSelectServices: (summaryText: string) => void;
}

export default function ServiceCatalog({ onSelectServices }: ServiceCatalogProps) {
  const serviceList: ServiceItem[] = [
    {
      id: 1,
      category: "Inventarisasi Hardware",
      description: "Audit fisik aset komputer, pencatatan spesifikasi komponen internal, pelabelan QR Code perangkat, dan pembuatan dokumen blueprint aset digital perusahaan.",
      scope: ["Audit Fisik Detail", "Perekaman Serial Number", "Labeling QR Fisik", "Digital Blueprint Asset"],
      rate: "Rp 75.000",
      notes: "Per Perangkat (Min. 10 unit)",
      isHot: false
    },
    {
      id: 2,
      category: "Inventarisasi Software (CD, DVD, Lisensi)",
      description: "Audit penggunaan perangkat lunak resmi, pelacakan masa berlaku lisensi digital, manajemen repositori installer fisik, dan eliminasi software ilegal guna patuh audit.",
      scope: ["Audit Kepatuhan Lisensi", "Tracie Masa Aktif", "Pembersihan Malware Retak", "Manajemen Repositori"],
      rate: "Rp 50.000",
      notes: "Per Perangkat (Sistem Terpusat)",
      isHot: false
    },
    {
      id: 3,
      category: "Service Hardware & Pembersihan",
      description: "Pembersihan komponen fisik (pasting termal), penggantian part rusak (RAM, SSD, PSU, Kipas), perbaikan modul daya, dan optimalisasi fisik server utama/workstation.",
      scope: ["Thermal Pasting Ulang", "Penggantian RAM/SSD/PSU", "Uji Beban Listrik", "Optimasi Server"],
      rate: "Rp 250.000 - Rp 600.000",
      notes: "Tergantung tingkat kerusakan perangkat",
      isHot: true
    },
    {
      id: 4,
      category: "Troubleshoot Malfungsi BIOS",
      description: "Penanganan kegagalan booting (POST error), flashing firmware BIOS/UEFI corrupt, pengaturan konfigurasi keamanan hardware tier-0, dan reset password BIOS yang terkunci.",
      scope: ["Pemulihan POST Error", "Flashing EEPROM Manual", "Hard Reset Password", "Konfigurasi TPM Secure"],
      rate: "Rp 200.000",
      notes: "Per Unit",
      isHot: false
    },
    {
      id: 5,
      category: "Instalasi OS (Operating System Cleaner)",
      description: "Instalasi sistem operasi baru yang aman dan bersih (Windows Pro, Distro Linux, macOS), konfigurasi driver tervalidasi paling stabil, serta penerapan patch keamanan terbaru.",
      scope: ["Clean-Install Windows/Linux", "Driver Validated Setup", "Optimasi Registry & Services", "Update Patch Keamanan"],
      rate: "Rp 150.000",
      notes: "Per PC (Lisensi disediakan klien / terpisah)",
      isHot: false
    },
    {
      id: 6,
      category: "Instalasi Software Aplikasi Produktif",
      description: "Instalasi paket software produktivitas kerja (Office, Adobe Creative Suite, CAD, Dev Tools) secara presisi, terjamin bebas malware jahat, dan optimasi performa software.",
      scope: ["Deployment Paket Kerja", "Verifikasi Bebas Crack", "Optimasi Cache Aplikasi", "Konfigurasi Font/Addon"],
      rate: "Rp 75.000",
      notes: "Per Bundel Paket Aplikasi",
      isHot: false
    },
    {
      id: 7,
      category: "Cyber Security Vulnerability Assessment",
      description: "Analisis celah keamanan jaringan lokal (Vulnerability Assessment), audit kebijakan enkripsi password internal perusahaan, serta hardening konfigurasi awal firewall tingkat perimeter perkantoran.",
      scope: ["Vulnerability Scanning Network", "Audit Password Policy", "Hardening Firewall Perimeter", "Rekomendasi Dokumen Mitigasi"],
      rate: "Mulai dari Rp 4.500.000",
      notes: "Per Proyek Audit UMKM",
      isHot: true
    },
    {
      id: 8,
      category: "Penanggulangan Cyber Attack (Incident Response)",
      description: "Mitigasi aktif saat terjadi insiden pembajakan siber, penyusupan jaringan, serangan DDoS, pemutusan rute malware penyebar, isolasi server terinfeksi, dan analisis investigasi forensik.",
      scope: ["Isolasi Malware Aktif", "Penutupan Exploit Cepat", "Analisis Forensik Serangan", "Pemulihan Jaringan 24/7"],
      rate: "Rp 7.500.000 - Rp 15.000.000",
      notes: "Penanganan tanggap darurat 24 Jam",
      isHot: true
    },
    {
      id: 9,
      category: "Restore & Hardening Komputer Kena Ransomware",
      description: "Dekripsi file penting (pada varian ransomware tertentu), pembersihan total infeksi malware/rootkit tingkat dalam, restorasi data aman dari sistem cadangan cloud, dan pengerasan sekuriti OS.",
      scope: ["Identifikasi Decryptor", "Pembersihan Rootkit", "Restore Cadangan Cloud", "Post-Incident Hardening"],
      rate: "Rp 500.000 - Rp 1.200.000",
      notes: "Per Workstation terdampak serangan siber",
      isHot: false
    }
  ];

  // Calculator Multi-State variables
  const [calcHardwareCount, setCalcHardwareCount] = useState<number>(0);
  const [calcSoftwareCount, setCalcSoftwareCount] = useState<number>(0);
  const [calcServiceCount, setCalcServiceCount] = useState<number>(0);
  const [calcBiosCount, setCalcBiosCount] = useState<number>(0);
  const [calcOsCount, setCalcOsCount] = useState<number>(0);
  const [calcAppCount, setCalcAppCount] = useState<number>(0);
  const [calcSecurityAudit, setCalcSecurityAudit] = useState<boolean>(false);
  const [calcCyberAttackEmergency, setCalcCyberAttackEmergency] = useState<boolean>(false);
  const [calcRansomwareWorkers, setCalcRansomwareWorkers] = useState<number>(0);

  // Price Calculation Logic
  const calculateTotal = () => {
    let minTotal = 0;
    let maxTotal = 0;

    // 1. Hardware Inventory (min 10)
    if (calcHardwareCount > 0) {
      // PRD notes minimum 10 unit, if below we warn or enforce min 10
      const actualCount = calcHardwareCount;
      minTotal += actualCount * 75000;
      maxTotal += actualCount * 75000;
    }

    // 2. Software Inventory
    minTotal += calcSoftwareCount * 50000;
    maxTotal += calcSoftwareCount * 50000;

    // 3. Hardware Service (Rp 250k - Rp 600k)
    minTotal += calcServiceCount * 250000;
    maxTotal += calcServiceCount * 600000;

    // 4. Bios Setup
    minTotal += calcBiosCount * 200000;
    maxTotal += calcBiosCount * 200000;

    // 5. OS Installation
    minTotal += calcOsCount * 150000;
    maxTotal += calcOsCount * 150000;

    // 6. Application Packages
    minTotal += calcAppCount * 75000;
    maxTotal += calcAppCount * 75000;

    // 7. Security audit (Mulai 4.5jt)
    if (calcSecurityAudit) {
      minTotal += 4500000;
      maxTotal += 6000000;
    }

    // 8. Cyber attack response (Rp 7.500.000 - Rp 15.000.000)
    if (calcCyberAttackEmergency) {
      minTotal += 7500000;
      maxTotal += 15000000;
    }

    // 9. Ransomware workstation restore (Rp 500k - Rp 1.2jt)
    minTotal += calcRansomwareWorkers * 500000;
    maxTotal += calcRansomwareWorkers * 1200000;

    return { minTotal, maxTotal };
  };

  const { minTotal, maxTotal } = calculateTotal();

  const handleExportEstimateToForm = () => {
    let summary = "Pengajuan estimasi kalkulator KAFY Tech:\n";
    if (calcHardwareCount > 0) summary += `• Inventarisasi Hardware: ${calcHardwareCount} Unit\n`;
    if (calcSoftwareCount > 0) summary += `• Inventarisasi Software: ${calcSoftwareCount} Unit\n`;
    if (calcServiceCount > 0) summary += `• Service Komputer: ${calcServiceCount} Unit\n`;
    if (calcBiosCount > 0) summary += `• Troubleshoot BIOS: ${calcBiosCount} Unit\n`;
    if (calcOsCount > 0) summary += `• Instalasi Sistem OS: ${calcOsCount} Unit\n`;
    if (calcAppCount > 0) summary += `• Instalasi Software: ${calcAppCount} Bundel\n`;
    if (calcSecurityAudit) summary += `• Cyber Security Assessment: Ya (Per Proyek)\n`;
    if (calcCyberAttackEmergency) summary += `• Tanggap Darurat Cyber Attack: Ya (Insiden Aktif)\n`;
    if (calcRansomwareWorkers > 0) summary += `• Dekripsi Ransomware: ${calcRansomwareWorkers} Workstation\n`;

    summary += `Total Proyeksi Anggaran Pasar: Rp ${minTotal.toLocaleString("id-ID")} s.d Rp ${maxTotal.toLocaleString("id-ID")}`;
    onSelectServices(summary);
  };

  const handleClearCalculator = () => {
    setCalcHardwareCount(0);
    setCalcSoftwareCount(0);
    setCalcServiceCount(0);
    setCalcBiosCount(0);
    setCalcOsCount(0);
    setCalcAppCount(0);
    setCalcSecurityAudit(false);
    setCalcCyberAttackEmergency(false);
    setCalcRansomwareWorkers(0);
  };

  const isCalculatorEmpty = 
    calcHardwareCount === 0 && 
    calcSoftwareCount === 0 && 
    calcServiceCount === 0 && 
    calcBiosCount === 0 && 
    calcOsCount === 0 && 
    calcAppCount === 0 && 
    !calcSecurityAudit && 
    !calcCyberAttackEmergency && 
    calcRansomwareWorkers === 0;

  return (
    <section id="layanan" className="py-24 bg-[#FCFBFA]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 border border-red-200 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span className="text-[10px] font-mono tracking-widest text-red-700 uppercase font-bold">DAFTAR TARIF JASA 2026</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight text-slate-900">
            Katalog Solusi IT & Estimasi Harga Pasar Indonesia
          </h2>
          <div className="w-12 h-1 bg-red-700 mx-auto mt-4" />
          <p className="text-slate-500 max-w-2xl mx-auto mt-4 text-xs md:text-sm leading-relaxed">
            KAFY Tech menerapkan keterbukaan harga yang wajar dan transparan berdasar standar teknisi IT profesional regional Surabaya, Jakarta, dan Bandung.
          </p>
        </div>

        {/* Catalog and Calculator Split Page Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Grid: Comprehensive Service List (7 columns) */}
          <div className="col-span-1 lg:col-span-7 space-y-6">
            <h3 className="text-xl font-display font-semibold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>Spektrum Layanan Solusi</span>
              <span className="text-xs font-mono text-slate-400 font-normal">9 Kategori Lengkap</span>
            </h3>

            <div className="space-y-4">
              {serviceList.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition group relative"
                >
                  {service.isHot && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                      <Tag className="w-2.5 h-2.5" />
                      REKOMENDASI
                    </span>
                  )}
                  
                  <div className="flex items-start gap-4 pr-16">
                    <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center font-mono text-xs text-red-700 font-bold shrink-0">
                      0{service.id}
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-slate-800 text-sm md:text-base group-hover:text-red-700 transition">
                        {service.category}
                      </h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Bullet point scopes inside dropdown details */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {service.scope.map((item, idx) => (
                          <span 
                            key={idx} 
                            className="bg-slate-50 border border-slate-100 text-slate-600 font-mono text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1"
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pricing footer block for absolute clarity */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Info className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="text-[10px] font-mono leading-none">{service.notes}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono uppercase block">Estimasi Tarif:</span>
                      <span className="text-red-700 font-display font-semibold text-sm md:text-base tracking-tight">
                        {service.rate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-slate-400 text-[10px] font-mono leading-relaxed mt-4 italic">
              *Catatan Estimasi Tarif: Harga dapat bervariasi bergantung pada kompleksitas negosiasi SLA korporat dan skema retensi bulanan (Managed IT Services untuk Korporasi).
            </p>
          </div>

          {/* Right Grid: Dynamic Cost Calculator Panel (5 columns) */}
          <div className="col-span-1 lg:col-span-5 relative lg:sticky lg:top-24">
            
            <div className="glass-panel rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Header Title Grid */}
              <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-red-600 rounded-lg">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm md:text-base leading-tight">Simulator Anggaran IT</h4>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">ESTIMASI TARIF DARUDAT & REGULER</p>
                  </div>
                </div>
                
                {!isCalculatorEmpty && (
                  <button 
                    onClick={handleClearCalculator}
                    className="text-[10px] font-mono text-red-400 hover:text-red-300 transition underline underline-offset-2 uppercase cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Form Input fields */}
              <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto bg-slate-50/50">
                
                {/* 1. Hardware Inventory */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Inventarisasi Hardware</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 75.000 / unit (Min. 10)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcHardwareCount === 0}
                      onClick={() => setCalcHardwareCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcHardwareCount === 0 ? "" : calcHardwareCount}
                      onChange={(e) => setCalcHardwareCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcHardwareCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 2. Software Inventory */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Inventarisasi Software</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 50.000 / unit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcSoftwareCount === 0}
                      onClick={() => setCalcSoftwareCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcSoftwareCount === 0 ? "" : calcSoftwareCount}
                      onChange={(e) => setCalcSoftwareCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcSoftwareCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 3. Hardware Service */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Hardware Service & Cleaning</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 250k - Rp 600k / unit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcServiceCount === 0}
                      onClick={() => setCalcServiceCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcServiceCount === 0 ? "" : calcServiceCount}
                      onChange={(e) => setCalcServiceCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcServiceCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 4. BIOS troubleshoot */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Troubleshoot Malfungsi BIOS</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 200.000 / unit</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcBiosCount === 0}
                      onClick={() => setCalcBiosCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcBiosCount === 0 ? "" : calcBiosCount}
                      onChange={(e) => setCalcBiosCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcBiosCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 5. OS Clean-Install */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Instalasi Clean OS</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 150.000 / pc</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcOsCount === 0}
                      onClick={() => setCalcOsCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcOsCount === 0 ? "" : calcOsCount}
                      onChange={(e) => setCalcOsCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcOsCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 6. Software Application packages */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Instalasi Paket Software</label>
                    <span className="text-[9px] font-mono text-indigo-600 block">Rp 75.000 / paket</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcAppCount === 0}
                      onClick={() => setCalcAppCount(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcAppCount === 0 ? "" : calcAppCount}
                      onChange={(e) => setCalcAppCount(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcAppCount(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 7. Ransomware Restore per PC */}
                <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-200/50">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block">Restore Ransomware / Virus</label>
                    <span className="text-[9px] font-mono text-zinc-500 block">Rp 500k - Rp 1.2jt / PC</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      disabled={calcRansomwareWorkers === 0}
                      onClick={() => setCalcRansomwareWorkers(prev => Math.max(0, prev - 1))}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer disabled:opacity-40"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={calcRansomwareWorkers === 0 ? "" : calcRansomwareWorkers}
                      onChange={(e) => setCalcRansomwareWorkers(Math.max(0, parseInt(e.target.value) || 0))}
                      placeholder="0"
                      className="w-12 h-7 bg-white border border-slate-200 rounded text-center text-xs font-mono font-bold focus:outline-none focus:border-red-500"
                    />
                    <button 
                      type="button"
                      onClick={() => setCalcRansomwareWorkers(prev => prev + 1)}
                      className="w-7 h-7 bg-white border border-slate-200 text-slate-600 rounded flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* 8. Corporate Cyber Audits Checkbox */}
                <div className="flex items-start justify-between gap-4 py-2.5 border-b border-slate-200/50">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block">Vulnerability Audit Assessment</span>
                    <span className="text-[9px] font-mono text-amber-600 font-bold">Rp 4.500.000 (Mulai SMB standard)</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={calcSecurityAudit}
                    onChange={(e) => setCalcSecurityAudit(e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-white border-slate-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                </div>

                {/* 9. Active Incident Emergency 24/7 Checkbox */}
                <div className="flex items-start justify-between gap-4 py-2.5">
                  <div>
                    <span className="text-xs font-semibold text-slate-700 block flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                      Insiden Siber Gawat Darurat (24/7)
                    </span>
                    <span className="text-[9px] font-mono text-red-600 font-bold">Rp 7.500.000 s.d Rp 15.000.000</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={calcCyberAttackEmergency}
                    onChange={(e) => setCalcCyberAttackEmergency(e.target.checked)}
                    className="w-4 h-4 text-red-600 bg-white border-slate-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* Total Projected Budget Frame */}
              <div className="p-5 bg-white border-t border-slate-250">
                
                {/* Minimum Warn indicators */}
                {calcHardwareCount > 0 && calcHardwareCount < 10 && (
                  <div className="mb-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-700 font-mono leading-tight">
                    *Keterangan: PRD menyiratkan minimum 10 unit untuk jasa inventarisasi hardware fisik.
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">PROYEKSI TOTAL ANGGARAN:</span>
                    <span className="text-slate-500 text-xs font-mono">Estimasi Rendah s.d Tinggi</span>
                  </div>
                  <div className="text-right">
                    {minTotal === 0 && maxTotal === 0 ? (
                      <span className="text-slate-400 font-display font-medium text-xs">Pilih Layanan di Atas</span>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xs font-mono text-slate-400 line-through">Rp {(minTotal * 1.15).toLocaleString("id-ID")}</span>
                        <span className="text-red-700 font-display font-bold text-lg md:text-xl tracking-tight">
                          Rp {minTotal.toLocaleString("id-ID")}
                          {minTotal !== maxTotal && <span className="text-xs font-normal text-slate-500 font-sans block">s.d Rp {maxTotal.toLocaleString("id-ID")}</span>}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isCalculatorEmpty}
                  onClick={handleExportEstimateToForm}
                  className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-medium text-xs md:text-sm rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-red-900/10 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed uppercase tracking-wider font-semibold"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Kirim Estimasi ke Form Konsultasi
                  <ChevronRight className="w-4 h-4" />
                </button>

                <p className="text-center text-[10px] text-slate-400 font-mono mt-3 uppercase tracking-wider">
                  <ArrowDownRight className="w-3 h-3 inline mr-1 text-red-500" />
                  PRE-SET AKAN TERISI OTOMATIS DI FORMULIR
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
