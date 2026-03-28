'use client';

import { useState } from 'react';
import { SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

type Filters = {
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    minBeds: number;
};

interface FilterBarProps {
    propertyCount: number;
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    sortOrder: 'desc' | 'asc';
    setSortOrder: (order: 'desc' | 'asc') => void;
}

export default function FilterBar({ propertyCount, filters, setFilters, sortOrder, setSortOrder }: FilterBarProps) {
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [isPriceOpen, setIsPriceOpen] = useState(false);

    const propertyTypes = ['All', 'Villa', 'Mansion', 'Penthouse', 'Estate', 'Modern'];

    const priceRanges = [
        { label: 'Any Price', min: 0, max: 100000000 },
        { label: 'Under AED 10M', min: 0, max: 10000000 },
        { label: 'AED 10M - AED 20M', min: 10000000, max: 20000000 },
        { label: 'AED 20M+', min: 20000000, max: 100000000 },
    ];

    return (
        <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-0 transition-all duration-300">
            <div className="text-white/50 font-sans tracking-[0.2em] text-[10px] uppercase flex items-center">
                <span className="text-white font-medium mr-2 text-xs">{propertyCount}</span> ESTATES FOUND
            </div>

            <div className="flex items-center space-x-6 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 custom-scrollbar opacity-90 hover:opacity-100 transition-opacity duration-300">

                {/* Property Type Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setIsTypeOpen(!isTypeOpen); setIsPriceOpen(false); }}
                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer group whitespace-nowrap"
                    >
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em]">
                            Type: {filters.propertyType}
                        </span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isTypeOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isTypeOpen && (
                        <div className="absolute top-full left-0 mt-4 w-48 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                            {propertyTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => { setFilters({ ...filters, propertyType: type }); setIsTypeOpen(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    {type}
                                    {filters.propertyType === type && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price Range Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => { setIsPriceOpen(!isPriceOpen); setIsTypeOpen(false); }}
                        className="flex items-center space-x-2 text-white/60 hover:text-white transition-colors duration-300 cursor-pointer group whitespace-nowrap"
                    >
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em]">
                            Price: {priceRanges.find(r => r.min === filters.minPrice && r.max === filters.maxPrice)?.label || 'Custom'}
                        </span>
                        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isPriceOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isPriceOpen && (
                        <div className="absolute top-full left-0 mt-4 w-56 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl py-2 z-50 overflow-hidden">
                            {priceRanges.map(range => (
                                <button
                                    key={range.label}
                                    onClick={() => { setFilters({ ...filters, minPrice: range.min, maxPrice: range.max }); setIsPriceOpen(false); }}
                                    className="w-full text-left px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    {range.label}
                                    {filters.minPrice === range.min && filters.maxPrice === range.max && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-px h-4 bg-white/10 mx-2 hidden sm:block"></div>

                {/* Sort Toggle */}
                <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="flex items-center space-x-2 text-white hover:text-white transition-colors duration-500 cursor-pointer group whitespace-nowrap"
                >
                    <SlidersHorizontal className="w-3 h-3 text-neutral-400 group-hover:text-white transition-colors" />
                    <span className="text-[10px] font-sans uppercase tracking-[0.2em]">
                        Sort: {sortOrder === 'desc' ? 'High to Low' : 'Low to High'}
                    </span>
                </button>
            </div>

            {/* Backdrop to close dropdowns */}
            {(isTypeOpen || isPriceOpen) && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => { setIsTypeOpen(false); setIsPriceOpen(false); }}
                />
            )}
        </div>
    );
}
