
'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PortfolioCase } from '../data/portfolio';
import { Play, ExternalLink } from 'lucide-react';

interface CaseCardProps {
    caseData: PortfolioCase;
    onClick: () => void;
    index: number;
}

const categoryColors: Record<string, string> = {
    AI: 'from-purple-500 to-indigo-600',
    Marketing: 'from-pink-500 to-rose-600',
    Automation: 'from-cyan-500 to-blue-600',
    Media: 'from-amber-500 to-orange-600',
};

export function CaseCard({ caseData, onClick, index }: CaseCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={onClick}
            className="group relative cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-xl shadow-2xl"
        >
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden bg-gray-900/50">
                <Image
                    src={caseData.image}
                    alt={caseData.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    priority={index < 4}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Video indicator */}
                {caseData.videoUrl && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 right-4 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    >
                        <Play className="w-5 h-5 text-white fill-white" />
                    </motion.div>
                )}

                {/* Category Badge */}
                <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full bg-gradient-to-r ${categoryColors[caseData.category]} text-xs font-bold text-white uppercase tracking-wider shadow-lg`}>
                    {caseData.category}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-300 transition-all">
                    {caseData.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                    {caseData.quote}
                </p>

                {/* Metrics */}
                <div className="flex gap-4">
                    {caseData.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                            <div className="text-lg font-bold text-white">{m.value}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{m.label}</div>
                        </div>
                    ))}
                </div>

                {/* Hover indicator */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 p-2 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ExternalLink className="w-4 h-4 text-white" />
                </motion.div>
            </div>

            {/* Glow effect on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${categoryColors[caseData.category]} blur-3xl -z-10`} />
        </motion.div>
    );
}
