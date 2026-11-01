import React, {
  useEffect,
  useState,
  useMemo,
  createContext,
  useContext,
  useRef,
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

/* ================================================================== */
/*  Ana Portfolyo Sayfası (Split-Screen Modern Tech Lead Format)      */
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
            ? "Türkiye Siber Vatan Beyaz Şapkalı Hacker eğitimi, SHGM İHA-1 Ticari Pilot Lisansı (TR-IHA1H10609053), TEI Havacılık Motorları Okulu ve TÜBİTAK Uzay Kampı programlarını başarıyla tamamladım."
            : "Completed certified programs including Cyber Homeland (White Hat Hacker), DGCA Commercial UAV-1 Pilot License, TEI Aviation Engines School, and TUBITAK Space Camp.",
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

  const projects = useMemo(() => {
    return [
      {
        id: "datathon-ensemble",
        title: "Datathon Tahminleme Hattı (Attention-LSTM & Prophet)",
        category: lang === "tr" ? "Yapay Zekâ & Zaman Serisi" : "AI & Time Series",
        desc:
          lang === "tr"
            ? "Attention mekanizmalı LSTM, Prophet ve Random Forest modellerini 100+ öznitelik mühendisliğiyle birleştiren yüksek başarımlı hibrit zaman serisi tahminleme hattı. Datathon 2026 maratonunda geliştirildi."
            : "High-performance hybrid time-series pipeline combining Attention-LSTM, Prophet, and Random Forest with 100+ automated feature engineering metrics.",
        tags: ["Python", "Attention-LSTM", "Prophet", "Random Forest", "Scikit-Learn", "Pandas"],
        link: "https://github.com/bahattinyunus",
        metric: "Datathon 2026 // 100+ Features",
      },
      {
        id: "aura-hockey-ar",
        title: "Aura Hockey AR (Ankara AI Hackathon '26)",
        category: lang === "tr" ? "Görüntü İşleme & WebGL 3D" : "Computer Vision & 3D",
        desc:
          lang === "tr"
            ? "Google MediaPipe ile 21 el eklemini gerçek zamanlı takip eden, Three.js ve WebGL fizik çarpışma motoruyla tarayıcıda doğrudan 60 FPS çalışan donanımsız artırılmış gerçeklik masa hokeyi prototipi."
            : "Zero-latency in-browser AR hockey powered by 21-joint MediaPipe real-time hand tracking and a custom Three.js WebGL physics engine.",
        tags: ["Three.js", "MediaPipe", "WebGL", "TypeScript", "TensorFlow.js"],
        link: "https://github.com/bahattinyunus",
        metric: "Ankara AI Hackathon // 60 FPS",
      },
      {
        id: "feza-arsivi-tua",
        title: "FezaArsivi & TUA Uzay Mimarileri",
        category: lang === "tr" ? "Uzay Bilimleri & ROS 2" : "Space & Avionics",
        desc:
          lang === "tr"
            ? "Türkiye Uzay Ajansı (TUA) Astro Hackathonu ve TÜBİTAK Karacaali Uzay Kampı'nda inşa edilen; Ay yüzeyi otonom keşif için ROS 2 & EKF telemetri füzyonu ve CubeSat radyo spektrogram analiz kütüphanesi."
            : "ROS 2 and EKF telemetry fusion for autonomous lunar exploration and CubeSat radio astronomy spectrogram analysis created at TSA Astro Hackathon.",
        tags: ["ROS 2", "Python", "SDR", "Spectrogram", "EKF", "CubeSat"],
        link: "https://github.com/bahattinyunus",
        metric: "TÜBİTAK & TUA // 15 Mimari",
      },
      {
        id: "deepforensics",
        title: "DeepForensics & Multimedya Güvenliği",
        category: lang === "tr" ? "Adli Bilişim & Siber Savunma" : "Forensics & Security",
        desc:
          lang === "tr"
            ? "BTK Akademi 42 saatlik atölyesinde geliştirilen; multimedya dosyalarında PRNU kamera parmak izi analizi, ELA seviye tespiti, GAN deepfake tespiti ve C2PA kriptografik içerik kimlik doğrulama paketi."
            : "Digital multimedia forensics suite implementing PRNU sensor noise fingerprinting, ELA analysis, GAN deepfake classification, and C2PA provenance verification.",
        tags: ["Python", "PyTorch", "OpenCV", "PRNU", "Deepfake", "C2PA"],
        link: "https://github.com/bahattinyunus",
        metric: "BTK Akademi 42h // C2PA",
      },
      {
        id: "insansiz-sualti",
        title: "İnsansız Sualtı Sistemleri Rehberi (TEKNOFEST)",
        category: lang === "tr" ? "Otonom Araçlar & ROS 2" : "Robotics & Embedded",
        desc:
          lang === "tr"
            ? "NVIDIA Jetson Orin tabanlı Edge AI, ROS 2 düğüm mimarisi, EKF sensör füzyonu ve derinlik/sonar entegrasyonuyla otonom sualtı seyrüsefer algoritmaları rehberi."
            : "Autonomous robotics guide and ROS 2 node architecture with EKF sensor fusion for NVIDIA Jetson Orin underwater vehicle deployments.",
        tags: ["ROS 2", "NVIDIA Jetson", "C++", "Python", "EKF", "Sensör Füzyonu"],
        link: "https://github.com/bahattinyunus",
        metric: "TEKNOFEST // Jetson Orin Edge AI",
      },
      {
        id: "beeroute",
        title: "BeeRoute // Bio-mimetic ABC Optimizer",
        category: lang === "tr" ? "Algoritma & Optimizasyon" : "Optimization",
        desc:
          lang === "tr"
            ? "Yapay Arı Kolonisi (Artificial Bee Colony) prensibiyle NP-Hard gezgin satıcı (TSP) ve otonom rota planlama problemlerini O(G·S·n²) karmaşıklığında çözen yüksek başarımlı çekirdek."
            : "High-performance bio-mimetic Artificial Bee Colony (ABC) optimizer for NP-Hard traveling salesperson and route planning.",
        tags: ["Python", "C++", "NumPy", "Heuristics", "Graph Theory"],
        link: "https://github.com/bahattinyunus/BeeRoute",
        metric: "O(G·S·n²) // Algoritmik Çekirdek",
      },
      {
        id: "celik-mcu",
        title: "Çelik MCU // Yerli RISC-V C++ SDK",
        category: lang === "tr" ? "Gömülü Sistemler & RTOS" : "Embedded & RTOS",
        desc:
          lang === "tr"
            ? "İlk yerli RISC-V çipi Çelik MCU için modern C++20 SDK, FreeRTOS HAL katmanı ve bare-metal çevre birimi sürücüleri."
            : "Modern C++20 SDK, FreeRTOS HAL layer, and bare-metal peripheral drivers for Çelik MCU, the national Turkish RISC-V microcontroller.",
        tags: ["C++20", "RISC-V", "FreeRTOS", "HAL", "Bare-Metal"],
        link: "https://github.com/bahattinyunus/Celik-MCU-SDK",
        metric: "Yerli RISC-V // C++20 SDK",
      },
    ];
  }, [lang]);

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

        {/* Ana İki Sütunlu Sayfa Düzeni (Brittany Chiang / Tech Lead Formatı) */}
        <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="lg:flex lg:justify-between lg:gap-8 xl:gap-14">
            
            {/* ========================================================== */}
            {/* SOL SÜTUN (Desktop Sabit Sticky Navigation)               */}
            {/* ========================================================== */}
            <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
              <div>
                {/* Durum Rozeti */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-mono text-teal-300 mb-5">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-400" />
                  </span>
                  <span>{lang === "tr" ? "Yeni Ar-Ge Projelerine Açık" : "Open for R&D Projects"}</span>
                  <span className="text-slate-600">•</span>
                  <span>Ankara, TR</span>
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

                {/* Masaüstü Navigasyon (Aktif Çizgi Efekti) */}
                <nav className="nav hidden lg:block" aria-label="Sayfa İçi Menü">
                  <ul className="mt-14 w-max space-y-4">
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
                        <span className="font-medium text-slate-200">Siber Vatan</span> (Beyaz Şapkalı Hacker),{" "}
                        <span className="font-medium text-slate-200">SHGM İHA-1 Ticari Pilot Lisansı</span> ve 270'ten fazla akredite belgeye sahibim.
                      </>
                    ) : (
                      <>
                        Selected among the{" "}
                        <span className="font-medium text-slate-200">top 20 youth out of 66,500+ applicants</span> in the Turkey–France Youth Exchange Program (visiting the European Parliament and ECHR). Holder of{" "}
                        <span className="font-medium text-slate-200">Cyber Homeland</span> (White Hat Hacker),{" "}
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

                <div className="space-y-10">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
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
                        <h3 className="font-medium leading-snug text-slate-200">
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-baseline font-medium leading-tight text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300 text-base"
                          >
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                            <span>{proj.title}</span>
                            <ArrowUpRight className="ml-1.5 h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
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
                      </div>
                    </div>
                  ))}
                </div>

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
              <section id="contact" className="scroll-mt-16 md:scroll-mt-24 pb-16">
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

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-800 text-xs font-mono text-slate-200 hover:border-teal-400/50 hover:text-teal-300 transition-all"
                    >
                      <Mail className="w-3.5 h-3.5 text-teal-400" />
                      <span>{IDENTITY.email}</span>
                      {copied ? <Check className="w-3.5 h-3.5 text-teal-300" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                    </button>

                    <a
                      href={`mailto:${IDENTITY.email}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-teal-400 text-slate-950 text-xs font-mono font-semibold hover:bg-teal-300 transition-all"
                    >
                      <span>{lang === "tr" ? "E-posta Gönder" : "Send Email"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>

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

                  <div className="mt-8 pt-6 border-t border-slate-800 text-xs font-mono text-slate-500 flex flex-wrap items-center justify-between gap-4">
                    <span>© {new Date().getFullYear()} {IDENTITY.name} · ODTÜ & Hacettepe</span>
                    <span>Ankara, Türkiye</span>
                  </div>
                </div>
              </section>

            </main>

          </div>
        </div>
      </div>
    </LangCtx.Provider>
  );
}
