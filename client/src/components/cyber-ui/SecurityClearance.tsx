
import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Shield, Lock, Unlock, Trophy } from 'lucide-react';
import { useCyberSound } from '@/hooks/use-cyber-sound';

interface ClearanceContextType {
    clearance: number;
    incrementClearance: (amount: number) => void;
    checkAccess: (required: number) => boolean;
}

const ClearanceContext = createContext<ClearanceContextType | undefined>(undefined);

export const ClearanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clearance, setClearance] = useState(1);
    const { playSound } = useCyberSound();

    useEffect(() => {
        const saved = localStorage.getItem('security_clearance');
        if (saved) setClearance(parseInt(saved));
    }, []);

    const incrementClearance = (amount: number) => {
        setClearance(prev => {
            const next = Math.min(prev + amount, 5);
            if (next > prev) {
                localStorage.setItem('security_clearance', next.toString());
                // Trigger notification or sound
            }
            return next;
        });
    };

    const checkAccess = (required: number) => clearance >= required;

    return (
        <ClearanceContext.Provider value={{ clearance, incrementClearance, checkAccess }}>
            {children}
            <ClearanceHUD level={clearance} />
        </ClearanceContext.Provider>
    );
};

export const useClearance = () => {
    const context = useContext(ClearanceContext);
    if (!context) throw new Error('useClearance must be used within ClearanceProvider');
    return context;
};

const ClearanceHUD = ({ level }: { level: number }) => {
    const [showPromo, setShowPromo] = useState(false);

    useEffect(() => {
        if (level > 1) {
            setShowPromo(true);
            const timer = setTimeout(() => setShowPromo(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [level]);

    return (
        <div className="fixed bottom-8 left-8 z-[90]">
            <AnimatePresence>
                {showPromo && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="mb-4 p-4 bg-neon-blue/10 border border-neon-blue/40 backdrop-blur-md cyber-clip-tl flex items-center gap-4"
                    >
                        <Trophy className="w-6 h-6 text-neon-blue animate-bounce" />
                        <div>
                            <div className="text-[10px] font-mono text-neon-blue uppercase">Clearance_Updated</div>
                            <div className="text-sm font-bold text-white uppercase tracking-widest">Level {level} Access Granted</div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="p-4 bg-black/60 border border-white/5 backdrop-blur-sm rounded-lg flex items-center gap-4 group">
                <div className="relative">
                    <Shield className={`w-8 h-8 ${level >= 3 ? 'text-neon-blue' : 'text-white/20'}`} />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{level}</span>
                </div>
                <div className="hidden lg:block space-y-1">
                    <div className="flex justify-between text-[8px] font-mono text-white/40">
                        <span>CLEARANCE_STATUS</span>
                        <span>{level}/5</span>
                    </div>
                    <div className="w-32 h-1 bg-white/5 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-neon-blue"
                            animate={{ width: `${(level / 5) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SecureLock = ({ level, children }: { level: number, children: React.ReactNode }) => {
    const { clearance } = useClearance();
    const isLocked = clearance < level;

    if (isLocked) {
        return (
            <div className="relative group grayscale cursor-not-allowed opacity-50">
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <Lock className="w-8 h-8 text-neon-blue/80 mb-2" />
                    <span className="text-[10px] font-mono text-neon-blue tracking-[0.2em]">LEVEL_{level}_REQUIRED</span>
                </div>
                {children}
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative"
        >
            <div className="absolute -top-2 -right-2 bg-neon-blue/20 p-1 rounded-full z-10">
                <Unlock className="w-3 h-3 text-neon-blue" />
            </div>
            {children}
        </motion.div>
    );
};
