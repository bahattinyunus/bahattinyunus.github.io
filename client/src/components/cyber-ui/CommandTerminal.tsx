
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { Shield, Cpu, Terminal, Target, Radio, Search, ExternalLink, Activity, Lock, Unlock, User } from "lucide-react";
import { profileData } from "@/lib/data";
import { useVault } from "@/contexts/VaultContext";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export const CommandTerminal = () => {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [, setLocation] = useLocation();
    const { isSecureMode, toggleSecureMode } = useVault();
    const { playSound } = useCyberSound();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    const handleSystemCommand = (cmd: string) => {
        const normalized = cmd.toLowerCase().trim();
        if (normalized === "locks" || normalized === "secure") {
            toggleSecureMode();
            playSound('access');
            setOpen(false);
        } else if (normalized === "whoami") {
            // Potentially show a toast or custom notification
            playSound('click');
        } else if (normalized === "clear") {
            setInputValue("");
        }
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-[640px] bg-black/90 border border-neon-blue/50 shadow-[0_0_50px_rgba(0,243,255,0.2)] rounded-lg overflow-hidden backdrop-blur-xl z-[100] cyber-clip-both"
        >
            <div className="flex items-center border-b border-white/10 px-4 py-3">
                <Search className="w-5 h-5 text-neon-blue mr-3" />
                <Command.Input
                    autoFocus
                    value={inputValue}
                    onValueChange={(val) => {
                        setInputValue(val);
                        if (['locks', 'whoami', 'clear'].includes(val.toLowerCase())) {
                            // visual cue for system command
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSystemCommand(inputValue);
                    }}
                    placeholder="Type a command (locks, whoami, clear) or search..."
                    className="flex-1 bg-transparent text-white font-mono outline-none placeholder:text-white/30 text-lg"
                />
                <div className="flex items-center gap-1 text-xs font-mono text-white/40">
                    <span className="bg-white/10 px-2 py-1 rounded">ESC</span> to close
                </div>
            </div>

            <Command.List className="max-h-[400px] overflow-y-auto p-2 scrollbar-hide">
                <Command.Empty className="py-6 text-center text-white/50 font-mono">
                    No matching protocols found.
                </Command.Empty>

                <Command.Group heading="SYSTEM COMMANDS" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => runCommand(() => toggleSecureMode())}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        {isSecureMode ? <Unlock className="w-4 h-4 text-yellow-500" /> : <Lock className="w-4 h-4 text-neon-blue" />}
                        <span className="font-bold">{isSecureMode ? 'DEACTIVATE_SECURE_MODE' : 'INITIALIZE_SECURE_MODE'}</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Type 'locks'</kbd>
                    </Command.Item>
                    <Command.Item
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <User className="w-4 h-4 text-neon-green" />
                        <span className="font-bold">WHOAMI</span>
                        <kbd className="ml-auto text-[10px] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Type 'whoami'</kbd>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="NAVIGATION" className="text-[10px] font-mono text-white/20 mb-2 px-2 mt-4 uppercase tracking-widest">
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/"))}
                        className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Shield className="w-4 h-4 text-white/40" />
                        <span>MISSION_CONTROL</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/arsenal"))}
                        className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Cpu className="w-4 h-4 text-white/40" />
                        <span>ARSENAL</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/operations"))}
                        className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                    >
                        <Target className="w-4 h-4 text-white/40" />
                        <span>OPERATIONS</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="QUICK ASSETS" className="text-[10px] font-mono text-white/20 mb-2 px-2 mt-4 uppercase tracking-widest">
                    {profileData.featured_projects.slice(0, 3).map(project => (
                        <Command.Item
                            key={project.name}
                            onSelect={() => runCommand(() => setLocation(`/operations/${project.name.toLowerCase()}`))}
                            className="flex items-center gap-3 px-3 py-3 text-white/80 hover:bg-white/5 rounded cursor-pointer transition-colors data-[selected=true]:bg-white/5"
                        >
                            <Terminal className="w-4 h-4 text-neon-blue/30" />
                            <span>{project.name.toUpperCase()}</span>
                        </Command.Item>
                    ))}
                </Command.Group>
            </Command.List>

            <div className="border-t border-white/10 p-3 bg-black/50 text-[10px] font-mono text-white/30 flex justify-between px-4 items-center">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-neon-green" /> NODE_ONLINE</span>
                    <span>OS_V4.5.STRATO</span>
                </div>
                <div className="flex items-center gap-2">
                    <kbd className="bg-white/5 px-1 py-0.5 rounded">↑↓</kbd>
                    <kbd className="bg-white/5 px-1 py-0.5 rounded">ENTER</kbd>
                </div>
            </div>
        </Command.Dialog>
    );
};
