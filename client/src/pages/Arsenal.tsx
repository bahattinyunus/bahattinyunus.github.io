// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield } from "lucide-react";
import { useVault } from "@/contexts/VaultContext";
import { SkillHexGrid } from "@/components/cyber-ui/SkillHexGrid";

export default function Arsenal() {
    const { isSecureMode } = useVault();

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center gap-4 mb-8">
                <Cpu className={`w-8 h-8 animate-pulse ${isSecureMode ? 'text-yellow-500' : 'text-neon-red'}`} />
                <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                    {isSecureMode ? 'SECURE_CONNECTOME' : 'ARSENAL'} <span className={isSecureMode ? 'text-yellow-500' : 'text-neon-red'}>//</span> BIOLUMINESCENT_SKILL_GRID
                </h2>
            </div>

            {/* Skill Grid Visualization */}
            <section className="space-y-8">
                <div className="flex items-center gap-3 px-4 border-l-2 border-neon-blue/50">
                    <Terminal className="w-5 h-5 text-neon-blue" />
                    <h3 className="text-xl font-[family-name:var(--font-display)] tracking-tight">AI & FORWARD_INTELLIGENCE</h3>
                </div>
                <SkillHexGrid skills={profileData.ai_tools} />

                <div className="flex items-center gap-3 px-4 border-l-2 border-neon-green/50">
                    <Shield className="w-5 h-5 text-neon-green" />
                    <h3 className="text-xl font-[family-name:var(--font-display)] tracking-tight">SYSTEMS & ARCHITECTURE</h3>
                </div>
                <SkillHexGrid skills={[
                    ...profileData.skills.languages.map(l => ({ name: l, level: 90, category: 'Language' })),
                    ...profileData.skills.frameworks.map(f => ({ name: f, level: 85, category: 'Framework' })),
                    ...profileData.skills.tools.map(t => ({ name: t, level: 80, category: 'Tool' }))
                ]} color="var(--color-neon-green)" />
            </section>

            <div className="grid md:grid-cols-2 gap-12">
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
