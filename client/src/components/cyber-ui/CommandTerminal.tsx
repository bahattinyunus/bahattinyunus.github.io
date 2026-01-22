
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useLocation } from "wouter";
import { Shield, Cpu, Terminal, Target, Radio, Search, ExternalLink } from "lucide-react";
import { profileData } from "@/lib/data";

export const CommandTerminal = () => {
    const [open, setOpen] = useState(false);
    const [, setLocation] = useLocation();

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
                    placeholder="Type a command or search..."
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

                <Command.Group heading="NAVIGATION" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-2">
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <Shield className="w-4 h-4 text-neon-blue group-hover:animate-pulse" />
                        <span className="font-bold">MISSION CONTROL</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/arsenal"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <Cpu className="w-4 h-4 text-neon-red group-hover:animate-pulse" />
                        <span className="font-bold">ARSENAL</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/operations"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <Target className="w-4 h-4 text-neon-green group-hover:animate-pulse" />
                        <span className="font-bold">OPERATIONS</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => setLocation("/comms"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-neon-blue/20 rounded cursor-pointer group transition-colors data-[selected=true]:bg-neon-blue/20"
                    >
                        <Radio className="w-4 h-4 text-yellow-500 group-hover:animate-pulse" />
                        <span className="font-bold">COMMS UPLINK</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="SYSTEM LINKS" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-4">
                    <Command.Item
                        onSelect={() => runCommand(() => window.open(profileData.personal.github_url, "_blank"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-white/10 rounded cursor-pointer group transition-colors data-[selected=true]:bg-white/10"
                    >
                        <div className="w-4 h-4 flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 text-white/50" />
                        </div>
                        <span>GitHub Repository</span>
                    </Command.Item>
                    <Command.Item
                        onSelect={() => runCommand(() => window.open(profileData.personal.linkedin_url, "_blank"))}
                        className="flex items-center gap-3 px-3 py-3 text-white hover:bg-white/10 rounded cursor-pointer group transition-colors data-[selected=true]:bg-white/10"
                    >
                        <div className="w-4 h-4 flex items-center justify-center">
                            <ExternalLink className="w-3 h-3 text-white/50" />
                        </div>
                        <span>LinkedIn Network</span>
                    </Command.Item>
                </Command.Group>

                <Command.Group heading="FEATURED OPERATIONS" className="text-xs font-mono text-neon-blue/70 mb-2 px-2 mt-4">
                    {profileData.featured_projects.slice(0, 5).map(project => (
                        <Command.Item
                            key={project.name}
                            onSelect={() => runCommand(() => window.open(project.url, "_blank"))}
                            className="flex items-center gap-3 px-3 py-3 text-white hover:bg-white/10 rounded cursor-pointer group transition-colors data-[selected=true]:bg-white/10"
                        >
                            <Terminal className="w-4 h-4 text-neon-green/50" />
                            <span>{project.name}</span>
                        </Command.Item>
                    ))}
                </Command.Group>
            </Command.List>

            <div className="border-t border-white/10 p-2 bg-black/50 text-[10px] font-mono text-white/30 flex justify-between px-4">
                <span>COMMAND LINE INTERFACE v2.4</span>
                <span>SECURE//ENCRYPTED</span>
            </div>
        </Command.Dialog>
    );
};
