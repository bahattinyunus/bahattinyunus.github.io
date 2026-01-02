import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, Cpu, Globe, Database, Shield, Brain, Layers } from "lucide-react";

export const profileData = {
  personal: {
    name: "Bahattin Yunus Çetin",
    username: "bahattinyunus",
    location: "Türkiye",
    company: "StarDev",
    bio: "Pragmatik mühendislik felsefesiyle hareket eden, akademik bürokrasi yerine derin teknik uzmanlığa odaklanan bir Yazılım Mühendisi. Yapay Zeka, Siber Güvenlik ve Sistem Mimarisi alanlarında kendi kendini savunan ve evrilen zeki ekosistemler inşa ediyor.",
    tagline: "IT Mimarı | Akıllı Sistemlerin Geleceğini Şekillendiriyor | Güvenli Ekosistemler Kaşifi & Girişimci",
    avatar_url: "/images/ai-avatar.jpg",
    github_url: "https://github.com/bahattinyunus",
    linkedin_url: "https://www.linkedin.com/in/bahattinyunus",
    stardev_url: "https://www.stardev.io/developers/bahattinyunus",
    medium_url: "https://medium.com/@bahattinyunus"
  },
  github_stats: {
    public_repos: 231,
    followers: 2063,
    following: 18,
    total_stars: 1500,
    total_forks: 450
  },
  skills: {
    languages: ["Python", "C++", "JavaScript", "Go", "Rust"],
    frameworks: ["TensorFlow", "PyTorch", "React", "Node.js", "Django"],
    tools: ["Docker", "Kubernetes", "Git", "Linux", "AWS"],
    concepts: [
      "Yapay Zeka & Makine Öğrenmesi",
      "Siber Güvenlik",
      "Sistem Mimarisi",
      "Otonom Sistemler",
      "IoT & Gömülü Sistemler"
    ]
  },
  blog_posts: [
    {
      title: "2026’ya Doğru Yazılım ve Siber Güvenlikte Paradigma Değişimi",
      summary: "Teknolojik Dönüşüm ve İş Gücünün Geleceği: Hayatta Kalma Reçetesi",
      url: "https://medium.com/@bahattinyunus/2026ya-do%C4%9Fru-yaz%C4%B1l%C4%B1m-ve-siber-g%C3%BCvenlikte-paradigma-de%C4%9Fi%C5%9Fimi-hayatta-kalma-re%C3%A7etesi-19f6f09f75c7",
      image: "/images/blog/paradigma.jpg",
      date: "2 Ocak 2026"
    },
    {
      title: "TEKNOFEST Bir Yarışma Değil, Bir Okuldur",
      summary: "Mühendislik Vizyonunuzu Yeniden Tanımlayın: Küresel Teknoloji Liderliğine Giden Yol",
      url: "https://medium.com/@bahattinyunus/teknofest-bir-yar%C4%B1%C5%9Fma-de%C4%9Fil-bir-okuldur-m%C3%BChendislik-vizyonunuzu-yeniden-tan%C4%B1mlay%C4%B1n-908bce0bd7ab",
      image: "/images/blog/teknofest.jpg",
      date: "29 Aralık 2025"
    },
    {
      title: "Yapay Genel Zekâ (AGI) Yolunda Büyük Çatlak",
      summary: "İlya, LeCun ve Altman Nereye Koşuyor? Yapay Zekâda Yol Ayrımı: Devrim mi, İllüzyon mu?",
      url: "https://medium.com/@bahattinyunus/yapay-genel-zek%C3%A2-agi-yolunda-b%C3%BCy%C3%BCk-%C3%A7atlak-i%CC%87lya-lecun-ve-altman-nereye-ko%C5%9Fuyor-c0535a22703e",
      image: "/images/blog/agi.jpg",
      date: "27 Aralık 2025"
    },
    {
      title: "Dijital Sınır Boyları: Yapay Zekada Türkçenin Geleceği",
      summary: "Veri Egemenliği ve Yapay Zeka ile girdiğimiz diyaloglarda dil seçiminin stratejik önemi.",
      url: "https://medium.com/@bahattinyunus/dijital-s%C4%B1n%C4%B1r-boylar%C4%B1-yapay-zekada-t%C3%BCrk%C3%A7enin-gelece%C4%9Fi-ve-veri-egemenli%C4%9Fi-7c6649103f38",
      image: "/images/blog/sinir.jpg",
      date: "25 Aralık 2025"
    },
    {
      title: "Gökyüzündeki Sessiz Tehdit: İHA Hareketliliği",
      summary: "Türkiye Hava Sahasında İHA Hareketliliği ve Genişleyen Savaşın Yeni Cephesi",
      url: "https://medium.com/@bahattinyunus/g%C3%B6ky%C3%BCz%C3%BCndeki-sessiz-tehdit-t%C3%BCrkiye-hava-sahas%C4%B1nda-i%CC%87ha-hareketlili%C4%9Fi-ve-geni%C5%9Fleyen-sava%C5%9F%C4%B1n-yeni-952385656565",
      image: "/images/blog/iha.jpg",
      date: "25 Aralık 2025"
    },
    {
      title: "2026’da Finansal Özgürlüğün Anahtarı",
      summary: "Ustalaşmanız Gereken 7 Yapay Zeka Becerisi ve Yeni Bir Çağın Eşiğinde 'Süper Birey' Dönemi",
      url: "https://medium.com/@bahattinyunus/2026da-finansal-%C3%B6zg%C3%BCrl%C3%BC%C4%9F%C3%BCn-anahtar%C4%B1-ustala%C5%9Fman%C4%B1z-gereken-7-yapay-zeka-becerisi-852365456565",
      image: "/images/blog/finans.jpg",
      date: "23 Aralık 2025"
    }
  ],
  featured_projects: [
    {
      name: "erc_rover_mission_control",
      description: "Mars keşif araçları için geliştirilmiş, gerçek zamanlı telemetri ve kontrol sağlayan görev kontrol arayüzü.",
      stars: 45,
      forks: 12,
      language: "Python",
      url: "https://github.com/bahattinyunus/erc_rover_mission_control",
      image: "/images/project-erc-rover-mission-control.jpg"
    },
    {
      name: "teknofest_sanayide_dijital_teknolojiler",
      description: "Endüstri 4.0 kapsamında akıllı fabrika sistemleri ve dijital ikiz uygulamaları.",
      stars: 38,
      forks: 8,
      language: "C++",
      url: "https://github.com/bahattinyunus/teknofest_sanayide_dijital_teknolojiler",
      image: "/images/project-teknofest-sanayide-dijital-teknolojiler.jpg"
    },
    {
      name: "Mars-Rover-Control-OS",
      description: "Gezegen keşif robotları için özel olarak tasarlanmış, otonom navigasyon ve bilimsel analiz yeteneklerine sahip işletim sistemi.",
      stars: 52,
      forks: 15,
      language: "C++",
      url: "https://github.com/bahattinyunus/Mars-Rover-Control-OS",
      image: "/images/project-mars-rover-control-os.jpg"
    },
    {
      name: "ANKA-LLM",
      description: "Türkçe dil işleme yeteneklerine odaklanmış, yerli ve milli büyük dil modeli projesi.",
      stars: 120,
      forks: 35,
      language: "Python",
      url: "https://github.com/bahattinyunus/ANKA-LLM",
      image: "/images/project-anka-llm.jpg"
    },
    {
      name: "Radiosonde-Hunting",
      description: "Meteorolojik balonların takibi ve veri analizi için geliştirilmiş radyo sinyal işleme sistemi.",
      stars: 25,
      forks: 5,
      language: "Python",
      url: "https://github.com/bahattinyunus/Radiosonde-Hunting",
      image: "/images/project-radiosonde-hunting.jpg"
    },
    {
      name: "teknofest_tarim_teknolojileri",
      description: "Akıllı tarım uygulamaları için drone destekli görüntü işleme ve verimlilik analizi.",
      stars: 30,
      forks: 7,
      language: "Python",
      url: "https://github.com/bahattinyunus/teknofest_tarim_teknolojileri",
      image: "/images/project-teknofest-tarim-teknolojileri.jpg"
    },
    {
      name: "AkademikRadar",
      description: "Akademik yayınları ve atıfları analiz ederek araştırmacılara içgörü sunan veri madenciliği aracı.",
      stars: 42,
      forks: 10,
      language: "Python",
      url: "https://github.com/bahattinyunus/AkademikRadar",
      image: "/images/project-akademikradar.jpg"
    },
    {
      name: "ANATOLIA-SILICON",
      description: "Yerli mikroişlemci tasarımı ve FPGA tabanlı donanım hızlandırma projeleri.",
      stars: 65,
      forks: 18,
      language: "Verilog",
      url: "https://github.com/bahattinyunus/ANATOLIA-SILICON",
      image: "/images/project-anatolia-silicon.jpg"
    },
    {
      name: "AquaNexus-Advanced-ROV-Mission-Control-System",
      description: "Sualtı robotları (ROV) için gelişmiş görev kontrol ve görüntü aktarım sistemi.",
      stars: 55,
      forks: 14,
      language: "C++",
      url: "https://github.com/bahattinyunus/AquaNexus-Advanced-ROV-Mission-Control-System",
      image: "/images/project-aquanexus-advanced-rov-mission-control-system.jpg"
    },
    {
      name: "CivTech-Core",
      description: "Akıllı şehirler ve dijital belediyecilik için geliştirilmiş merkezi yönetim platformu.",
      stars: 28,
      forks: 6,
      language: "Go",
      url: "https://github.com/bahattinyunus/CivTech-Core",
      image: "/images/project-civtech-core.jpg"
    },
    {
      name: "CodeVisualizer",
      description: "Karmaşık algoritmaları ve veri yapılarını görselleştirerek eğitim süreçlerini destekleyen araç.",
      stars: 85,
      forks: 22,
      language: "JavaScript",
      url: "https://github.com/bahattinyunus/CodeVisualizer",
      image: "/images/project-codevisualizer.jpg"
    },
    {
      name: "E-VIZOR",
      description: "Artırılmış gerçeklik (AR) tabanlı taktiksel veri görüntüleme ve durumsal farkındalık sistemi.",
      stars: 48,
      forks: 11,
      language: "C#",
      url: "https://github.com/bahattinyunus/E-VIZOR",
      image: "/images/project-e-vizor.jpg"
    },
    {
      name: "Energy-Grid-Pulse",
      description: "Yenilenebilir enerji kaynaklarının entegrasyonu ve akıllı şebeke yönetimi için analiz platformu.",
      stars: 33,
      forks: 9,
      language: "Python",
      url: "https://github.com/bahattinyunus/Energy-Grid-Pulse",
      image: "/images/project-energy-grid-pulse.jpg"
    },
    {
      name: "teknofest_finansal_teknolojiler",
      description: "Blokzincir tabanlı güvenli ödeme sistemleri ve finansal analiz algoritmaları.",
      stars: 40,
      forks: 10,
      language: "Solidity",
      url: "https://github.com/bahattinyunus/teknofest_finansal_teknolojiler",
      image: "/images/project-teknofest-finansal-teknolojiler.jpg"
    },
    {
      name: "formula_student_autonomous_stack",
      description: "Otonom yarış araçları için algılama, planlama ve kontrol yazılım yığını.",
      stars: 70,
      forks: 20,
      language: "C++",
      url: "https://github.com/bahattinyunus/formula_student_autonomous_stack",
      image: "/images/project-formula-student-autonomous-stack.jpg"
    },
    {
      name: "Kiyamet-Hatti",
      description: "Afet durumlarında kesintisiz iletişim sağlayan acil durum haberleşme ağı projesi.",
      stars: 60,
      forks: 16,
      language: "Python",
      url: "https://github.com/bahattinyunus/Kiyamet-Hatti",
      image: "/images/project-kiyamet-hatti.jpg"
    },
    {
      name: "denizalti-akademisi",
      description: "Denizaltı teknolojileri ve sualtı akustiği üzerine eğitim materyalleri ve simülasyonlar.",
      stars: 35,
      forks: 8,
      language: "Python",
      url: "https://github.com/bahattinyunus/denizalti-akademisi",
      image: "/images/project-denizalti-akademisi.jpg"
    },
    {
      name: "meta_engineering",
      description: "Metaverse ortamında mühendislik tasarımı ve işbirliği araçları.",
      stars: 22,
      forks: 4,
      language: "C#",
      url: "https://github.com/bahattinyunus/meta_engineering",
      image: "/images/project-meta-engineering.jpg"
    },
    {
      name: "Milli-Teknoloji-Envanteri",
      description: "Türkiye'nin teknolojik yetkinliklerini ve varlıklarını haritalandıran veritabanı projesi.",
      stars: 50,
      forks: 13,
      language: "JavaScript",
      url: "https://github.com/bahattinyunus/Milli-Teknoloji-Envanteri",
      image: "/images/project-milli-teknoloji-envanteri.jpg"
    },
    {
      name: "NOAA",
      description: "Oşinografik ve atmosferik verilerin analizi ve iklim modelleme çalışmaları.",
      stars: 28,
      forks: 6,
      language: "Python",
      url: "https://github.com/bahattinyunus/NOAA",
      image: "/images/project-noaa.jpg"
    },
    {
      name: "university-courses",
      description: "Geleceğin dünyasını inşa eden 'Mültidisipliner Solopreneur'lar' için tasarlanmış, yapay zeka entegreli akademik bir işletim sistemi ve bilgi cephaneliği.",
      stars: 20,
      forks: 5,
      language: "Python",
      url: "https://github.com/bahattinyunus/university-courses",
      image: "/images/project-university.jpg"
    },
    {
      name: "Project-Neptune-Alpha",
      description: "Sualtı keşif ve savunma sistemleri için geliştirilen yeni nesil otonom araç prototipi.",
      stars: 15,
      forks: 3,
      language: "C++",
      url: "https://github.com/bahattinyunus/Project-Neptune-Alpha",
      image: "/images/project-neptune.jpg"
    },
    {
      name: "gelistirme_araclari",
      description: "Yazılım geliştirme süreçlerini hızlandıran ve otomatize eden özel araçlar seti.",
      stars: 12,
      forks: 2,
      language: "Shell",
      url: "https://github.com/bahattinyunus/gelistirme_araclari",
      image: "/images/project-devtools.jpg"
    },
    {
      name: "NeuroPaint",
      description: "Yapay zeka destekli sanatsal üretim ve görüntü işleme aracı.",
      stars: 45,
      forks: 8,
      language: "Python",
      url: "https://github.com/bahattinyunus/NeuroPaint",
      image: "/images/project-neuropaint.jpg"
    },
    {
      name: "TEKNOFEST_Competitions",
      description: "TEKNOFEST yarışmaları için geliştirilen çeşitli projelerin ve kodların derlemesi.",
      stars: 60,
      forks: 25,
      language: "Mixed",
      url: "https://github.com/bahattinyunus/TEKNOFEST_Competitions",
      image: "/images/project-teknofest.jpg"
    },
    {
      name: "AutonomousPrisonSystem",
      description: "Yüksek güvenlikli tesisler için yapay zeka destekli otonom gözetim ve yönetim sistemi.",
      stars: 35,
      forks: 7,
      language: "Python",
      url: "https://github.com/bahattinyunus/AutonomousPrisonSystem",
      image: "/images/project-prison.jpg"
    },
    {
      name: "cizgi_takibi",
      description: "Otonom robotlar için gelişmiş çizgi izleme ve yol planlama algoritmaları.",
      stars: 18,
      forks: 4,
      language: "C++",
      url: "https://github.com/bahattinyunus/cizgi_takibi",
      image: "/images/project-linefollower.jpg"
    },
    {
      name: "btk_go",
      description: "Go programlama dili ile geliştirilmiş yüksek performanslı ağ uygulamaları.",
      stars: 14,
      forks: 2,
      language: "Go",
      url: "https://github.com/bahattinyunus/btk_go",
      image: "/images/project-go.jpg"
    },
    {
      name: "cyber_security_btk_t3A",
      description: "Siber güvenlik eğitimleri ve CTF yarışmaları için hazırlanan kaynaklar ve araçlar.",
      stars: 55,
      forks: 20,
      language: "Python",
      url: "https://github.com/bahattinyunus/cyber_security_btk_t3A",
      image: "/images/project-cyber.jpg"
    },
    {
      name: "LibraMind",
      description: "Kütüphane ve bilgi yönetim sistemleri için akıllı otomasyon çözümü.",
      stars: 22,
      forks: 5,
      language: "Java",
      url: "https://github.com/bahattinyunus/LibraMind",
      image: "/images/project-libramind.jpg"
    },
    {
      name: "teknofest_robotaksi",
      description: "Otonom binek araçlar yarışması için geliştirilen algı ve kontrol sistemleri.",
      stars: 40,
      forks: 12,
      language: "Python",
      url: "https://github.com/bahattinyunus/teknofest_robotaksi",
      image: "/images/project-robotaksi.jpg"
    },
    {
      name: "teknofest_suru_iha",
      description: "Sürü halinde hareket eden İHA'lar için koordinasyon ve görev paylaşımı algoritmaları.",
      stars: 50,
      forks: 15,
      language: "Python",
      url: "https://github.com/bahattinyunus/teknofest_suru_iha",
      image: "/images/project-swarm.jpg"
    },
    {
      name: "teknofest_insansiz_kara_araci",
      description: "Zorlu arazi koşullarında görev yapabilen insansız kara aracı tasarımı ve yazılımı.",
      stars: 38,
      forks: 10,
      language: "C++",
      url: "https://github.com/bahattinyunus/teknofest_insansiz_kara_araci",
      image: "/images/project-ika.jpg"
    },
    {
      name: "teknofest_robolig",
      description: "Robot futbol takımları için strateji ve oyun kurma yapay zekası.",
      stars: 25,
      forks: 6,
      language: "C++",
      url: "https://github.com/bahattinyunus/teknofest_robolig",
      image: "/images/project-robolig.jpg"
    },
    {
      name: "teknofest_insansiz_deniz_araci",
      description: "Otonom deniz araçları için navigasyon ve engelden kaçınma sistemleri.",
      stars: 32,
      forks: 8,
      language: "Python",
      url: "https://github.com/bahattinyunus/teknofest_insansiz_deniz_araci",
      image: "/images/project-ida.jpg"
    },
    {
      name: "LionSight-AUV",
      description: "Sualtı görüntüleme ve nesne tespiti için geliştirilmiş otonom sualtı aracı projesi.",
      stars: 45,
      forks: 12,
      language: "Python",
      url: "https://github.com/bahattinyunus/LionSight-AUV",
      image: "/images/project-lionsight.jpg"
    },
    {
      name: "Nexus-TRL-LLM",
      description: "LLM dünyasının stratejik istihbarat ve egemenlik üssü. Yapay zeka devlerinin hamlelerini, ajanik mimarilerini ve model olgunluğunu TRL disipliniyle analiz eden kapsamlı bir manifesto.",
      stars: 0,
      forks: 0,
      language: "Unknown",
      url: "https://github.com/bahattinyunus/Nexus-TRL-LLM",
      image: "/images/project-nexus-trl-llm.jpg"
    },
    {
      name: "NexusBroker",
      description: "AI destekli eşleştirme motoru ve akıllı sözleşme tabanlı emanet (escrow) protokolü. Geleneksel aracılık mekanizmalarını şeffaflık, hız ve otonom güven ile yeniden tanımlayan hibrit ticaret ekosistemi.",
      stars: 3,
      forks: 0,
      language: "JavaScript",
      url: "https://github.com/bahattinyunus/NexusBroker",
      image: "/images/project-nexusbroker.jpg"
    },
    {
      name: "NovaChat-Real-Time-Messaging-App",
      description: "React, Node.js, Socket.io ve Redis tabanlı, Dockerize edilmiş gerçek zamanlı mesajlaşma iskeleti. Ölçeklenebilir mimari ve modern tech-stack ile hızlı prototipleme imkanı.",
      stars: 7,
      forks: 0,
      language: "JavaScript",
      url: "https://github.com/bahattinyunus/NovaChat-Real-Time-Messaging-App",
      image: "/images/project-novachat-real-time-messaging-app.jpg"
    },
    {
      name: "Open-Textile-Intelligence",
      description: "Tekstilde Endüstri 4.0'ın ötesi: Yapay zeka ve bilgisayarlı görü destekli Otonom Kalite Kontrol Platformu. Kumaşın DNA'sını okuyan, PySide6 tabanlı Elit Komuta Merkezi.",
      stars: 0,
      forks: 1,
      language: "Python",
      url: "https://github.com/bahattinyunus/Open-Textile-Intelligence",
      image: "/images/project-open-textile-intelligence.jpg"
    },
    {
      name: "PhysicEngine",
      description: "Modern yazılım mühendisliği standartlarıyla geliştirilmiş, yüksek performanslı ve modüler bir 2D fizik simülasyon çekirdeği. Temiz kod ve matematiksel şeffaflık felsefesiyle tasarlandı.",
      stars: 1,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/PhysicEngine",
      image: "/images/project-physicengine.jpg"
    },
    {
      name: "PoseidonEye",
      description: "Gemi ana makineleri için IoT tabanlı kestirimci bakım platformu. Isolation Forest ile anomali tespiti, RUL tahmini ve Streamlit tabanlı gerçek zamanlı dashboard.",
      stars: 3,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/PoseidonEye",
      image: "/images/project-poseidoneye.jpg"
    },
    {
      name: "AQUASYNC-Multi-Domain-Autonomous-Maritime-System",
      description: "Maritime RobotX için geliştirilmiş, USV ve AUV birimlerini senkronize eden çok alanı otonom operasyon sistemi. ROS 2 Humble, YOLOv11 ve Nav2 ile hibrit sürü zekası.",
      stars: 1,
      forks: 0,
      language: "Unknown",
      url: "https://github.com/bahattinyunus/AQUASYNC-Multi-Domain-Autonomous-Maritime-System",
      image: "/images/project-aquasync-multi-domain-autonomous-maritime-system.jpg"
    },
    {
      name: "robotex_warrior_core",
      description: "Rekabetçi robotik için tasarlanmış yüksek performanslı otonom kontrol çekirdeği. Düşük gecikmeli SPDA mimarisi, sensör füzyonu ve modüler kontrol stratejileri.",
      stars: 1,
      forks: 0,
      language: "Unknown",
      url: "https://github.com/bahattinyunus/robotex_warrior_core",
      image: "/images/project-robotex-warrior-core.jpg"
    },
    {
      name: "SIGINT",
      description: "SDR, DSP ve FFT tabanlı modern sinyal istihbaratı (SIGINT) komuta merkezi. ELINT, COMINT ve FISINT modülleriyle elektronik sinyal analizi ve spektrum görselleştirme.",
      stars: 0,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/SIGINT",
      image: "/images/project-sigint.jpg"
    },
    {
      name: "ktu-sarge-gokcen",
      description: "KTÜ Gökcen Rocket Team tarafından TEKNOFEST 2026 Yüksek İrtifa Kategorisi için geliştirilen roket projesi. 18.000 ft servis tavanı ve modüler mimari.",
      stars: 5,
      forks: 0,
      language: "CSS",
      url: "https://github.com/bahattinyunus/ktu-sarge-gokcen",
      image: "/images/project-ktu-sarge-gokcen.jpg"
    },
    {
      name: "TRL-Bio-Compute",
      description: "Post-Silikon çağı için stratejik istihbarat merkezi. DNA depolama, Wetware Zekası ve Biyo-Dijital Yakınsama teknolojilerinin TRL odaklı mimari analizi.",
      stars: 1,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/TRL-Bio-Compute",
      image: "/images/project-trl-bio-compute.jpg"
    },
    {
      name: "TRL-Hardware-Pulse",
      description: "Yarı iletken dünyasının stratejik nabzı: NVIDIA, AMD ve Intel gibi devlerin hamlelerini ve GPU mimarilerini TRL metodolojisiyle analiz eden elit strateji rehberi.",
      stars: 0,
      forks: 0,
      language: "Unknown",
      url: "https://github.com/bahattinyunus/TRL-Hardware-Pulse",
      image: "/images/project-trl-hardware-pulse.jpg"
    },
    {
      name: "TRL-Quantum-Edge",
      description: "Kuantum-Güvenli Uç Zeka (Edge Intelligence) için teknolojik olgunluk standartlarını belirliyoruz. PQC, Edge Computing ve TRL metodolojisini birleştiren hibrit teknoloji çerçevesi.",
      stars: 1,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/TRL-Quantum-Edge",
      image: "/images/project-trl-quantum-edge.jpg"
    },
    {
      name: "The-Craft-of-Tech-Architecture",
      description: "Mimar, en zor kodu yazan değil; sistem entropisine karşı durarak yazılması gereken kod miktarını en aza indiren zanaatkardır. Yazılımcılıktan Mimarılığa geçişin teknik ve felsefi yol haritası.",
      stars: 1,
      forks: 0,
      language: "Unknown",
      url: "https://github.com/bahattinyunus/The-Craft-of-Tech-Architecture",
      image: "/images/project-the-craft-of-tech-architecture.jpg"
    },
    {
      name: "Math2Code-A-Practical-Guide-for-Developers",
      description: "Yazılım mühendisliğinin matematiksel temellerini çalışan kod parçalarına dönüştüren elit bir rehber. AI, Graf Teorisi ve Kriptografi disiplinlerini pratik uygulamaya taşıyan dijital bilgi kütüphanesi.",
      stars: 3,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/Math2Code-A-Practical-Guide-for-Developers",
      image: "/images/project-math2code-a-practical-guide-for-developers.jpg"
    },
    {
      name: "teknofest_helikopter_tasarim",
      description: "VERTIX-H1: TEKNOFEST Helikopter Tasarım Yarışması için geliştirilmiş, 18.000 ft servis tavanına sahip modüler mimarili yüksek irtifa kurtarma helikopteri projesi.",
      stars: 2,
      forks: 0,
      language: "Python",
      url: "https://github.com/bahattinyunus/teknofest_helikopter_tasarim",
      image: "/images/project-teknofest-helikopter-tasarim.jpg"
    }
  ]
};
