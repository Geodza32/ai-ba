
import { LucideIcon, Brain, TrendingUp, Users, Target, Rocket, Zap, Search, Activity, Layers, DollarSign } from 'lucide-react';

export interface SlideData {
  id: string;
  type: 'title' | 'section' | 'content' | 'list' | 'split';
  title: string;
  subtitle?: string;
  content?: string[];
  metrics?: { label: string; value: string; sub?: string }[];
  accent?: string;
  icon?: any;
  visual?: 'layerCake' | 'rice' | 'hadi' | 'funnel' | 'pie' | 'roadmap' | 'none';
}

export const slides: SlideData[] = [
  {
    id: 'intro',
    type: 'title',
    title: 'Масштабирование AI-Астролога',
    subtitle: 'План действий: Стратегия CPO',
    accent: 'from-purple-500 to-indigo-500',
    icon: Rocket,
    visual: 'none'
  },
  {
    id: 'part1-title',
    type: 'section',
    title: 'Часть 1: Первые шаги',
    subtitle: 'Discovery & Economy',
    accent: 'from-blue-500 to-cyan-500',
    icon: Search,
    visual: 'none'
  },
  {
    id: 'step0',
    type: 'split',
    title: 'Шаг 0: Discovery & CustDev',
    subtitle: 'Срок: 48 часов',
    content: [
      'OSINT-исследование: Сбор 500+ болей конкурентов через AI.',
      'Reality Check: Поиск реальных сегментов, а не гипотез.',
      'Три главных JTBD-сценария за которые готовы платить.'
    ],
    metrics: [
      { label: 'Business Value', value: 'Точность', sub: 'Бьем в реальную боль' },
      { label: 'Business Value', value: 'Экономия', sub: 'Не сжигаем бюджет' }
    ],
    icon: Search,
    visual: 'pie'
  },
  {
    id: 'step1',
    type: 'split',
    title: 'Шаг 1: Юнит-Экономика',
    subtitle: 'Срок: 24 часа',
    content: [
      'P&L Моделирование: Пессимистичный / Реалистичный / Оптимистичный.',
      'Layer Cake: Модель наслаивания выручки (Retention).',
      'Расчет AMPPU и предельного CAC.'
    ],
    metrics: [
      { label: 'Value', value: 'Риски', sub: 'Управляемый закуп' },
      { label: 'Focus', value: 'ROI', sub: 'Инвестиции vs Расходы' }
    ],
    icon: DollarSign,
    visual: 'layerCake'
  },
  {
    id: 'step2',
    type: 'content',
    title: 'Шаг 2: Гипотезы (RICE)',
    content: [
      'Бэклог 20+ гипотез роста.',
      'Правило 1/10: Нужно много дешевых тестов.',
      'Оценка RICE: Reach × Impact × Confidence / Effort.',
      'Выбор ТОП-3 Quick Wins.'
    ],
    icon: Target,
    visual: 'rice'
  },
  {
    id: 'step3',
    type: 'content',
    title: 'Шаг 3: HADI-циклы',
    content: [
      'Конвейер: Hypothesis → Action → Data → Insights.',
      'Cost of Delay: Time to Market — король.',
      'Прозрачность: Спринт-планинг и Пятничное демо.'
    ],
    icon: Activity,
    visual: 'hadi'
  },
  {
    id: 'part2-title',
    type: 'section',
    title: 'Часть 2: Маркетинг',
    subtitle: 'AI-Force Multiplier Strategy',
    accent: 'from-pink-500 to-rose-500',
    icon: Zap,
    visual: 'none'
  },
  {
    id: 'marketing-ai',
    type: 'split',
    title: 'AI-Content Factory',
    subtitle: 'Бесплатный охват 24/7',
    content: [
      'AI-SEO: 100+ статей/день под НЧ запросы.',
      'AI-Video: Массовая уникализация Reels/Shorts.',
      'AI-SMM: Фермы аккаунтов для активности.'
    ],
    metrics: [
      { label: 'CAC', value: '→ 0', sub: 'Zero Marginal Cost' },
      { label: 'KPI', value: 'Traffic', sub: 'Organic Growth' }
    ],
    icon: Brain,
    visual: 'funnel'
  },
  {
    id: 'marketing-paid',
    type: 'split',
    title: 'Платное Масштабирование',
    subtitle: 'Включаем, когда LTV > 3x CAC',
    content: [
      'Telegram Ads: Таргет на конкурентов.',
      'Посевы: Lifestyle & Эзотерика блогеры.',
      'Marketplaces: Ozon товары-прокладки с QR.'
    ],
    metrics: [
      { label: 'KPI', value: 'CTR', sub: '> 1.5%' },
      { label: 'ROAS', value: '> 300%', sub: 'Возврат инвестиций' }
    ],
    icon: TrendingUp,
    visual: 'pie'
  },
  {
    id: 'marketing-wild',
    type: 'list',
    title: 'Партизанские Гипотезы',
    subtitle: 'Wild Cards',
    content: [
      'Tinder Hacking: AI-анкеты "Проверь совместимость".',
      'Кофе с предсказанием: QR-коды на стаканчиках.',
      'База "Токсичных Бывших": Виральность на злости.'
    ],
    metrics: [
      { label: 'Viral', value: 'K > 1', sub: 'Factor' }
    ],
    icon: Users,
    visual: 'none'
  },
  {
    id: 'part3-title',
    type: 'section',
    title: 'Часть 3: Операционка',
    subtitle: 'Спецназ: Human + AI',
    accent: 'from-emerald-500 to-teal-500',
    icon: Layers,
    visual: 'none'
  },
  {
    id: 'team',
    type: 'split',
    title: 'Структура Команды',
    subtitle: 'Минимальный штат',
    content: [
      'CPO (Brain): Стратегия & Деньги.',
      'AI-Assistants (Hands): Операторы нейросетей.',
      'Dev (Tech): Solo Fullstack (Low-code + Code).',
      'Analytics (Data): AI-коннектор (Text-to-SQL).'
    ],
    metrics: [
      { label: 'Metric', value: 'Burn Rate', sub: 'Strict Budget' },
      { label: 'Metric', value: 'Velocity', sub: 'Fast Release' }
    ],
    icon: Users,
    visual: 'pie'
  },
  {
    id: 'roadmap-title',
    type: 'section',
    title: 'Часть 4: Roadmap',
    subtitle: 'Launch Phase: Month 1',
    accent: 'from-orange-500 to-amber-500',
    icon: Activity,
    visual: 'none'
  },
  {
    id: 'roadmap',
    type: 'list',
    title: 'Blitzkrieg Plan',
    content: [
      'Неделя 1 (Setup): Финмодель, OSINT, Tech Setup. Goal: Problem/Solution Fit.',
      'Неделя 2 (Traction): Запуск AI-контента, Первый трафик. Goal: Channel/Market Fit.',
      'Неделя 3 (Optimization): HADI-циклы, Воронка. Goal: Unit Economics.',
      'Неделя 4 (Scale): Анализ и Масштабирование. Goal: Product/Market Fit.'
    ],
    icon: Rocket,
    visual: 'roadmap'
  },
  {
    id: 'final',
    type: 'title',
    title: 'Готовы к запуску',
    subtitle: 'Стратегия • Команда • Инструменты',
    accent: 'from-gray-200 to-gray-400',
    icon: Zap,
    visual: 'none'
  }
];
