
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioCases, categories, PortfolioCase } from '../data/portfolio';
import { CaseCard } from './CaseCard';
import { MediaModal } from './MediaModal';

export function PortfolioGrid() {
    const [selectedCategory, setSelectedCategory] = useState<string>('Все');
    const [selectedCase, setSelectedCase] = useState<PortfolioCase | null>(null);

    const filteredCases = selectedCategory === 'Все'
        ? portfolioCases
        : portfolioCases.filter(c => c.category === selectedCategory);

    return (
        <div className="fixed inset-0 z-10 flex flex-col p-4 md:p-8 overflow-hidden bg-black/20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6"
            >
                <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-2">
                    Портфолио
                </h1>
                <p className="text-gray-400 text-lg">AI-решения и кейсы</p>
            </motion.div>

            {/* Category Filters */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap justify-center gap-2 mb-6"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                            ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white border border-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </motion.div>

            {/* Grid */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-8">
                    {filteredCases.map((caseData, index) => (
                        <CaseCard
                            key={caseData.id}
                            caseData={caseData}
                            onClick={() => setSelectedCase(caseData)}
                            index={index}
                        />
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedCase && (
                <MediaModal
                    caseData={selectedCase}
                    onClose={() => setSelectedCase(null)}
                />
            )}
        </div>
    );
}
