
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Loader2, Volume2, Info } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [status, setStatus] = useState<string>('');

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Jarvis Sphere Animation Variants
    const sphereVariants: any = {
        idle: {
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
                '0 0 20px rgba(0, 150, 255, 0.2)',
                '0 0 40px rgba(0, 150, 255, 0.4)',
                '0 0 20px rgba(0, 150, 255, 0.2)'
            ],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        },
        recording: {
            scale: [1, 1.2, 1],
            opacity: 1,
            boxShadow: '0 0 60px rgba(255, 50, 50, 0.5)',
            transition: { duration: 0.5, repeat: Infinity }
        },
        processing: {
            rotate: 360,
            scale: 1.1,
            transition: { duration: 2, repeat: Infinity, ease: "linear" }
        },
        speaking: {
            scale: [1, 1.1, 0.9, 1.15, 1],
            transition: { duration: 0.2, repeat: Infinity }
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            audioChunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            recorder.onstop = handleProcessAudio;
            recorder.start();
            setIsRecording(true);
            setStatus('Слушаю...');
        } catch (err) {
            console.error('Mic access denied:', err);
            setStatus('Ошибка микрофона');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleProcessAudio = async () => {
        setIsProcessing(true);
        setStatus('Распознаю...');

        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'record.webm');

        try {
            // 1. STT
            const sttRes = await fetch('/api/stt', { method: 'POST', body: formData });
            const { text } = await sttRes.json();
            if (!text) throw new Error('Speech not recognized');

            // 2. Chat
            setStatus('Думаю...');
            const chatRes = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history })
            });
            const chatData = await chatRes.json();
            const reply = chatData.text;

            setHistory(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: reply }]);

            // 3. TTS
            setStatus('Отвечаю...');
            const ttsRes = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: reply })
            });
            const audioBlobOutput = await ttsRes.blob();
            const audioUrl = URL.createObjectURL(audioBlobOutput);

            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play();
                setIsSpeaking(true);
            }
        } catch (err) {
            console.error('Pipeline error:', err);
            setStatus('Ошибка системы');
        } finally {
            setIsProcessing(false);
            if (!isSpeaking) setStatus('Jarvis Online');
        }
    };

    return (
        <div className="fixed bottom-10 right-10 z-[200] flex flex-col items-end gap-4 font-inter">

            {/* Interaction Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-80 bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-4 mb-4"
                    >
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Protocol: JARVIS</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-600 hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        <div className="min-h-[100px] flex flex-col justify-center items-center text-center gap-4">
                            <span className="text-[10px] text-zinc-600 font-mono uppercase">{status || 'Система готова'}</span>

                            <div className="relative">
                                <motion.div
                                    variants={sphereVariants}
                                    animate={isSpeaking ? "speaking" : isProcessing ? "processing" : isRecording ? "recording" : "idle"}
                                    className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center transition-colors duration-500 ${isRecording ? 'border-red-500/50' : 'border-cyan-500/30'
                                        }`}
                                    style={{
                                        background: isRecording
                                            ? 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, transparent 70%)'
                                            : 'radial-gradient(circle, rgba(0,180,255,0.05) 0%, transparent 70%)'
                                    }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800 shadow-inner relative overflow-hidden">
                                        {/* Inner glowing core */}
                                        <div className={`absolute inset-0 opacity-20 ${isRecording ? 'bg-red-500' : 'bg-cyan-500'} blur-xl`} />
                                        {isProcessing ? (
                                            <Loader2 className="text-cyan-400 animate-spin" size={24} />
                                        ) : isSpeaking ? (
                                            <Volume2 className="text-cyan-400" size={24} />
                                        ) : (
                                            <Mic className={isRecording ? 'text-red-500' : 'text-zinc-500'} size={24} />
                                        )}
                                    </div>
                                </motion.div>

                                {/* Decorative Rings */}
                                <div className="absolute inset-[-10px] border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-[-20px] border border-zinc-800 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-50" />
                            </div>

                            <p className="text-xs text-zinc-400/80 italic font-light px-4">
                                {history.length > 0
                                    ? history[history.length - 1].content.slice(0, 80) + '...'
                                    : "Нажмите и удерживайте кнопку, чтобы задать вопрос про Гео"}
                            </p>
                        </div>

                        <button
                            onMouseDown={startRecording}
                            onMouseUp={stopRecording}
                            onTouchStart={startRecording}
                            onTouchEnd={stopRecording}
                            className={`w-full py-4 rounded-xl font-mono text-xs uppercase tracking-[0.2em] transition-all border ${isRecording
                                ? 'bg-red-950/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                                : 'bg-cyan-950/10 border-cyan-500/50 text-cyan-400 hover:bg-cyan-950/20'
                                }`}
                        >
                            {isRecording ? "Запись..." : "Удерживать для записи"}
                        </button>

                        <div className="flex items-center gap-2 mt-2 pt-4 border-t border-zinc-900 opacity-30">
                            <Info size={10} className="text-zinc-500" />
                            <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-tighter">AI AGENT V1.0 - POWERED BY OPENAI</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-black border border-zinc-800 flex items-center justify-center shadow-2xl group relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent group-hover:opacity-100 opacity-0 transition-opacity" />
                {isOpen ? <X className="text-white" size={20} /> : (
                    <div className="flex items-center justify-center">
                        <div className="h-8 w-8 rounded-full border border-cyan-500/40 flex items-center justify-center animate-pulse">
                            <div className="h-4 w-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                        </div>
                    </div>
                )}
            </motion.button>

            {/* Hidden Audio */}
            <audio
                ref={audioRef}
                onEnded={() => {
                    setIsSpeaking(false);
                    setStatus('Jarvis Online');
                }}
                hidden
            />
        </div>
    );
}
