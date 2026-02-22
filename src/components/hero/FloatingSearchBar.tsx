'use client';

import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function FloatingSearchBar() {
    return (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 md:mt-12 w-[calc(100%-2rem)] md:w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center overflow-hidden max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/20 shadow-2xl"
        >
            <div className="flex-1 w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group">
                <div className="flex flex-col text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-sans">Location</span>
                    <span className="text-white font-serif text-lg group-hover:text-[var(--color-accent)] transition-colors">Malibu, CA</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>

            <div className="flex-1 w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group">
                <div className="flex flex-col text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-sans">Property Type</span>
                    <span className="text-white font-serif text-lg group-hover:text-[var(--color-accent)] transition-colors">Villa</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>

            <div className="flex-1 w-full flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors group">
                <div className="flex flex-col text-left">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-sans">Price Range</span>
                    <span className="text-white font-serif text-lg group-hover:text-[var(--color-accent)] transition-colors">$5M - $10M</span>
                </div>
                <ChevronDown className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </div>

            <button className="w-full md:w-auto px-8 py-5 bg-[var(--color-accent)] hover:bg-[#a38865] flex items-center justify-center transition-colors group">
                <ArrowRight className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
            </button>
        </motion.div>
    );
}
