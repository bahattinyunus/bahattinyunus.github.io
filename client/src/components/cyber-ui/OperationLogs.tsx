import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOG_MESSAGES = [
    "UPLINK ESTABLISHED",
    "NEURAL SYNC 98%",
    "INTEGRITY CHECK PASSED",
    "FIREWALL: STANDBY",
    "PROTOCOL: METAL YAKA",
    "SCANNING SECTORS...",
    "DATA FLOW OPTIMIZED",
    "ENCRYPTION: AES-256",
    "KERNEL: STABLE",
    "MISSION_CONTROL: READY",
    "ANALYST_PROFILE: LOADED",
    "SUBSYSTEMS: ONLINE",
];

export const OperationLogs: React.FC = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomMsg = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
            setLogs(prev => [...prev.slice(-15), `${new Date().toLocaleTimeString()} > ${randomMsg}`]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    return (
        <div className="bg-black/40 border border-white/10 p-4 h-[200px] flex flex-col font-mono text-[10px] overflow-hidden group hover:border-neon-blue/40 transition-colors">
            <div className="flex items-center justify-between mb-2 text-neon-blue/60 border-b border-white/5 pb-1 uppercase tracking-widest text-[8px]">
                <span>Operation_Logs</span>
                <div className="flex gap-1">
                    <div className="w-1 h-1 bg-neon-blue animate-pulse"></div>
                    <div className="w-1 h-1 bg-neon-blue/40"></div>
                </div>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-1 scrollbar-hide py-2">
                <AnimatePresence mode="popLayout">
                    {logs.map((log, i) => (
                        <motion.div
                            key={log + i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/40 group-hover:text-white/60 transition-colors"
                        >
                            <span className="text-neon-blue/40 mr-2">_</span>
                            {log}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};
