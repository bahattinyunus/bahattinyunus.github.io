import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Shield, Cpu, Zap, Activity } from 'lucide-react';

interface Project {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
    image: string;
}

interface ProjectModalProps {
    project: Project | null;
    onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-12 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl pointer-events-auto"
                    onClick={onClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl bg-cyber-gray border border-white/10 cyber-clip-both pointer-events-auto overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Scanning Line Effect */}
                    <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-50"></div>

                    {/* Project Image/Visual */}
                    <div className="w-full md:w-1/2 h-48 md:h-auto relative border-b md:border-b-0 md:border-r border-white/10">
                        <img src={project.image} alt={project.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-gray via-transparent to-transparent"></div>
                    </div>

                    {/* Project Content */}
                    <div className="flex-1 p-6 md:p-10 flex flex-col relative">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-white/40 hover:text-neon-blue transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 text-neon-blue font-mono text-xs mb-2 uppercase tracking-widest">
                                    <Shield className="w-3 h-3" /> Technical_Intel_Report
                                </div>
                                <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-white tracking-tighter">
                                    {project.name.toUpperCase()}
                                </h2>
                            </div>

                            <p className="text-white/60 font-mono text-sm leading-relaxed border-l-2 border-neon-blue/30 pl-4">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/5 space-y-1">
                                    <div className="text-[10px] font-mono text-white/30 uppercase flex items-center gap-1">
                                        <Cpu className="w-3 h-3" /> Base_Stack
                                    </div>
                                    <div className="text-neon-blue font-bold">{project.language}</div>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/5 space-y-1">
                                    <div className="text-[10px] font-mono text-white/30 uppercase flex items-center gap-1">
                                        <Activity className="w-3 h-3" /> Performance
                                    </div>
                                    <div className="text-neon-green font-bold">STABLE</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8 text-xs font-mono text-white/40 border-y border-white/10 py-4">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-neon-red" />
                                    <span>STAR_NODES: {project.stars}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-neon-red" />
                                    <span>FORK_NODES: {project.forks}</span>
                                </div>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-4">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 min-w-[200px] px-8 py-4 bg-neon-blue text-black font-bold font-[family-name:var(--font-display)] tracking-wider hover:bg-white transition-all flex items-center justify-center gap-2"
                                >
                                    ACCESS_REPOSITORY <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
