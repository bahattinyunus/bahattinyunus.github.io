
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BootSequence = ({ onComplete }: { onComplete: () => void }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [phase, setPhase] = useState<'booting' | 'unlocking' | 'complete'>('booting');

    const bootLogs = [
        "BOOTING_SEQ: 0x7FF8A90",
        "KERNEL_INITIALIZING...",
        "NEURAL_MAP_V4_LOADED",
        "CHECKING_QUANTUM_STABILITY: [OK]",
        "ESTABLISHING_SECURE_UPLINK...",
        "DECRYPTING_OPERATOR_MANIFEST...",
        "ACCESS_GRANTED: 127.0.0.1",
        "INITIALIZING_VORTEX_ENGINE...",
        "READY_FOR_COMMAND."
    ];

    useEffect(() => {
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < bootLogs.length) {
                setLines(prev => [...prev, bootLogs[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
                setTimeout(() => setPhase('unlocking'), 1000);
                setTimeout(onComplete, 2500);
            }
        }, 150);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center p-6 font-mono overflow-hidden"
            >
                <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>

                <div className="max-w-2xl w-full space-y-2">
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`text-sm ${line.includes('[OK]') ? 'text-neon-green' : line.includes('READY') ? 'text-neon-blue font-bold' : 'text-white/60'}`}
                        >
                            <span className="text-neon-blue mr-2">{">"}</span> {line}
                        </motion.div>
                    ))}

                    {phase === 'booting' && (
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="bg-neon-blue w-2 h-4 inline-block align-middle ml-1"
                        />
                    )}
                </div>

                {phase === 'unlocking' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-12 text-center"
                    >
                        <div className="text-4xl font-[family-name:var(--font-display)] text-white tracking-[0.5em] animate-pulse">
                            STRATO_OS
                        </div>
                        <div className="mt-2 text-[10px] text-white/20 tracking-[1em]">
                            SYSTEM_VERIFIED_V4.5
                        </div>
                    </motion.div>
                )}

                {/* Cyber Decorative Corners */}
                <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/5"></div>
                <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-white/5"></div>
                <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-white/5"></div>
                <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/5"></div>
            </motion.div>
        </AnimatePresence>
    );
};
