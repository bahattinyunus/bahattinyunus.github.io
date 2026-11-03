import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  Copy,
  Check,
  Languages,
  Linkedin,
  ExternalLink,
  Download,
  Plane,
  Brain,
  Shield,
  Cpu,
  Orbit,
  Sparkles,
  Award,
  Terminal as TerminalIcon,
  Search,
  Layers,
  Send,
  ArrowRight,
  BookOpen,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Activity,
  Code2,
  Filter,
  FileText,
  Radio,
  Globe,
  Sliders,
  X,
} from "lucide-react";
import { IDENTITY } from "@/lib/portfolioContent";
import { CertificationVault } from "@/components/cyber-ui/CertificationVault";
import { FieldOperationsGallery } from "@/components/portfolio/FieldOperationsGallery";
import { InteractiveTerminal } from "@/components/cyber-ui/InteractiveTerminal";
import { ALL_CERTIFICATES } from "@/lib/certificatesData";
import { toast } from "sonner";

/* ================================================================== */
/*  Dil ve Yerelleştirme                                               */
/* ================================================================== */
type LangType = "tr" | "en";
interface LangContextType {
  lang: LangType;
  setLang: (lang: LangType) => void;
}

const LangCtx = createContext<LangContextType>({
  lang: "tr",
  setLang: () => {},
});
const useLang = () => useContext(LangCtx);

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  longDesc: string;
  architecture: string[];
  highlights: string[];
  tags: string[];
  link: string;
  metric: string;
}

