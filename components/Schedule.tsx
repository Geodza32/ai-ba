'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Typewriter } from './Typewriter';
import { scheduleBlocks, COURSE_START_DATE, type EventType } from '@/data/schedule';

/* ── colour config per event type ── */
const eventConfig: Record<EventType, { icon: string; label: string; color: string; bg: string }> = {
    call: { icon: '📞', label: 'Созвон', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    workshop: { icon: '🛠', label: 'Разбор', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    task: { icon: '📩', label: 'Задание', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
};

/* ── Countdown Timer ── */
function CountdownTimer() {
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-6"
            >
                <span className="text-2xl md:text-3xl font-semibold text-white">🚀 Обучение началось!</span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-5"
        >
            {units.map((u) => (
                <div key={u.label} className="flex flex-col items-center gap-1.5">
                    <div className="relative w-[72px] h-[72px] md:w-[90px] md:h-[90px] flex items-center justify-center rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden">
                        {/* glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent" />
                        <span className="relative text-2xl md:text-4xl font-mono font-semibold text-white tabular-nums">
                            {String(u.value).padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[10px] md:text-xs text-zinc-600 uppercase tracking-widest font-mono">
                        {u.label}
                    </span>
                </div>
            ))}
        </motion.div>
    );
}

/* ── Block accordion card ── */
function BlockCard({ block, index }: { block: typeof scheduleBlocks[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(index === 0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group border border-zinc-900 hover:border-zinc-700 transition-colors duration-500 rounded-sm overflow-hidden"
        >
            {/* Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center gap-4 md:gap-6 p-6 md:p-8 text-left cursor-pointer"
            >
                <span className="text-3xl md:text-5xl font-mono text-zinc-800 group-hover:text-zinc-600 transition-colors duration-500 shrink-0 w-16 md:w-20 text-right">
                    {String(block.id).padStart(2, '0')}
                </span>

                <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl text-white font-medium leading-tight truncate">
                        {block.title}
                    </h3>
                    <p className="text-zinc-600 text-xs md:text-sm mt-1">{block.subtitle}</p>
                </div>

                <div className="hidden md:flex items-center gap-2 shrink-0">
                    {block.events.map((ev, i) => {
                        const cfg = eventConfig[ev.type];
                        return (
                            <span key={i} className={`text-xs px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.color}`}>
                                {cfg.icon} {cfg.label}
                            </span>
                        );
                    })}
                </div>

                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-zinc-600 text-2xl shrink-0 leading-none"
                >
                    +
                </motion.span>
            </button>

            {/* Expandable content */}
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 md:px-8 pb-8 pt-2 flex flex-col gap-4">
                            {block.events.map((event, i) => {
                                const cfg = eventConfig[event.type];
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col md:flex-row gap-4 md:gap-8 bg-zinc-950/80 border border-zinc-900 rounded-sm p-5 md:p-6"
                                    >
                                        <div className="shrink-0 md:w-48 flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-mono">
                                                {event.date}
                                            </span>
                                            <span className={`text-sm font-medium ${cfg.color}`}>
                                                {cfg.icon} {event.time}
                                            </span>
                                        </div>

                                        <div className="flex-1 flex flex-col gap-3">
                                            <h4 className="text-white text-base font-medium">{event.title}</h4>
                                            {event.description && (
                                                <p className="text-zinc-400 text-sm font-light leading-relaxed">
                                                    {event.description}
                                                </p>
                                            )}
                                            {event.points && event.points.length > 0 && (
                                                <ul className="flex flex-col gap-1.5 pt-1">
                                                    {event.points.map((point, j) => (
                                                        <li key={j} className="text-zinc-500 text-sm flex items-start gap-2.5">
                                                            <span className="w-1 h-1 bg-zinc-700 rounded-full mt-1.5 shrink-0" />
                                                            {point}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/* ── Main section ── */
export function Schedule() {
    return (
        <section className="w-full bg-black py-24 md:py-40 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-16">

                {/* Header */}
                <div className="flex flex-col gap-6 border-b border-zinc-900 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <h2 className="text-4xl md:text-6xl text-white font-semibold leading-tight">
                            <Typewriter text="РАСПИСАНИЕ" speed={0.05} />
                        </h2>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">
                            16 поток • Старт 15 апреля
                        </span>
                    </div>
                    <div className="flex flex-wrap gap-6 text-zinc-500 text-sm font-light">
                        <span className="flex items-center gap-2">📞 Созвоны — ~2.5 часа</span>
                        <span className="flex items-center gap-2">🛠 Разборы — 1 час</span>
                        <span className="flex items-center gap-2">📩 Задания — в чат накануне</span>
                    </div>
                </div>

                {/* Countdown */}
                <div className="flex flex-col items-center gap-4">
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">
                        До старта осталось
                    </span>
                    <CountdownTimer />
                </div>

                {/* Blocks */}
                <div className="flex flex-col gap-3">
                    {scheduleBlocks.map((block, i) => (
                        <BlockCard key={block.id} block={block} index={i} />
                    ))}
                </div>

                {/* Individual sessions */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-white p-8 md:p-10 flex flex-col justify-between gap-6 rounded-sm"
                >
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono">
                            После 3 апреля
                        </span>
                        <h3 className="text-2xl md:text-3xl text-black font-semibold leading-tight">
                            🎓 Индивидуальные занятия
                        </h3>
                        <p className="text-zinc-600 text-sm md:text-base font-light leading-relaxed max-w-xl">
                            Личный разбор вашего проекта, докрутка логики и план монетизации. По согласованию.
                        </p>
                    </div>
                    <a
                        href="https://t.me/Geodza0"
                        target="_blank"
                        className="group flex items-center gap-4 text-black font-mono text-sm uppercase tracking-widest"
                    >
                        Записаться
                        <span className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
                            →
                        </span>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
