
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Shield, Info, X } from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';

export const VanguardAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [intel, setIntel] = useState<string | null>(null);
    const { playSound } = useCyberSound();

    const intelPills = [
        "SYSTEM_STABLE: All nodes reporting optimal throughput.",
        "THREAT_ANALYSIS: No active breaches detected in this sector.",
        "ENCRYPTION: AES-256-GCM active on all communication channels.",
        "OPTIMIZATION: Neural networks refined for sub-ms latency.",
        "STRATEGY: Focusing on modular kernel architectures for v5.0."
    ];

    useEffect(() => {
        if (isOpen) {
            setIntel(intelPills[Math.floor(Math.random() * intelPills.length)]);
        }
    }, [isOpen]);

    return (
        <div className="fixed bottom-24 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="absolute bottom-16 right-0 w-72 p-6 bg-black/90 border border-neon-blue/40 backdrop-blur-xl cyber-clip-br shadow-[0_0_30px_rgba(0,243,255,0.15)]"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-neon-blue">
                                <Sparkles className="w-4 h-4 animate-pulse" />
                                <span className="font-mono text-[10px] tracking-widest uppercase">Vanguard_Intel</span>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/30 hover:text-white">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <p className="font-mono text-xs text-white/80 leading-relaxed italic">
                                "{intel}"
                            </p>
                            <div className="h-px bg-white/10" />
                            <div className="flex justify-between items-center text-[8px] font-mono text-white/20">
                                <span>UID: VANGUARD_01</span>
                                <span>LATENCY: 4ms</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    setIsOpen(!isOpen);
                    playSound('access');
                }}
                className={`
                    w-12 h-12 rounded-full flex items-center justify-center relative group
                    ${isOpen ? 'bg-neon-blue text-black' : 'bg-black border border-neon-blue/50 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.2)]'}
                    transition-all duration-300
                `}
            >
                <Brain className={`w-6 h-6 ${isOpen ? '' : 'animate-pulse'}`} />

                {/* Orbital Rings */}
                <div className="absolute inset-0 border border-neon-blue/20 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute -inset-2 border border-neon-blue/10 rounded-full animate-[spin_12s_linear_infinite_reverse]" />

                {/* Ping Effect */}
                {!isOpen && (
                    <div className="absolute -inset-1 bg-neon-blue/20 rounded-full animate-ping opacity-50" />
                )}

                <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full border-2 border-black animate-pulse" />
            </motion.button>
        </div>
    );
};
