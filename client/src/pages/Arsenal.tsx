
// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, Zap, Book, Code } from "lucide-react";
import { useVault } from "@/contexts/VaultContext";

export default function Arsenal() {
    const { isSecureMode } = useVault();
    return (
        <div className="space-y-12">
            <div className="flex items-center gap-4 mb-8">
                <Cpu className="w-8 h-8 text-neon-red animate-pulse" />
                <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                    {isSecureMode ? 'SECURE_ARSENAL' : 'ARSENAL'} <span className={isSecureMode ? 'text-yellow-500' : 'text-neon-red'}>//</span> TECHNICAL CAPABILITIES
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Core Systems */}
                <section className="bg-white/5 p-6 rounded-lg border border-white/10 cyber-clip-tl">
                    <h3 className="text-xl font-[family-name:var(--font-display)] text-neon-blue mb-6 flex items-center gap-2">
                        <Terminal className="w-5 h-5" /> CORE LANGUAGES
                    </h3>
                    <div className="space-y-6">
                        {profileData.skills.languages.map((lang, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between mb-2">
                                    <span className="font-mono text-sm text-gray-300">{lang}</span>
                                    <span className="font-mono text-xs text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                                        READY
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-black border border-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.random() * 20 + 80}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.1 }}
                                        className={`h-full shadow-[0_0_10px_rgba(0,243,255,0.5)] ${isSecureMode ? 'bg-yellow-500 shadow-yellow-500/50' : 'bg-neon-blue shadow-neon-blue/50'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Domains */}
                <section className="bg-white/5 p-6 rounded-lg border border-white/10 cyber-clip-br">
                    <h3 className="text-xl font-[family-name:var(--font-display)] text-neon-green mb-6 flex items-center gap-2">
                        <Shield className="w-5 h-5" /> DOMAIN EXPERTISE
                    </h3>
                    <div className="flex flex-wrap gap-4">
                        {profileData.skills.concepts.map((concept, i) => (
                            <div
                                key={i}
                                className={`px-4 py-2 border text-sm font-mono tracking-wide transition-all cursor-crosshair clip-path-hexagon ${isSecureMode ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500 hover:bg-yellow-500/20 hover:border-yellow-500' : 'border-neon-green/30 bg-neon-green/5 text-neon-green hover:bg-neon-green/20 hover:border-neon-green'}`}
                            >
                                {concept}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* AI Systems */}
            <section>
                <h3 className="text-xl font-[family-name:var(--font-display)] text-neon-red mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> NEURAL EXTENSIONS
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {profileData.ai_tools.map((tool, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="p-4 border border-white/10 bg-black/40 hover:border-neon-red/50 hover:bg-neon-red/5 transition-all group"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-mono text-white/50">{tool.category}</span>
                                <span className="text-xs font-mono text-neon-red">{tool.level}% EFFICIENCY</span>
                            </div>
                            <h4 className="font-bold text-white group-hover:text-neon-red transition-colors">{tool.name}</h4>
                            <div className="w-full h-1 bg-white/10 mt-3">
                                <div
                                    className={`h-full ${isSecureMode ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-neon-red'}`}
                                    style={{ width: `${tool.level}%` }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Certifications (Brief) */}
            <section className="border-t border-white/10 pt-8">
                <h3 className="text-xl font-[family-name:var(--font-display)] text-white/70 mb-6 flex items-center gap-2">
                    <Book className="w-5 h-5" /> CERTIFIED PROTOCOLS
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profileData.certificates["Yapay Zeka & LLM"].slice(0, 6).map((cert, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-white/5 bg-white/5 hover:border-neon-blue/30 transition-colors">
                            <div className="w-6 h-6 flex items-center justify-center bg-black rounded text-neon-blue">
                                <Code className="w-3 h-3" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white/90">{cert.name}</div>
                                <div className="text-xs text-white/40">{cert.issuer}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
