
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const CyberGlobe = () => {
    // Generate static nodes for the globe
    const nodes = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            lat: Math.random() * 180 - 90,
            lng: Math.random() * 360 - 180,
            size: Math.random() * 2 + 1,
            delay: Math.random() * 2
        }));
    }, []);

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center perspective-1000">
            {/* Globe Base Sphere */}
            <div className="absolute inset-0 rounded-full border border-neon-blue/20 bg-gradient-to-br from-neon-blue/5 to-black shadow-[inset_0_0_50px_rgba(0,243,255,0.1)]"></div>

            {/* Rotating Rings */}
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 preserve-3d"
            >
                {/* Horizontal Latitudes */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 border border-white/5 rounded-full"
                        style={{ transform: `rotateX(${i * 30}deg)` }}
                    ></div>
                ))}

                {/* Vertical Longitudes */}
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 border border-white/5 rounded-full"
                        style={{ transform: `rotateY(${i * 30}deg)` }}
                    ></div>
                ))}

                {/* Tactical Nodes */}
                {nodes.map((node) => (
                    <div
                        key={node.id}
                        className="absolute w-1 h-1 bg-neon-blue rounded-full shadow-[0_0_5px_rgba(0,243,255,0.8)]"
                        style={{
                            transform: `rotateY(${node.lng}deg) rotateX(${node.lat}deg) translateZ(120px)`
                        }}
                    >
                        <motion.div
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 2, repeat: Infinity, delay: node.delay }}
                            className="absolute -inset-1 bg-neon-blue/50 rounded-full"
                        />
                    </div>
                ))}
            </motion.div>

            {/* Core Pulse */}
            <motion.div
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-32 h-32 bg-neon-blue/20 rounded-full blur-2xl"
            />

            {/* Legend / Overlay */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center">
                <div className="text-[10px] font-mono text-neon-blue/40 tracking-[0.2em] uppercase whitespace-nowrap">
                    GLOBAL_LATENCY_MAP // 41.0082° N, 28.9784° E
                </div>
            </div>

            {/* Scanning Radar Clip */}
            <div className="absolute inset-0 rounded-full border-2 border-neon-blue/3 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ top: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-neon-blue/10 to-transparent blur-sm"
                />
            </div>
        </div>
    );
};
