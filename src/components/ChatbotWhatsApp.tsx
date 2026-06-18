import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, CheckCheck, Compass, AlertCircle, ShieldCheck, HelpCircle } from "lucide-react";
import { Message } from "../types";

export default function ChatbotWhatsApp() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Halo! Saya **Kafi**, asisten AI virtual dari KAFY Tech Surabaya. 👋\n\nAda masalah hardware komputer lambat, audit software kantor, atau butuh tindakan tanggap darurat akibat serangan siber/virus di jaringan Anda?\n\nTanyakan kendala Anda langsung pada saya!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unreadCount, setUnreadCount] = useState<number>(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Click handler to open chat widget
  const handleOpenWidget = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  // Quick reply chips
  const quickReplies = [
    { label: "🚨 Gawat Darurat Siber", icon: <AlertCircle className="w-3.5 h-3.5 text-red-500" />, text: "Ada insiden serangan siber/virus mencurigakan di kantor kami sekarang! Tolong mitigasi darurat!" },
    { label: "💰 Estimasi Tarif Jasa", icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Berapa kisaran harga untuk layanan inventarisasi hardware fisik dan jasa servis komputer?" },
    { label: "🤝 Kenalan dengan Tim KAFY", icon: <Compass className="w-3.5 h-3.5" />, text: "Siapa saja pakar / pendiri startup di balik KAFY Tech dan apa keahlian masing-masing?" },
    { label: "📍 Kontak & Lokasi Kantor", icon: <HelpCircle className="w-3.5 h-3.5" />, text: "Di mana alamat fisik kantor KAFY Tech dan nomor telepon operasional yang bisa dihubungi?" }
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Append user message
    const userMsg: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Package messages history for Express chat API
      // To keep payload lean, we send past text conversations
      const payloadMessages = [...messages, userMsg].map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      if (!res.ok) {
        throw new Error("Failed to connect to assistant backend");
      }

      const data = await res.json();
      
      // Append AI Response
      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.reply || "Maaf, saya mengalami hambatan dalam merespons. Silakan hubungi kami di WA: 089601486350.",
        timestamp: new Date()
      }]);

    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Mohon maaf hangat dari KAFY Tech, layanan koneksi asisten AI saya sedang padat. Anda dapat menghubungi langsung penanggung jawab kami di nomor telepon **089601486350** atau mengirim pesan via formulir konsultasi untuk mendapat perhatian segera. 🙏",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format timestamps nicely
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {/* Expanded WhatsApp Panel Widget */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col bg-[#e5ddd5] mb-4 transition-all duration-300">
          
          {/* Top WhatsApp Style Status Header */}
          <div className="bg-[#075e54] p-4 text-white flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              {/* Green active glowing dot avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-red-800 border border-white/20 flex items-center justify-center font-display font-bold text-sm tracking-wide shadow">
                  KF
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
              </div>
              
              <div>
                <h4 className="font-semibold text-sm tracking-normal flex items-center gap-1.5">
                  Kafi AI Consultant
                  <span className="text-[10px] bg-red-600 px-1.5 py-0.2 rounded font-mono uppercase font-bold tracking-widest text-white">BOT</span>
                </h4>
                <p className="text-[11px] text-emerald-200/90 font-medium font-mono flex items-center gap-1">
                  Online • Tanggap Darurat IT
                </p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-100/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition cursor-pointer"
              aria-label="Tutup kafi chatbot"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* WhatsApp Textual Notification Strip */}
          <div className="bg-[#feeebe] text-[#303030] text-[10px] text-center font-medium font-sans py-1.5 px-3 border-b border-yellow-200/50 shadow-inner flex items-center justify-center gap-1 shrink-0">
            🔒 Pesan terenkripsi aman secara server-side via Gemini API
          </div>

          {/* Conversation Bubbles Scroller Box */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-repeat" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "400px" }}>
            
            {messages.map((msg, index) => {
              const isAss = msg.role === "assistant";
              return (
                <div 
                  key={index} 
                  className={`flex w-full ${isAss ? "justify-start" : "justify-end"}`}
                >
                  {/* Speech bubble */}
                  <div className={`max-w-[85%] rounded-xl shadow-sm px-3.5 py-2 relative text-xs leading-normal ${
                    isAss 
                      ? "bg-white text-slate-800 rounded-tl-none border-l-2 border-red-600" 
                      : "bg-[#d9fdd3] text-slate-800 rounded-tr-none"
                    }`}
                  >
                    
                    {/* Render Paragraph break and bolder tags properly */}
                    <div className="whitespace-pre-wrap break-words">
                      {msg.content.split("\n").map((para, pIdx) => {
                        // Very simple parser for **bold** markup
                        const parts = para.split("**");
                        return (
                          <p key={pIdx} className={pIdx > 0 ? "mt-2" : ""}>
                            {parts.map((pText, tIdx) => (
                              tIdx % 2 === 1 ? <strong key={tIdx} className="font-bold text-slate-900">{pText}</strong> : pText
                            ))}
                          </p>
                        );
                      })}
                    </div>

                    {/* Bottom tick clock details */}
                    <div className="flex items-center justify-end gap-1 font-mono text-[9px] text-slate-400 mt-2 text-right">
                      <span>{formatTime(msg.timestamp)}</span>
                      {!isAss && <CheckCheck className="w-3.5 h-3.5 text-sky-500 font-bold shrink-0" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* AI Typing Indicator state */}
            {isLoading && (
              <div className="flex justify-start w-full">
                <div className="bg-white text-slate-500 rounded-xl rounded-tl-none px-4 py-2 text-xs shadow-sm flex items-center gap-2">
                  <span className="font-mono text-[10px] text-red-500 italic font-bold">Kafi sedang merespons...</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-75" />
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-150" />
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce delay-300" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick Replies Tray */}
          <div className="bg-white/95 border-t border-slate-200/80 px-2 py-2 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(reply.text)}
                className="whitespace-nowrap px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-[#303030] rounded-full text-[10.5px] font-semibold transition flex items-center gap-1 cursor-pointer shrink-0"
              >
                {reply.icon}
                {reply.label}
              </button>
            ))}
          </div>

          {/* Bottom WhatsApp Type Message Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
            className="p-3 bg-[#f0f0f0] border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ketik pertanyaan IT di sini..."
              className="flex-1 bg-white border border-slate-200 hover:border-slate-300 focus:border-emerald-500 focus:ring-0 rounded-full text-xs px-4 py-2.5 focus:outline-none transition font-sans"
            />
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-10 h-10 rounded-full bg-[#128c7e] hover:bg-[#075e54] text-white flex items-center justify-center transition shadow shrink-0 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Kirim ke kafi chatbot"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>

        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={handleOpenWidget}
        className="w-14 h-14 bg-[#25d366] hover:bg-[#128c7e] text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-all duration-300 relative group pulse-red-ring"
        aria-label="Luncurkan Kafi AI WhatsApp Chatbot"
      >
        <MessageSquare className="w-6 h-6" />
        
        {/* Unread dot notification badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5.5 h-5.5 bg-red-650 border-2 border-white rounded-full flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-md">
            {unreadCount}
          </span>
        )}

        {/* Hover Tooltip display label */}
        <span className="absolute right-16 bg-slate-900 border border-slate-800 text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition shadow pointer-events-none uppercase tracking-wider">
          💬 Tanya KAFI AI WhatsApp Bot
        </span>
      </button>

    </div>
  );
}
