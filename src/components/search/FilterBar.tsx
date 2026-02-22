'use client';

import { SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function FilterBar({ propertyCount }: { propertyCount: number }) {
    return (
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
            <div className="text-white/80 font-sans tracking-widest text-sm uppercase">
                <span className="text-white font-medium">{propertyCount}</span> Properties Found
            </div>

            <div className="flex items-center space-x-4 md:space-x-6 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 custom-scrollbar">
                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-pointer group whitespace-nowrap">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span className="text-sm font-sans uppercase tracking-widest">Filters</span>
                </button>

                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors cursor-pointer group">
                    <span className="text-sm font-sans uppercase tracking-widest">Sort: Price High to Low</span>
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
