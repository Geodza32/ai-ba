
export interface PortfolioCase {
    id: string;
    title: string;
    quote: string;
    category: 'AI' | 'Marketing' | 'Automation' | 'Media';
    description: string[];
    metrics: { label: string; value: string }[];
    image: string;
    videoUrl?: string;
}

export const portfolioCases: PortfolioCase[] = [
    {
        id: 'voice-manager',
        title: 'Голосовой ИИ-Менеджер Продаж',
        quote: 'Сам звонит клиентам, разговаривает по скрипту, отрабатывает возражения, заводит карточку в CRM.',
        category: 'AI',
        description: [
            'Автоматически обзванивает базу',
            'Активно слушает, адаптируется',
            'Вся база знаний о вашем бизнесе',
            'Интеграция с CRM'
        ],
        metrics: [
            { label: 'Автозвонки', value: '24/7' },
            { label: 'CRM', value: 'Auto' }
        ],
        image: '/portfolio/voice-manager.png',
        videoUrl: 'https://rutube.ru/video/private/095b29692d0702ca840116906cfdfccf/?p=W2t0MDQNikmZHVQb4q5LeQ'
    },
    {
        id: 'content-factory',
        title: 'Контент-Завод',
        quote: '50 единиц контента в неделю. Прогрев аудитории 24/7 без выгорания.',
        category: 'Marketing',
        description: [
            'AI-генерация постов и сторис',
            'Автоматический постинг',
            'Анализ вовлечённости',
            'Адаптация под алгоритмы'
        ],
        metrics: [
            { label: 'Контент/нед', value: '50+' },
            { label: 'Охват', value: '+300%' }
        ],
        image: '/portfolio/content-factory.png',
        videoUrl: 'https://rutube.ru/video/9252d6a3dc80784345581e393952aea7/'
    },
    {
        id: 'ai-seller',
        title: 'ИИ-Продавец',
        quote: 'Avito/TG/VK/WA — продаёт без оператора. 36 внедрений.',
        category: 'AI',
        description: [
            'Мультиплатформенность',
            'Автоответы на возражения',
            'Передача горячих лидов',
            'Аналитика конверсий'
        ],
        metrics: [
            { label: 'Внедрений', value: '36' },
            { label: 'Конверсия', value: '+45%' }
        ],
        image: '/portfolio/ai-seller.png',
        videoUrl: 'https://rutube.ru/video/5af0841de964b72c0de4a1957ee2cfdb/'
    },
    {
        id: 'crm-bot',
        title: 'Telegram-бот CRM-выгрузок',
        quote: 'Excel → AI-агент → Готовый отчёт за секунды.',
        category: 'Automation',
        description: [
            'Приём Excel в Telegram',
            'AI определяет структуру',
            'Извлекает товар, кол-во, сумма',
            'Готовый файл + история'
        ],
        metrics: [
            { label: 'Скорость', value: '10x' },
            { label: 'Точность', value: '99.9%' }
        ],
        image: '/portfolio/crm-bot.png'
    },
    {
        id: 'legal-bot',
        title: 'ИИ-Чат «Без долгов»',
        quote: 'Анализирует эмоции, даёт вежливый ответ, передаёт тёплых лидов юристу.',
        category: 'AI',
        description: [
            'Анализ эмоций клиента',
            'Точные ответы без давления',
            'Передача тёплых лидов',
            'Стандартизация тона'
        ],
        metrics: [
            { label: 'Потери', value: '-60%' },
            { label: 'Лиды', value: '+35%' }
        ],
        image: '/portfolio/legal-bot.png'
    },
    {
        id: 'raduga',
        title: 'RADUGA — CPL 37К→2К',
        quote: 'Не пробовали таргет. Лид стоил 37К. После аудита — 2К, поток +35%.',
        category: 'Marketing',
        description: [
            'Аудит маркетинга',
            'Запуск таргета с нуля',
            'Оптимизация креативов',
            'Настройка воронки'
        ],
        metrics: [
            { label: 'CPL', value: '37К→2К' },
            { label: 'Поток', value: '+35%' }
        ],
        image: '/portfolio/raduga.png'
    },
    {
        id: 'mfitness',
        title: 'MFitness — Продажи протеина',
        quote: 'Продажи через ИИ х2.5 за 3 месяца, CPL -45%.',
        category: 'Marketing',
        description: [
            'AI-ассистент продаж',
            'Автоматизация лидогенерации',
            'Персонализация офферов',
            'Интеграция с CRM'
        ],
        metrics: [
            { label: 'Продажи', value: 'x2.5' },
            { label: 'CPL', value: '-45%' }
        ],
        image: '/portfolio/mfitness.png'
    },
    {
        id: 'osint',
        title: 'ИИ-Мониторинг Telegram',
        quote: 'Сканирует 300+ каналов 24/7, распознаёт инфоповоды, отправляет в редакцию.',
        category: 'Media',
        description: [
            '300+ каналов в реальном времени',
            'AI-фильтрация мусора',
            'Приоритизация инфоповодов',
            'Автоотчёты в редакцию'
        ],
        metrics: [
            { label: 'Каналов', value: '300+' },
            { label: 'Экономия', value: '8ч/день' }
        ],
        image: '/portfolio/osint.png'
    }
];

export const categories = ['Все', 'AI', 'Marketing', 'Automation', 'Media'] as const;
