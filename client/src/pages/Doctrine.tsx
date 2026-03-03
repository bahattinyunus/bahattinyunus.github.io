
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { BookOpen, Quote, ShieldAlert, Cpu, Zap } from "lucide-react";

export default function Doctrine() {
    const doctrines = [
        {
            title: "PRAGMATIC_ENGINEERING",
            content: "Sadece çalışan değil, yaşayan sistemler inşa et. Karmaşıklık, sistemin en büyük düşmanıdır. En iyi kod, yazılmasına gerek kalmayan koddur.",
            icon: Cpu
        },
        {
            title: "SOVEREIGN_INTELLIGENCE",
            content: "Teknoloji bir araç değil, stratejik bir varlıktır. Milli teknoloji hamlesi, sadece bir slogan değil, mühendislik etiğimizin temel taşıdır.",
            icon: ShieldAlert
        },
        {
            title: "ASYMMETRIC_GROWTH",
            content: "Diploma bir başlangıçtır, yetkinlik ise bir varış noktası. Akademik sınırların ötesinde, kendi müfredatını inşa et ve 'Base Layer'ı her gün güncelle.",
            icon: Zap
        }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-16 pb-20">
            {/* Header */}
            <header className="space-y-4 border-l-4 border-neon-blue pl-8 py-4">
                <div className="flex items-center gap-4 text-neon-blue">
                    <BookOpen className="w-8 h-8 animate-pulse" />
                    <span className="font-mono text-sm tracking-[0.3em]">OPERATIONAL_DOCTRINE_V1.0</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] font-bold text-white tracking-tighter">
                    THE_MANIFESTO.
                </h1>
                <p className="text-xl text-white/40 font-mono italic max-w-2xl">
                    "Mimar, en zor kodu yazan değil; sistem entropisine karşı durarak yazılması gereken kod miktarını en aza indiren zanaatkardır."
                </p>
            </header>

            {/* Core Pillars */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctrines.map((pillar, i) => (
                    <motion.div
                        key={pillar.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 bg-black/40 border border-white/10 cyber-clip-tl hover:border-neon-blue/40 transition-all group"
                    >
                        <pillar.icon className="w-6 h-6 text-neon-blue mb-6 group-hover:scale-110 transition-transform" />
                        <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-white mb-4 tracking-wider">
                            {pillar.title}
                        </h3>
                        <p className="text-sm font-mono text-white/60 leading-relaxed">
                            {pillar.content}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Detailed Manifesto Sections */}
            <section className="space-y-12">
                <div className="h-px bg-gradient-to-r from-neon-blue/50 via-white/10 to-transparent"></div>

                <div className="grid md:grid-cols-2 gap-16">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-[family-name:var(--font-display)] text-white">VISION_PROTOCOL</h2>
                        <div className="space-y-4 font-mono text-sm text-white/50 leading-loose">
                            <p>Yapay zeka sistemlerinin sadece kullanıcısı değil, mimarı olma vizyonuyla; LLM optimizasyonu, siber güvenlik ve karmaşık sistem mimarileri üzerine odaklanıyoruz.</p>
                            <p>Yerli donanımlar banttan çıkana kadar, düşük parametreli modelleri (7B/8B) devasa modellerin yetenekleriyle donatan Knowledge Distillation süreçlerini yönetiyoruz.</p>
                        </div>
                    </div>

                    <div className="relative p-12 bg-white/5 cyber-clip-br border border-white/10 overflow-hidden group">
                        <Quote className="absolute top-4 left-4 w-12 h-12 text-neon-blue/10 group-hover:text-neon-blue/20 transition-colors" />
                        <div className="relative z-10 font-mono text-lg text-white/80 italic leading-relaxed">
                            "Milli Teknoloji Hamlesi'nin bir neferi olarak, sadece kod yazmayı değil; stratejik düşünen, etik değerlere bağlı ve küresel standartlarda teknoloji üreten bir mühendislik kültürü oluşturmayı hedefliyorum."
                        </div>
                        <div className="mt-8 font-[family-name:var(--font-display)] text-neon-blue">
                            BYC // FOUNDER @ ANKA_SILICON
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom Status */}
            <footer className="pt-12 flex items-center justify-between border-t border-white/5 text-[10px] font-mono text-white/20">
                <div className="flex items-center gap-4">
                    <span>REVISION: 13.04.26</span>
                    <span>AUTHOR: B.Y.C.</span>
                </div>
                <div className="animate-pulse flex items-center gap-2 text-neon-green">
                    <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
                    DOCTRINE_SECURED
                </div>
            </footer>
        </div>
    );
}
