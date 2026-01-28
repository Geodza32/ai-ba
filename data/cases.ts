
export type Category = 'all' | 'bots' | 'saas' | 'automation' | 'marketing';

export interface Case {
    id: string;
    title: string;
    category: Category;
    desc: string;
    fullDesc?: string;
    metrics?: string;
    tags: string[];
    videoUrl?: string;
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
        title: "BioGenius",
        category: 'saas',
        desc: "ИИ-репетитор для ЕГЭ. Инженерная архитектура, ведущая ученика по шагам.",
        fullDesc: "API-First архитектура. Система ведет по сложным задачам генетики и биологии, не давая списать. Геймификация (XP + Streaks) для ежедневных занятий.",
        videoUrl: "https://rutube.ru/play/embed/f12682259a31937547bc2ad0b4c448c1?p=ZxG35KxInF2Z1GIIeQapGw",
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
        id: '11',
        title: "AI Cinematic Visuals",
        category: 'marketing',
        desc: "Кинематографическое качество видео без камер и актеров через нейросети.",
        fullDesc: "Создание food-porn роликов, Sci-Fi анимаций и реалистичных пейзажей. Видео-продакшн нового поколения для рекламы и промо.",
        videoUrl: "https://rutube.ru/play/embed/c5dd2cc7ea692f6a626bcaa6a2432c85?p=bPJ67TK28Zlm1bRvIiS4hA",
        tags: ["Generative Video", "AI Art"]
    },
    {
        id: '12',
        title: "ИИ-Юрист Интерцессия",
        category: 'bots',
        desc: "Экспертная система для консультаций и анализа документов.",
        fullDesc: "Бот обучен на практике МГЮА и Интерцессии. Полноценная поддержка по судебным и уголовным делам. Подводит к встрече с живым юристом.",
        videoUrl: "https://rutube.ru/play/embed/98b854d66b87bcdcc6aece72f61cd57f?p=rvVk8XbKCLx66P-xIOx-Yw",
        tags: ["Legal AI"]
    }
];
