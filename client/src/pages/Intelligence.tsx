// @ts-nocheck
import { profileData } from "@/lib/data";
import { motion } from "framer-motion";
import { Book, Calendar, ExternalLink, Brain, FileText, Search, SortAsc } from "lucide-react";
import { useState } from "react";
import { useCyberSound } from "@/hooks/use-cyber-sound";

export default function Intelligence() {
    const [searchTerm, setSearchTerm] = useState("");
    const { playSound } = useCyberSound();

    const filteredPosts = profileData.blog_posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                    <Brain className="w-8 h-8 text-yellow-500 animate-pulse" />
                    <h2 className="text-3xl font-[family-name:var(--font-display)] tracking-wider">
                        INTELLIGENCE <span className="text-yellow-500">//</span> KNOWLEDGE BASE
                    </h2>
                </div>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-yellow-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="SEARCH_DB..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-black/40 border border-white/20 pl-10 pr-4 py-2 text-sm font-mono text-white focus:outline-none focus:border-yellow-500 w-full md:w-64 transition-all"
                    />
                </div>
            </div>

            <div className="space-y-4">
                {filteredPosts.map((post, i) => (
                    <motion.a
                        key={i}
                        href={post.url}
                        target="_blank"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onMouseEnter={() => playSound('hover')}
                        onClick={() => playSound('click')}
                        className="block group"
                    >
                        <div className="relative p-6 bg-white/5 border border-white/10 hover:bg-yellow-500/5 hover:border-yellow-500/50 transition-all duration-300 md:flex items-start gap-6 cyber-clip-br">
                            <div className="hidden md:block w-32 shrink-0">
                                <div className="w-full h-24 overflow-hidden border border-white/10 group-hover:border-yellow-500/30">
                                    <img src={post.image} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                </div>
                            </div>

                            <div className="flex-1 space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/40 mb-1">
                                    <span className="flex items-center gap-1 group-hover:text-yellow-500 transition-colors">
                                        <Calendar className="w-3 h-3" /> {post.date.toUpperCase()}
                                    </span>
                                    <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity text-yellow-500">
                                        ACCESS_FILE <ExternalLink className="w-3 h-3" />
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-white group-hover:text-yellow-500 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-sm font-mono text-white/60 line-clamp-2">
                                    {post.summary}
                                </p>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-2 h-2 bg-yellow-500 animate-pulse"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-yellow-500 group-hover:w-full transition-all duration-700"></div>
                        </div>
                    </motion.a>
                ))}

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded">
                        <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
                        <p className="font-mono text-white/40">NO RECORDS FOUND IN DATABASE.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
