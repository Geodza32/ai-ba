
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from './Typewriter';

interface MediaMention {
    brand: string;
    title: string;
    link: string;
    type: string;
    isVideo?: boolean;
    canEmbed?: boolean;
    summary?: string;
    metrics?: string[];
    role?: string;
}

const mediaMentions: MediaMention[] = [
    {
        brand: "Skillbox Media",
        title: "«Я прошёл мясорубку»: как за год вырасти до директора по маркетингу",
        link: "https://skillbox.ru/media/marketing/story-georgiy-djachvadze-2/",
        type: "Personal Story",
        role: "Chief Marketing Officer",
        summary: "Масштабный материал о кейсе реактивного карьерного роста. История о том, как за 12 месяцев пройти путь от новичка до управления маркетинговой стратегией крупного офлайн-направления.",
        metrics: [
            "Рост до CMO за 1 год",
            "Антикризисное управление",
            "Построение системного маркетинга"
        ]
    },
    {
        brand: "БРИКС+ Форум",
        title: "Почётный спикер: Доклад об архитектуре AI в бизнесе",
        link: "https://rutube.ru/play/embed/0abab0fdceaac5374bdb785f80cd131f/",
        type: "Keynote Speech",
        isVideo: true
    },
    {
        brand: "ТНТ / Светлаков",
        title: "Вебинар: Обзор профессии и AI-технологий",
        link: "https://rutube.ru/play/embed/3d85d3a3770ae8c011685e432bb8de98?p=GtldX8qXIlQHveYquxQVoA",
        type: "Webinar",
        isVideo: true
    },
    {
        brand: "Skillbox Success",
        title: "11 дипломов не предел: история студента-маркетолога",
        link: "https://skillbox.ru/media/marketing/story-georgiy-djachvadze/",
        type: "Case Study",
        role: "Expert / Student",
        summary: "История о непрерывном обучении и о том, как академическая база из 11 профильных дипломов трансформируется в практическую экспертизу для бизнеса.",
        metrics: [
            "11+ дипломов по маркетингу",
            "Трансформация из студента в эксперта",
            "Deep Learning подход в карьере"
        ]
    },
    {
        brand: "Skillbox / Forbes",
        title: "Автор курса: Нейросети в маркетинге",
        link: "https://skillbox.ru/media/marketing/story-georgiy-djachvadze-2/",
        type: "Education",
        role: "Course Author / Expert",
        summary: "Разработка авторской программы обучения AI-инструментам для крупнейшей EdTech платформы. Кейс внедрения AI-технологий в реальный бизнес отмечен в Forbes.",
        metrics: [
            "Автор флагманского курса",
            "Кейс отмечен в Forbes",
            "Обучение 1000+ студентов"
        ]
    }
];

