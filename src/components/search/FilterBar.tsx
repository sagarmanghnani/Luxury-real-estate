'use client';

import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ propertyCount }: { propertyCount: number }) {
    return (
        <div className="sticky top-0 z-40 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 transition-all duration-300">
            <div className="text-white/50 font-sans tracking-[0.2em] text-[10px] uppercase flex items-center">
                <span className="text-white font-medium mr-2 text-xs">{propertyCount}</span> ESTATES FOUND
            </div>

            <div className="flex items-center space-x-8 md:space-x-12 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 custom-scrollbar opacity-80 hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-500 cursor-pointer group whitespace-nowrap">
                    <SlidersHorizontal className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em]">Filters</span>
                </button>

                <button className="flex items-center space-x-3 text-white/60 hover:text-white transition-colors duration-500 cursor-pointer group">
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em]">Sort: Price Descending</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-500" />
                </button>
            </div>
        </div>
    );
}
