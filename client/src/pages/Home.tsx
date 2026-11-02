import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
} from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Mail,
  Copy,
  Check,
  Languages,
  Linkedin,
  Globe,
  ExternalLink,
  Download,
  FileText,
  Plane,
  Brain,
  Shield,
  Cpu,
  Orbit,
  Sparkles,
  Award,
  Terminal,
  Code2,
  FolderGit2,
  Search,
  Tag,
  X,
  Layers,
  Star,
  Activity,
  Send,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { IDENTITY } from "@/lib/portfolioContent";
import { CertificationVault } from "@/components/cyber-ui/CertificationVault";
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
  const [activeSection, setActiveSection] = useState<string>("about");
  const [copied, setCopied] = useState(false);
  
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

  // ScrollSpy
  useEffect(() => {
    const sectionIds = ["about", "experience", "projects", "skills", "certificates", "contact"];
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
    { id: "about", label: lang === "tr" ? "HAKKIMDA" : "ABOUT" },
    { id: "experience", label: lang === "tr" ? "DENEYİM & EĞİTİM" : "EXPERIENCE & EDUCATION" },
    { id: "projects", label: lang === "tr" ? "ÖNE ÇIKAN PROJELER" : "FEATURED PROJECTS" },
    { id: "skills", label: lang === "tr" ? "YETENEKLER & YIĞIN" : "SKILLS & STACK" },
    { id: "certificates", label: lang === "tr" ? "SERTİFİKALAR" : "CERTIFICATIONS" },
    { id: "contact", label: lang === "tr" ? "İLETİŞİM" : "CONTACT" },
  ];

  const experiences = useMemo(() => {
    return [
      {
        period: lang === "tr" ? "2026 — DEVAM" : "2026 — PRESENT",
        title: lang === "tr" ? "Lisans Öğrencisi & Araştırmacı" : "Undergraduate & Researcher",
        organization: "ODTÜ (BÖTE / CEIT) & Hacettepe Üniversitesi",
        description:
          lang === "tr"
            ? "Orta Doğu Teknik Üniversitesi ve Hacettepe Üniversitesi bünyesinde çok disiplinli mühendislik, derin öğrenme model optimizasyonu ve otonom sistemler araştırmaları yürütüyorum."
            : "Pursuing academic studies and research at METU CEIT and Hacettepe University focusing on deep learning model compression, edge AI, and autonomous systems.",
        badges: ["ODTÜ", "Hacettepe", "Edge AI", "Deep Learning", "Autonomous Systems"],
        link: "https://www.metu.edu.tr",
      },
      {
        period: lang === "tr" ? "2024 — DEVAM" : "2024 — PRESENT",
        title: lang === "tr" ? "Gönüllü Gençlik Lideri & Yönetim Kurulu" : "Volunteer Youth Leader & Board Member",
        organization: "T.C. Gençlik ve Spor Bakanlığı · KTÜ EHK",
        description:
          lang === "tr"
            ? "T.C. Gençlik ve Spor Bakanlığı gönüllü gençlik lideri olarak gençlere yönelik teknoloji ve mühendislik atölyeleri düzenliyor, KTÜ Elektronik ve Haberleşme Kulübü yönetim kurulunda projeler geliştiriyorum."
            : "Mentoring youth in engineering and technology workshops as a Volunteer Youth Leader at the Ministry of Youth and Sports; organizing tech events on the KTU EHK board.",
        badges: ["T.C. GSB", "Liderlik", "Atölyeler", "Topluluk", "KTÜ EHK"],
      },
      {
        period: "2024",
        title: lang === "tr" ? "Uluslararası Delege (Top 20 / 66.500+ Aday)" : "International Delegate (Top 20 / 66.5K+ Applicants)",
        organization: "T.C. Gençlik ve Spor Bakanlığı & Türkiye Maarif Vakfı",
        description:
          lang === "tr"
            ? "Türkiye–Fransa Gençlik Değişimi Programı kapsamında Türkiye genelinde 66.500'ü aşkın başvuru arasından seçilen 20 genç temsilciden biri olarak Strazburg, Avrupa Parlamentosu ve AİHM resmi heyet ziyaretlerinde bulundum."
            : "Selected as one of the top 20 youth out of 66,500+ applicants across Turkey for the France Youth Exchange Program, attending official delegations at the European Parliament and ECHR in Strasbourg.",
        badges: ["Fransa Değişimi", "Avrupa Parlamentosu", "AİHM", "Diplomasi", "Top 20"],
      },
      {
        period: "2023 — 2026",
        title: lang === "tr" ? "Savunma, Havacılık & Siber Güvenlik Akreditasyonları" : "Defense, Aerospace & Cyber Security Credentials",
        organization: "Siber Vatan (SSB) · SHGM · TEI TUSAŞ · TÜBİTAK",
        description:
          lang === "tr"
            ? "Türkiye Siber Vatan Siber Güvenlik Uzmanlığı eğitimi, SHGM İHA-1 Ticari Pilot Lisansı (TR-IHA1H10609053), TEI Havacılık Motorları Okulu ve TÜBİTAK Uzay Kampı programlarını başarıyla tamamladım."
            : "Completed certified programs including Cyber Homeland (Cyber Security), DGCA Commercial UAV-1 Pilot License, TEI Aviation Engines School, and TUBITAK Space Camp.",
        badges: ["Siber Vatan", "SHGM İHA-1", "TEI Motor Okulu", "TÜBİTAK", "Siber Savunma"],
      },
      {
        period: "2023 — 2025",
        title: lang === "tr" ? "Yazılım Mühendisliği Temelleri" : "Software Engineering Foundations",
        organization: "Karadeniz Teknik Üniversitesi & Recep Tayyip Erdoğan Üniv.",
        description:
          lang === "tr"
            ? "Veri yapıları, algoritmalar, C/C++ nesne yönelimli sistem mimarisi, işletim sistemleri ve dağıtık mimariler üzerine güçlü akademik ve pratik temel oluşturdum."
            : "Built robust engineering foundations in data structures, algorithms, C/C++ architecture, and operating systems.",
        badges: ["C++", "C", "Algoritmalar", "Veri Yapıları", "Linux"],
      },
    ];
  }, [lang]);

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

  // Popüler Teknoloji Etiketleri
  const popularTags = ["ALL", "ROS 2", "Python", "PyTorch", "C++20", "Three.js", "FreeRTOS", "SDR", "EKF"];

  // Filtrelenmiş Projeler
  const filteredProjects = useMemo(() => {
    return rawProjects.filter((p) => {
      const matchTag = selectedTag === "ALL" || p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase());
      const q = projectSearch.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
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
      {/* Arka Plan: Koyu Gece Mavisi / Slate / Karbon */}
      <div className="relative min-h-screen bg-[#0b0f17] text-slate-400 font-sans selection:bg-teal-300 selection:text-teal-900">
        
        {/* İnteraktif Spotlight Glow (Fare Takibi) */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute"
          style={{
            background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.08), transparent 80%)`,
          }}
        />

        {/* Ana İki Sütunlu Sayfa Düzeni */}
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-8 xl:gap-14">
            
            {/* ========================================================== */}
            {/* SOL SÜTUN (Desktop Sabit Sticky Navigation)               */}
            {/* ========================================================== */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                {/* Lokasyon & Kurum Rozeti */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/80 bg-slate-800/40 text-xs font-mono text-slate-300 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  <span>Ankara, Türkiye</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-400">ODTÜ & Hacettepe</span>
                </div>

                {/* İsim & Başlık */}
                <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
                  <a href="/">{IDENTITY.name}</a>
                </h1>
                
                {/* Unvan */}
                <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
                  {lang === "tr"
                    ? "Yapay Zekâ · Otonom Sistemler · Gömülü Yazılım"
                    : "AI · Autonomous Systems · Embedded Software"}
                </h2>

                {/* Kısa Vurucu Motto */}
                <p className="mt-4 max-w-xs text-sm leading-normal text-slate-400">
                  {lang === "tr"
                    ? "ODTÜ BÖTE & Hacettepe | ROS2/PX4 otonom aviyonikler, derin öğrenme model optimizasyonu (%80 pruning) ve C++/Python gömülü sistemleri geliştiriyorum."
                    : "METU CEIT & Hacettepe | Developing ROS2/PX4 autonomous avionics, deep learning model optimization (80% pruning), and C++/Python embedded systems."}
                </p>

                {/* GitHub & Prestij Rozetleri (Hızlı Metrikler) */}
                <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                    <FolderGit2 className="w-3.5 h-3.5 text-teal-400" />
                    <strong>231+</strong> Repos
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-teal-400" />
                    <strong>270+</strong> Credentials
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-teal-400" />
                    <strong>%80</strong> Pruning
                  </span>
                </div>

                {/* Masaüstü Navigasyon (Aktif Çizgi Efekti) */}
                <nav className="nav hidden lg:block" aria-label="Sayfa İçi Menü">
                  <ul className="mt-12 w-max space-y-4">
                    {navLinks.map((link) => {
                      const isActive = activeSection === link.id;
                      return (
                        <li key={link.id}>
                          <a
                            href={`#${link.id}`}
                            className={`group flex items-center py-1 transition-all ${
                              isActive ? "text-slate-200 font-semibold" : "text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            <span
                              className={`mr-4 h-px transition-all motion-reduce:transition-none ${
                                isActive
                                  ? "w-16 bg-teal-400"
                                  : "w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-200"
                              }`}
                            />
                            <span className="text-xs font-bold font-mono tracking-widest">
                              {link.label}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>

              {/* Sol Alt: Hızlı Eylemler, CV ve Sosyal Medya */}
              <div className="mt-8 lg:mt-0 flex flex-col gap-5">
                {/* CV İndir & Dil Değiştirici */}
                <div className="flex items-center gap-3">
                  <a
                    href="/cv3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-400/10 border border-teal-400/30 text-teal-300 text-xs font-mono font-medium hover:bg-teal-400 hover:text-slate-900 transition-all shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === "tr" ? "Özgeçmiş / CV (PDF)" : "Resume / CV (PDF)"}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-70" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setLang(lang === "tr" ? "en" : "tr")}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-500 transition-all"
                  >
                    <Languages className="w-3.5 h-3.5 text-teal-400" />
                    <span className="font-bold">{lang.toUpperCase()}</span>
                  </button>
                </div>

                {/* Sosyal Medya İkonları */}
                <ul className="flex items-center gap-5" aria-label="Sosyal Medya Linkleri">
                  <li>
                    <a
                      href={IDENTITY.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="block text-slate-400 hover:text-slate-200 transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="block text-slate-400 hover:text-slate-200 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </li>
                  <li>
                    <a
                      href={IDENTITY.medium}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Medium"
                      className="block text-slate-400 hover:text-slate-200 transition-colors"
                      title="Medium Articles"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      aria-label="E-postayı Kopyala"
                      className="block text-slate-400 hover:text-teal-300 transition-colors"
                      title={copied ? "Kopyalandı!" : "E-postayı Kopyala"}
                    >
                      {copied ? <Check className="h-5 w-5 text-teal-300" /> : <Mail className="h-5 w-5" />}
                    </button>
                  </li>
                </ul>
              </div>
            </header>

            {/* ========================================================== */}
            {/* SAĞ SÜTUN (Scrollable İçerik Alanı)                       */}
            {/* ========================================================== */}
            <main className="pt-20 lg:w-1/2 lg:py-24 space-y-24">
              
              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 1: HAKKIMDA (About)                                 */}
              {/* -------------------------------------------------------- */}
              <section id="about" className="scroll-mt-16 md:scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "Hakkımda" : "About"}
                  </h2>
                </div>

                <div className="space-y-4 leading-relaxed text-slate-400 text-sm sm:text-base">
                  <p>
                    {lang === "tr" ? (
                      <>
                        Yazılımı teorik sınırlardan çıkarıp;{" "}
                        <span className="font-medium text-slate-200">
                          donanımla birleşen, gerçek zamanlı ve otonom sistemlerde sıfır gecikmeyle çalışan
                        </span>{" "}
                        mimarilere dönüştürmeye odaklanıyorum.
                      </>
                    ) : (
                      <>
                        I focus on bringing software beyond theoretical bounds into{" "}
                        <span className="font-medium text-slate-200">
                          real-time, zero-latency autonomous architectures fused with hardware
                        </span>
                        .
                      </>
                    )}
                  </p>

                  <p>
                    {lang === "tr" ? (
                      <>
                        Şu anda akademik öğrenimimi{" "}
                        <span className="font-medium text-slate-200">Orta Doğu Teknik Üniversitesi (ODTÜ BÖTE)</span> ve{" "}
                        <span className="font-medium text-slate-200">Hacettepe Üniversitesi</span>'nde sürdürürken;{" "}
                        <span className="font-medium text-slate-200">Karadeniz Teknik Üniversitesi (Yazılım Müh.)</span> ve RTEÜ ile çok disiplinli bir mühendislik matrisi kurdum.
                      </>
                    ) : (
                      <>
                        Pursuing academic studies at{" "}
                        <span className="font-medium text-slate-200">Middle East Technical University (METU CEIT)</span> and{" "}
                        <span className="font-medium text-slate-200">Hacettepe University</span>, backed by rigorous software engineering foundations from KTU.
                      </>
                    )}
                  </p>

                  <p>
                    {lang === "tr" ? (
                      <>
                        Derin öğrenme modellerinde doğruluk kaybı olmadan{" "}
                        <span className="text-teal-300 font-mono font-medium">%80'e varan model budama (pruning)</span>, kenar cihazlarda (Edge AI) düşük gecikmeli çıkarım ve{" "}
                        <span className="font-medium text-slate-200">ROS2, PX4 Autopilot ve Unreal Engine 5</span> ile otonom İHA aviyonikleri geliştiriyorum.
                      </>
                    ) : (
                      <>
                        Specializing in{" "}
                        <span className="text-teal-300 font-mono font-medium">up to 80% model pruning</span> without accuracy loss, low-latency Edge-AI inference, and autonomous UAV avionics with{" "}
                        <span className="font-medium text-slate-200">ROS2, PX4 Autopilot, and Unreal Engine 5</span>.
                      </>
                    )}
                  </p>

                  <p>
                    {lang === "tr" ? (
                      <>
                        T.C. GSB – Maarif Vakfı Türkiye–Fransa Gençlik Değişimi Programı'nda{" "}
                        <span className="font-medium text-slate-200">66.500+ aday arasından seçilen ilk 20 genç</span> arasında yer alarak Avrupa Parlamentosu ve AİHM ziyaretlerinde bulundum.{" "}
                        <span className="font-medium text-slate-200">Siber Vatan</span> (Siber Güvenlik Uzmanlığı),{" "}
                        <span className="font-medium text-slate-200">SHGM İHA-1 Ticari Pilot Lisansı</span> ve 270'ten fazla akredite belgeye sahibim.
                      </>
                    ) : (
                      <>
                        Selected among the{" "}
                        <span className="font-medium text-slate-200">top 20 youth out of 66,500+ applicants</span> in the Turkey–France Youth Exchange Program (visiting the European Parliament and ECHR). Holder of{" "}
                        <span className="font-medium text-slate-200">Cyber Homeland</span> (Cyber Security),{" "}
                        <span className="font-medium text-slate-200">DGCA UAV-1 Commercial Pilot License</span>, and 270+ verified credentials.
                      </>
                    )}
                  </p>
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 2: DENEYİM & EĞİTİM (Experience & Timeline)         */}
              {/* -------------------------------------------------------- */}
              <section id="experience" className="scroll-mt-16 md:scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "Deneyim & Eğitim" : "Experience & Education"}
                  </h2>
                </div>

                <div className="space-y-10">
                  {experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
                    >
                      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/40 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                      
                      {/* Tarih Kolonu */}
                      <header
                        className="z-10 mb-2 mt-1 text-xs font-mono font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2"
                        aria-label={exp.period}
                      >
                        {exp.period}
                      </header>

                      {/* İçerik Kolonu */}
                      <div className="z-10 sm:col-span-6">
                        <h3 className="font-medium leading-snug text-slate-200">
                          <div>
                            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300 text-base">
                              <span>{exp.title}</span>
                              <span className="text-slate-500 mx-2">·</span>
                              <span className="text-slate-400 text-sm font-normal">{exp.organization}</span>
                            </span>
                          </div>
                        </h3>
                        
                        <p className="mt-2 text-xs sm:text-sm leading-normal text-slate-400">
                          {exp.description}
                        </p>

                        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Kullanılan Teknolojiler">
                          {exp.badges.map((badge, bidx) => (
                            <li key={bidx}>
                              <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-mono font-medium leading-4 text-teal-300">
                                {badge}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CV İndir Butonu */}
                <div className="mt-10">
                  <a
                    href="/cv3.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center font-medium font-mono text-xs text-slate-200 hover:text-teal-300 group"
                  >
                    <span>{lang === "tr" ? "Tam Özgeçmişi Görüntüle (PDF)" : "View Full Resume (PDF)"}</span>
                    <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 3: ÖNE ÇIKAN PROJELER (Featured Projects)           */}
              {/* -------------------------------------------------------- */}
              <section id="projects" className="scroll-mt-16 md:scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "Öne Çıkan Projeler" : "Featured Projects"}
                  </h2>
                </div>

                {/* Arama & Teknoloji Filtreleri Barı */}
                <div className="space-y-3 mb-8">
                  {/* Canlı Arama Inputu */}
                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-400" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder={lang === "tr" ? "Projeler arasında ara... (örn: ROS2, WebGL, C++, LSTM)" : "Search projects... (e.g. ROS2, WebGL, C++, LSTM)"}
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 focus:border-teal-400 rounded-xl text-xs sm:text-sm font-mono text-slate-100 placeholder:text-slate-500 outline-none transition-all"
                    />
                    {projectSearch && (
                      <button
                        onClick={() => setProjectSearch("")}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Popüler Teknoloji Hapları */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
                    <span className="text-slate-500 text-[11px] shrink-0 mr-1 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-teal-400" /> Filtre:
                    </span>
                    {popularTags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all ${
                          selectedTag === tag
                            ? "bg-teal-400 text-slate-950 font-bold"
                            : "bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projeler Listesi */}
                {filteredProjects.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/40 border border-slate-800 rounded-xl">
                    <p className="text-sm font-mono text-slate-400">Aramanıza uygun proje bulunamadı.</p>
                    <button
                      onClick={() => { setProjectSearch(""); setSelectedTag("ALL"); }}
                      className="mt-3 px-3 py-1.5 rounded bg-teal-500/10 text-teal-300 text-xs font-mono border border-teal-500/30"
                    >
                      Filtreleri Temizle
                    </button>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {filteredProjects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => setActiveProjectModal(proj)}
                        className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 cursor-pointer"
                      >
                        <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/40 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg" />
                        
                        {/* Sol: Kategori & Metrik */}
                        <div className="z-10 sm:col-span-2">
                          <span className="font-mono text-[11px] uppercase tracking-wider text-teal-400 block mb-1">
                            {proj.category}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500 block">
                            {proj.metric}
                          </span>
                        </div>

                        {/* Sağ: Başlık, Açıklama, Etiketler */}
                        <div className="z-10 sm:col-span-6">
                          <h3 className="font-medium leading-snug text-slate-200 flex items-center justify-between">
                            <span className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 text-base">
                              <span>{proj.title}</span>
                              <ArrowUpRight className="ml-1.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </span>
                          </h3>

                          <p className="mt-2 text-xs sm:text-sm leading-normal text-slate-400">
                            {proj.desc}
                          </p>

                          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Teknolojiler">
                            {proj.tags.map((tag, tidx) => (
                              <li key={tidx}>
                                <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-mono font-medium leading-4 text-teal-300">
                                  {tag}
                                </div>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-teal-400/80 group-hover:text-teal-300">
                            <span className="underline underline-offset-4">Mimari Detayları & Metrikleri Gör →</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tüm Repolar Linki */}
                <div className="mt-10">
                  <a
                    href={IDENTITY.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center font-medium font-mono text-xs text-slate-200 hover:text-teal-300 group"
                  >
                    <FolderGit2 className="mr-2 h-4 w-4 text-teal-400" />
                    <span>{lang === "tr" ? "GitHub'daki 231+ Açık Kaynak Projeyi İncele" : "View Full Project Archive on GitHub"}</span>
                    <ArrowUpRight className="ml-1 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 4: YETENEKLER & TEKNOLOJİ YIĞINI (Skills)           */}
              {/* -------------------------------------------------------- */}
              <section id="skills" className="scroll-mt-16 md:scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "Yetenekler & Teknoloji Yığını" : "Skills & Stack"}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Otonom Aviyonik */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2.5 text-teal-300 mb-2 font-mono text-xs uppercase tracking-wider">
                      <Plane className="w-4 h-4" />
                      <span>{lang === "tr" ? "Otonom Aviyonik & Robotik" : "Autonomous Avionics"}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {lang === "tr"
                        ? "ROS2, PX4 Autopilot, MAVLink, FastDDS ve UE5 fizik simülasyonu ile otonom İHA seyrüseferi."
                        : "ROS2, PX4 Autopilot, MAVLink, FastDDS, and UE5 physics simulation for UAV autonomy."}
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800">ROS2</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">PX4</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">MAVLink</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">FastDDS</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">İHA-1</span>
                    </div>
                  </div>

                  {/* Edge AI & Model Optimizasyonu */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2.5 text-teal-300 mb-2 font-mono text-xs uppercase tracking-wider">
                      <Brain className="w-4 h-4" />
                      <span>{lang === "tr" ? "Edge AI & Model Budama" : "Edge AI & Optimization"}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {lang === "tr"
                        ? "Derin öğrenme modellerinde doğruluk koruyarak %80 budama, INT8/FP4 nicemleme ve uç cihazlarda çıkarım."
                        : "Up to 80% model pruning without accuracy loss, INT8/FP4 quantization, and microcontroller inference."}
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800">PyTorch</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">%80 Pruning</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">vLLM</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">QLoRA</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">TFLite</span>
                    </div>
                  </div>

                  {/* Gömülü Sistemler & RTOS */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2.5 text-teal-300 mb-2 font-mono text-xs uppercase tracking-wider">
                      <Cpu className="w-4 h-4" />
                      <span>{lang === "tr" ? "Gömülü Sistemler & RTOS" : "Embedded & RTOS"}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {lang === "tr"
                        ? "Modern C++20, FreeRTOS, Linux kernel, mikrodenetleyici donanım kontrolü ve EKF sensör füzyonu."
                        : "Modern C++20, FreeRTOS, Linux kernel, peripheral drivers, and EKF sensor fusion."}
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800">C++20</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">C</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">FreeRTOS</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">Linux Kernel</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">EKF</span>
                    </div>
                  </div>

                  {/* Siber Güvenlik & Sistem */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-700 transition-colors">
                    <div className="flex items-center gap-2.5 text-teal-300 mb-2 font-mono text-xs uppercase tracking-wider">
                      <Shield className="w-4 h-4" />
                      <span>{lang === "tr" ? "Siber Savunma & Altyapı" : "Cyber Defense & DevOps"}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {lang === "tr"
                        ? "Siber Vatan beyaz şapkalı siber güvenlik, dijital adli bilişim, Docker ve güvenli mimari tasarımı."
                        : "White-hat cybersecurity (Cyber Homeland), digital forensics, Docker, and Security by Design."}
                    </p>
                    <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800">Siber Vatan</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">Adli Bilişim</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">Docker</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">CI/CD</span>
                      <span className="px-2 py-0.5 rounded bg-slate-800">Git</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 5: SERTİFİKALAR (Certifications Vault)             */}
              {/* -------------------------------------------------------- */}
              <section id="certificates" className="scroll-mt-16 md:scroll-mt-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "Sertifikalar (270+)" : "Certifications (270+)"}
                  </h2>
                </div>

                <div className="mb-6">
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {lang === "tr"
                      ? "ODTÜ Bilgeİş, BTK Akademi, SHGM, IBM, TEI ve TÜBİTAK tarafından onaylanmış 270'ten fazla akredite sertifikayı aşağıdan canlı arayabilir ve doğrulayabilirsiniz."
                      : "Search and verify over 270 accredited certificates issued by METU Bilgeİş, BTK Academy, DGCA, IBM, TEI, and TUBITAK below."}
                  </p>
                </div>

                {/* İnteraktif Arama & Filtreleme Kasası */}
                <CertificationVault />
              </section>

              {/* -------------------------------------------------------- */}
              {/* BÖLÜM 6: İLETİŞİM (Contact)                              */}
              {/* -------------------------------------------------------- */}
              <section id="contact" className="scroll-mt-16 md:scroll-mt-24 pb-24">
                <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-[#0b0f17]/85 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
                  <h2 className="text-sm font-bold font-mono tracking-widest text-slate-200 uppercase">
                    {lang === "tr" ? "İletişim" : "Contact"}
                  </h2>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8 backdrop-blur">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
                    {lang === "tr" ? "Birlikte Geleceği İnşa Edelim." : "Let's Build the Future Together."}
                  </h3>
                  
                  <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg">
                    {lang === "tr"
                      ? "Otonom aviyonikler, derin öğrenme model optimizasyonu, gömülü sistemler veya Ar-Ge işbirlikleri için bir e-posta uzağınızdayım."
                      : "Open for autonomous robotics, deep learning model optimization, embedded engineering, and R&D collaborations."}
                  </p>

                  {/* Hızlı Mesaj Gönderme Formu */}
                  <form onSubmit={handleSendMessage} className="mt-6 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder={lang === "tr" ? "Adınız / Şirketiniz" : "Your Name / Company"}
                        className="px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 placeholder:text-slate-500 outline-none focus:border-teal-400 transition-all"
                      />
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:border-teal-400/50 hover:text-teal-300 transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-teal-400" />
                        <span>{IDENTITY.email}</span>
                        {copied ? <Check className="w-3.5 h-3.5 text-teal-300" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                      </button>
                    </div>

                    <textarea
                      rows={3}
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder={lang === "tr" ? "Proje veya mesajınız hakkında kısa bir not bırakın..." : "Write a brief note regarding your project or inquiry..."}
                      className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-xs font-mono text-slate-200 placeholder:text-slate-500 outline-none focus:border-teal-400 transition-all resize-none"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-teal-400 text-slate-950 text-xs font-mono font-semibold hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{lang === "tr" ? "Doğrudan E-posta Gönder" : "Send Email Directly"}</span>
                      </button>

                      <a
                        href="/cv3.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:text-white transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-teal-400" />
                        <span>{lang === "tr" ? "CV (PDF)" : "Resume (PDF)"}</span>
                      </a>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-800 text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-4">
                    <span>© {new Date().getFullYear()} {IDENTITY.name} · ODTÜ & Hacettepe</span>
                    <span>Ankara, Türkiye</span>
                  </div>
                </div>
              </section>

            </main>

          </div>
        </div>

        {/* ========================================================== */}
        {/* MOBİL FLOATING QUICK NAVIGATION DOCK                       */}
        {/* ========================================================== */}
        <div className="lg:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-center pointer-events-none">
          <nav className="pointer-events-auto flex items-center gap-1 p-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl text-[11px] font-mono text-slate-300">
            <a
              href="#about"
              className={`px-3 py-1.5 rounded-full transition-colors ${activeSection === "about" ? "bg-teal-400 text-slate-950 font-bold" : "hover:text-white"}`}
            >
              Bio
            </a>
            <a
              href="#projects"
              className={`px-3 py-1.5 rounded-full transition-colors ${activeSection === "projects" ? "bg-teal-400 text-slate-950 font-bold" : "hover:text-white"}`}
            >
              Projeler
            </a>
            <a
              href="#certificates"
              className={`px-3 py-1.5 rounded-full transition-colors ${activeSection === "certificates" ? "bg-teal-400 text-slate-950 font-bold" : "hover:text-white"}`}
            >
              Sertifikalar
            </a>
            <a
              href="/cv3.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-full bg-slate-800 text-teal-300 font-semibold border border-slate-700 hover:bg-slate-700 transition-colors"
            >
              CV
            </a>
          </nav>
        </div>

        {/* ========================================================== */}
        {/* PROJE DETAY MODALI (Architecture & Spec View)               */}
        {/* ========================================================== */}
        <AnimatePresence>
          {activeProjectModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectModal(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-slate-700 bg-[#0e131d] p-6 sm:p-8 shadow-2xl text-slate-300 z-10"
              >
                {/* Kapatma Butonu */}
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label="Kapat"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Üst Başlık & Kategori */}
                <div className="pr-10">
                  <span className="font-mono text-xs uppercase tracking-wider text-teal-400 block mb-1">
                    {activeProjectModal.category} • {activeProjectModal.metric}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                    {activeProjectModal.title}
                  </h3>
                </div>

                {/* Detaylı Açıklama */}
                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {activeProjectModal.longDesc}
                </p>

                {/* Mimari Akış ve Pipeline Bileşenleri */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                    <Layers className="w-3.5 h-3.5 text-teal-400" />
                    <span>Mühendislik Mimarisi & Çözüm Akışı</span>
                  </h4>
                  <ul className="space-y-2 text-xs font-mono text-slate-300">
                    {activeProjectModal.architecture.map((arch, idx) => (
                      <li key={idx} className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                        <span className="text-teal-400 mt-0.5">▹</span>
                        <span>{arch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Kullanılan Teknolojiler */}
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                    Teknoloji Yığını
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProjectModal.tags.map((t, tidx) => (
                      <span
                        key={tidx}
                        className="px-2.5 py-1 rounded bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Butonlar */}
                <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                  <a
                    href={activeProjectModal.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 text-slate-950 font-mono text-xs font-semibold hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(45,212,191,0.2)]"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Reposunu İncele</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    Kapat
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </LangCtx.Provider>
  );
}
