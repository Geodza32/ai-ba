
'use client';
import { motion } from 'framer-motion';
import { SlideData } from '../data/slides';
import { LucideIcon } from 'lucide-react';
import { Visuals } from './Visuals';
import clsx from 'clsx';

interface SlideProps {
    data: SlideData;
}

export function Slide({ data }: SlideProps) {
    const Icon = data.icon as LucideIcon;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center">

            {/* Icon Badge */}
            {data.icon && (
                <motion.div
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: "spring" }}
                    className={clsx(
                        "mb-8 p-5 rounded-3xl bg-gradient-to-br shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 backdrop-blur-3xl",
                        data.accent || "from-gray-800 to-black"
                    )}
                >
                    <Icon className="w-10 h-10 md:w-14 md:h-14 text-white drop-shadow-lg" />
                </motion.div>
            )}

            {/* Typography */}
            <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 mb-6 tracking-tighter leading-tight max-w-5xl"
            >
                {data.title}
            </motion.h1>

            {data.subtitle && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm md:text-lg text-gray-300 font-medium tracking-wide uppercase backdrop-blur-md">
                        {data.subtitle}
                    </span>
                </motion.div>
            )}

            {/* Content Layouts */}
            {data.content && data.content.length > 0 && (
                <div className={clsx(
                    "w-full grid gap-4 max-w-6xl",
                    data.type === 'split' ? "grid-cols-1 lg:grid-cols-2 text-left items-stretch" :
                        data.type === 'list' ? "grid-cols-1 md:grid-cols-3 text-left items-stretch" :
                            "grid-cols-1 max-w-3xl"
                )}>
                    {/* Main List/Text */}
                    <div className={clsx("space-y-4", data.type === 'list' && "col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 space-y-0")}>
                        {data.content.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                                className={clsx(
                                    "p-6 md:p-8 rounded-3xl border border-white/10 bg-[#0A0A0A]/60 backdrop-blur-xl shadow-xl",
                                    "transition-all duration-300 group cursor-default"
                                )}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-1.5 h-1.5 mt-3 rounded-full bg-white/40 group-hover:bg-white group-hover:shadow-[0_0_10px_white] transition-all" />
                                    <p className="text-lg md:text-xl text-gray-300 group-hover:text-white leading-relaxed font-light transition-colors">
                                        {item}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Metrics Column for Split Layout */}
                    {data.type === 'split' && data.metrics && (
                        <div className="grid grid-cols-1 gap-4 h-full">
                            {data.metrics.map((m, idx) => (
                                <motion.div
                                    key={'metric-' + idx}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + idx * 0.1 }}
                                    whileHover={{ scale: 1.03 }}
                                    className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-center h-full backdrop-blur-lg relative overflow-hidden"
                                >
                                    <div className={clsx("absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br opacity-20 blur-3xl rounded-full", data.accent || "from-white to-transparent")} />
                                    <p className="text-xs text-white/50 uppercase tracking-[0.2em] mb-2 font-bold">{m.label}</p>
                                    <div className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tighter">{m.value}</div>
                                    {m.sub && <div className="text-lg text-gray-400 font-light">{m.sub}</div>}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
