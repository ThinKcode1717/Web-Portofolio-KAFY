import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini Client to prevent server crashes if the key is missing
let aiInstance: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

const SYSTEM_INSTRUCTION = `
You are Kafi, the virtual IT & Cybersecurity Assistant of KAFY Tech.
KAFY Tech is an IT startup from Surabaya, Indonesia, founded by Kirei, Akbar, Fakhri, and Yoga.
The name KAFY stands for Kirei, Akbar, Fakhri, Yoga, and is inspired by the Arabic word 'Kafi' (کافي) meaning 'cukup', 'lengkap', or 'memenuhi semua kebutuhan'.
Your goal is to friendly, professionally, and concisely answer client inquiries in Indonesian.
You specialize in hardware/software inventory management, hardware service, BIOS troubleshooting, OS/software installation, cyber security assessment, cyber attack response, and disaster recovery.
Always refer to KAFY Tech's professional team and standard Indonesian rate sheet for the year 2026:
- Inventarisasi Hardware: Rp 75.000 / Perangkat (Min. 10 unit)
- Inventarisasi Software (CD, DVD, Lisensi): Rp 50.000 / Perangkat
- Service Hardware: Rp 250.000 - Rp 600.000 (Tergantung tingkat kerusakan)
- Troubleshoot BIOS: Rp 200.000 / Unit
- Instalasi OS: Rp 150.000 / PC (Lisensi terpisah)
- Instalasi Software Aplikasi: Rp 75.000 / Bundel Paket
- Cyber Security Assessment: Mulai dari Rp 4.500.000 (Untuk UMKM)
- Penanggulangan Cyber Attack: Rp 7.500.000 - Rp 15.000.000 (Layanan darurat 24/7)
- Restore Komputer Terkena Ransomware/Siber/Virus: Rp 500.000 - Rp 1.200.000 (Per workstation)

Keep answers brief, highly structured, polite, and encourage the client to schedule a consultation using our online form or WhatsApp chat. Use professional yet approachable language. Include bullet points when referencing rates to make them highly readable.
`;

// API routes go here FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages array is required" });
    }

    // Format chat messages into Gemini SDK structure
    // We only need the text content
    const client = getGeminiClient();
    
    if (!client) {
      // Return a professional mock/fallback AI response if Gemini key is missing
      const lastUserMsg = messages[messages.length - 1]?.content || "";
      let reply = "Halo! Terima kasih telah menghubungi KAFY Tech. Saya Kafi, asisten virtual Anda.\n\nKunci API cerdas saya belum dikonfigurasi di server ini, namun saya dapat mengonfirmasi bahwa KAFY Tech adalah One-Stop Solution IT Anda dari Surabaya yang didirikan oleh Kirei, Akbar, Fakhri, dan Yoga.\n\nKami menawarkan inventarisasi aset, servis hardware komputer, troubleshoot BIOS, instalasi sistem operasi/aplikasi, audit keamanan siber, hingga penanggulangan darurat serangan siber (ransomware/virus).\n\nApakah Anda ingin berkonsultasi mengenai kendala IT spesifik? Silakan isi formulir konsultasi kami di halaman utama atau langsung hubungi nomor WhatsApp kami di 089601486350!";
      
      const lowerMsg = lastUserMsg.toLowerCase();
      if (lowerMsg.includes("harga") || lowerMsg.includes("tarif") || lowerMsg.includes("biaya") || lowerMsg.includes("rate")) {
        reply = "Berikut adalah perkiraan tarif layanan IT KAFY Tech tahun 2026:\n\n" +
                "• **Inventarisasi Hardware**: Rp 75.000 / Perangkat (Min. 10 unit)\n" +
                "• **Inventarisasi Software**: Rp 50.000 / Perangkat\n" +
                "• **Service Hardware**: Rp 250.000 - Rp 600.000\n" +
                "• **Troubleshoot BIOS**: Rp 200.000 / Unit\n" +
                "• **Instalasi OS**: Rp 150.000 / PC\n" +
                "• **Instalasi Software**: Rp 75.000 / Bundel\n" +
                "• **Cyber Security Assessment**: Mulai Rp 4.500.000\n" +
                "• **Penanggulangan Cyber Attack**: Rp 7.500.000 - Rp 15.000.000 (Darurat 24/7)\n" +
                "• **Recovery Ransomware**: Rp 500.000 - Rp 1.200.000 / Workstation\n\n" +
                "Apakah ada layanan tertentu yang ingin Anda tanyakan lebih lanjut? Anda juga bisa mengisi form konsultasi interaktif kami!";
      } else if (lowerMsg.includes("alamat") || lowerMsg.includes("lokasi") || lowerMsg.includes("surabaya") || lowerMsg.includes("kantor")) {
        reply = "Kantor fisik KAFY Tech berlokasi di:\n**Jl. Pengampon 2 No. 8, Kelurahan Bongkaran, Kecamatan Pabean Cantian, Kota Surabaya, Jawa Timur, Indonesia.**\n\nKami siap melayani kebutuhan perangkat kantor Anda baik secara jarak jauh maupun kunjungan langsung di wilayah Surabaya dan sekitarnya. Ada yang bisa kami bantu hari ini?";
      }

      return res.json({ reply });
    }

    // Format historical messages correctly as Gemini contents structure
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" as const : "user" as const,
      parts: [{ text: msg.content }]
    }));

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({ error: "Gagal menghubungkan ke layanan kecerdasan buatan KAFY." });
  }
});

// Endpoint to simulate form consultation submission
app.post("/api/consultation", (req, res) => {
  const { name, email, phone, category, description } = req.body;
  if (!name || !email || !phone || !category) {
    return res.status(400).json({ error: "Semua field wajib diisi." });
  }
  
  // Here in a real app, it would be inserted into a database or emailed.
  // We returning a success payload to show realistic lead generation.
  return res.json({
    success: true,
    message: "Permintaan konsultasi Anda berhasil dikirim ke tim KAFY Tech! Kami akan menghubungi Anda kembali dalam kurun waktu maksimal 2 jam gawat darurat siber atau 1 hari kerja biasa.",
    leadId: `KAFY-${Math.floor(100000 + Math.random() * 900000)}`
  });
});

async function startServer() {
  // Vite middleware setup for develop vs prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server KAFY Tech berjalan di http://localhost:${PORT}`);
  });
}

startServer();
