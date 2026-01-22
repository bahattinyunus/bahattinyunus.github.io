
import { profileData } from "@/lib/data";
import { Radio, Mail, Linkedin, Github, MapPin, Send } from "lucide-react";
import React, { useState } from "react";

export default function Comms() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handlePing = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate sending
        setTimeout(() => setStatus('sent'), 1500);
    }

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <Radio className="w-8 h-8 text-neon-blue animate-pulse" />
                <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                    COMMS <span className="text-neon-blue">//</span> ESTABLISH UPLINK
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="p-6 bg-white/5 border border-white/10 border-l-4 border-l-neon-blue">
                        <h3 className="text-xl font-bold font-[family-name:var(--font-display)] mb-4 text-white">DIRECT CHANNELS</h3>
                        <div className="space-y-6">
                            <a href={profileData.personal.linkedin_url} target="_blank" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded transition-all">
                                <div className="w-10 h-10 bg-blue-900/30 flex items-center justify-center rounded border border-blue-500/30 group-hover:border-blue-400 group-hover:bg-blue-900/50 transition-all">
                                    <Linkedin className="w-5 h-5 text-blue-400" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white group-hover:text-blue-400">LINKEDIN</div>
                                    <div className="text-xs text-white/50 font-mono">Professional Network</div>
                                </div>
                            </a>

                            <a href={profileData.personal.github_url} target="_blank" className="flex items-center gap-4 group p-3 hover:bg-white/5 rounded transition-all">
                                <div className="w-10 h-10 bg-white/5 flex items-center justify-center rounded border border-white/10 group-hover:border-white/30 transition-all">
                                    <Github className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white group-hover:text-neon-blue">GITHUB</div>
                                    <div className="text-xs text-white/50 font-mono">Code Repositories</div>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-3 rounded">
                                <div className="w-10 h-10 bg-neon-green/10 flex items-center justify-center rounded border border-neon-green/30">
                                    <MapPin className="w-5 h-5 text-neon-green" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white font-mono">COORDINATES</div>
                                    <div className="text-xs text-white/50 font-mono">{profileData.personal.location}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="font-mono text-xs text-white/30 p-4 border border-white/5 bg-black">
                        <p>ENCRYPTION: AES-256</p>
                        <p>STATUS: SECURE</p>
                        <p>LATENCY: 12ms</p>
                    </div>
                </div>

                <div>
                    <form onSubmit={handlePing} className="space-y-4 bg-black/40 p-8 border border-white/10 cyber-clip-tl">
                        <h3 className="text-lg font-bold font-[family-name:var(--font-display)] mb-6 text-white">TRANSMIT MESSAGE</h3>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-blue">UID (NAME)</label>
                            <input type="text" className="w-full bg-black border border-white/20 p-3 text-white focus:border-neon-blue focus:outline-none font-mono text-sm" placeholder="Enter identification..." required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-blue">FREQUENCY (EMAIL)</label>
                            <input type="email" className="w-full bg-black border border-white/20 p-3 text-white focus:border-neon-blue focus:outline-none font-mono text-sm" placeholder="Enter return frequency..." required />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-blue">PAYLOAD (MESSAGE)</label>
                            <textarea className="w-full bg-black border border-white/20 p-3 text-white focus:border-neon-blue focus:outline-none font-mono text-sm h-32" placeholder="Enter encrypted data..." required />
                        </div>

                        <button
                            disabled={status === 'sending' || status === 'sent'}
                            className={`
                        w-full py-4 font-bold font-[family-name:var(--font-display)] tracking-widest flex items-center justify-center gap-2 transition-all
                        ${status === 'sent' ? 'bg-neon-green text-black' : 'bg-neon-blue text-black hover:bg-white hover:text-black'}
                    `}
                        >
                            {status === 'idle' && <>INITIATE UPLINK <Send className="w-4 h-4" /></>}
                            {status === 'sending' && <span className="animate-pulse">TRANSMITTING...</span>}
                            {status === 'sent' && <span>TRANSMISSION COMPLETE</span>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
