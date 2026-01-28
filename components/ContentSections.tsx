
'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

const marketingCases = [
    {
        title: "Wildberries: 0 → 1,000,000₽",
        subtitle: "Масштабирование магазина за 30 дней",
        desc: "Построение воронки, работа с остатками и SEO-оптимизация карточек в условиях жесткой конкуренции.",
        metric: "1M+ Revenue"
    },
    {
        title: "CMO Skillbox Offline",
        subtitle: "Директор по маркетингу",
        desc: "Управление всей маркетинговой стратегией офлайн-направления одного из лидеров EdTech рынка.",
        metric: "Enterprise Scale"
    }
];

export function Marketing() {
    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-24">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
                    <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.2]">
                        <Typewriter text="МАРКЕТИНГ И РОСТ" speed={0.05} />
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">
                        Business Impact
                    </span>
                </div>

                <div className="flex flex-col gap-12">
                    {marketingCases.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group"
                        >
                            <div className="flex flex-col gap-4 max-w-2xl">
                                <span className="text-xs text-zinc-600 font-mono uppercase tracking-widest">{item.subtitle}</span>
                                <h3 className="text-2xl md:text-4xl text-white font-medium group-hover:text-zinc-300 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="text-4xl md:text-6xl text-white/10 font-black group-hover:text-white transition-colors duration-700 select-none">
                                {item.metric}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function Personality() {
    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-24">

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-12">
                    <h2 className="text-4xl md:text-6xl text-white font-semibold leading-[1.2]">
                        <Typewriter text="ЦЕННОСТИ И ЖИЗНЬ" speed={0.05} />
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">
                        Beyond the Code
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-lg text-white font-mono uppercase tracking-widest">Principles</h4>
                            <ul className="flex flex-col gap-6">
                                <li className="flex flex-col gap-2">
                                    <span className="text-white text-xl">Системы важнее запусков</span>
                                    <p className="text-zinc-500 text-sm font-light leading-relaxed">Любой результат должен быть повторяемым. Я строю механизмы, а не временные решения.</p>
                                </li>
                                <li className="flex flex-col gap-2">
                                    <span className="text-white text-xl">Скорость — это фича</span>
                                    <p className="text-zinc-500 text-sm font-light leading-relaxed">В AI-эру выигрывает не самый крупный, а самый быстрый. Мои архитектуры готовы к мгновенным изменениям.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-4">
                            <h4 className="text-lg text-white font-mono uppercase tracking-widest">Lifestyle</h4>
                            <div className="relative aspect-[4/3] bg-zinc-950 border border-zinc-900 overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                                <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-1">
                                    <span className="text-white text-xl font-medium">Motorcycle Adventure</span>
                                    <span className="text-zinc-500 text-xs font-mono uppercase">Freedom / Speed / Focus</span>
                                </div>
                                {/* Placeholder for moto photo - styled as a premium frame */}
                                <div className="w-full h-full flex items-center justify-center text-zinc-800 font-mono text-[10px] tracking-[0.5em] grayscale opacity-50 group-hover:opacity-100 transition-opacity">
                                    MOTO_CULTURE_FRAME
                                </div>
                            </div>
                            <p className="text-zinc-500 text-sm font-light leading-relaxed">
                                Мотоциклы — это не просто хобби, это метод тренировки фокуса и управления скоростью. Тот же принцип я переношу в разработку и бизнес.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
