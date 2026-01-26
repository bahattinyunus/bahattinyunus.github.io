import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Activity, Lock, Cpu, Zap } from 'lucide-react';
import { useVault } from '@/contexts/VaultContext';

export const VaultShell: React.FC = () => {
    const { isSecureMode, metrics } = useVault();

    if (!isSecureMode) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] pointer-events-none"
            >
                {/* Scanning Lines Overlay */}
                <div className="absolute inset-0 bg-scanlines opacity-[0.15] mix-blend-overlay"></div>

                {/* Corner HUD Elements */}
                <div className="absolute top-20 left-6 space-y-4">
                    <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        className="bg-black/80 border-l-2 border-yellow-500 p-4 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4 text-yellow-500 animate-pulse" />
                            <span className="text-xs font-mono text-yellow-500 font-bold uppercase tracking-tighter">Secure Protocol v1.02</span>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between gap-8 text-[10px] font-mono">
                                <span className="text-white/40">THREAT_LEVEL:</span>
                                <span className="text-neon-green">{metrics?.threatLevel || 'CALCULATING...'}</span>
                            </div>
                            <div className="flex justify-between gap-8 text-[10px] font-mono">
                                <span className="text-white/40">ENCRYPTION:</span>
                                <span className="text-white/80">AES-256-GCM</span>
                            </div>
                            <div className="flex justify-between gap-8 text-[10px] font-mono">
                                <span className="text-white/40">SHIELD_STATUS:</span>
                                <span className="text-yellow-500">{metrics?.shieldStatus || '100%'}</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: -100 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-black/80 border-l-2 border-neon-blue p-4 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Activity className="w-4 h-4 text-neon-blue" />
                            <span className="text-xs font-mono text-neon-blue font-bold uppercase tracking-tighter">Core Metrics</span>
                        </div>
                        <div className="space-y-2">
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-white/40">
                                    <span>CPU_LOAD</span>
                                    <span>{metrics?.cpu}%</span>
                                </div>
                                <div className="h-1 bg-white/10 w-32 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-neon-blue"
                                        animate={{ width: `${metrics?.cpu}%` }}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-mono text-white/40">
                                    <span>RAM_USAGE</span>
                                    <span>{metrics?.memory}%</span>
                                </div>
                                <div className="h-1 bg-white/10 w-32 relative overflow-hidden">
                                    <motion.div
                                        className="absolute inset-y-0 left-0 bg-neon-green"
                                        animate={{ width: `${metrics?.memory}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right HUD Elements */}
                <div className="absolute top-20 right-6 space-y-4">
                    <motion.div
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        className="bg-black/80 border-r-2 border-neon-orange p-4 text-right backdrop-blur-md"
                    >
                        <div className="flex items-center justify-end gap-2 mb-2">
                            <span className="text-xs font-mono text-neon-orange font-bold uppercase tracking-tighter">Network Node</span>
                            <Lock className="w-4 h-4 text-neon-orange" />
                        </div>
                        <div className="space-y-1 text-[10px] font-mono">
                            <div className="text-white/40">ACTIVE_CONNECTIONS: <span className="text-white">{metrics?.activeConnections || 0}</span></div>
                            <div className="text-white/40">BANDWIDTH: <span className="text-white">{metrics?.bandwidth}</span></div>
                            <div className="text-white/40">LATENCY: <span className="text-white">{metrics?.latency}</span></div>
                        </div>
                    </motion.div>
                </div>

                {/* Center Frame */}
                <div className="absolute inset-10 border border-yellow-500/10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-yellow-500/40"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-500/40"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-yellow-500/40"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-yellow-500/40"></div>
                </div>

                {/* Vignette effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(234,179,8,0.05)_100%)]"></div>
            </motion.div>
        </AnimatePresence>
    );
};
