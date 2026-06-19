import { Sparkles, Compass } from "lucide-react";
import { FounderMember } from "../types";

const imageYoga = "/src/ImgProfile/Yoga.png";

// Reusable elegant Japanese Sakura cherry blossom petal
const SakuraPetal = ({ className, size = 20 }: { className: string; size?: number }) => (
  <svg 
    className={`${className} pointer-events-none drop-shadow-xs transition-transform`} 
    viewBox="0 0 100 100" 
    fill="currentColor"
    width={size}
    height={size}
    style={{ color: '#FFB7C5' }}
  >
    {/* Stylized cherry blossom petal with a notch at the top */}
    <path d="M50 85 C30 75 10 50 15 30 C18 15 35 15 45 25 C47 27 49 28 50 28 C51 28 53 27 55 25 C65 15 82 15 85 30 C90 50 70 75 50 85 Z" />
  </svg>
);

// Reusable detailed sakura flower branch silhouette
const SakuraFlowerIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={`${className} text-rose-350 fill-none stroke-current`} viewBox="0 0 24 24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L13 5L16 4L14 7L17 8L14 9L15 12L12 10L9 12L10 9L7 8L10 7L8 4L11 5L12 2Z" fill="#FFAEC9" stroke="#FF8DA1" />
    <circle cx="12" cy="7" r="1.5" fill="#FFE0E6" />
    <path d="M12 12V22" stroke="#8B6C73" strokeWidth="1" />
  </svg>
);

