
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from './Typewriter';
import { cases, Category, Case } from '../data/cases';

const categories: { label: string; value: Category }[] = [
    { label: 'Все проекты', value: 'all' },
    { label: 'AI Боты', value: 'bots' },
    { label: 'SaaS / Стартапы', value: 'saas' },
    { label: 'Автоматизация', value: 'automation' },
    { label: 'Маркетинг', value: 'marketing' },
];

export function Cases() {
    const [activeTab, setActiveTab] = useState<Category>('all');
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);

    const filteredCases = activeTab === 'all'
        ? cases
        : cases.filter(c => c.category === activeTab);

    // Lock scroll when modal is open
    useEffect(() => {
        if (selectedCase) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedCase]);

    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center overflow-hidden">
            <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-24">

                {/* Section Header */}
                <div className="flex flex-col gap-8 border-b border-zinc-900 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.2]">
                            <Typewriter text="АРХИВ ПРОЕКТОВ" speed={0.05} />
                        </h2>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">
                            100+ CASES / 2017-2026
                        </span>
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap gap-2 md:gap-4 mt-4">
                        {categories.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setActiveTab(cat.value)}
                                className={`px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest transition-all duration-300 rounded-sm border ${activeTab === cat.value
                                        ? 'bg-white text-black border-white'
                                        : 'text-zinc-500 border-zinc-800 hover:border-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Cases Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredCases.map((item) => (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                onClick={() => setSelectedCase(item)}
                                className="group relative bg-zinc-950/40 border border-zinc-900 p-6 flex flex-col gap-4 hover:border-zinc-700 transition-colors duration-500 rounded-sm cursor-pointer"
                            >
                                {/* Subtle Glow Effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex justify-between items-start relative z-10">
                                    <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                                        ID-{item.id.padStart(3, '0')}
                                    </span>
                                    {item.metrics && (
                                        <span className="text-[10px] bg-white/5 text-zinc-300 px-2 py-1 rounded-full font-mono">
                                            {item.metrics}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg text-white font-medium group-hover:text-zinc-200 transition-colors relative z-10">
                                    {item.title}
                                </h3>

                                <p className="text-zinc-500 text-xs md:text-sm leading-relaxed font-light line-clamp-3 relative z-10">
                                    {item.desc}
                                </p>

                                <div className="mt-auto flex flex-wrap gap-2 relative z-10">
                                    {item.tags.map((tag) => (
                                        <span key={tag} className="text-[9px] text-zinc-700 font-mono uppercase">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedCase && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedCase(null)}
                            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="fixed inset-6 md:inset-12 lg:inset-24 bg-zinc-950 border border-zinc-900 z-[101] overflow-hidden flex flex-col md:flex-row rounded-xl shadow-2xl"
                        >
                            {/* Video / Media Side */}
                            <div className="w-full md:w-[60%] lg:w-[65%] bg-black h-[300px] md:h-full relative overflow-hidden flex items-center justify-center">
                                {selectedCase.videoUrl ? (
                                    <iframe
                                        src={selectedCase.videoUrl}
                                        className="w-full h-full"
                                        frameBorder="0"
                                        allow="clipboard-write; autoplay"
                                        webkitallowfullscreen
                                        mozallowfullscreen
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <div className="text-zinc-800 font-mono text-xs tracking-widest uppercase">
                                        Demo video coming soon
                                    </div>
                                )}

                                <button
                                    onClick={() => setSelectedCase(null)}
                                    className="absolute top-6 left-6 md:hidden z-20 bg-black/50 p-2 rounded-full border border-white/20 text-white"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col gap-8 overflow-y-auto bg-zinc-950">
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                                            {selectedCase.category}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl text-white font-semibold leading-tight">
                                            {selectedCase.title}
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setSelectedCase(null)}
                                        className="hidden md:flex text-zinc-500 hover:text-white transition-colors"
                                    >
                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-6 max-w-xl">
                                    {selectedCase.metrics && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Impact</span>
                                            <div className="text-2xl text-white font-medium">{selectedCase.metrics}</div>
                                        </div>
                                    )}

                                    <div className="h-px w-12 bg-zinc-800" />

                                    <div className="flex flex-col gap-4">
                                        <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-light">
                                            {selectedCase.fullDesc || selectedCase.desc}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {selectedCase.tags.map((tag) => (
                                            <span key={tag} className="text-[10px] text-zinc-500 border border-zinc-900 px-3 py-1 rounded-sm font-mono uppercase tracking-wider">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
