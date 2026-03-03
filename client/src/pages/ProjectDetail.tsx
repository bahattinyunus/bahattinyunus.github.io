
import { useRoute, Link } from "wouter";
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Zap, Shield, Cpu, Layers } from "lucide-react";

export default function ProjectDetail() {
    const [, params] = useRoute("/operations/:projectId");
    const project = profileData.featured_projects.find(p => p.name.toLowerCase() === params?.projectId?.toLowerCase());

    if (!project) return (
        <div className="text-center py-20">
            <h1 className="text-2xl text-white font-mono">PROJECT_NOT_FOUND</h1>
            <Link href="/operations" className="text-neon-blue hover:underline mt-4 inline-block font-mono">RETURN_TO_BASE</Link>
        </div>
    );

    return (
        <div className="space-y-12 pb-20">
            <Link href="/operations" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-sm group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> BACK_TO_OPERATIONS
            </Link>

            <header className="grid md:grid-cols-2 gap-12 items-end">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-[10px] font-mono">
                            ACTIVE_MISSION // {project.language.toUpperCase()}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-display)] font-bold text-white tracking-tighter">
                        {project.name.toUpperCase()}
                    </h1>
                    <p className="text-xl text-white/60 font-mono leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="relative group overflow-hidden border border-white/10 cyber-clip-br">
                    <img src={project.image} alt={project.name} className="w-full aspect-video object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
            </header>

            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                    {/* Architecture Section */}
                    <section className="p-8 bg-white/5 border border-white/10 cyber-clip-tl space-y-8">
                        <h2 className="text-2xl font-[family-name:var(--font-display)] text-white flex items-center gap-3">
                            <Layers className="w-6 h-6 text-neon-blue" /> SYSTEM_ARCHITECTURE
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-mono text-neon-blue">TECH_STACK</h3>
                                <ul className="space-y-2">
                                    {['Modular Kernel', 'Neural Processing Unit', 'Distributed Database', 'End-to-End Encryption'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-mono">
                                            <Zap className="w-3 h-3 text-neon-green" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-sm font-mono text-neon-green">SECURITY_PROTOCOLS</h3>
                                <ul className="space-y-2">
                                    {['Zero Trust Architecture', 'Anomaly Detection', 'Hardware-level Security', 'Real-time Monitoring'].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-xs text-white/50 font-mono">
                                            <Shield className="w-3 h-3 text-neon-red" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>

                <aside className="space-y-8">
                    <div className="p-8 bg-black/40 border border-white/10 cyber-clip-br space-y-6">
                        <h3 className="text-lg font-[family-name:var(--font-display)] text-white">MISSION_CONTROL</h3>
                        <div className="space-y-4">
                            <a href={project.url} target="_blank" className="w-full py-4 bg-neon-blue text-black font-bold font-[family-name:var(--font-display)] tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2">
                                GITHUB_REPOSITORY <Github className="w-4 h-4" />
                            </a>
                            <button className="w-full py-4 border border-white/20 text-white font-mono tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                LIVE_DEMO <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-6 border border-dashed border-white/10 rounded-lg">
                        <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 mb-2">
                            <Cpu className="w-3 h-3" /> NODE_STATUS
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <div className="text-xs text-white/50 font-mono">STABILITY</div>
                                <div className="text-xl font-bold text-white uppercase">OPTIMAL</div>
                            </div>
                            <div className="text-neon-green font-mono text-xs">99.8%</div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}
