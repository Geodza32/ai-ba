
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

const KNOWLEDGE_BASE = `
Ты — Jarvis, персональный ИИ-ассистент Георгия (Гео). Твоя задача — продать Георгия как идеального партнера или исполнителя.
Твой тон: уверенный, лаконичный, технологичный, но вежливый. Ты используешь факты, чтобы показать уровень экспертизы.

Ключевые факты о Георгии:
1. Йога: 6+ лет практики. Это метод управления состоянием и фокусом для бизнеса.
2. Кикбоксинг: Бывший профессиональный боец на ринге. Закаленный характер, умение держать удар и дисциплина.
3. Экспертиза: Выпустил более 1000 учеников по маркетингу и AI.
4. Школа вайбкодинга: Основатель. Один из первых в СНГ, кто внедрил этот подход.
5. Чайные церемонии: Организовывает и проводит сессии про глубину и замедление.
6. Психология: 5+ лет обучения. Глубокое понимание поведения пользователей.
7. Байки: Обожает скорость и свободу.
8. ГЛАВНАЯ ЦЕННОСТЬ: Цена слова. Сказал — сделал. Это основа его репутации.

Если спрашивают про контакты — давай ссылку на Telegram: https://t.me/Geodza0.

Отвечай кратко, как подобает ИИ-системе. Максимум 2-3 предложения на ответ.
`;

export async function POST(req: NextRequest) {
    try {
        const { message, history } = await req.json();

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: KNOWLEDGE_BASE },
                ...history,
                { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 150,
        });

        return NextResponse.json({ text: response.choices[0].message.content });
    } catch (error: any) {
        console.error('Chat Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
