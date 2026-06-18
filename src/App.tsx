import { useState, useRef, FormEvent } from "react";
import { 
  Shield, 
  Layers, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Award, 
  Building, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Compass, 
  AlertTriangle, 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Linkedin, 
  Instagram, 
  Github, 
  Zap, 
  UserCheck 
} from "lucide-react";
import TeamSection from "./components/TeamSection";
import ServiceCatalog from "./components/ServiceCatalog";
import InteractiveMap from "./components/InteractiveMap";
import ChatbotWhatsApp from "./components/ChatbotWhatsApp";

export default function App() {
  // Navigation states
  const [activeNav, setActiveNav] = useState("beranda");
  
  // Lead submission form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Inventarisasi",
    description: ""
  });
  
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    leadId?: string;
  } | null>(null);

  const consultationFormRef = useRef<HTMLDivElement>(null);

  // When estimator calculator exports specifications to form
  const handleSelectServices = (summaryText: string) => {
    setFormData(prev => ({
      ...prev,
      category: summaryText.includes("Cyber") ? "Insiden Keamanan Siber" : "Inventarisasi",
      description: summaryText
    }));
    
    // Smooth scroll down to consultation form ref
    if (consultationFormRef.current) {
      consultationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pre-fill form from a specific member consultation trigger
  const handleQuickConsult = (memberName: string, category: string) => {
    setFormData(prev => ({
      ...prev,
      category: category,
      description: `Halo tim KAFY Tech, saya ingin mengadakan janji temu khusus berkonsultasi langsung mengenai kendala IT kami bersama Spesialis ${memberName}.`
    }));

    if (consultationFormRef.current) {
      consultationFormRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Submit Lead Registration to full-stack API
  const handleSubmitLead = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.description) return;

    setIsSubmitLoading(true);
    setSubmitResult(null);

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message,
          leadId: data.leadId
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "Inventarisasi",
          description: ""
        });
      } else {
        throw new Error(data.error || "Gagal mengirim formulir.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitResult({
        success: false,
        message: "Maaf, terjadi gangguan server saat mencoba mengirim permintaan Anda. Silakan coba kembali atau gunakan tombol WhatsApp."
      });
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFBFA] text-slate-800 font-sans selection:bg-red-200 selection:text-red-900 overflow-x-hidden antialiased">
      
      {/* 4.1 Seksi 1: Header / Navigation Bar */}
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all duration-305 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          
          {/* Logo KAFY Tech with Zen Sakura motif */}
          <a href="#beranda" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-rose-600 shadow-sm transition group-hover:scale-105">
              <span className="text-[13px] text-white select-none leading-none">❀</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-none tracking-tight text-slate-900 group-hover:text-red-750 transition">
                KAFY <span className="text-red-600 font-medium">Tech</span>
              </span>
              <span className="text-[8px] font-mono tracking-widest text-slate-400 font-bold uppercase leading-none mt-0.5">
                ONE-STOP IT SOLUTION
              </span>
            </div>
          </a>

          {/* Desktop Internal Navigation Menu */}
          <nav className="hidden md:flex items-center gap-7">
            {[
              { label: "Profil", href: "#profil" },
              { label: "Layanan", href: "#layanan" },
              { label: "Keunggulan", href: "#keunggulan" },
              { label: "Sertifikasi", href: "#sertifikasi" },
              { label: "Testimoni", href: "#testimoni" },
              { label: "Kontak", href: "#kontak" }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveNav(link.href.replace("#", ""))}
                className={`text-xs uppercase tracking-widest font-mono font-bold transition hover:text-red-600 ${
                  activeNav === link.href.replace("#", "") 
                    ? "text-red-600 border-b border-red-600 pb-1" 
                    : "text-slate-500"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Call-to-Action button heading */}
          <div>
            <button
              onClick={() => {
                if (consultationFormRef.current) {
                  consultationFormRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="px-4 py-2.5 border border-red-600 text-red-600 hover:bg-red-700 hover:text-white font-mono font-bold text-[10.5px] uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm cursor-pointer"
            >
              KONSULTASI GRATIS
            </button>
          </div>

        </div>
      </header>

      {/* 4.2 Seksi 2: Hero Page (Seksi Utama with Japanese Sakura Accents) */}
      <section id="beranda" className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-rose-50/20 via-white to-[#FCFBFA]">
        
        {/* Japanese Zen Sun Motif Backdrop graphic & Sakura floating icons */}
        <div className="absolute right-[-10%] top-[-5%] w-[450px] h-[450px] rounded-full bg-rose-600/[0.02] border border-rose-300/[0.05] -z-10 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none overflow-hidden h-full">
          <span className="absolute text-rose-200/50 text-3xl top-[10%] left-[8%] animate-pulse">❀</span>
          <span className="absolute text-rose-300/40 text-4xl top-[35%] right-[15%]">❀</span>
          <span className="absolute text-rose-200/35 text-5xl bottom-[25%] left-[12%]">❀</span>
          <span className="absolute text-rose-150/30 text-2xl bottom-[40%] right-[25%] animate-pulse">❀</span>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Slogans and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 border border-rose-150 rounded-full">
              <span className="text-rose-500 font-serif text-sm">❀</span>
              <span className="text-[10px] font-mono tracking-wider font-bold text-rose-700 uppercase">STARTUP IT SURABAYA TERPADU</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 tracking-tight leading-[1.08]">
              Solusi IT Komprehensif,<br />
              Perlindungan Siber Mutakhir.<br />
              <span className="text-rose-600 italic font-medium flex items-center gap-2">Cukup Bersama KAFY Tech <span className="text-rose-450 not-italic">❀</span></span>
            </h1>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed max-w-xl font-sans">
              Kami mengelola aset IT, memulihkan sistem, dan mengamankan infrastruktur siber bisnis Anda dengan presisi tinggi dan standar profesional. Tidak perlu repot mencari banyak vendor serpihan. All-in One Key Solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  if (consultationFormRef.current) {
                    consultationFormRef.current.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="px-6 py-3.5 bg-red-700 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-red-900/10 hover:shadow-red-900/20 transition cursor-pointer"
              >
                Mulai Konsultasi
              </button>
              
              <a
                href="#layanan"
                className="px-5 py-3.5 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-xs cursor-pointer inline-flex items-center gap-1.5"
              >
                Lihat Rate Jasa
              </a>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200/60 max-w-lg">
              <div>
                <span className="block text-xl md:text-2xl font-bold font-display text-slate-900">4 IN 1</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">Spesialis Utama</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-bold font-display text-slate-900">24/7 SLA</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">Tim Tanggap Darurat</span>
              </div>
              <div>
                <span className="block text-xl md:text-2xl font-bold font-display text-slate-900">95+ SCORE</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">Lighthouse Standar</span>
              </div>
            </div>
          </div>

          {/* Slot Foto Tim Pendiri (Asymmetrical glassmorphic cluster showcase with Japanese Sakura styling) */}
          <div className="lg:col-span-5 relative">
            {/* Elegant glowing Sakura pink/soft-red gradient outline */}
            <div className="absolute -inset-4 bg-gradient-to-r from-rose-400/20 to-rose-200/10 rounded-3xl blur-3xl opacity-60 -z-10" />
            
            <div className="glass-panel rounded-2xl border border-rose-150 p-6 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Backing decorative floating sakura petal for Japanese motif */}
              <div className="absolute right-3 top-3 opacity-15 animate-pulse text-rose-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 100 100">
                  <path d="M50 85 C30 75 10 50 15 30 C18 15 35 15 45 25 C47 27 49 28 50 28 C51 28 53 27 55 25 C65 15 82 15 85 30 C90 50 70 75 50 85 Z" />
                </svg>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-rose-600/90 tracking-widest flex items-center gap-1">
                  <span>❀</span> Tim Pendiri KAFY
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>

              {/* Asymmetrical grid layouts for the 4 founders portrait teasers - only Names, no roles/divisions */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* 1. Kirei */}
                <a href="#founder-1" className="p-4 bg-zinc-950 border border-rose-950 hover:border-rose-450 text-white rounded-xl transition group cursor-pointer block text-left">
                  <div className="w-8 h-8 rounded-full bg-rose-950 flex items-center justify-center font-display font-bold text-xs border border-rose-800 text-rose-300">
                    KR
                  </div>
                  <h4 className="font-display font-display font-semibold text-xs tracking-tight text-white mt-3 group-hover:text-rose-300 transition leading-tight">
                    Kirei Syifa
                  </h4>
                  <span className="text-[8px] font-mono text-rose-450 block mt-1 uppercase font-semibold">
                    VISI & MISI ❀
                  </span>
                </a>

                {/* 2. Akbar */}
                <a href="#founder-2" className="p-4 bg-zinc-950 border border-rose-950 hover:border-rose-450 text-white rounded-xl transition group cursor-pointer block text-left">
                  <div className="w-8 h-8 rounded-full bg-rose-950/80 flex items-center justify-center font-display font-bold text-xs border border-rose-900 text-rose-350">
                    AK
                  </div>
                  <h4 className="font-display font-semibold text-xs tracking-tight text-white mt-3 group-hover:text-rose-300 transition leading-tight">
                    Akbar Rabbani
                  </h4>
                  <span className="text-[8px] font-mono text-rose-450 block mt-1 uppercase font-semibold">
                    VISI & MISI ❀
                  </span>
                </a>

                {/* 3. Fakhri */}
                <a href="#founder-3" className="p-4 bg-zinc-950 border border-rose-950 hover:border-rose-450 text-white rounded-xl transition group cursor-pointer block text-left">
                  <div className="w-8 h-8 rounded-full bg-rose-950 flex items-center justify-center font-display font-bold text-xs border border-rose-800 text-rose-300">
                    FK
                  </div>
                  <h4 className="font-display font-semibold text-xs tracking-tight text-white mt-3 group-hover:text-rose-300 transition leading-tight">
                    Fakhri Alamsyah
                  </h4>
                  <span className="text-[8px] font-mono text-rose-450 block mt-1 uppercase font-semibold">
                    VISI & MISI ❀
                  </span>
                </a>

                {/* 4. Yoga */}
                <a href="#founder-4" className="p-4 bg-zinc-950 border border-rose-950 hover:border-rose-450 text-white rounded-xl transition group cursor-pointer block text-left">
                  <div className="w-8 h-8 rounded-full bg-rose-950/80 flex items-center justify-center font-display font-bold text-xs border border-rose-900 text-rose-350">
                    YG
                  </div>
                  <h4 className="font-display font-semibold text-xs tracking-tight text-white mt-3 group-hover:text-rose-300 transition leading-tight">
                    Yoga Aditama
                  </h4>
                  <span className="text-[8px] font-mono text-rose-450 block mt-1 uppercase font-semibold">
                    VISI & MISI ❀
                  </span>
                </a>

              </div>

              <div className="border-t border-rose-100/10 pt-4 flex items-center gap-2.5">
                <span className="text-rose-400 font-serif text-sm">❀</span>
                <p className="text-[10px] font-mono text-slate-500 leading-snug">
                  *Klik nama anggota pendiri di atas untuk membaca detail pernyataan visi, misi & pengabdian teknologi terpadu.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4.3 Seksi 3: Profil Perusahaan & Makna Filosofis */}
      <section className="py-24 bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Col: Filosofi KAFY */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-1 bg-red-50 border border-red-100 text-red-750 text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                PROFIL STARTUP & FILOSOFI
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-slate-900">
                Makna Filosofis Di Balik Nama <span className="text-red-600 font-medium font-serif italic">KAFY</span>
              </h2>
              <div className="w-10 h-1 bg-red-600 mt-3" />
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                Nama <strong>KAFY</strong> dibentuk secara kreatif dari kombinasi inisial para pendiri startup ini, yaitu <strong>K</strong>irei, <strong>A</strong>kbar, <strong>F</strong>akhri, dan <strong>Y</strong>oga. 
              </p>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-sans">
                Selain merepresentasikan sinergi kepemilikan kolektif, kata <strong>&ldquo;KAFY&rdquo;</strong> diadaptasi dari istilah dalam bahasa Arab yaitu <strong><em>Kafi (کافي)</em></strong> yang memiliki arti <strong>&ldquo;cukup&rdquo;</strong>, <strong>&ldquo;lengkap&rdquo;</strong>, atau <strong>&ldquo;memenuhi semua kebutuhan&rdquo;</strong>.
              </p>

              <div className="p-4 bg-slate-50 border-l-2 border-red-600 rounded-r-lg font-sans text-xs text-slate-500">
                Filosofi ini mencerminkan positioning bisnis KAFY Tech di pasar retail dan korporasi IT Indonesia: sebuah penyedia solusi teknologi terpadu bertaraf profesional yang bertindak sebagai <strong>One-Stop Solution</strong>.
              </div>
            </div>

            {/* Right Col: Visi Misi & Acronym Diagram (7 columns) */}
            <div className="lg:col-span-7 space-y-12 lg:pl-6">
              
              {/* Acronym breakdown chart */}
              <div className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 space-y-4">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Peta Struktur Pendiri (Four-Pillars)</span>
                
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { letter: "K", name: "Kirei", aspect: "Keamanan Siber" },
                    { letter: "A", name: "Akbar", aspect: "System Infra" },
                    { letter: "F", name: "Fakhri", aspect: "Lisensi Aset" },
                    { letter: "Y", name: "Yoga", aspect: "Arsitek Solusi" }
                  ].map((it) => (
                    <div key={it.letter} className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-xs">
                      <span className="block text-2xl md:text-3xl font-display font-extrabold text-red-650">{it.letter}</span>
                      <span className="block text-slate-700 text-xs font-bold font-display mt-0.5">{it.name}</span>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-tight mt-1">{it.aspect}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visi, Misi & Nilai */}
              <div className="space-y-6">
                <h3 className="text-xl font-display font-semibold text-slate-950 border-b border-light pb-2">
                  Visi, Misi & Nilai-Nilai KAFY Tech
                </h3>

                <div className="space-y-4">
                  {/* VISI */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0 font-bold font-mono text-xs">
                      1
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm md:text-base">Misi Perusahaan (Visi & Tujuan Mulia)</h4>
                      <p className="text-slate-600 text-xs md:text-sm leading-normal mt-1 pr-6 font-sans">
                        Menjadi satu-satunya mitra strategis IT terpercaya di Indonesia Timur yang &ldquo;Cukup dan Lengkap&rdquo; bagi korporat, membebaskan pelaku usaha dari kerepotan manajemen lisensi dan ancaman pelanggaran keamanan data siber.
                      </p>
                    </div>
                  </div>

                  {/* MISI */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0 font-bold font-mono text-xs">
                      2
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm md:text-base">Misi Operasional Teknis</h4>
                      <p className="text-slate-600 text-xs md:text-sm leading-normal mt-1 pr-6 font-sans">
                        Menyediakan layanan pengelolaan aset inventaris berakurasi tinggi, perbaikan sistem level perangkat keras yang andal, dan audit perlindungan siber tangkas berstandar global dengan harga kompetitif.
                      </p>
                    </div>
                  </div>

                  {/* DATA VALUES */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 shrink-0 font-bold font-mono text-xs">
                      3
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-900 text-sm md:text-base">Nilai-Nilai Utama (Company Core Values)</h4>
                      <ul className="text-slate-600 text-xs md:text-sm mt-1 list-disc list-inside space-y-1 font-sans pr-6">
                        <li><strong>Integritas Data (Data Honesty)</strong>: Transparansi audit software & file recovery tanpa manipulasi.</li>
                        <li><strong>Ketanggapan SLA (Agile Response)</strong>: Siap siaga tanggap darurat 24 jam untuk ancaman ransomware.</li>
                        <li><strong>Solusi Terpadu (Complementary Scope)</strong>: Menyediakan seluruh ekosistem IT di bawah satu pintu KAFY.</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Intergrated Founder Members introduction Section */}
      <TeamSection />

      {/* Seksi 4: Katalog Layanan & Estimasi Tarif Pasar Indonesia */}
      <ServiceCatalog onSelectServices={handleSelectServices} />

      {/* 4.5 Seksi 5: Alasan Memilih KAFY Tech (Benefits) */}
      <section id="keunggulan" className="py-24 bg-slate-900 text-white relative">
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[radial-gradient(#ffffff04_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-20 text-center relative z-10">
            <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">ALASAN MITRA MEMILIH KAFY</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mt-1">
              Keunggulan Kompetitif KAFY Tech
            </h2>
            <div className="w-12 h-[2px] bg-red-650 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {[
              {
                icon: <Lock className="w-6 h-6 text-red-500" />,
                title: "Keamanan Tier-Tertinggi",
                desc: "Penanganan tanggap langsung oleh spesialis siber bersertifikasi internasional (CISSP, CEH), memastikan data berharga Anda tidak bocor saat perbaikan."
              },
              {
                icon: <Zap className="w-6 h-6 text-indigo-400" />,
                title: "Efisiensi Sinyal Tunggal",
                desc: "Tidak perlu mengontak banyak vendor terpisah; dari urusan lisensi MS Office hingga pemulihan dari serangan Ransomware, ditangani oleh tim terpadu kami."
              },
              {
                icon: <Clock className="w-6 h-6 text-emerald-400" />,
                title: "Respon Cepat Tanggap Gawat",
                desc: "KAFY Tech memahami downtime operasional berarti kerugian finansial. Kami menyediakan SLA respons mitigasi serangan siber gawat yang agresif."
              },
              {
                icon: <Building className="w-6 h-6 text-amber-500" />,
                title: "Transparansi Berbasis Data",
                desc: "Pengerjaan audit inventarisasi dan pembersihan malware selalu disertai dengan laporan teknis formal (PDF report) yang komprehensif kepada klien."
              }
            ].map((benefit, idx) => (
              <div 
                key={idx} 
                className="p-6 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-700 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5">
                  {benefit.icon}
                </div>
                <h3 className="font-display font-bold text-white text-base md:text-lg mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.5 Certified Section Showcasing Professional badgess for Trust building */}
      <section id="sertifikasi" className="py-20 bg-white border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <div className="mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-indigo-650" />
              <span className="text-[10px] font-mono tracking-wider text-indigo-700 uppercase font-bold">KREDIBILITAS & SERTIFIKASI</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-slate-900">
              Sertifikasi Profesional Tim KAFY Tech
            </h2>
            <p className="text-slate-500 font-sans text-xs md:text-sm max-w-xl mx-auto mt-2">
              Kredibilitas penanganan IT kami didukung oleh berbagai sertifikat sah industri teknologi global berotoritas tinggi.
            </p>
          </div>

          {/* Grid layout of credentials badges */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {[
              { title: "CISSP", issuer: "ISC² Security", id: "51892", color: "from-slate-100 to-slate-200 border-indigo-500/20 text-indigo-900" },
              { title: "CEH Ethical Hacker", issuer: "EC-Council", id: "65103", color: "from-slate-100 to-slate-200 border-rose-500/20 text-rose-950" },
              { title: "Cisco CCNA", issuer: "Cisco Systems", id: "98725", color: "from-slate-100 to-slate-200 border-sky-500/20 text-sky-950" },
              { title: "CompTIA Security+", issuer: "CompTIA", id: "88273", color: "from-slate-100 to-slate-200 border-amber-500/20 text-amber-950" },
              { title: "ISO/IEC 27001", issuer: "Conformity", id: "Standard", color: "from-slate-100 to-slate-200 border-emerald-500/20 text-emerald-950" }
            ].map((badge, idx) => (
              <div 
                key={idx} 
                className={`p-5 rounded-2xl bg-gradient-to-b ${badge.color} border shadow-sm text-center flex flex-col justify-between items-center`}
              >
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-inner">
                  <Award className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-sm md:text-base leading-tight tracking-tight uppercase">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 mt-1 font-sans">{badge.issuer}</p>
                </div>
                <span className="font-mono text-[9px] text-slate-400 font-bold block mt-3 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-slate-100">
                  {badge.id}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.6 Seksi 6: Testimonial Pelanggan */}
      <section id="testimoni" className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-16 text-center">
            <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">ULASAN KLIEN / KASUS NYATA</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-slate-900 tracking-tight mt-1">
              Testimonial Kepuasan Pelanggan
            </h2>
            <div className="w-10 h-1 bg-red-600 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                text: "“Sistem e-commerce kami dihantam ransomware jam 2 pagi. Beruntung tim gawat darurat KAFY Tech langsung merespons cepat. Dalam kurun waktu kurang dari 5 jam, server utama kami berhasil di-restore bersih tanpa kehilangan database transaksi klien!”",
                name: "Hendra Wijaya",
                role: "CTO & Co-Founder",
                company: "Digital Nusantara Express",
                tag: "Emergency Siber Recovery"
              },
              {
                text: "“KAFY Tech melakukan audit software lisensi di 45 workstation kantor hukum kami dengan sangat tertib. Mereka merapikan lisensi Microsoft 365, meminimalkan lisensi tidak patuh, dan menghemat budget operasional lisensi kami s.d 30% per tahun!”",
                name: "Amanda Putri, S.H.",
                role: "Manajer Operasional Mitra",
                company: "Amanda & Partners Law Firm",
                tag: "Compliance Software Audit"
              },
              {
                text: "“Awalnya kesulitan mendata spesifikasi hardware komputer asisten kasir di 12 cabang retail. Lewat jasa inventarisasi KAFY Tech, semua tuntas diberi QR Code digital blueprint sehingga pencarian aset rusak sekarang hanya butuh 1 kali scan.”",
                name: "Budi Santoso",
                role: "Pemilik Bisnis Utama",
                company: "Toko Kelontong Sentosa Raya",
                tag: "Hardware Inventory Detail"
              }
            ].map((testi, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/60 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-amber-500 mb-4 text-sm font-bold">
                    {"★★★★★"}
                  </div>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed italic pr-2 font-sans">
                    {testi.text}
                  </p>
                </div>
                
                <div className="border-t border-slate-100 pt-5 mt-6 flex justify-between items-center">
                  <div>
                    <h4 className="font-display font-bold text-slate-800 text-xs md:text-sm">
                      {testi.name}
                    </h4>
                    <p className="text-slate-400 font-mono text-[10px] mt-0.5">
                      {testi.role}, {testi.company}
                    </p>
                  </div>
                  
                  <span className="bg-red-50 text-red-700 font-mono text-[9px] font-bold px-2 py-1 rounded">
                    {testi.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4.7 Seksi 7: Formulir Konsultasi Interaktif & Map */}
      <section id="kontak" className="py-24 bg-white border-t border-slate-200/50" ref={consultationFormRef}>
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Lead Capture Form Column (7 Columns) */}
            <div className="lg:col-span-7 space-y-8">
              
              <div>
                <span className="text-red-500 font-mono text-xs uppercase tracking-widest font-bold">MULAI TAHAP KUALIFIKASI</span>
                <h3 className="text-2xl md:text-4xl font-display font-bold text-slate-900 tracking-tight mt-1">
                  Formulir Konsultasi Interaktif KAFY
                </h3>
                <p className="text-slate-500 text-xs md:text-sm mt-2 font-sans">
                  Isi kendala IT ataupun hasil ekspor estimasi anggaran di bawah ini. Tim analis forensik & infrastruktur KAFY Tech akan menindaklanjuti dalam kurun waktu cepat.
                </p>
              </div>

              {/* Glassmorphic Intake Form */}
              <form onSubmit={handleSubmitLead} className="p-6 md:p-8 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-sm space-y-4">
                
                {/* Result alert messages */}
                {submitResult && (
                  <div className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                    submitResult.success 
                      ? "bg-emerald-50 border border-emerald-200 text-emerald-800" 
                      : "bg-rose-50 border border-rose-250 text-rose-800"
                    }`}
                  >
                    {submitResult.success ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                    <div>
                      <p className="font-semibold leading-normal">{submitResult.message}</p>
                      {submitResult.leadId && (
                        <p className="text-[10px] font-mono text-emerald-700 font-semibold uppercase mt-1">
                          NOMOR TANDA TERIMA LEAD: {submitResult.leadId}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 font-mono uppercase block">Nama Lengkap / Perwakilan Usaha *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Masukkan nama Anda..."
                      className="w-full bg-white border border-slate-250 rounded-lg text-xs px-3.5 py-2.5 focus:outline-none focus:border-red-600 focus:ring-0 transition font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 font-mono uppercase block">Alamat Email Bisnis *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="nama@perusahaan.com..."
                      className="w-full bg-white border border-slate-250 rounded-lg text-xs px-3.5 py-2.5 focus:outline-none focus:border-red-600 focus:ring-0 transition font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nomor Telepon */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 font-mono uppercase block">Nomor Telepon / WhatsApp Aktif *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Contoh: 08123456789..."
                      className="w-full bg-white border border-slate-250 rounded-lg text-xs px-3.5 py-2.5 focus:outline-none focus:border-red-600 focus:ring-0 transition font-sans"
                    />
                  </div>

                  {/* Kategori Kendala */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700 font-mono uppercase block">Kategori Masalah IT *</label>
                    <select 
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-white border border-slate-250 rounded-lg text-xs px-3.5 py-2.5 focus:outline-none focus:border-red-600 focus:ring-0 transition font-sans cursor-pointer"
                    >
                      <option value="Inventarisasi">Inventarisasi Aset (Hardware/Software)</option>
                      <option value="Perbaikan Perangkat">Perbaikan Fisik Devices / Server</option>
                      <option value="Insiden Keamanan Siber">Penanggulangan Keamanan Siber / Ransomware</option>
                      <option value="Instalasi">Sistem OS & Aplikasi Produktif</option>
                      <option value="Lainnya">Lainnya / Konsultasi Managed Services</option>
                    </select>
                  </div>
                </div>

                {/* Deskripsi */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 font-mono uppercase block">Deskripsi Singkat Kendala IT *</label>
                  <textarea 
                    rows={4}
                    required
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Tuliskan keluhan hardware rusak, jenis ancaman penipuan siber, detail software yang ingin di-deploy, atau rincian spesifikasi perangkat yang Anda miliki..."
                    className="w-full bg-white border border-slate-250 rounded-lg text-xs p-3.5 focus:outline-none focus:border-red-600 focus:ring-0 transition font-sans leading-normal"
                  />
                  <span className="text-[10px] text-slate-400 font-mono font-medium block">
                    *Membuka simulator anggaran di atas akan otomatis menyalin hasil kalkulasi ke formulir ini.
                  </span>
                </div>

                {/* Submit button with Loading Spinner state */}
                <button
                  type="submit"
                  disabled={isSubmitLoading}
                  className="w-full md:w-auto px-6 py-3 bg-red-750 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  {isSubmitLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Memproses Data...
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      Kirim Permintaan Konsultasi
                    </>
                  )}
                </button>

              </form>

            </div>

            {/* Address & Legal Contact Column (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div>
                <span className="text-indigo-650 font-mono text-xs uppercase tracking-widest font-bold">INFORMASI KANTOR FISIK</span>
                <h3 className="text-xl font-display font-bold text-slate-930 tracking-tight mt-1">
                  Hubungi Markas Utama KAFY Tech
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin className="w-5 h-5 text-red-650 shrink-0" />,
                    title: "Alamat Kantor Fisik Surabaya:",
                    detail: "Jl. Pengampon 2 No. 8, Kelurahan Bongkaran, Kecamatan Pabean Cantian, Kota Surabaya, Jawa Timur, Indonesia."
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-red-650 shrink-0" />,
                    title: "Nomor Telepon Operasional:",
                    detail: "089601486350 (Tersambung langsung WhatsApp)"
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-red-650 shrink-0" />,
                    title: "Alamat Surat Elektronik (E-mail):",
                    detail: "hello@kafy.tech (Akun resmi startup KAFY)"
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-red-650 shrink-0" />,
                    title: "Jam Pelayanan Reguler & SLA Tanggap Darurat:",
                    detail: "Kantor buka Senin s.d Jumat Jam 08.00 s.d 17.00 WIB. Layanan respons insiden pembajakan siber sedia siaga penuh 24 Jam (Darurat)."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-slate-50 border border-slate-200/50 rounded-xl leading-normal">
                    <div className="p-2 bg-white rounded-lg shadow-xs self-start border border-slate-100">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-800 uppercase tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-slate-600 text-xs mt-1 font-sans">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {/* Interactive location map directly integrated */}
          <div className="mt-16">
            <InteractiveMap />
          </div>

        </div>
      </section>

      {/* 4.8 Seksi 8: Footer & Kontak Perusahaan */}
      <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-900 relative overflow-hidden">
        
        {/* Japanese Sun Backdrop element in footer as well */}
        <div className="absolute right-[-10%] bottom-[-5%] w-[350px] h-[350px] rounded-full bg-red-950/[0.04] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Logo brand info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <span className="font-display font-extrabold text-white text-lg tracking-tight">KAFY Tech</span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-sans pr-6">
              Startup penyedia solusi teknologi terpadu bertaraf profesional yang bertindak sebagai One-Stop Solution siber dan sistem operasional di Surabaya, Indonesia.
            </p>

            <p className="text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-wider block pt-2">
              Pendiri Tim: Kirei • Akbar • Fakhri • Yoga
            </p>
          </div>

          {/* Quick links block */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-red-500">
              Menu Cepat
            </h4>
            <ul className="space-y-2 text-xs font-sans text-slate-400">
              <li><a href="#profil" className="hover:text-white transition">Profil Pendiri</a></li>
              <li><a href="#layanan" className="hover:text-white transition">Katalog Layanan</a></li>
              <li><a href="#keunggulan" className="hover:text-white transition">Keunggulan SLA</a></li>
              <li><a href="#sertifikasi" className="hover:text-white transition">Sertifikasi Industri</a></li>
              <li><a href="#testimoni" className="hover:text-white transition">Ulasan Klien</a></li>
            </ul>
          </div>

          {/* IT rates references */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-red-500">
              Rate Jasa Utama
            </h4>
            <ul className="space-y-1.5 font-mono text-[10.5px] text-slate-400 leading-snug">
              <li>• Hardware Audit: <span className="text-red-400">Rp 75k</span></li>
              <li>• System Clean OS: <span className="text-red-400">Rp 150k</span></li>
              <li>• Troubleshoot BIOS: <span className="text-red-400">Rp 200k</span></li>
              <li>• Cyber Assessment: <span className="text-red-400">Mulai 4.5jt</span></li>
              <li>• Cyber Emergency: <span className="text-red-400">Mulai 7.5jt</span></li>
            </ul>
          </div>

          {/* Socials & legal copyrights */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest text-red-500">
              Situs Komunitas resmi
            </h4>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://linkedin.com/company/kafy-tech-solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/kafy.tech" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://github.com/KAFY-Tech-Open-Source" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500 transition"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <div className="border-t border-slate-900 pt-4 mt-2">
              <p className="text-[10.5px] font-mono text-slate-500 leading-snug">
                Pernyataan Hak Cipta: &copy; 2026 KAFY Tech. All Rights Reserved. Made with Precision.
              </p>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating chatbot WhatsApp component */}
      <ChatbotWhatsApp />

    </div>
  );
}
