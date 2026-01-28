
'use client';

import { motion } from 'framer-motion';
import { Typewriter } from './Typewriter';

const facts = [
    {
        title: "Йога",
        content: "Занимаюсь более 6 лет. Для меня это не просто гибкость, а метод управления состоянием и фокусом.",
        tag: "Balance"
    },
    {
        title: "Кикбоксинг",
        content: "Ранее профессионально дрался на ринге. Спорт закалил характер и научил держать удар — как в жизни, так и в бизнесе.",
        tag: "Power"
    },
    {
        title: "Экспертиза",
        content: "Выпустил 1000+ учеников. Обучил своим авторским методам в маркетинге и AI.",
        tag: "Impact"
    },
    {
        title: "Вайбкодинг",
        content: "Основатель школы по вайбкодингу. Один из первых, кто внедрил этот подход в СНГ.",
        tag: "Innovation"
    },
    {
        title: "Чайные церемонии",
        content: "Организовываю и провожу церемонии в свое удовольствие. Это про замедление и глубину смыслов.",
        tag: "Tradition"
    },
    {
        title: "Психология",
        content: "Обучаюсь более 5 лет. Помогает строить продукты, которые реально резонируют с людьми.",
        tag: "Depth"
    }
];

export function Lifestyle() {
    return (
        <section className="w-full bg-black py-24 md:py-40 px-6 md:px-12 flex flex-col items-center overflow-hidden">
            <div className="max-w-[1400px] w-full flex flex-col gap-16 md:gap-32">

                {/* Section Title */}
                <div className="flex flex-col gap-6 border-b border-zinc-900 pb-12">
                    <h2 className="text-4xl md:text-6xl text-white font-semibold leading-tight">
                        <Typewriter text="BEYOND THE CODE" speed={0.05} />
                    </h2>
                    <p className="text-zinc-500 text-sm md:text-base max-w-2xl font-light leading-relaxed">
                        За каждой системой стоит личность. Мои интересы — это не просто хобби, а части единого механизма эффективности и смысла.
                    </p>
                </div>

                {/* Grid Structure */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Main Image (Bike) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:col-span-5 aspect-[4/5] relative bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900"
                    >
                        <img src="/bike.png" alt="Motorcycle life" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-8 left-8 text-white z-10">
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] mb-2 block text-white/50">Passion</span>
                            <h4 className="text-2xl font-medium">Bikes / Speed / Freedom</h4>
                        </div>
                    </motion.div>

                    {/* Right Side: Grid of Mini Blocks */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                        {/* Yoga Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <div className="aspect-video bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900">
                                <img src="/yoga.png" alt="Yoga practice" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest">{facts[0].tag}</span>
                                <h5 className="text-xl text-white font-medium">{facts[0].title}</h5>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed">{facts[0].content}</p>
                            </div>
                        </motion.div>

                        {/* Marketing/Strategy Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="aspect-video bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900">
                                <img src="/marketing.png" alt="Marketing Presentation" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest">{facts[2].tag}</span>
                                <h5 className="text-xl text-white font-medium">{facts[2].title}</h5>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed">{facts[2].content}</p>
                            </div>
                        </motion.div>

                        {/* Tea ceremony Block */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col gap-6"
                        >
                            <div className="aspect-video bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900">
                                <img src="/tea.png" alt="Tea ceremony" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-zinc-700 font-mono uppercase tracking-widest">{facts[4].tag}</span>
                                <h5 className="text-xl text-white font-medium">{facts[4].title}</h5>
                                <p className="text-zinc-500 text-sm font-light leading-relaxed">{facts[4].content}</p>
                            </div>
                        </motion.div>

                        {/* Value Quote Block */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 md:p-10 flex flex-col justify-between rounded-sm"
                        >
                            <div>
                                <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest mb-4 block">Personal Core</span>
                                <h3 className="text-2xl md:text-3xl text-black font-semibold leading-tight">
                                    "ЦЕНА СЛОВА: <br />СКАЗАЛ — СДЕЛАЛ!"
                                </h3>
                            </div>
                            <div className="h-1 w-12 bg-black mt-8" />
                        </motion.div>
                    </div>
                </div>

                {/* Secondary Visual Strip (Bottom Photos) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="aspect-square bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900"
                    >
                        <img src="/expert.png" alt="Dzhachvadze George speaking" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="aspect-square bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900"
                    >
                        <img src="/personal_1.png" alt="Dzhachvadze George" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="aspect-square bg-zinc-950 rounded-sm overflow-hidden border border-zinc-900"
                    >
                        <img src="/personal_2.png" alt="Dzhachvadze George education" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
