
'use client';
import { motion } from 'framer-motion';

interface VisualsProps {
    type: 'layerCake' | 'rice' | 'hadi' | 'funnel' | 'pie' | 'roadmap' | 'none';
}

export function Visuals({ type }: VisualsProps) {
    if (type === 'none') return null;

    switch (type) {
        case 'layerCake':
            return <LayerCake />;
        case 'funnel':
            return <Funnel />;
        case 'pie':
            return <PieChart />;
        case 'hadi':
            return <HadiCycle />;
        case 'rice':
            return <RiceScore />;
        case 'roadmap':
            return <RoadmapVisual />;
        default:
            return null;
    }
}

function LayerCake() {
    return (
        <div className="w-full h-48 md:h-64 flex items-end justify-center gap-2 md:gap-4 p-4">
            {[40, 60, 80, 100].map((h, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ delay: i * 0.2, duration: 0.8, type: 'spring' }}
                    className="w-12 md:w-20 rounded-t-lg relative group bg-gradient-to-b from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                >
                    <div className="absolute inset-x-0 bottom-0 top-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
            ))}
        </div>
    );
}

function Funnel() {
    const steps = ['Traffic', 'Leads', 'Sales', 'LTV'];
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
            {[100, 70, 45, 25].map((w, i) => (
                <motion.div
                    key={i}
                    initial={{ width: '0%', opacity: 0 }}
                    animate={{ width: `${w}%`, opacity: 1 }}
                    transition={{ delay: i * 0.2 + 0.5, duration: 0.8 }}
                    className="h-12 md:h-16 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 flex items-center justify-center relative overflow-hidden"
                >
                    <div className="absolute left-0 top-0 bottom-0 bg-white/5 w-full skew-x-12 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
                    <span className="relative z-10 text-sm md:text-lg font-medium text-white/90 tracking-wide">{steps[i]}</span>
                </motion.div>
            ))}
        </div>
    );
}

function HadiCycle() {
    const bubbles = [
        { label: 'Hypothesis', color: 'from-purple-500', pos: 'top-0 left-1/2 -translate-x-1/2' },
        { label: 'Action', color: 'from-blue-500', pos: 'top-1/2 right-0 -translate-y-1/2' },
        { label: 'Data', color: 'from-green-500', pos: 'bottom-0 left-1/2 -translate-x-1/2' },
        { label: 'Insights', color: 'from-yellow-500', pos: 'top-1/2 left-0 -translate-y-1/2' },
    ];

    return (
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-8">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 rounded-full border border-dashed border-white/20"
            />
            {bubbles.map((b, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className={`absolute w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-gradient-to-br ${b.color} to-transparent border border-white/10 backdrop-blur-xl shadow-lg z-10 ${b.pos}`}
                >
                    <span className="text-[10px] md:text-sm font-bold text-white uppercase tracking-wider">{b.label}</span>
                </motion.div>
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-black text-white/5">HADI</div>
            </div>
        </div>
    )
}

function RiceScore() {
    const metrics = [
        { label: 'Reach', val: 90, color: 'bg-indigo-500' },
        { label: 'Impact', val: 80, color: 'bg-sky-500' },
        { label: 'Confidence', val: 70, color: 'bg-teal-500' },
        { label: 'Effort', val: 30, color: 'bg-rose-500' }, // Lower is better visual, but here higher bar = higher effort (bad)
    ];
    return (
        <div className="w-full space-y-6 px-8 py-4">
            {metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-6">
                    <span className="w-24 text-right text-sm font-mono text-gray-400 uppercase">{m.label}</span>
                    <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${m.val}%` }}
                            transition={{ delay: i * 0.1 + 0.5, duration: 1.2, ease: "circOut" }}
                            className={`h-full rounded-full shadow-[0_0_10px_currentColor] ${m.color}`}
                        />
                    </div>
                    <span className="w-8 text-sm font-bold text-white">{m.val}</span>
                </div>
            ))}
        </div>
    )
}

function PieChart() {
    return (
        <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* Background Circle */}
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />

                {/* Segment 1 */}
                <motion.circle
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 0.65 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    cx="50" cy="50" r="40"
                    fill="none" stroke="#8b5cf6" strokeWidth="12"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                />
                {/* Segment 2 */}
                <motion.circle
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 0.25, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                    cx="50" cy="50" r="40"
                    fill="none" stroke="#ec4899" strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="-170" // Manual offset for pie segment spacing
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">100%</span>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Growth</span>
            </div>
        </div>
    )
}

function RoadmapVisual() {
    const steps = [
        { name: 'Week 1', desc: 'Setup' },
        { name: 'Week 2', desc: 'Traction' },
        { name: 'Week 3', desc: 'Optimize' },
        { name: 'Week 4', desc: 'Scale' },
    ];
    return (
        <div className="w-full h-full flex items-center justify-between px-4 relative">
            <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-white/10 -translate-y-1/2" />
            {steps.map((s, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: i * 0.3 + 0.5, type: 'spring' }}
                    className="relative z-10 bg-[#0A0A0A] p-2 border border-white/10 rounded-xl flex flex-col items-center gap-2 w-24 md:w-32 hover:border-orange-500/50 transition-colors"
                >
                    <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_orange]" />
                    <div className="text-xs font-mono text-gray-500">{s.name}</div>
                    <div className="text-sm font-bold text-white">{s.desc}</div>
                </motion.div>
            ))}
        </div>
    )
}
