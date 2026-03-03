
import { motion } from "framer-motion";
import { GitBranch, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { profileData } from "@/lib/data";

export const MissionLogs = () => {
    const missions = [
        { id: 1, title: "ANKA-LLM Core Optimization", type: "COMPLETED", date: "2026-03-01", branch: "main", status: "success" },
        { id: 2, title: "BeeRoute Kernel Distribution", type: "DEPLOYED", date: "2026-02-25", branch: "dev/opt-1", status: "success" },
        { id: 3, title: "Quantum-Edge Security Audit", type: "IN_PROGRESS", date: "2026-02-20", branch: "feat/crypto", status: "pending" },
        { id: 4, title: "PoseidonEye Sensor Fusion", type: "COMPLETED", date: "2026-02-15", branch: "main", status: "success" },
    ];

    return (
        <section className="mt-12 space-y-6">
            <h3 className="text-xl font-[family-name:var(--font-display)] flex items-center gap-2 text-white">
                <Clock className="w-5 h-5 text-neon-blue" /> RECENT_MISSIONS // LOG_FILE
            </h3>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                {missions.map((mission, i) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                    >
                        {/* Dot */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 ${mission.status === 'success' ? 'border-neon-green/30 text-neon-green' : 'border-neon-blue/30 text-neon-blue'}`}>
                            {mission.status === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5 animate-pulse" />}
                        </div>

                        {/* Content */}
                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 bg-white/5 border border-white/10 cyber-clip-br hover:bg-white/10 transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <time className="font-mono text-[10px] text-white/40">{mission.date}</time>
                                <div className="flex items-center gap-1 text-[8px] font-mono text-neon-blue/60 group-hover:text-neon-blue transition-colors">
                                    <GitBranch className="w-3 h-3" /> {mission.branch.toUpperCase()}
                                </div>
                            </div>
                            <div className="text-[10px] font-mono text-neon-green/60 mb-1">{mission.type}</div>
                            <h4 className="font-bold text-white tracking-wide">{mission.title}</h4>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