export default function TeamSection() {
  const members: Omit<FounderMember, "role" | "whatsappMessage" | "certifications">[] = [
    {
      id: 1,
      name: "Kirei Na Hito",
      avatarSeed: "Kirei",
      avatarBg: "from-rose-950 to-rose-900/60 border-rose-300/30",
      bio: "Fokus menjaga kedaulatan data dan privasi ekosistem IT korporasi Indonesia dari penipuan digital dan peretasan jahat.",
      visionQuote: "Visi & Misi: Mewujudkan komputasi aman tanpa celah di mana bisnis dapat tumbuh pesat tanpa perlu khawatir akan kebocoran data siber."
    },
    {
      id: 2,
      name: "Akbar Rayhan",
      avatarSeed: "Akbar",
      avatarBg: "from-rose-950 to-slate-900 border-rose-300/30",
      bio: "Mengoptimalkan keandalan infrastruktur server fisik dan memisahkan kompleksitas arsitektur agar sistem selalu siaga sepanjang waktu.",
      visionQuote: "Visi & Misi: Membangun pilar infrastruktur operasi yang tangguh, zero-downtime, dan mudah dipulihkan pasca bencana tak terduga."
    },
    {
      id: 3,
      name: "Muchammad Ainun Fakhri Sholakhudin",
      avatarSeed: "Fakhri",
      avatarBg: "from-rose-950 to-zinc-900 border-rose-300/30",
      bio: "Merapikan kendala legalitas kepatuhan perangkat lunak serta mendata secara presisi setiap aset hardware dalam inventarisasi terpusat.",
      visionQuote: "Visi & Misi: Menciptakan transparansi tata kelola aset IT yang 100% patuh lisensi hukum untuk menghindari audit merugikan bagi korporat."
    },
    {
      id: 4,
      name: "Yoga Adi Pratama",
      avatarSeed: "Yoga",
      avatarBg: "from-rose-950 to-stone-900 border-rose-300/40",
      bio: "Menyatukan keempat pilar teknologi yang terpisah menjadi satu payung layanan holistik terpadu di Surabaya.",
      visionQuote: "Visi & Misi: Menghadirkan layanan satu pintu (One-Stop) KAFY Tech yang melengkapi semua kebutuhan tanpa perlu mencari vendor lain.",
      imageUrl: imageYoga
    }
  ];

  return (
    <section id="profil" className="py-24 bg-gradient-to-b from-slate-950 via-[#161214] to-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* Decorative Rising Sun with Sakura-pink hue backdrop */}
      <div className="absolute right-[-10%] top-[10%] w-[450px] h-[450px] rounded-full border border-rose-900/20 bg-rose-950/[0.04] -z-[1] pointer-events-none" />
      <div className="absolute left-[-15%] bottom-[5%] w-[600px] h-[600px] rounded-full border border-rose-950/10 bg-slate-950/[0.01] -z-[1] pointer-events-none" />

      {/* Floating Sakura Petals drift simulations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-full w-full">
        <SakuraPetal className="absolute left-[10%] top-[15%] animate-sakura-slow-1 text-rose-300" size={24} />
        <SakuraPetal className="absolute left-[80%] top-[8%] animate-sakura-slow-2 text-rose-200" size={18} />
        <SakuraPetal className="absolute left-[45%] top-[40%] animate-sakura-slow-3 text-rose-250" size={16} />
        <SakuraPetal className="absolute left-[20%] top-[70%] animate-sakura-slow-4 text-rose-300" size={22} />
        <SakuraPetal className="absolute left-[85%] top-[65%] animate-sakura-slow-5 text-rose-100" size={20} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-20 text-center relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-950/40 border border-rose-900/50 rounded-full mb-4 shadow-sm">
            <SakuraFlowerIcon className="w-4 h-4 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-rose-300 uppercase font-bold">PROFILE TIM PENDIRI KAFY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight mt-1 text-white flex items-center justify-center gap-2">
            <span>Para Pendiri</span>
            <span className="text-rose-400 italic font-serif">KAFY Tech</span>
          </h2>
          <div className="w-16 h-[2px] bg-rose-450 mx-auto mt-4" />
          <p className="text-slate-450 max-w-2xl mx-auto mt-4 text-xs md:text-sm leading-relaxed font-sans font-light">
            Sinergi kolaboratif tim KAFY dalam mewujudkan keandalan digital di bawah satu atap perlindungan teknologi terintegrasi.
          </p>
        </div>

        {/* Dynamic clean list showing only Name and Vision & Mission as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {members.map((member) => {
            return (
              <div 
                key={member.id} 
                className="relative group p-8 rounded-2xl border border-rose-950/40 bg-zinc-950/80 hover:bg-zinc-900/40 transition-all duration-500 overflow-hidden shadow-xl"
                id={`founder-${member.id}`}
              >
                {/* Background cherry blossoms silhouette detail */}
                <div className="absolute right-3 top-3 opacity-[0.03] group-hover:opacity-[0.08] transition duration-500 pointer-events-none">
                  <SakuraFlowerIcon className="w-24 h-24 text-rose-400" />
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                  
                  {/* Monogram Circle or Avatar Image representing a minimal elegant Japanese ensō or badge */}
                  <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${member.avatarBg} border flex items-center justify-center shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-300 overflow-hidden`}>
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="text-2xl font-display font-bold text-rose-100 tracking-wider">
                        {member.name.split(" ")[0].substring(0, 2).toUpperCase()}
                      </span>
                    )}
                    <SakuraPetal className="absolute -bottom-1 -right-1 rotate-12 text-rose-300 z-10" size={14} />
                  </div>

                  {/* Details block */}
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl font-display font-bold text-white tracking-tight flex items-center gap-1.5 hover:text-rose-300 transition-colors">
                        {member.name}
                        <span className="text-[10px] text-rose-400 font-serif leading-none italic font-light">❀</span>
                      </h3>
                      <p className="text-slate-400 text-xs mt-1.5 leading-relaxed font-sans font-light">
                        {member.bio}
                      </p>
                    </div>

                    {/* Visi Misi */}
                    <div className="border-t border-rose-950/30 pt-3 mt-1">
                      <p className="text-xs text-rose-250 italic leading-relaxed font-sans font-medium">
                        {member.visionQuote}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