export function Media() {
    const [selectedItem, setSelectedItem] = useState<MediaMention | null>(null);

    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [selectedItem]);

    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-24">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
                    <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.2]">
                        <Typewriter text="МЕДИА И ВЫСТУПЛЕНИЯ" speed={0.05} />
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">
                        Authority & Expert Presence
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    {mediaMentions.map((mention, i) => (
                        <motion.div
                            key={mention.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <button
                                onClick={() => setSelectedItem(mention)}
                                className="w-full text-left group flex flex-col gap-4 border-l border-zinc-900 pl-8 hover:border-white transition-colors duration-500"
                            >
                                <div className="flex justify-between items-center w-full">
                                    <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                                        {mention.brand}
                                    </span>
                                    <span className="text-[9px] border border-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full font-mono uppercase">
                                        {mention.type}
                                    </span>
                                </div>
                                <h3 className="text-xl md:text-2xl text-white font-medium group-hover:text-zinc-300 transition-colors leading-tight">
                                    {mention.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] text-white font-mono uppercase">
                                        {mention.isVideo ? "Смотреть запись" : "Читать подробнее"}
                                    </span>
                                    <div className="h-px w-8 bg-white" />
                                </div>
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Premium Modal Layer */}
            <AnimatePresence>
                {selectedItem && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedItem(null)}
                            className="fixed inset-0 bg-black/98 backdrop-blur-xl z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: 10 }}
                            className="fixed inset-2 md:inset-12 z-[101] flex items-center justify-center pointer-events-none"
                        >
                            <div className="relative w-full max-w-7xl h-full bg-[#050505] border border-zinc-900 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.02)] flex flex-col pointer-events-auto">

                                {/* Top Control Bar */}
                                <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-20">
                                    <div className="flex items-center gap-4">
                                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                                        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em]">
                                            {selectedItem.isVideo ? "Video Broadcast" : "Expert Publication"}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedItem(null)}
                                        className="p-2 rounded-full hover:bg-zinc-900 text-zinc-400 hover:text-white transition-all duration-300"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                </div>

                                {/* Content Fluid Area */}
                                <div className="flex-1 overflow-y-auto bg-black scrollbar-hide">
                                    {selectedItem.isVideo ? (
                                        <div className="w-full h-full bg-black">
                                            <iframe
                                                src={selectedItem.link}
                                                className="w-full h-full"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ) : selectedItem.canEmbed ? (
                                        <iframe
                                            src={selectedItem.link}
                                            className="w-full h-full bg-white"
                                            frameBorder="0"
                                        ></iframe>
                                    ) : (
                                        <div className="w-full min-h-full flex flex-col md:flex-row">
                                            {/* Article Layout Side */}
                                            <div className="flex-1 p-8 md:p-20 flex flex-col gap-12 md:max-w-[65%] border-r border-zinc-900/50">

                                                <div className="flex flex-col gap-8">
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-[0.2em]">{selectedItem.brand}</span>
                                                        <h4 className="text-3xl md:text-5xl text-white font-medium leading-[1.15]">{selectedItem.title}</h4>
                                                    </div>

                                                    {selectedItem.role && (
                                                        <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/30 w-fit">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-white/50" />
                                                            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">{selectedItem.role}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-12">
                                                    <div className="flex flex-col gap-6">
                                                        <span className="text-[9px] text-zinc-700 font-mono uppercase tracking-[0.4em]">Context / Summary</span>
                                                        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed font-light">
                                                            «{selectedItem.summary}»
                                                        </p>
                                                    </div>

                                                    {selectedItem.metrics && (
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-zinc-900">
                                                            {selectedItem.metrics.map((m, i) => (
                                                                <div key={i} className="flex flex-col gap-3">
                                                                    <span className="text-white font-mono text-xs opacity-50">#0{i + 1}</span>
                                                                    <span className="text-lg md:text-xl text-zinc-400 font-light">{m}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-12 md:mt-auto pt-12">
                                                    <a
                                                        href={selectedItem.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/btn relative inline-flex items-center gap-6"
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mb-1">Verify Source</span>
                                                            <span className="text-xl text-white group-hover/btn:text-zinc-300 transition-colors uppercase tracking-tight font-medium underline underline-offset-8 decoration-zinc-800 group-hover/btn:decoration-white">
                                                                Читать оригинал на {selectedItem.brand.split(' ')[0]}
                                                            </span>
                                                        </div>
                                                        <div className="h-14 w-14 rounded-full border border-zinc-800 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black group-hover/btn:border-white transition-all duration-500 transform group-hover/btn:rotate-45">
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>

                                            {/* Brand Authority Side (Hidden on Mobile) */}
                                            <div className="hidden md:flex flex-1 bg-[#030303] items-center justify-center relative p-20">
                                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
                                                    <div className="whitespace-nowrap text-[30rem] font-bold text-white select-none rotate-[-15deg] translate-x-[-10%]">
                                                        TRUST
                                                    </div>
                                                </div>

                                                <div className="relative z-10 flex flex-col items-center gap-4">
                                                    <div className="h-px w-24 bg-white/20" />
                                                    <span className="text-[11px] text-zinc-500 font-mono uppercase tracking-[0.5em] text-center">
                                                        Expertise Validated <br /> by Market Leaders
                                                    </span>
                                                    <div className="h-px w-24 bg-white/20" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
