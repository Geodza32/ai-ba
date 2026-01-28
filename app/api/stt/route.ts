
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const transcription = await openai.audio.transcriptions.create({
            file,
            model: 'whisper-1',
            language: 'ru',
        });

        return NextResponse.json({ text: transcription.text });
    } catch (error: any) {
        console.error('STT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
