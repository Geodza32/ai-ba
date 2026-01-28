
'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

const marketingCases = [
    {
        title: "AI Dubbing Global",
        subtitle: "Глобальная экспансия блогеров",
        desc: "Клонирование голоса и мимики. Автоматический перевод контента на 10+ языков с полным сохранением интонаций.",
        metric: "Global Reach"
    },
    {
        title: "Wildberries: 0 → 1,000,000₽",
        subtitle: "Масштабирование магазина",
        desc: "Построение воронки, работа с остатками и SEO-оптимизация карточек в условиях жесткой конкуренции.",
        metric: "1M+ Revenue"
    },
    {
        title: "Reels-конвейер",
        subtitle: "Автоматизация контента",
        desc: "Создание цифрового двойника эксперта. Поиск виральных сценариев и автопостинг в 6 соцсетей ежедневно.",
        metric: "1000+ Videos"
    },
    {
        title: "CMO Skillbox Offline",
        subtitle: "Директор по маркетингу",
        desc: "Управление маркетинговой стратегией офлайн-направления. Кейс отмечен в Forbes.",
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
