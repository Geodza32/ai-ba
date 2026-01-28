
'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterProps {
    text: string;
    delay?: number;
    speed?: number;
    className?: string;
}

export function Typewriter({ text, delay = 0, speed = 0.03, className = "" }: TypewriterProps) {
    const [count, setCount] = useState(0);
    const displayText = text.slice(0, count);

    useEffect(() => {
        const controls = animate(0, text.length, {
            type: "tween",
            duration: text.length * speed,
            delay: delay,
            ease: "linear",
            onUpdate: (latest) => setCount(Math.floor(latest)),
        });
        return controls.stop;
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                className="inline-block w-[0.1em] md:w-[2px] h-[1em] bg-white translate-y-[0.1em] ml-[2px] shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
        </span>
    );
}
