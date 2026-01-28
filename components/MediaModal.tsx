
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Play, ExternalLink } from 'lucide-react';
import { PortfolioCase } from '../data/portfolio';
import { useEffect } from 'react';

interface MediaModalProps {
    caseData: PortfolioCase | null;
    onClose: () => void;
}

export function MediaModal({ caseData, onClose }: MediaModalProps) {
    // Close on ESC
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!caseData) return null;

    // Extract RuTube video ID
    const getRutubeEmbedUrl = (url: string) => {
        const match = url.match(/rutube\.ru\/video\/(?:private\/)?([a-zA-Z0-9]+)/);
        if (match) return `https://rutube.ru/play/embed/${match[1]}`;
        return null;
    };

    const embedUrl = caseData.videoUrl ? getRutubeEmbedUrl(caseData.videoUrl) : null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-2xl overflow-y-auto"
                onClick={onClose}
            >
                <div className="min-h-full w-full flex items-center justify-center py-12">
                    {/* Close button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 z-50"
                    >
                        <X className="w-6 h-6 text-white" />
                    </motion.button>

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl"
                    >
                        {/* Media Section */}
                        <div className="relative aspect-video bg-black">
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                />
                            ) : (
                                <Image
                                    src={caseData.image}
                                    alt={caseData.title}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>

                        {/* Info Section */}
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                {caseData.title}
                            </h2>
                            <p className="text-gray-400 text-lg mb-6 italic">
                                «{caseData.quote}»
                            </p>

                            {/* Description */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {caseData.description.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + idx * 0.1 }}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                                    >
                                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                                        <span className="text-gray-300">{item}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Metrics */}
                            <div className="flex gap-4 flex-wrap">
                                {caseData.metrics.map((m, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 + idx * 0.1 }}
                                        className="flex-1 min-w-[120px] p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
                                    >
                                        <div className="text-2xl md:text-3xl font-bold text-white">{m.value}</div>
                                        <div className="text-sm text-purple-300 uppercase tracking-wider">{m.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* External link */}
                            {caseData.videoUrl && (
                                <motion.a
                                    href={caseData.videoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white"
                                >
                                    <Play className="w-4 h-4" />
                                    Смотреть на RuTube
                                    <ExternalLink className="w-4 h-4" />
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
