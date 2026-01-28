
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Typewriter } from './Typewriter';

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax logic for that 2M vibe
    const personY = useTransform(scrollY, [0, 500], [0, 100]);
    const textY = useTransform(scrollY, [0, 500], [0, -50]);

    return (
        <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden px-6 md:px-12">

            {/* Background Image Layer (Refined for Mobile) */}
            <motion.div
                style={{ y: personY }}
                className="absolute right-0 top-0 h-full w-full md:w-[60%] pointer-events-none select-none z-0"
            >
                <div className="relative w-full h-full">
                    {/* The Image: Grayscale + Masked + Even Brighter */}
                    <img
                        src="/george.jpg"
                        alt=""
                        className="w-full h-full object-contain object-right grayscale opacity-75 md:opacity-85 mix-blend-screen brightness-150"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 95%)',
                            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 95%)'
                        }}
                    />
                    {/* Overlay to ensure edge blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
                </div>
            </motion.div>

            {/* Content Layer */}
            <div className="relative z-10 max-w-[1400px] w-full flex flex-col gap-8 md:gap-12 text-left">
                {/* Meta Size (Small) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium"
                >
                    George Dzhachvadze • 2026
                </motion.div>

                {/* Heading Size (Large) */}
                <motion.div style={{ y: textY }} className="flex flex-col items-start translate-x-[-0.03em]">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(2.5rem,15vw,10rem)] text-white font-semibold flex flex-col md:flex-row md:items-baseline gap-4"
                    >
                        <span>AI БИЗНЕС</span>
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(2.5rem,15vw,10rem)] text-white font-semibold leading-[1.1]"
                    >
                        АРХИТЕКТОР
                    </motion.h1>
                </motion.div>

                {/* Subheading with AI Typewriter Cursor Animation */}
                <div className="max-w-3xl mt-2">
                    <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-zinc-400 font-light leading-relaxed">
                        <Typewriter
                            text="Строю цифровые продукты и превращаю их в прибыльные бизнесы. Работаю за долю с теми, кто готов расти."
                            delay={1}
                            speed={0.03}
                        />
                    </p>
                </div>
            </div>

            {/* Grain Overlay */}
            <div className="noise-bg" />
        </section>
    );
}
