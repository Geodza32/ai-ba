'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Loader2, Volume2, MicOff } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

// Типизация для Web Speech API
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
}

interface SpeechRecognitionResultList {
    length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    isFinal: boolean;
    length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    transcript: string;
    confidence: number;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    abort(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: (() => void) | null;
    onstart: (() => void) | null;
}

declare global {
    interface Window {
        SpeechRecognition: new () => SpeechRecognition;
        webkitSpeechRecognition: new () => SpeechRecognition;
    }
}

export function AiAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [history, setHistory] = useState<ChatMessage[]>([]);
    const [status, setStatus] = useState<string>('');
    const [currentTranscript, setCurrentTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(true);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Обработка распознанной речи
    const processUserSpeech = useCallback(async (text: string) => {
        if (!text.trim()) return;

        setIsProcessing(true);
        setStatus('PROCESSING');
        setCurrentTranscript('');

        try {
            const chatRes = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text, history })
            });

            if (!chatRes.ok) {
                throw new Error('Chat API error');
            }

            const chatData = await chatRes.json();
            const reply = chatData.text || 'Извините, произошла ошибка';

            setHistory(prev => [...prev, { role: 'user', content: text }, { role: 'assistant', content: reply }]);

            setStatus('SPEAKING');
            const ttsRes = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: reply })
            });

            if (!ttsRes.ok) {
                throw new Error('TTS API error');
            }

            const audioBlobOutput = await ttsRes.blob();
            const audioUrl = URL.createObjectURL(audioBlobOutput);

            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                audioRef.current.play();
                setIsSpeaking(true);
            }
        } catch (err) {
            console.error('Pipeline error:', err);
            setStatus('ERROR');
            setTimeout(() => startListening(), 2000);
        } finally {
            setIsProcessing(false);
        }
    }, [history]);

    // Инициализация Web Speech API
    const initSpeechRecognition = useCallback(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setIsSupported(false);
            setStatus('UNSUPPORTED');
            return null;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'ru-RU';

        recognition.onstart = () => {
            setIsListening(true);
            setStatus('LISTENING');
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript;
                } else {
                    interimTranscript += transcript;
                }
            }

            if (interimTranscript) {
                setCurrentTranscript(interimTranscript);
            }

            if (finalTranscript) {
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current);
                }
                recognition.stop();
                processUserSpeech(finalTranscript);
            } else if (interimTranscript) {
                if (silenceTimeoutRef.current) {
                    clearTimeout(silenceTimeoutRef.current);
                }
                silenceTimeoutRef.current = setTimeout(() => {
                    if (interimTranscript.length > 5) {
                        recognition.stop();
                        processUserSpeech(interimTranscript);
                    }
                }, 2000);
            }
        };

        recognition.onerror = () => {
            setIsListening(false);
            setTimeout(() => {
                if (isOpen && !isSpeaking && !isProcessing) {
                    startListening();
                }
            }, 1000);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (isOpen && !isSpeaking && !isProcessing) {
                setTimeout(() => startListening(), 500);
            }
        };

        return recognition;
    }, [isOpen, isSpeaking, isProcessing, processUserSpeech]);

    const startListening = useCallback(() => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
            } catch {
                // Already started
            }
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
        if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            recognitionRef.current = initSpeechRecognition();
            if (recognitionRef.current && !isSpeaking) {
                startListening();
            }
        } else {
            stopListening();
            setCurrentTranscript('');
        }
        return () => stopListening();
    }, [isOpen, initSpeechRecognition, startListening, stopListening, isSpeaking]);

    useEffect(() => {
        if (!isSpeaking && isOpen && !isProcessing) {
            const timer = setTimeout(() => startListening(), 500);
            return () => clearTimeout(timer);
        }
    }, [isSpeaking, isOpen, isProcessing, startListening]);

    const getStatusColor = () => {
        if (status === 'ERROR') return '#ff3333';
        if (isListening) return '#00ff88';
        if (isProcessing) return '#00d4ff';
        if (isSpeaking) return '#ff00ff';
        return '#00d4ff';
    };

    return (
        <div className="fixed bottom-8 right-8 z-[200] flex flex-col items-end gap-4">

            {/* Futuristic Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 30 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative mb-4"
                    >
                        {/* Outer glow */}
                        <div
                            className="absolute -inset-2 rounded-3xl blur-xl opacity-30"
                            style={{ background: `radial-gradient(circle, ${getStatusColor()}, transparent 70%)` }}
                        />

                        {/* Main panel */}
                        <div className="relative w-80 bg-black/95 backdrop-blur-xl rounded-2xl overflow-hidden"
                            style={{
                                border: `1px solid ${getStatusColor()}33`,
                                boxShadow: `0 0 40px ${getStatusColor()}20, inset 0 1px 0 rgba(255,255,255,0.1)`
                            }}
                        >
                            {/* Top scanline effect */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

                            {/* Header */}
                            <div className="relative px-6 py-4 border-b border-white/5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div
                                                className="w-2 h-2 rounded-full animate-pulse"
                                                style={{ backgroundColor: getStatusColor(), boxShadow: `0 0 10px ${getStatusColor()}` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-mono tracking-[0.3em] text-white/60">
                                            J.A.R.V.I.S
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all group"
                                    >
                                        <X size={12} className="text-white/40 group-hover:text-white" />
                                    </button>
                                </div>

                                {/* Status bar */}
                                <div className="mt-3 flex items-center gap-2">
                                    <div className="flex-1 h-[2px] bg-white/5 rounded overflow-hidden">
                                        <motion.div
                                            className="h-full rounded"
                                            style={{ backgroundColor: getStatusColor() }}
                                            animate={{ width: isProcessing ? ['0%', '100%'] : '100%' }}
                                            transition={{ duration: isProcessing ? 2 : 0, repeat: isProcessing ? Infinity : 0 }}
                                        />
                                    </div>
                                    <span className="text-[8px] font-mono tracking-wider" style={{ color: getStatusColor() }}>
                                        {status || 'STANDBY'}
                                    </span>
                                </div>
                            </div>

                            {/* Core visualization */}
                            <div className="relative px-6 py-8 flex flex-col items-center">

                                {/* Hexagonal core */}
                                <div className="relative w-32 h-32 flex items-center justify-center">

                                    {/* Orbiting rings */}
                                    <motion.div
                                        className="absolute inset-0"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            <circle cx="50" cy="50" r="48" fill="none" stroke={`${getStatusColor()}20`} strokeWidth="0.5" strokeDasharray="4 4" />
                                        </svg>
                                    </motion.div>

                                    <motion.div
                                        className="absolute inset-2"
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                                    >
                                        <svg viewBox="0 0 100 100" className="w-full h-full">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke={`${getStatusColor()}30`} strokeWidth="0.5" />
                                            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                                                <circle
                                                    key={i}
                                                    cx={50 + 45 * Math.cos(angle * Math.PI / 180)}
                                                    cy={50 + 45 * Math.sin(angle * Math.PI / 180)}
                                                    r="2"
                                                    fill={getStatusColor()}
                                                    opacity="0.5"
                                                />
                                            ))}
                                        </svg>
                                    </motion.div>

                                    {/* Central core */}
                                    <motion.div
                                        className="relative w-20 h-20 rounded-full flex items-center justify-center"
                                        animate={{
                                            scale: isSpeaking ? [1, 1.1, 0.95, 1.05, 1] : isListening ? [1, 1.05, 1] : 1
                                        }}
                                        transition={{
                                            duration: isSpeaking ? 0.3 : 2,
                                            repeat: Infinity
                                        }}
                                        style={{
                                            background: `radial-gradient(circle, ${getStatusColor()}15 0%, transparent 70%)`,
                                            boxShadow: `0 0 30px ${getStatusColor()}30`
                                        }}
                                    >
                                        {/* Inner hexagon */}
                                        <div
                                            className="absolute inset-2 rounded-full"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%)',
                                                border: `1px solid ${getStatusColor()}40`
                                            }}
                                        />

                                        {/* Icon */}
                                        {isProcessing ? (
                                            <Loader2 size={28} className="animate-spin" style={{ color: getStatusColor() }} />
                                        ) : isSpeaking ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                            >
                                                <Volume2 size={28} style={{ color: getStatusColor() }} />
                                            </motion.div>
                                        ) : isListening ? (
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 1, repeat: Infinity }}
                                            >
                                                <Mic size={28} style={{ color: getStatusColor() }} />
                                            </motion.div>
                                        ) : (
                                            <MicOff size={28} className="text-white/30" />
                                        )}
                                    </motion.div>

                                    {/* Audio wave visualization when listening */}
                                    {isListening && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute rounded-full"
                                                    style={{ border: `1px solid ${getStatusColor()}` }}
                                                    initial={{ width: 80, height: 80, opacity: 0.6 }}
                                                    animate={{
                                                        width: [80, 130],
                                                        height: [80, 130],
                                                        opacity: [0.4, 0]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: i * 0.6
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Transcript display */}
                                {currentTranscript && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10"
                                    >
                                        <p className="text-xs font-mono" style={{ color: getStatusColor() }}>
                                            "{currentTranscript}"
                                        </p>
                                    </motion.div>
                                )}

                                {/* Last message */}
                                <p className="mt-4 text-[11px] text-white/40 text-center max-w-[90%] leading-relaxed">
                                    {history.length > 0
                                        ? history[history.length - 1].content.slice(0, 100) + (history[history.length - 1].content.length > 100 ? '...' : '')
                                        : isListening ? "Говорите — я слушаю" : "Активируйте голосовой ввод"}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-3 border-t border-white/5 flex items-center justify-between">
                                <span className="text-[8px] font-mono text-white/20 tracking-wider">
                                    NEURAL INTERFACE v2.0
                                </span>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 rounded-full"
                                            style={{ backgroundColor: getStatusColor() }}
                                            animate={{
                                                height: isListening || isSpeaking ? [4, 12, 4] : 4,
                                                opacity: isListening || isSpeaking ? [0.3, 1, 0.3] : 0.3
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                repeat: Infinity,
                                                delay: i * 0.1
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Bottom scanline */}
                            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Futuristic Floating Button */}
            <div className="relative">
                {/* Outer pulse rings */}
                {!isOpen && (
                    <>
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ border: '1px solid #00d4ff' }}
                            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ border: '1px solid #00d4ff' }}
                            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                    </>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden group"
                    style={{
                        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                        boxShadow: isOpen
                            ? 'none'
                            : '0 0 40px rgba(0,212,255,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                    }}
                >
                    {/* Border gradient */}
                    <div
                        className="absolute inset-0 rounded-full p-[2px]"
                        style={{
                            background: 'linear-gradient(135deg, #00d4ff 0%, #0066ff 50%, #00d4ff 100%)'
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-black" />
                    </div>

                    {/* Inner glow */}
                    <div
                        className="absolute inset-1 rounded-full opacity-30 group-hover:opacity-50 transition-opacity"
                        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
                    />

                    {/* Rotating inner ring */}
                    {!isOpen && (
                        <>
                            <motion.div
                                className="absolute inset-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            >
                                <svg viewBox="0 0 60 60" className="w-full h-full">
                                    <circle
                                        cx="30" cy="30" r="26"
                                        fill="none"
                                        stroke="#00d4ff"
                                        strokeWidth="1.5"
                                        strokeDasharray="15 40"
                                        opacity="0.8"
                                    />
                                </svg>
                            </motion.div>

                            {/* Counter-rotating arc */}
                            <motion.div
                                className="absolute inset-3"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                            >
                                <svg viewBox="0 0 60 60" className="w-full h-full">
                                    <circle
                                        cx="30" cy="30" r="22"
                                        fill="none"
                                        stroke="#ff00ff"
                                        strokeWidth="1"
                                        strokeDasharray="8 50"
                                        opacity="0.5"
                                    />
                                </svg>
                            </motion.div>

                            {/* Spinning center element */}
                            <motion.div
                                className="absolute inset-5 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                            >
                                <div className="w-full h-full rounded-full border border-cyan-500/30" style={{
                                    background: 'conic-gradient(from 0deg, transparent 0%, #00d4ff 25%, transparent 50%, #00d4ff 75%, transparent 100%)',
                                    opacity: 0.3
                                }} />
                            </motion.div>
                        </>
                    )}

                    {/* Glitching Icon */}
                    <div className="relative z-10">
                        {isOpen ? (
                            <X size={26} className="text-cyan-400" />
                        ) : (
                            <div className="relative">
                                {/* Glitch layers */}
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        x: [0, -2, 2, -1, 0],
                                        opacity: [1, 0.8, 1, 0.9, 1]
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        times: [0, 0.25, 0.5, 0.75, 1]
                                    }}
                                >
                                    <Mic size={28} className="text-red-500/50" />
                                </motion.div>
                                <motion.div
                                    className="absolute inset-0"
                                    animate={{
                                        x: [0, 2, -2, 1, 0],
                                        opacity: [1, 0.8, 1, 0.9, 1]
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        repeat: Infinity,
                                        repeatDelay: 2,
                                        delay: 0.05,
                                        times: [0, 0.25, 0.5, 0.75, 1]
                                    }}
                                >
                                    <Mic size={28} className="text-blue-500/50" />
                                </motion.div>

                                {/* Main icon with flicker */}
                                <motion.div
                                    animate={{
                                        opacity: [1, 0.7, 1, 0.9, 1, 0.8, 1],
                                        scale: [1, 1.02, 1, 0.98, 1]
                                    }}
                                    transition={{
                                        duration: 0.15,
                                        repeat: Infinity,
                                        repeatDelay: 3
                                    }}
                                >
                                    <Mic size={28} className="text-cyan-400" />
                                </motion.div>
                            </div>
                        )}
                    </div>
                </motion.button>
            </div>

            {/* Hidden Audio */}
            <audio
                ref={audioRef}
                onEnded={() => {
                    setIsSpeaking(false);
                    setStatus('LISTENING');
                }}
                hidden
            />
        </div>
    );
}
