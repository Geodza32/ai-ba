'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

export function RutubeShort() {
    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center border-t border-zinc-900">
            <div className="max-w-[1400px] w-full flex flex-col md:flex-row items-center justify-between gap-16 md:gap-24">
                
                {/* Text Content Block */}
                <div className="flex-1 flex flex-col gap-8 md:gap-12 text-left">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                            AI-Product Short
                        </span>
                        <h2 className="text-3xl md:text-5xl text-white font-semibold leading-[1.2]">
                            <Typewriter text="ВОПЛОЩАЙ ИДЕИ" speed={0.05} />
                            <br />
                            <span className="text-zinc-500">ПРЯМО СЕЙЧАС</span>
                        </h2>
                    </div>

                    <p className="text-[clamp(1rem,2vw,1.25rem)] text-zinc-400 font-light leading-relaxed max-w-xl">
                        Посмотрите, как мы собираем полноценные IT-продукты без барьеров кодинга. Вы научитесь строить всё: от ботов до CRM, выводя агентов в любые каналы — Telegram, SMS, Voice, Dashboard.
                    </p>
                </div>

                {/* Vertical Video Block */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative flex-1 w-full flex justify-center md:justify-end"
                >
                    <div className="w-full max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_50px_rgba(255,255,255,0.02)] bg-zinc-950">
                        <iframe 
                            src="https://rutube.ru/play/embed/c377df0587cd26986bed70b7eaaf2bf7/" 
                            className="w-full h-full"
                            frameBorder="0" 
                            allow="autoplay; fullscreen"
                            title="Rutube Shorts Embedded"
                        ></iframe>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
