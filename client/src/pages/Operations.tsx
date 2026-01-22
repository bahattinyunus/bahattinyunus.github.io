
// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { Target, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Operations() {
    const [filter, setFilter] = useState<string | null>(null);

    const categories = Object.keys(profileData.categories);

    const filteredProjects = filter
        ? profileData.featured_projects.filter(p => profileData.categories[filter as keyof typeof profileData.categories]?.includes(p.name))
        : profileData.featured_projects;

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <Target className="w-8 h-8 text-neon-green animate-pulse" />
                    <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                        OPERATIONS <span className="text-neon-green">//</span> PROJECT LOGS
                    </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => setFilter(null)}
                        className={`px-3 py-1 text-xs font-mono border ${filter === null ? 'border-neon-green text-neon-green bg-neon-green/10' : 'border-white/20 text-white/60 hover:border-white/40'} transition-all`}
                    >
                        ALL_SYSTEMS
                    </button>
                    {categories.slice(0, 5).map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1 text-xs font-mono border ${filter === cat ? 'border-neon-green text-neon-green bg-neon-green/10' : 'border-white/20 text-white/60 hover:border-white/40'} transition-all`}
                        >
                            {cat.toUpperCase().replace(/ /g, '_')}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative h-full"
                    >
                        {/* Cyber Card Container */}
                        <div className="h-full bg-black/40 border border-white/10 group-hover:border-neon-blue/50 group-hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300 flex flex-col cyber-clip-br">
                            <div className="relative h-48 overflow-hidden">
                                <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                <div className="absolute top-2 right-2 px-2 py-1 bg-black/80 border border-white/20 text-[10px] font-mono text-neon-blue backdrop-blur-sm">
                                    {project.language}
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-lg font-[family-name:var(--font-display)] font-bold mb-2 text-white group-hover:text-neon-blue transition-colors">
                                    {project.name}
                                </h3>
                                <p className="text-sm text-white/60 mb-6 flex-1 line-clamp-3 font-mono">
                                    {project.description}
                                </p>

                                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs font-mono">
                                    <div className="flex gap-3 text-white/40">
                                        <span>★ {project.stars}</span>
                                        <span>⑂ {project.forks}</span>
                                    </div>
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-neon-blue hover:text-white transition-colors"
                                    >
                                        SOURCE_LINK <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
