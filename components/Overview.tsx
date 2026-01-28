
'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

const services = [
    {
        id: 1,
        title: "Кастомная AI-разработка",
        desc: "Боты, платформы, приложения, сайты, парсеры и любые веб-ресурсы под ваши задачи."
    },
    {
        id: 2,
        title: "AI-автоматизация",
        desc: "Полная перестройка бизнес-процессов: от привлечения трафика до управления."
    },
    {
        id: 3,
        title: "Обучение вайбкодингу",
        desc: "Учу предпринимателей и команды управлять разработкой через нейросети."
    }
];

const steps = [
    { num: "01", title: "Исследование", items: ["CustDev", "AI-разведка", "Анализ конкурентов"] },
    { num: "02", title: "Экономика", items: ["Юнит-экономика", "Финмодель", "Моделирование"] },
    { num: "03", title: "Продукт", items: ["MVP", "HADI-циклы", "Гипотезы"] },
    { num: "04", title: "Маркетинг", items: ["Стратегия", "Каналы", "Трафик"] },
    { num: "05", title: "Продажи", items: ["Воронки", "Скрипты", "CRM"] },
    { num: "06", title: "Запуск & Рост", items: ["Операционка", "Команда", "Масштабирование"] }
];

export function Overview() {
    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-24 md:gap-32">

                {/* Intro Paragraph */}
                <div className="max-w-4xl text-left">
                    <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-zinc-400 font-light leading-relaxed">
                        <Typewriter
                            text="Создаю фундамент и системы, которые позволяют компаниям расти в эпоху AI. Мой фокус на ближайшие 2 года — архитектура, которая превращает идеи в прибыльные активы."
                            delay={0.2}
                            speed={0.02}
                        />
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group flex flex-col gap-6"
                        >
                            <div className="h-px w-full bg-zinc-800 group-hover:bg-white transition-colors duration-500" />
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Service 0{service.id}</span>
                                <h3 className="text-xl md:text-2xl text-white font-medium">
                                    <Typewriter text={service.title} delay={0.5 + i * 0.2} speed={0.05} />
                                </h3>
                            </div>
                            <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-base">
                                {service.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Business Architecture Cycle */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
                    <h2 className="text-3xl md:text-5xl text-white font-semibold flex items-center gap-4 leading-[1.2]">
                        <Typewriter text="ЦИКЛ АРХИТЕКТУРЫ" speed={0.05} />
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">Full Cycle Ecosystem</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="flex flex-col gap-3 relative"
                        >
                            <span className="text-2xl text-zinc-800 font-mono mb-1">
                                {step.num}
                            </span>
                            <h4 className="text-lg text-white font-mediumLeading-relaxed">{step.title}</h4>
                            <ul className="flex flex-wrap gap-x-3 gap-y-1">
                                {step.items.map((item, idx) => (
                                    <li key={idx} className="text-zinc-500 text-xs md:text-sm flex items-center gap-2">
                                        <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Subscription Logic / Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-zinc-950/50 border border-zinc-900 p-8 md:p-12 flex flex-col gap-8 rounded-xl"
                >
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl md:text-2xl text-white font-medium leading-tight">
                            <Typewriter text="AI-автоматизация «под ключ»" speed={0.05} />
                        </h3>
                        <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm md:text-base">
                            Мы не просто внедряем один инструмент. Мы поэтапно переводим каждый департамент
                            на рельсы AI. Это тиражированный продукт на уровне кастомной разработки.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-900 pt-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-white text-base font-medium">Бесконечный апгрейд</span>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                То, что сегодня автоматизировано частично, через 6 месяцев мы
                                переведем на 100% за счет новых моделей.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-white text-base font-medium">Модель партнерства</span>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                Подписка на стабильность и рост. Мы следим за миром AI и
                                сразу внедряем лучшие технологии в ваш контур.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
