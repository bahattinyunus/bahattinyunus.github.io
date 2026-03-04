import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedY: number;
    opacity: number;
    color: string;
}

export const DataStreamBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        const particleCount = 100;

        const colors = [
            'rgba(0, 240, 255, ', // Bioluminescence Blue
            'rgba(255, 77, 77, ',  // Bright Coral
            'rgba(255, 255, 255, ' // White sparks
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(createParticle());
            }
        };

        const createParticle = (): Particle => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedY: Math.random() * 1 + 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)]
        });

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw a subtle trail effect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.opacity})`;

                // Add a glow effect
                ctx.shadowBlur = 10;
                ctx.shadowColor = `${p.color}0.5)`;

                ctx.fill();

                // Update position
                p.y += p.speedY;

                // Organic horizontal drift
                p.x += Math.sin(p.y / 50) * 0.5;

                // Reset particle if it leaves screen
                if (p.y > canvas.height) {
                    p.y = -10;
                    p.x = Math.random() * canvas.width;
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', resize);
        resize();
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none opacity-30"
            style={{ mixBlendMode: 'screen' }}
        />
    );
};
