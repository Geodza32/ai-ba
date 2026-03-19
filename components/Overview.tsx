
'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

const services = [
    {
        id: 1,
        title: "AI-продукты & Web-разработка",
        desc: "Сайты, порталы, MVP-сервисы и Landing-страницы, полностью собранные через ИИ-агентов."
    },
    {
        id: 2,
        title: "Внутренние системы (CRM/ERP)",
        desc: "Автоматизация отчетности, сборки презентаций, базы данных (RAG) и аналитические дашборды."
    },
    {
        id: 3,
        title: "Автоворонки и Умные Агенты",
        desc: "Сбор данных (OSINT), ИИ-боты для продаж в Telegram, генерация лидов и омниканальность."
    }
];

const steps = [
    { num: "01", title: "Фундамент", items: ["Цикл разработки", "Архитектура", "ТЗ агентам"] },
    { num: "02", title: "Сборка (Build)", items: ["Claude Code", "MCP", "Написание логики"] },
    { num: "03", title: "AI-Сотрудники", items: ["Телеграм-боты", "Голосовые ИИ", "Self-Healing код"] },
    { num: "04", title: "Аналитика", items: ["OSINT", "Python Скрипты", "Парсеры"] },
    { num: "05", title: "Тестирование", items: ["Unit/e2e тесты", "AI-Аудит безопасности", "Git"] },
    { num: "06", title: "Enterprise", items: ["CI/CD Деплой", "Docker", "Масштабирование"] }
];

export function Overview() {
    return (
        <section className="w-full bg-black py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
            <div className="max-w-[1400px] w-full flex flex-col gap-24 md:gap-32">

                {/* Intro Paragraph */}
                <div className="max-w-4xl text-left">
                    <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] text-zinc-400 font-light leading-relaxed">
                        <Typewriter
                            text="Я учу людей воплощать любые идеи без барьеров сложного кодинга. Вы научитесь строить всё: от простых ботов до полноценных Web-приложений, CRM-систем, инструментов онлайн-разведки (OSINT) и автоворонок."
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
                                <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Ability 0{service.id}</span>
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
                        <Typewriter text="ЦИКЛ РАЗРАБОТКИ" speed={0.05} />
                    </h2>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.3em] mb-2">Development Cycle</span>
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
                            <h4 className="text-lg text-white font-medium leading-relaxed">{step.title}</h4>
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
                            <Typewriter text="От идеи до Production за 16 уроков" speed={0.05} />
                        </h3>
                        <p className="text-zinc-400 max-w-2xl leading-relaxed text-sm md:text-base">
                            Мы изучаем полный цикл разработки. К пятому занятию вы уже создадите десяток миницифровых продуктов: от парсеров конкурентов до полноценных AI-менеджеров по продажам в вашем Telegram.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-900 pt-8">
                        <div className="flex flex-col gap-2">
                            <span className="text-white text-base font-medium">Бесконечные возможности</span>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                Любой бизнес-запрос: CRM, SMS, дашборды, OSINT-разведка — вы не пишите код сами, вы делегируете архитектуру автономным агентам.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-white text-base font-medium">Монетизация & Enterprise</span>
                            <p className="text-zinc-500 text-xs md:text-sm leading-relaxed">
                                Подготавливаем решения для любых нагрузок. Docker, CI/CD деплой, Serverless — всё, чтобы ваш стартап или заказчик получили стабильный сервис.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
