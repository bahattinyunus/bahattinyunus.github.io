
// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield, Zap, Book, Code } from "lucide-react";
import { useVault } from "@/contexts/VaultContext";

export default function Arsenal() {
    const { isSecureMode } = useVault();

    const skillTree = [
        { id: 'python', label: 'PYTHON', x: 200, y: 100, connections: ['ai', 'security'] },
        { id: 'ai', label: 'AI/ML', x: 100, y: 300, connections: ['llm'] },
        { id: 'security', label: 'SECURITY', x: 300, y: 300, connections: ['sysarch'] },
        { id: 'llm', label: 'LLM ARCH', x: 50, y: 500, connections: [] },
        { id: 'sysarch', label: 'SYS_ARCH', x: 350, y: 500, connections: [] },
        { id: 'js', label: 'JS/TS', x: 500, y: 100, connections: ['web'] },
        { id: 'web', label: 'WEB_STACK', x: 500, y: 400, connections: [] },
    ];

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Cpu className={`w-8 h-8 animate-pulse ${isSecureMode ? 'text-yellow-500' : 'text-neon-red'}`} />
                <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                    {isSecureMode ? 'SECURE_CONNECTOME' : 'ARSENAL'} <span className={isSecureMode ? 'text-yellow-500' : 'text-neon-red'}>//</span> NEURAL_SKILL_TREE
                </h2>
            </div>

            {/* Neural Connector Visualization */}
            <div className="relative bg-black/40 border border-white/10 p-4 md:p-8 overflow-hidden min-h-[600px] cyber-clip-both group">
                <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none"></div>

                {/* SVG Connections Header */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <defs>
                        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                            <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                        </marker>
                    </defs>
                    {skillTree.map(skill => (
                        skill.connections.map(targetId => {
                            const target = skillTree.find(s => s.id === targetId);
                            if (!target) return null;
                            return (
                                <motion.line
                                    key={`${skill.id}-${targetId}`}
                                    x1={`${(skill.x / 600) * 100}%`}
                                    y1={`${(skill.y / 600) * 100}%`}
                                    x2={`${(target.x / 600) * 100}%`}
                                    y2={`${(target.y / 600) * 100}%`}
                                    stroke={isSecureMode ? '#eab308' : '#00f3ff'}
                                    strokeWidth="1"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1.5 }}
                                />
                            );
                        })
                    ))}
                </svg>

                {/* Nodes */}
                <div className="relative z-10 w-full h-[500px]">
                    {skillTree.map((skill, i) => (
                        <motion.div
                            key={skill.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="absolute flex flex-col items-center gap-2 group/node"
                            style={{
                                left: `${(skill.x / 600) * 100}%`,
                                top: `${(skill.y / 600) * 100}%`,
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            <div className={`w-3 h-3 rounded-full animate-pulse ${isSecureMode ? 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,1)]' : 'bg-neon-blue shadow-[0_0_10px_rgba(0,243,255,1)]'}`}></div>
                            <div className={`text-[10px] font-mono tracking-tighter px-2 py-0.5 border bg-black/80 whitespace-nowrap group-hover/node:scale-110 transition-transform ${isSecureMode ? 'border-yellow-500/40 text-yellow-500' : 'border-neon-blue/40 text-neon-blue'}`}>
                                {skill.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Legend Overlay */}
                <div className="absolute bottom-4 right-4 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em] pointer-events-none">
                    Connection_Protocol: v1.02 // Neural_Sync_Active
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                {/* Core Systems (Classic View) */}
                <section className={`bg-white/5 p-6 rounded-lg border cyber-clip-tl ${isSecureMode ? 'border-yellow-500/20' : 'border-white/10'}`}>
                    <h3 className={`text-xl font-[family-name:var(--font-display)] mb-6 flex items-center gap-2 ${isSecureMode ? 'text-yellow-500' : 'text-neon-blue'}`}>
                        <Terminal className="w-5 h-5" /> REFINED_STACK
                    </h3>
                    <div className="space-y-6">
                        {profileData.skills.languages.map((lang, i) => (
                            <div key={i} className="group">
                                <div className="flex justify-between mb-2 text-xs">
                                    <span className="font-mono text-gray-300">{lang}</span>
                                    <span className={`font-mono opacity-0 group-hover:opacity-100 transition-opacity ${isSecureMode ? 'text-yellow-500' : 'text-neon-blue'}`}>
                                        OPTIMIZED
                                    </span>
                                </div>
                                <div className="h-0.5 w-full bg-black border border-white/5 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${Math.random() * 20 + 80}%` }}
                                        className={`h-full ${isSecureMode ? 'bg-yellow-500' : 'bg-neon-blue'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={`bg-white/5 p-6 rounded-lg border cyber-clip-br ${isSecureMode ? 'border-yellow-500/20' : 'border-white/10'}`}>
                    <h3 className={`text-xl font-[family-name:var(--font-display)] mb-6 flex items-center gap-2 ${isSecureMode ? 'text-yellow-500' : 'text-neon-green'}`}>
                        <Shield className="w-5 h-5" /> DOMAIN_INTEL
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {profileData.skills.concepts.map((concept, i) => (
                            <div
                                key={i}
                                className={`px-2 py-1 border text-[9px] font-mono tracking-wide transition-all clip-path-hexagon ${isSecureMode ? 'border-yellow-500/30 bg-yellow-500/5 text-yellow-500' : 'border-neon-green/30 bg-neon-green/5 text-neon-green'}`}
                            >
                                {concept}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