/* ================================================================== */
/*  Ana Portfolyo Sayfası                                              */
/* ================================================================== */
export default function Home() {
  const [lang, setLang] = useState<LangType>(() => {
    if (typeof window === "undefined") return "tr";
    const saved = window.localStorage.getItem("lang");
    return saved === "en" || saved === "tr" ? saved : "tr";
  });

  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Terminal Modal State
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  // Proje Filtreleme & Arama Durumu
  const [projectSearch, setProjectSearch] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // İletişim Formu State
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Spotlight Cursor Glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Keyboard shortcut (Ctrl+K or Cmd+K) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // ScrollSpy for navbar
  useEffect(() => {
    const sectionIds = ["hero", "bento", "projects", "operations", "skills", "certificates", "contact"];
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= windowHeight * 0.35 && rect.bottom >= windowHeight * 0.15) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(IDENTITY.email);
    setCopied(true);
    toast.success(lang === "tr" ? "E-posta panoya kopyalandı!" : "Email copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const navLinks = [
    { id: "hero", label: lang === "tr" ? "GİRİŞ" : "OVERVIEW" },
    { id: "bento", label: lang === "tr" ? "KOKPİT" : "BENTO HUB" },
    { id: "projects", label: lang === "tr" ? "PROJELER" : "PROJECTS" },
    { id: "operations", label: lang === "tr" ? "SAHA GÖREVLERİ" : "FIELD LOG" },
    { id: "skills", label: lang === "tr" ? "YETENEKLER" : "SKILLS" },
    { id: "certificates", label: lang === "tr" ? "SERTİFİKALAR" : "CERTS (270+)" },
    { id: "contact", label: lang === "tr" ? "İLETİŞİM" : "CONTACT" },
  ];

  const rawProjects: ProjectItem[] = useMemo(() => {
    return [
      {
        id: "datathon-ensemble",
        title: "Datathon Tahminleme Hattı (Attention-LSTM & Prophet)",
        category: lang === "tr" ? "Yapay Zekâ & Zaman Serisi" : "AI & Time Series",
        desc:
          lang === "tr"
            ? "Attention mekanizmalı LSTM, Prophet ve Random Forest modellerini 100+ öznitelik mühendisliğiyle birleştiren yüksek başarımlı hibrit zaman serisi tahminleme hattı."
            : "High-performance hybrid time-series pipeline combining Attention-LSTM, Prophet, and Random Forest with 100+ automated feature engineering metrics.",
        longDesc:
          lang === "tr"
            ? "Türkiye Girişimcilik Vakfı ve BTK Datathon maratonlarında inşa edilmiş çok modüllü tahminleyici mimari. Zaman serisi anomalilerini tespit etmek için Attention katmanları, mevsimsel trendler için Prophet ve rezidüel sapmalar için Random Forest ağırlıklı ensemble yöntemi uygulanmıştır."
            : "Multi-module forecasting architecture built for high-scale time series competitions. Uses Attention layers for temporal anomaly identification, Prophet for cyclical seasonality, and Random Forest for residual stacking.",
        architecture: [
          "100+ Otomatik Feature Engineering (Lag, Rolling Window, Cyclical Fourier)",
          "Attention-LSTM ile Derin Zaman Serisi Öznitelik Çıkarımı",
          "Prophet & Random Forest Stacking Ensemble",
          "Kaggle & Datathon Standartlarında Doğrulama (RMSE/MAPE)",
        ],
        highlights: ["100+ Feature", "Attention-LSTM", "Hibrit Stacking"],
        tags: ["Python", "PyTorch", "Attention-LSTM", "Prophet", "Scikit-Learn", "Pandas"],
        link: "https://github.com/bahattinyunus",
        metric: "Datathon 2026 · 100+ Features",
      },
      {
        id: "aura-hockey-ar",
        title: "Aura Hockey AR (Ankara AI Hackathon '26)",
        category: lang === "tr" ? "Görüntü İşleme & WebGL 3D" : "Computer Vision & 3D",
        desc:
          lang === "tr"
            ? "Google MediaPipe ile 21 el eklemini gerçek zamanlı takip eden, Three.js ve WebGL fizik çarpışma motoruyla tarayıcıda doğrudan 60 FPS çalışan donanımsız artırılmış gerçeklik masa hokeyi prototipi."
            : "Zero-latency in-browser AR hockey powered by 21-joint MediaPipe real-time hand tracking and a custom Three.js WebGL physics engine.",
        longDesc:
          lang === "tr"
            ? "Ankara AI Hackathon Teknopark Ankara maratonunda 36 saatte geliştirilen amiral gemisi AR prototip. Kullanıcının eline hiçbir donanım veya kontrolcü takmadan, standart bir webcam üzerinden 21 eklem iskeleti çıkartılır ve WebGL 3D uzayında gerçek zamanlı çarpışma hesaplanır."
            : "Developed in 36 hours at Ankara AI Hackathon. Tracks 21 hand landmarks directly via browser webcam without external sensors, running real-time rigid body collision physics at 60 FPS.",
        architecture: [
          "Google MediaPipe Hands ile 21 İskelet Noktası Tespiti",
          "Three.js & WebGL ile 3D Render & Işıklandırma Hattı",
          "Özel Fizik Çarpışma Çözücüsü (Elastic Impulse Collision)",
          "Sıfır Donanım Bağımlılığı, 60 FPS Sabit Akıcılık",
        ],
        highlights: ["60 FPS WebGL", "21 Eklem Takibi", "Sıfır Ek Donanım"],
        tags: ["Three.js", "MediaPipe", "WebGL", "TypeScript", "TensorFlow.js"],
        link: "https://github.com/bahattinyunus",
        metric: "Ankara AI Hackathon · 60 FPS",
      },
      {
        id: "feza-arsivi-tua",
        title: "FezaArsivi & TUA Uzay Mimarileri",
        category: lang === "tr" ? "Uzay Bilimleri & ROS 2" : "Space & Avionics",
        desc:
          lang === "tr"
            ? "Türkiye Uzay Ajansı (TUA) Astro Hackathonu ve TÜBİTAK Karacaali Uzay Kampı'nda inşa edilen; Ay yüzeyi otonom keşif için ROS 2 & EKF telemetri füzyonu ve CubeSat radyo spektrogram analiz kütüphanesi."
            : "ROS 2 and EKF telemetry fusion for autonomous lunar exploration and CubeSat radio astronomy spectrogram analysis created at TSA Astro Hackathon.",
        longDesc:
          lang === "tr"
            ? "Türkiye Uzay Ajansı (TUA) Astro Hackathonu'nda 48 saatte geliştirilen 15 açık kaynak uzay projesi ve TÜBİTAK Karacaali Uzay Kampı'nda kurulan yer istasyonu protokolü. SDR (Software Defined Radio) donanımlarıyla gezegenler arası sinyal ve spektrogram analizi yapılmıştır."
            : "Built at TSA Astro Hackathon and TUBITAK Space Camp. Encompasses 15 open-source aerospace software modules including SDR spectrogram signal processing and ROS 2 EKF state estimation for lunar rovers.",
        architecture: [
          "ROS 2 Humble Düğüm Mimarisi & EKF Sensör Füzyonu",
          "CubeSat Telemetri & Yer İstasyonu İletişim Protokolü",
          "SDR Donanımları ile Spektrogram & Doppler Analizi",
          "15 Açık Kaynak Uzay Yazılım Mimarisi",
        ],
        highlights: ["ROS 2 Humble", "SDR Spektrogram", "CubeSat Telemetri"],
        tags: ["ROS 2", "Python", "SDR", "Spectrogram", "EKF", "CubeSat"],
        link: "https://github.com/bahattinyunus/FezaArsivi",
        metric: "TÜBİTAK & TUA · CubeSat Telemetry",
      },
      {
        id: "deepforensics",
        title: "DeepForensics & Multimedya Güvenliği",
        category: lang === "tr" ? "Adli Bilişim & Siber Savunma" : "Forensics & Security",
        desc:
          lang === "tr"
            ? "BTK Akademi 42 saatlik atölyesinde geliştirilen; multimedya dosyalarında PRNU kamera parmak izi analizi, ELA seviye tespiti, GAN deepfake tespiti ve C2PA kriptografik içerik kimlik doğrulama paketi."
            : "Digital multimedia forensics suite implementing PRNU sensor noise fingerprinting, ELA analysis, GAN deepfake classification, and C2PA provenance verification.",
        longDesc:
          lang === "tr"
            ? "Trabzon BTK Akademi 42 saatlik ileri adli bilişim maratonunda inşa edilmiş güvenlik paketi. Görüntülerin kamera sensör gürültüsü (PRNU) ile kaynağını belirler, ELA (Error Level Analysis) ile piksel manipülasyonlarını ortaya çıkarır ve C2PA dijital içerik doğrulamasını uygular."
            : "Advanced forensic suite engineered during a 42-hour intensive workshop. Leverages sensor pattern noise (PRNU), error level analysis, and deep neural networks to unmask synthetic media and verify media provenance.",
        architecture: [
          "PRNU Kamera Sensör Parmak İzi Tespiti",
          "ELA (Error Level Analysis) Manipülasyon Filtresi",
          "GAN & Difüzyon Deepfake Yüz Sınıflandırıcısı",
          "C2PA Kriptografik Dijital İçerik İmzası",
        ],
        highlights: ["PRNU Parmak İzi", "Deepfake Tespiti", "C2PA Doğrulama"],
        tags: ["Python", "PyTorch", "OpenCV", "PRNU", "Deepfake", "C2PA"],
        link: "https://github.com/bahattinyunus",
        metric: "BTK Akademi · C2PA Verified",
      },
      {
        id: "insansiz-sualti",
        title: "İnsansız Sualtı Sistemleri Rehberi (TEKNOFEST)",
        category: lang === "tr" ? "Otonom Araçlar & ROS 2" : "Robotics & Embedded",
        desc:
          lang === "tr"
            ? "NVIDIA Jetson Orin tabanlı Edge AI, ROS 2 düğüm mimarisi, EKF sensör füzyonu ve derinlik/sonar entegrasyonuyla otonom sualtı seyrüsefer algoritmaları rehberi."
            : "Autonomous robotics guide and ROS 2 node architecture with EKF sensor fusion for NVIDIA Jetson Orin underwater vehicle deployments.",
        longDesc:
          lang === "tr"
            ? "TEKNOFEST İnsansız Sualtı Sistemleri yarışmacıları için hazırlanmış açık kaynaklı teknik rehber ve mimari kütüphane. NVIDIA Jetson Orin uç bilgisayarında düşük güç tüketimiyle çalışan yapay zekâ düğümleri, basınç sensörleri ve fırçasız motor kontrol hatlarını içerir."
            : "Open-source reference architecture designed for autonomous underwater vehicles (AUV). Outlines low-latency Edge-AI deployment on NVIDIA Jetson Orin, multi-sensor EKF integration, and thruster control protocols.",
        architecture: [
          "NVIDIA Jetson Orin Uç Birim Yapay Zekâ Çıkarımı",
          "ROS 2 Düğümleri ile Sensör ve İtki Yönetimi",
          "Derinlik, IMU ve Sonar için EKF Durum Kestirimi",
          "Sualtı Otonom Seyrüsefer & Durum Kestirimi",
        ],
        highlights: ["Jetson Orin", "ROS 2 Düğümleri", "EKF Durum Kestirimi"],
        tags: ["ROS 2", "NVIDIA Jetson", "C++", "Python", "EKF", "Sensör Füzyonu"],
        link: "https://github.com/bahattinyunus",
        metric: "TEKNOFEST · Jetson Orin",
      },
      {
        id: "beeroute",
        title: "BeeRoute // Bio-mimetic ABC Optimizer",
        category: lang === "tr" ? "Algoritma & Optimizasyon" : "Optimization",
        desc:
          lang === "tr"
            ? "Yapay Arı Kolonisi (Artificial Bee Colony) prensibiyle NP-Hard gezgin satıcı (TSP) ve otonom rota planlama problemlerini O(G·S·n²) karmaşıklığında çözen yüksek başarımlı çekirdek."
            : "High-performance bio-mimetic Artificial Bee Colony (ABC) optimizer for NP-Hard traveling salesperson and route planning.",
        longDesc:
          lang === "tr"
            ? "Biyo-taklit temelli optimizasyon çekirdeği. İşçi, gözcü ve kaşif arı fazlarıyla çok boyutlu arama uzayında yerel minimum tuzaklarına düşmeden küresel optimum rotayı bulur. İHA sürüleri ve otonom lojistik rotalama için optimize edilmiştir."
            : "Bio-mimetic optimization engine resolving NP-Hard Traveling Salesperson and swarm trajectory planning with O(G·S·n²) complexity, escaping local optima via stochastic scout phases.",
        architecture: [
          "Üç Fazlı Yapay Arı Kolonisi (İşçi, Gözcü, Kaşif)",
          "O(G·S·n²) Asimptotik Hesaplama Karmaşıklığı",
          "C++ & Python Hibrit Hızlı Matris İcra Hattı",
          "Otonom İHA Sürü Rotalama Desteği",
        ],
        highlights: ["O(G·S·n²)", "ABC Algoritması", "İHA Sürü Rotalama"],
        tags: ["Python", "C++", "NumPy", "Heuristics", "Graph Theory"],
        link: "https://github.com/bahattinyunus/BeeRoute",
        metric: "Algoritmik Optimizasyon · O(G·S·n²)",
      },
      {
        id: "celik-mcu",
        title: "Çelik MCU // Yerli RISC-V C++ SDK",
        category: lang === "tr" ? "Gömülü Sistemler & RTOS" : "Embedded & RTOS",
        desc:
          lang === "tr"
            ? "İlk yerli RISC-V çipi Çelik MCU için modern C++20 SDK, FreeRTOS HAL katmanı ve bare-metal çevre birimi sürücüleri."
            : "Modern C++20 SDK, FreeRTOS HAL layer, and bare-metal peripheral drivers for Çelik MCU, the national Turkish RISC-V microcontroller.",
        longDesc:
          lang === "tr"
            ? "Beko & Yongatek ortaklığıyla üretilen ilk yerli RISC-V mikrodenetleyicisi Çelik MCU için geliştirilmiş C++20 HAL kütüphanesi. Bare-metal GPIO, UART, SPI, I2C sürücüleri ve FreeRTOS çekirdek portunu içerir."
            : "C++20 Hardware Abstraction Layer (HAL) engineered for Çelik MCU, Turkey's national RISC-V microcontroller. Features bare-metal peripheral drivers, interrupt dispatchers, and FreeRTOS kernel integration.",
        architecture: [
          "Modern C++20 Type-Safe Donanım Soyutlama (HAL)",
          "RISC-V 32-bit Bare-Metal Sürücüleri (GPIO/UART/SPI)",
          "FreeRTOS Gerçek Zamanlı Çekirdek Entegrasyonu",
          "Düşük Bellek Ayak İzi & Deterministik İcra",
        ],
        highlights: ["Yerli RISC-V", "C++20 HAL", "FreeRTOS Port"],
        tags: ["C++20", "RISC-V", "FreeRTOS", "HAL", "Bare-Metal"],
        link: "https://github.com/bahattinyunus/Celik-MCU-SDK",
        metric: "Yerli RISC-V · C++20 SDK",
      },
    ];
  }, [lang]);

  const popularTags = ["ALL", "ROS 2", "Python", "PyTorch", "C++20", "Three.js", "FreeRTOS", "SDR", "EKF"];

  const filteredProjects = useMemo(() => {
    return rawProjects.filter((p) => {
      const matchTag = selectedTag === "ALL" || p.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
      const q = projectSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q);
      return matchTag && matchSearch;
    });
  }, [rawProjects, selectedTag, projectSearch]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage.trim()) return;
    const subject = encodeURIComponent(`İletişim: ${contactName || "Web Ziyaretçisi"}`);
    const body = encodeURIComponent(`${contactMessage}\n\n— ${contactName || "İsimsiz Ziyaretçi"}`);
    window.location.href = `mailto:${IDENTITY.email}?subject=${subject}&body=${body}`;
    toast.success(lang === "tr" ? "E-posta istemciniz açılıyor..." : "Opening your email client...");
  };

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      {/* Root Container */}
      <div className="relative min-h-screen bg-[#07090e] text-neutral-300 font-sans selection:bg-emerald-400/30 selection:text-emerald-200">
        
        {/* Dynamic Spotlight Glow */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(750px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.06), transparent 80%)`,
          }}
        />

        {/* Subtle Tech Grid Background */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />

        {/* ========================================================== */}
        {/* TOP COMMAND BAR (Floating Glassmorphic Navbar)            */}
        {/* ========================================================== */}
        <nav className="fixed top-3 sm:top-5 inset-x-0 z-40 mx-auto max-w-6xl px-4 pointer-events-none">
          <div className="pointer-events-auto flex items-center justify-between gap-3 px-4 sm:px-6 py-2.5 rounded-full border border-neutral-800/80 bg-neutral-950/80 backdrop-blur-xl shadow-2xl">
            {/* Brand Logo */}
            <a href="#hero" className="flex items-center gap-2.5 group">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-neutral-100 group-hover:text-emerald-400 transition">
                BYÇ <span className="text-neutral-500 font-normal">// LABS</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-mono">
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`px-3 py-1 rounded-full transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-neutral-800 text-emerald-400 font-semibold"
                      : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Action Tools */}
            <div className="flex items-center gap-2">
              {/* Terminal Launcher */}
              <button
                onClick={() => setIsTerminalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-700/80 bg-neutral-900/90 hover:bg-neutral-800 text-neutral-200 hover:text-emerald-400 text-xs font-mono transition shadow-sm"
                title="Terminal Konsolunu Aç (Ctrl+K)"
              >
                <TerminalIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Terminal</span>
                <span className="hidden sm:inline-block ml-1 px-1.5 py-0.2 text-[9px] rounded bg-neutral-800 text-neutral-400 border border-neutral-700">⌘K</span>
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-700/80 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-xs font-mono transition"
                title="Dili Değiştir / Change Language"
              >
                <Languages className="w-3.5 h-3.5 text-cyan-400" />
                <span className="uppercase font-semibold text-[11px]">{lang}</span>
              </button>

              {/* Direct CV Button */}
              <a
                href="/cv3.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium transition"
              >
                <Download className="w-3 h-3" />
                <span>CV (PDF)</span>
              </a>
            </div>
          </div>
        </nav>

        {/* Main Content Flow */}
        <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-24">
          
          {/* ========================================================== */}
          {/* SECTION 1: HERO & IDENTITY COMMAND CENTER                 */}
          {/* ========================================================== */}
          <section id="hero" className="relative">
            <div className="flex flex-col items-start gap-6">
              
              {/* Telemetry Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-md text-xs font-mono text-neutral-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Ankara, Türkiye</span>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-400">ODTÜ (CEIT) & Hacettepe Üniversitesi</span>
                <span className="text-neutral-600">/</span>
                <span className="text-emerald-400 font-semibold">{lang === "tr" ? "AR-GE'YE AÇIK" : "AVAILABLE"}</span>
              </div>

              {/* Big Bold Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-100 font-display">
                  {IDENTITY.name}
                </h1>
                
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-neutral-200">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    {lang === "tr"
                      ? "Yapay Zekâ · Otonom Sistemler · Gömülü Yazılım Mühendisi"
                      : "AI · Autonomous Systems · Embedded Software Engineer"}
                  </span>
                </h2>
              </div>

              {/* Punchline Statement */}
              <p className="max-w-3xl text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
                {lang === "tr"
                  ? "Derin öğrenme modellerini doğruluk kaybı olmaksızın %80'e varan oranlarda budama (pruning) ve quantization ile kenar cihazlarda sıfır gecikmeyle koşturuyorum. ROS2/PX4 otopilot mimarileri, C++20 bare-metal sürücüler ve otonom İHA aviyonikleri geliştiriyorum."
                  : "Compressing deep learning models by up to 80% via pruning and quantization for real-time edge execution. Architecting ROS2/PX4 avionics, C++20 bare-metal firmware, and autonomous aerial platforms."}
              </p>

              {/* Action Buttons & Fast Links */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 text-neutral-900 font-semibold text-sm hover:bg-neutral-200 transition shadow-lg"
                >
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>{lang === "tr" ? "Projeleri İncele" : "Explore Projects"}</span>
                </a>

                <button
                  onClick={() => setIsTerminalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 font-mono text-sm transition"
                >
                  <TerminalIcon className="w-4 h-4 text-emerald-400" />
                  <span>{lang === "tr" ? "Terminali Aç (⌘K)" : "Open Terminal (⌘K)"}</span>
                </button>

                <a
                  href="/cv3.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 text-sm font-medium transition"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>{lang === "tr" ? "Özgeçmiş / CV (PDF)" : "Resume (PDF)"}</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 text-neutral-300 border border-neutral-800 text-sm font-mono transition"
                  title="E-posta Kopyala"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? (lang === "tr" ? "Kopyalandı" : "Copied") : IDENTITY.email}</span>
                </button>
              </div>

              {/* Social Channels Dock */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition"
                  title="GitHub Repoları"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={IDENTITY.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-cyan-400 transition"
                  title="LinkedIn Profili"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${IDENTITY.email}`}
                  className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-emerald-400 transition"
                  title="Doğrudan E-posta"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <div className="h-6 w-px bg-neutral-800 mx-1" />
                <span className="text-xs font-mono text-neutral-500">
                  {IDENTITY.statsFallback.repos}+ repos · {IDENTITY.statsFallback.stars}+ stars · {ALL_CERTIFICATES.length}+ certs
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 2: AUTONOMOUS ENGINEERING BENTO GRID (COCKPIT)     */}
          {/* ========================================================== */}
          <section id="bento" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {lang === "tr" ? "// MÜHENDİSLİK KOKPİTİ" : "// ENGINEERING COCKPIT"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 font-display">
                  {lang === "tr" ? "Yetkinlik & Ar-Ge Bento Matrisi" : "Capability & R&D Bento Matrix"}
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                {lang === "tr" ? "6 Temel Yetkinlik Sütunu" : "6 Core Pillars"}
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              
              {/* Card 1: AI & Model Optimization (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/20 transition" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "Model Optimizasyonu & Edge AI" : "Model Optimization & Edge AI"}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">%80 Pruning · INT8/FP4 Quantization</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {lang === "tr"
                    ? "PyTorch, TensorRT ve vLLM ile derin öğrenme modellerinde doğruluk kaybı olmadan ağırlık budama (pruning) ve kuantalama mimarileri. Kenar donanımlarda (Jetson Orin, Raspberry Pi) düşük güç tüketimiyle yüksek FPS çıkarım."
                    : "Zero-accuracy-loss structural pruning and INT8/FP4 quantization with PyTorch, TensorRT, and vLLM. Optimized for low-power edge deployment on Jetson Orin with sub-millisecond latencies."}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["PyTorch", "Model Pruning (%80)", "INT8 Quantization", "TensorRT", "vLLM", "QLoRA"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 2: Robotics & Avionics (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-cyan-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "Otonom Aviyonik & SHGM İHA-1" : "Autonomous Avionics & UAV Pilot"}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">ROS2 Humble · PX4 Autopilot · Lisanslı Pilot</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {lang === "tr"
                    ? "SHGM onaylı İHA-1 Ticari Pilotaj Lisansı (TR-IHA1H10609053). ROS2 düğüm haberleşmesi, FastDDS, MAVLink telemetrisi, EKF sensör füzyonu ve Gazebo/Unreal Engine simülasyonları ile tam otonom uçuş hatları."
                    : "DGCA-certified Commercial UAV-1 Pilot License. Architecting ROS2 node graphs, FastDDS bus, MAVLink telemetry, EKF sensor fusion, and hardware-in-the-loop (HIL) simulations."}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["ROS2 Humble", "PX4 Autopilot", "SHGM İHA-1", "MAVLink", "EKF Füzyon", "FastDDS"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 3: Academic Pedigree (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-purple-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "ODTÜ & Hacettepe Üniversitesi" : "METU & Hacettepe University"}
                    </h3>
                    <span className="text-xs font-mono text-purple-400">Lisans Araştırmacısı · Çok Disiplinli Temel</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {lang === "tr"
                    ? "ODTÜ (BÖTE / CEIT) ve Hacettepe Üniversitesi'nde akademik öğrenim; Karadeniz Teknik Üniversitesi (Yazılım Müh.) ve RTEÜ ile algoritmalar, dağıtık sistemler ve C++ nesne yönelimli mimariler."
                    : "Pursuing academic studies and research at METU CEIT and Hacettepe University, supported by strong software engineering foundations from Karadeniz Technical University."}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["ODTÜ CEIT", "Hacettepe", "KTÜ Yazılım", "Algoritmalar", "Veri Yapıları"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 4: International Diplomacy (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-amber-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "Fransa Değişimi & Uluslararası Heyet" : "France Youth Delegation"}
                    </h3>
                    <span className="text-xs font-mono text-amber-400">Top 20 / 66.500+ Aday · T.C. GSB & Maarif</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {lang === "tr"
                    ? "66.500'ü aşkın aday arasından seçilen 20 gençten biri olarak; Strasbourg, Avrupa Parlamentosu ve AİHM resmi heyet incelemeleri. T.C. GSB gönüllü gençlik liderliği ve teknoloji mentorluğu."
                    : "Selected among the top 20 youth out of 66,500+ applicants across Turkey for the official delegation to the European Parliament, ECHR, and University of Strasbourg."}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["Top 20 / 66.5K", "Avrupa Parlamentosu", "AİHM", "T.C. GSB Liderlik", "Maarif Vakfı"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card 5: Open-Source Footprint (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "Açık Kaynak & GitHub Üretkenliği" : "Open Source Footprint"}
                    </h3>
                    <span className="text-xs font-mono text-emerald-400">231+ Public Repos · 1500+ Stars</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center font-mono my-3">
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-xl font-bold text-neutral-100">231+</div>
                    <div className="text-[10px] text-neutral-500">Public Repos</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-xl font-bold text-amber-400">1,500+</div>
                    <div className="text-[10px] text-neutral-500">Stars</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="text-xl font-bold text-cyan-400">2,063+</div>
                    <div className="text-[10px] text-neutral-500">Followers</div>
                  </div>
                </div>
                <a
                  href={IDENTITY.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:underline pt-1"
                >
                  <span>github.com/bahattinyunus</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Card 6: Defense & Space Deployments (Span 2) */}
              <div className="md:col-span-2 p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-rose-500/40 transition-all duration-300 relative group overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-100 text-base">
                      {lang === "tr" ? "Savunma, Uzay & Siber Akreditasyon" : "Defense, Space & Cyber"}
                    </h3>
                    <span className="text-xs font-mono text-rose-400">Siber Vatan · TEI TUSAŞ · TÜBİTAK</span>
                  </div>
                </div>
                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {lang === "tr"
                    ? "T.C. SSB Siber Vatan Beyaz Şapkalı Siber Güvenlik, TEI TUSAŞ Motor Okulu (gaz türbinleri), TÜBİTAK Uzay Kampı (CubeSat & radyo spektrogramı) ve ASELSAN Gölbaşı teknik Ar-Ge incelemesi."
                    : "Defense credentials including SSB Cyber Homeland Security, TEI TUSAŞ Aviation Gas Turbine Engines School, TUBITAK Space Camp, and ASELSAN R&D mission briefings."}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {["Siber Vatan (SSB)", "TEI TUSAŞ", "TÜBİTAK KAMP+", "ASELSAN İncelemesi", "Adli Bilişim"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-800/80 text-neutral-300 border border-neutral-700/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 3: CURATED R&D PROJECTS MATRIX                     */}
          {/* ========================================================== */}
          <section id="projects" className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {lang === "tr" ? "// ÖNE ÇIKAN ÇALIŞMALAR" : "// FLAGSHIP AR-GE"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 font-display">
                  {lang === "tr" ? "Öne Çıkan Mühendislik Projeleri" : "Featured Engineering Projects"}
                </h2>
              </div>

              {/* Instant Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder={lang === "tr" ? "Proje veya teknoloji ara..." : "Search project or stack..."}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 placeholder-neutral-500 text-xs font-mono outline-none focus:border-emerald-500/50 transition"
                />
              </div>
            </div>

            {/* Popular Tag Filters */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
              <span className="text-neutral-500 mr-2 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                {lang === "tr" ? "Filtre:" : "Filter:"}
              </span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-lg border transition ${
                    selectedTag === tag
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold"
                      : "bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-neutral-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Project Bento Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900/80 transition-all duration-200 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700/80 text-[11px] font-mono">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        {project.metric}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-neutral-100 group-hover:text-emerald-400 transition flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>

                    <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-1 font-mono text-[10px] pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded bg-neutral-800/80 text-neutral-400 border border-neutral-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-neutral-800/80">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-emerald-400 transition"
                    >
                      <span>{lang === "tr" ? "Mimari Detaylar" : "Deep Dive"}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
                    </button>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition"
                      title="GitHub Reposuna Git"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 4: FIELD OPERATIONS & MISSION LOG GALLERY          */}
          {/* ========================================================== */}
          <section id="operations">
            <FieldOperationsGallery lang={lang} />
          </section>

          {/* ========================================================== */}
          {/* SECTION 5: TECHNICAL RADAR & STACK MATRIX                  */}
          {/* ========================================================== */}
          <section id="skills" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {lang === "tr" ? "// TEKNOLOJİ YIĞINI" : "// TECH MATRIX"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 font-display">
                  {lang === "tr" ? "Mühendislik Yetenekleri & Araçlar" : "Engineering Skills & Stack"}
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                {lang === "tr" ? "Derinlikli Uzmanlık Matrisi" : "Technical Proficiency"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* AI & Optimization */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-100">
                      {lang === "tr" ? "Yapay Zekâ, Model Optimizasyonu & LLM" : "AI, Model Compression & LLM"}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">Edge AI · PyTorch · vLLM · %80 Pruning</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>PyTorch / TorchVision</span>
                    <span className="text-emerald-400 font-bold">%95</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[95%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>Model Budama & Quantization (INT8/FP4)</span>
                    <span className="text-emerald-400 font-bold">%92</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[92%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>TensorRT, vLLM, QLoRA Fine-Tuning</span>
                    <span className="text-emerald-400 font-bold">%88</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>

              {/* Robotics & Avionics */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-100">
                      {lang === "tr" ? "Robotik, Aviyonik & Otonom Sistemler" : "Robotics, Avionics & Control"}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">ROS2 · PX4 · SHGM İHA-1 · EKF</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>ROS2 (Humble / Iron) & Düğüm Mimarisi</span>
                    <span className="text-cyan-400 font-bold">%94</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[94%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>PX4 Autopilot & MAVLink Telemetri</span>
                    <span className="text-cyan-400 font-bold">%90</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[90%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>SHGM İHA-1 Ticari Pilotaj & Saha Uçuşu</span>
                    <span className="text-cyan-400 font-bold">%100</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[100%]" />
                  </div>
                </div>
              </div>

              {/* Embedded & Systems */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-100">
                      {lang === "tr" ? "Gömülü Sistemler & Donanım Katmanı" : "Embedded Systems & Bare-Metal"}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">C++20 · FreeRTOS · RISC-V · Jetson</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>Modern C++ (C++20) & C Bare-Metal</span>
                    <span className="text-amber-400 font-bold">%90</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-[90%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>FreeRTOS Gerçek Zamanlı Çekirdek & HAL</span>
                    <span className="text-amber-400 font-bold">%86</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-[86%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>NVIDIA Jetson Orin & Linux Kernel</span>
                    <span className="text-amber-400 font-bold">%88</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full w-[88%]" />
                  </div>
                </div>
              </div>

              {/* Defense & Cyber */}
              <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-neutral-100">
                      {lang === "tr" ? "Siber Savunma & Dijital Adli Bilişim" : "Cyber Defense & Forensics"}
                    </h3>
                    <p className="text-xs text-neutral-500 font-mono">Siber Vatan · PRNU · ELA · C2PA</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-300">
                  <div className="flex justify-between">
                    <span>T.C. SSB Siber Vatan Beyaz Şapka Uzmanlığı</span>
                    <span className="text-rose-400 font-bold">%92</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full w-[92%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>PRNU & ELA Adli Multimedya Analizi</span>
                    <span className="text-rose-400 font-bold">%89</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full w-[89%]" />
                  </div>

                  <div className="flex justify-between pt-1">
                    <span>C2PA Kriptografik İçerik Doğrulama</span>
                    <span className="text-rose-400 font-bold">%85</span>
                  </div>
                  <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-400 h-full rounded-full w-[85%]" />
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ========================================================== */}
          {/* SECTION 6: 270+ CERTIFICATION VAULT                        */}
          {/* ========================================================== */}
          <section id="certificates" className="space-y-6">
            <CertificationVault />
          </section>

          {/* ========================================================== */}
          {/* SECTION 7: DIRECT CONTACT & INTERACTION HUB                */}
          {/* ========================================================== */}
          <section id="contact" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase font-semibold">
                  {lang === "tr" ? "// BAĞLANTI & İLETİŞİM" : "// DIRECT CONTACT"}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100 font-display">
                  {lang === "tr" ? "Mühendislik İş Birlikleri & İletişim" : "Engineering Collaboration & Contact"}
                </h2>
              </div>
              <p className="text-xs font-mono text-neutral-500">
                {lang === "tr" ? "Anında Geri Dönüş" : "Direct Channels"}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              
              {/* Left Column: Direct Info Cards */}
              <div className="space-y-4">
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {lang === "tr"
                    ? "Yapay zekâ model optimizasyonu, ROS2/PX4 otonom aviyonikler, gömülü sistem mimarileri veya Ar-Ge projeleri için doğrudan iletişime geçebilirsiniz."
                    : "Available for deep learning compression, autonomous avionics, embedded systems engineering, and innovative high-impact projects."}
                </p>

                <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-neutral-500">E-Posta:</span>
                    <a href={`mailto:${IDENTITY.email}`} className="text-emerald-400 hover:underline font-semibold">
                      {IDENTITY.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-neutral-500">LinkedIn:</span>
                    <a href={IDENTITY.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                      linkedin.com/in/bahattinyunus
                    </a>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-neutral-500">GitHub:</span>
                    <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                      github.com/bahattinyunus
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Konum:</span>
                    <span className="text-neutral-300">{IDENTITY.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-mono font-medium transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? (lang === "tr" ? "Kopyalandı!" : "Copied!") : (lang === "tr" ? "E-postayı Kopyala" : "Copy Email")}</span>
                  </button>

                  <a
                    href="/cv3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-medium transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>{lang === "tr" ? "Özgeçmiş İndir" : "Download CV"}</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Fast Contact Form */}
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      {lang === "tr" ? "Adınız / Kurumunuz" : "Your Name / Organization"}
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={lang === "tr" ? "İsim veya şirket adı..." : "Name or company..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 text-xs font-mono outline-none focus:border-emerald-500/50 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      {lang === "tr" ? "Mesajınız / Proje Özeti" : "Your Message / Brief"}
                    </label>
                    <textarea
                      rows={4}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={lang === "tr" ? "Mesajınızı buraya yazabilirsiniz..." : "Write your message here..."}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 placeholder-neutral-600 text-xs font-mono outline-none focus:border-emerald-500/50 transition"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs font-mono transition shadow-lg shadow-emerald-500/20"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === "tr" ? "E-Posta İstemcisiyle Gönder" : "Send via Email Client"}</span>
                  </button>
                </form>
              </div>

            </div>
          </section>

          {/* ========================================================== */}
          {/* FOOTER                                                     */}
          {/* ========================================================== */}
          <footer className="pt-12 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
            <div>
              © {new Date().getFullYear()} {IDENTITY.name}. {lang === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}
            </div>
            <div className="flex items-center gap-4">
              <span>React 19</span>
              <span>•</span>
              <span>TypeScript</span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition">
                GitHub
              </a>
            </div>
          </footer>

        </main>

        {/* ========================================================== */}
        {/* INTERACTIVE TERMINAL DRAWER                                */}
        {/* ========================================================== */}
        <InteractiveTerminal
          isOpen={isTerminalOpen}
          onClose={() => setIsTerminalOpen(false)}
          lang={lang}
        />

        {/* ========================================================== */}
        {/* PROJECT DEEP DIVE MODAL                                    */}
        {/* ========================================================== */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="w-full max-w-2xl rounded-2xl border border-neutral-800 bg-[#0c0e14] shadow-2xl overflow-hidden p-6 space-y-5"
              >
                <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
                  <div>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">
                      {activeProjectModal.category}
                    </span>
                    <h3 className="text-xl font-bold text-neutral-100 font-display mt-1">
                      {activeProjectModal.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 text-xs font-mono text-neutral-300">
                  <p className="leading-relaxed text-neutral-300 text-sm font-sans">
                    {activeProjectModal.longDesc}
                  </p>

                  <div className="space-y-2">
                    <div className="text-emerald-400 font-bold text-xs uppercase">
                      {lang === "tr" ? "Mimari ve Teknik Vurgular:" : "Architecture & Technical Highlights:"}
                    </div>
                    <ul className="space-y-1.5 list-disc list-inside text-neutral-400">
                      {activeProjectModal.architecture.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-cyan-400 font-bold text-xs uppercase">
                      {lang === "tr" ? "Kullanılan Teknolojiler:" : "Tech Stack:"}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProjectModal.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <span className="text-xs font-mono text-emerald-400">
                    {activeProjectModal.metric}
                  </span>
                  <a
                    href={activeProjectModal.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-white text-neutral-900 font-bold text-xs font-mono transition"
                  >
                    <span>{lang === "tr" ? "GitHub Reposunu İncele" : "View on GitHub"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </LangCtx.Provider>
  );
}
