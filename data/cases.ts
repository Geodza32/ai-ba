
export type Category = 'all' | 'bots' | 'saas' | 'automation' | 'marketing';

export interface MediaItem {
    type: 'video' | 'image';
    url: string;
    label?: string;
}

export interface Case {
    id: string;
    title: string;
    category: Category;
    desc: string;
    fullDesc?: string;
    metrics?: string;
    tags: string[];
    videoUrl?: string;
    media?: MediaItem[];
}

export const cases: Case[] = [
    {
        id: '1',
        title: "ИИ Звонарь",
        category: 'bots',
        desc: "Автоматические звонки клиентам с использованием ИИ. Разговор по скрипту, отработка возражений.",
        fullDesc: "Голосовой ИИ-Менеджер Продаж. Сам звонит клиентам, разговаривает по скрипту, активно слушает и адаптируется. Знает продукты и доносит ценность, отрабатывает возражения и заводит карточку в CRM.",
        videoUrl: "https://rutube.ru/play/embed/095b29692d0702ca840116906cfdfccf?p=W2t0MDQNikmZHVQb4q5LeQ",
        tags: ["FastAPI", "Twilio", "GPT-4"]
    },
    {
        id: '2',
        title: "ИИ-Аудиогид",
        category: 'bots',
        desc: "Анализ фото объекта и генерация истории голосом прямо в Telegram.",
        fullDesc: "Наводишь камеру → ИИ рассказывает историю объекта голосом. Шаги: фото → определение → поиск фактов → озвучка. Персональный гид в кармане.",
        videoUrl: "https://rutube.ru/play/embed/79674d4ed1b67a5f489ee4d745469868?p=_zjl4TLe3GkTPYFRl-rSIw",
        tags: ["Vision AI", "TTS", "Telegram"]
    },
    {
        id: '3',
        title: "AI-Калькулятор сделок",
        category: 'automation',
        desc: "Замена Excel на бота для брокеров. Расчет выгоды за 2 минуты вместо 27.",
        fullDesc: "Решение боли брокеров: опечатки и долгие расчеты. Python-ядро считает типы сделок, комиссии и курсы за 2 минуты. Ранжирование по прибыльности и автоотчеты.",
        metrics: "-92% времени",
        videoUrl: "https://rutube.ru/play/embed/42b70ddf1729037448306d6bcbabad57?p=_AXg3JVYZ_9yPma62rPQWQ",
        tags: ["Python", "FinTech"]
    },
    {
        id: '4',
        title: "Лидогенерация через чаты",
        category: 'marketing',
        desc: "Парсеры, которые находят горячих клиентов в Telegram-чатах раньше конкурентов.",
        fullDesc: "Мониторинг живых сигналов в группах (банкротство, ремонт, логистика). Моментальная передача юристу/мастеру и генерация мягкого ответа через AI.",
        videoUrl: "https://rutube.ru/play/embed/880b4d73ad6703c638f66c9432c29631?p=o0FzHYT4tOENqm8Tmn3zzg",
        tags: ["Parsing", "LeadGen"]
    },
    {
        id: '5',
        title: "iCore AI",
        category: 'saas',
        desc: "ИИ-нутрициолог: распознавание еды по фото, эмпатичные советы, автопилот питания.",
        fullDesc: "Vision AI распознает ингредиенты за 3 секунды. Empathy Engine поддерживает при срывах, а Армия Агентов (Бюджетный, Научный) оптимизирует рацион.",
        videoUrl: "https://rutube.ru/play/embed/339856f30a9600edd1c8bd3e1def76f6?p=tkXrwmncdZ1NTcu6jAzePg",
        tags: ["HealthTech", "Vision AI"]
    },
    {
        id: '6',
        title: "BioGenius (ЕГЭ)",
        category: 'saas',
        desc: "ИИ-репетитор для ЕГЭ. Инженерная архитектура, ведущая ученика по шагам.",
        fullDesc: "API-First архитектура. Система ведет по сложным задачам генетики и биологии, не давая списать. Геймификация (XP + Streaks) для ежедневных занятий.",
        media: [
            { type: 'video', url: "https://rutube.ru/play/embed/f12682259a31937547bc2ad0b4c448c1?p=ZxG35KxInF2Z1GIIeQapGw", label: "Превью" },
            { type: 'video', url: "https://rutube.ru/play/embed/4c7c82323ec717a20d90a747b136828e?p=cD1SeIb8wMnahL_aeit3tQ", label: "Платформа" }
        ],
        tags: ["EdTech", "API-First"]
    },
    {
        id: '7',
        title: "Джарвис V1",
        category: 'saas',
        desc: "Управление цифровой экосистемой голосом и текстом. 14 модулей управления.",
        fullDesc: "Реальный помощник как у Тони Старка. Модули: задачи, календарь, amoCRM, финансы, гипотезы. Управление всеми сервисами через единое окно.",
        videoUrl: "https://rutube.ru/play/embed/25ee84f8d3531a55e91248f39169e473?p=xT8YywDJj8APPcdy27x84g",
        tags: ["AI Assistant", "n8n"]
    },
    {
        id: '8',
        title: "AI Dubbing",
        category: 'marketing',
        desc: "Клонирование голоса и мимики для глобальной экспансии контента за 30 секунд.",
        fullDesc: "HeyGen интеграция. Бот мониторит видео → перевод → переозвучка → автопостинг в YouTube/Reels. Глобальный охват без знания языков.",
        videoUrl: "https://rutube.ru/play/embed/7cbf92030b9276bd69d40156bbf40ec4?p=X1ysR2Qlq1ddUbcoDHx7Lg",
        tags: ["Video AI", "HeyGen"]
    },
    {
        id: '9',
        title: "Reels-конвейер",
        category: 'marketing',
        desc: "Автоматизированная фабрика контента. Клонирование эксперта и автопостинг.",
        fullDesc: "Создаем клон лица и голоса. Робот ищет вирусные сценарии, монтирует и постит в 6 соцсетей ежедневно. Контент без участия эксперта.",
        videoUrl: "https://rutube.ru/play/embed/a9068cc65ef68f85d11e88e2fc64d42f?p=ME1l8e_kXw_cdSoE7_daqg",
        tags: ["SMM", "AI Video"]
    },
    {
        id: '10',
        title: "OSINT-Комплекс",
        category: 'saas',
        desc: "Цифровой детектив: сбор фактов по открытым данным без ограничений BigTech.",
        fullDesc: "Восстановление бизнес-моделей по обрывкам данных. Deep Dive аналитика, мониторинг патентов и форумов. Поиск инсайдов там, где обычные LLM пасуют.",
        videoUrl: "https://rutube.ru/play/embed/f9173456484e8f97a6043fd33dd9e853?p=Bjl3fWpOSEmRUcDZ9MQmhQ",
        tags: ["OSINT", "Analysis"]
    },
    {
        id: '13',
        title: "ИИ-Астролог «Селена»",
        category: 'bots',
        desc: "Математически точные натальные карты и компенсаторика вместо общих гороскопов.",
        fullDesc: "Профессиональные алгоритмы ProAstro. Запрашивает точное время рождения, строит карту и дает пошаговый план действий по деньгам, отношениям и энергии.",
        tags: ["Psychology", "Algorithms"]
    },
    {
        id: '14',
        title: "CRM-Автоматизация",
        category: 'automation',
        desc: "Excel → AI-агент → Готовый отчёт за секунды прямо в Telegram.",
        fullDesc: "Бот принимает Excel, AI-агент определяет структуру и извлекает данные. В 10+ раз быстрее ручной обработки с точностью 99.9%.",
        tags: ["Data Engineering", "LLM"]
    },
    {
        id: '15',
        title: "ИИ-Поддержка «Без долгов»",
        category: 'bots',
        desc: "Анализ эмоций и вежливые ответы. Снижение потерь лидов в юридической практике.",
        fullDesc: "Анализирует запросы на банкротство, отвечает без давления и передает теплых лидов юристу. Стандартизация тона и 24/7 доступность.",
        tags: ["Legal", "CRM"]
    },
    {
        id: '16',
        title: "ИИ-Мониторинг Telegram",
        category: 'automation',
        desc: "Сканирование 300+ каналов 24/7. Распознавание контекста и трендов для медиа.",
        fullDesc: "LLM-фильтр отсекает мусор и находит реальные инфоповоды (аресты, происшествия). Снижение нагрузки на редакцию на 70%.",
        tags: ["Media", "Real-time"]
    },
    {
        id: '17',
        title: "Парсер для ремонта (Крд)",
        category: 'marketing',
        desc: "10-20 целевых заявок в день через мониторинг чатов в реальном времени.",
        fullDesc: "Мониторинг ключевых слов в локальных чатах Краснодара. AI-шаблоны ответов позволяют реагировать первыми и забирать заказ.",
        tags: ["LeadGen", "Automation"]
    },
    {
        id: '18',
        title: "Парсер для логистики",
        category: 'marketing',
        desc: "До 30 горячих лидов в день. Окупаемость инструмента — 2 недели.",
        fullDesc: "Отслеживание запросов на перевозки и спецтехнику. Помогает менеджерам реагировать на срочные заказы без затрат на рекламу в Яндекс/Авито.",
        tags: ["Logistics", "Marketing"]
    },
    {
        id: '19',
        title: "STEALTH: Анти-Инстаграм",
        category: 'saas',
        desc: "A/B тесты для реальной жизни. Анонимное голосование и сухая статистика.",
        fullDesc: "Социальная сеть без имен и лайков вежливости. Честная обратная связь через анонимные опросы. AI-завод контента для вирального роста.",
        videoUrl: "https://rutube.ru/play/embed/0ddfba88e31dc029285bb45d6569b6b8?p=yt3NcOPKzxfz_OdQ2WnIVw",
        tags: ["SocialFi", "Innovation"]
    },
    {
        id: '20',
        title: "AI-Секретарь (RAG)",
        category: 'bots',
        desc: "Помощник с долгосрочной памятью о вашей деятельности годами.",
        fullDesc: "Векторная база знаний запоминает всё, что вы делаете. Выполняет операционные задачи: 'сделай за меня, принеси данные из старых проектов'.",
        videoUrl: "https://rutube.ru/play/embed/d2193fcd4750a90e1c2536e53e551229",
        tags: ["LTM", "VectorDB"]
    },
];
