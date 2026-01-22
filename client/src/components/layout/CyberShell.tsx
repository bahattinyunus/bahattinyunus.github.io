// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Cpu, Radio, Target, Terminal, Power } from "lucide-react";
import { CommandTerminal } from "../cyber-ui/CommandTerminal";
import { ForceField } from "../cyber-ui/ForceField";
import { useCyberSound } from "@/hooks/use-cyber-sound";

interface CyberShellProps {
    children: React.ReactNode;
}

export const CyberShell: React.FC<CyberShellProps> = ({ children }) => {
    const [location] = useLocation();
    const [time, setTime] = useState(new Date());
    const { playSound } = useCyberSound();

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const navItems = [
        { path: "/", label: "MISSION CONTROL", icon: Shield },
        { path: "/arsenal", label: "ARSENAL", icon: Cpu },
        { path: "/operations", label: "OPERATIONS", icon: Target },
        { path: "/comms", label: "COMMS", icon: Radio },
    ];

    return (
        <div className="min-h-screen bg-[var(--color-cyber-black)] text-foreground font-[family-name:var(--font-body)] overflow-hidden flex flex-col relative selection:bg-neon-blue selection:text-black">
            {/* Interactive Background */}
            <ForceField />

            {/* Background Effects */}
            <div className="fixed inset-0 bg-scanlines opacity-20 pointer-events-none z-50"></div>
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_90%)] pointer-events-none z-40"></div>

            {/* Command Palette */}
            <CommandTerminal />

            {/* Top HUD Bar */}
            <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/40 backdrop-blur-md z-30 relative">
                <div className="flex items-center gap-4">
                    <Terminal className="text-neon-blue w-6 h-6 animate-pulse" />
                    <h1 className="text-xl font-[family-name:var(--font-display)] tracking-[0.2em] text-neon-blue cursor-default" onMouseEnter={() => playSound('hover')}>
                        METAL YAKA <span className="text-white/50 text-sm">v4.5.STRATO</span>
                    </h1>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <div className="group flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10 hover:border-neon-green/50 transition-colors cursor-pointer" onClick={() => playSound('access')}>
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse"></div>
                        <span className="text-xs text-neon-green/80 font-mono group-hover:text-neon-green">SYSTEM: STABLE</span>
                    </div>

                    <div className="text-2xl font-[family-name:var(--font-display)] text-white/80">
                        {time.toLocaleTimeString([], { hour12: false })}
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative overflow-y-auto overflow-x-hidden scrollbar-hide">
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                    {/* Grid for depth */}
                    <div className="w-full h-full"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
                            backgroundSize: '100px 100px'
                        }}>
                    </div>
                </div>

                {/* Actual Content */}
                <div className="relative z-10 p-6 md:p-12 max-w-7xl mx-auto min-h-full flex flex-col">
                    {children}
                </div>
            </main>

            {/* Bottom HUD / Navigation */}
            <footer className="h-20 border-t border-white/10 bg-black/60 backdrop-blur-md z-30 relative px-6 flex items-center justify-between">
                <nav className="flex items-center gap-1 md:gap-4 overflow-x-auto w-full md:w-auto p-1">
                    {navItems.map((item) => {
                        const isActive = location === item.path;
                        const Icon = item.icon;
                        return (
                            <Link key={item.path} href={item.path}>
                                <a
                                    onClick={() => playSound('click')}
                                    onMouseEnter={() => playSound('hover')}
                                    className={`
                  relative px-6 py-2 flex items-center gap-3 font-[family-name:var(--font-display)] tracking-wider text-sm transition-all duration-300
                  ${isActive
                                            ? 'text-black bg-neon-blue clip-path-hexagon shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                                            : 'text-white/60 hover:text-neon-blue hover:bg-white/5'
                                        }
                `}>
                                    {isActive && (
                                        <span className="absolute left-0 bottom-0 top-0 w-1 bg-white/50 animate-pulse"></span>
                                    )}
                                    <Icon className="w-4 h-4" />
                                    {item.label}
                                </a>
                            </Link>
                        );
                    })}
                </nav>

                <div className="hidden md:flex flex-col items-end text-xs text-white/30 font-mono">
                    <div className="flex items-center gap-2 text-neon-blue/50">
                        <Power className="w-3 h-3" />
                        <span>CMD+K TO INITIATE TERMINAL</span>
                    </div>
                    <span>COORDINATES: 41.0082° N, 28.9784° E</span>
                </div>
            </footer>
        </div>
    );
};
