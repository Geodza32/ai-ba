
'use client';

import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { slides } from '../data/slides';
import { Slide } from './Slide';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Deck() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1 < slides.length ? prev + 1 : prev));
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white selection:bg-purple-500/30 font-sans">

            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[50%] -left-[50%] w-[100%] h-[100%] rounded-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, -90, 0],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-indigo-900/30 to-pink-900/30 blur-[150px]"
                />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -20, scale: 1.02, filter: 'blur(8px)' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full h-full max-w-7xl mx-auto flex items-center justify-center"
                    >
                        <Slide data={slides[currentSlide]} />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 max-w-7xl mx-auto">
                <div className="text-xs font-mono text-white/40 tracking-widest uppercase">
                    Slide {currentSlide + 1} <span className="text-white/20 mx-2">/</span> {slides.length}
                </div>

                <div className="flex gap-4 items-center">
                    <div className="hidden md:flex text-xs text-white/20 font-mono gap-4 mr-4">
                        <span>← PREV</span>
                        <span>NEXT →</span>
                    </div>
                    <button
                        onClick={prevSlide}
                        disabled={currentSlide === 0}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 transition-all border border-white/10 backdrop-blur-md group"
                    >
                        <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </button>
                    <button
                        onClick={nextSlide}
                        disabled={currentSlide === slides.length - 1}
                        className="p-4 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-0 transition-all border border-white/10 backdrop-blur-md group"
                    >
                        <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-white/5 w-full">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                />
            </div>
        </div>
    );
}
