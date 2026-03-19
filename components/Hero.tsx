'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Typewriter } from './Typewriter';
import { COURSE_START_DATE } from '@/data/schedule';
import Image from 'next/image';

/* ── Hero Countdown Timer ── */
function HeroTimer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const target = new Date(COURSE_START_DATE).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = Math.max(0, target - now);
            setTimeLeft({
                days: Math.floor(diff / 86_400_000),
                hours: Math.floor((diff % 86_400_000) / 3_600_000),
                minutes: Math.floor((diff % 3_600_000) / 60_000),
                seconds: Math.floor((diff % 60_000) / 1000),
            });
        };

        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    if (!mounted) return null;

    const units = [
        { value: timeLeft.days, label: 'дней' },
        { value: timeLeft.hours, label: 'часов' },
        { value: timeLeft.minutes, label: 'минут' },
        { value: timeLeft.seconds, label: 'секунд' },
    ];

    const total = timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds;
    if (total === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex items-center justify-start gap-3"
            >
                <span className="text-xl md:text-2xl font-semibold text-white">🚀 Обучение началось!</span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="mt-8 pt-6 border-t border-zinc-900 flex flex-col gap-4"
        >
            <span className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Старт 15 апреля
            </span>
            <div className="flex flex-wrap items-center gap-3">
                {units.map((u) => (
                    <div key={u.label} className="flex flex-col items-start gap-1">
                        <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                            <span className="relative text-2xl md:text-3xl font-mono font-semibold text-white tabular-nums">
                                {String(u.value).padStart(2, '0')}
                            </span>
                        </div>
                        <span className="text-[9px] md:text-[10px] text-zinc-600 uppercase tracking-widest font-mono pl-1">
                            {u.label}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

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
                    <Image
                        src="/george.jpg"
                        alt="George Dzhachvadze"
                        fill
                        priority
                        className="object-contain object-right grayscale opacity-75 md:opacity-85 mix-blend-screen brightness-150"
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
            <div className="relative z-10 max-w-[1400px] w-full flex flex-col gap-6 md:gap-8 text-left mt-20 md:mt-0">
                {/* Meta Size (Small) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium"
                >
                    Интенсивная программа
                </motion.div>

                {/* Heading Size (Large) */}
                <motion.div style={{ y: textY }} className="flex flex-col items-start translate-x-[-0.03em]">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(2.5rem,10vw,8rem)] text-white font-semibold flex flex-col md:flex-row md:items-baseline gap-4 leading-[1.1]"
                    >
                        <span>AI-ПРОДУКТ</span>
                    </motion.h1>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[clamp(2.5rem,8vw,6rem)] text-white font-semibold leading-[1.1]"
                    >
                        Архитектура Будущего
                    </motion.h1>
                </motion.div>

                {/* Subheading with AI Typewriter Cursor Animation */}
                <div className="max-w-3xl mt-2 flex flex-col gap-8">
                    <p className="text-[clamp(1rem,2vw,1.35rem)] text-zinc-400 font-light leading-relaxed">
                        <Typewriter
                            text="Вы научитесь воплощать любые идеи без барьеров сложного кодинга: от простых Telegram-ботов и умных агентов до полноценных Web-приложений, CRM-систем и автоворонок продаж. 16 практических уроков."
                            delay={1}
                            speed={0.02}
                        />
                    </p>
                    
                    {/* Hero Countdown Timer */}
                    <HeroTimer />
                </div>
            </div>

            {/* Grain Overlay */}
            <div className="noise-bg" />
        </section>
    );
}
