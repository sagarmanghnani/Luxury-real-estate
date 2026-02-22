'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function FloatingSearchBar() {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 md:mt-16 w-[calc(100%-2rem)] md:w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center overflow-hidden max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
        >
            <div className="flex-1 w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group">
                <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Location</span>
                    <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500">Malibu, CA</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="flex-1 w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group">
                <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Property Type</span>
                    <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500">Estate</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-500" />
            </div>

            <div className="flex-1 w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group">
                <div className="flex flex-col text-left">
                    <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Price Range</span>
                    <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500">$10M+</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/30 group-hover:text-white transition-colors duration-500" />
            </div>

            <button className="w-full md:w-auto h-full px-10 py-5 sm:py-0 bg-[var(--color-accent)] hover:bg-white text-black flex items-center justify-center transition-all duration-500 group">
                <span className="uppercase tracking-widest text-sm font-medium mr-3 md:hidden">Search</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
        </motion.div>
    );
}
