import React from 'react';
import { motion } from 'framer-motion';
import { useCyberSound } from '@/hooks/use-cyber-sound';

interface Skill {
    name: string;
    level: number;
    category: string;
}

interface SkillHexGridProps {
    skills: Skill[];
    color?: string;
}

export const SkillHexGrid: React.FC<SkillHexGridProps> = ({
    skills,
    color = "var(--color-neon-blue)"
}) => {
    const { playSound } = useCyberSound();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
            {skills.map((skill, i) => (
                <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => playSound('hover')}
                    className="relative group cursor-pointer"
                >
                    {/* Hexagon Shape Container */}
                    <div className="aspect-square relative flex items-center justify-center p-4 overflow-hidden">
                        {/* Background Hexagon Wrapper */}
                        <div className="absolute inset-0 bg-white/5 clip-path-hexagon group-hover:bg-white/10 transition-all duration-300 border border-white/10 group-hover:border-neon-blue/50"></div>

                        {/* Active Progress Hexagon (Subtle Inner Glow) */}
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${skill.level}%` }}
                            className="absolute bottom-0 left-0 right-0 bg-neon-blue/20 pointer-events-none"
                            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                        ></motion.div>

                        <div className="relative z-10 text-center space-y-2">
                            <div className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">{skill.category}</div>
                            <div className="text-sm font-bold font-[family-name:var(--font-display)] text-white group-hover:text-neon-blue transition-colors leading-tight">
                                {skill.name}
                            </div>
                            <div className="h-0.5 w-12 mx-auto bg-white/10 relative overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1 }}
                                    className="absolute inset-y-0 left-0 bg-neon-blue"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Glitch Overlay on Hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute inset-0 bg-neon-blue/5 animate-glitch-sm"></div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};
