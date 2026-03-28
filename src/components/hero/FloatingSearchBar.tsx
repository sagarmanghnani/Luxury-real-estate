'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Check } from 'lucide-react';

const propertyTypes = ['All', 'Villa', 'Mansion', 'Penthouse', 'Estate', 'Modern'];

const priceRanges = [
    { label: 'Any Price', min: 0, max: 100000000 },
    { label: 'Under AED 10M', min: 0, max: 10000000 },
    { label: 'AED 10M - AED 20M', min: 10000000, max: 20000000 },
    { label: 'AED 20M+', min: 20000000, max: 100000000 },
];

const locations = ['Any Location', 'Emirates Hills, Dubai', 'Palm Jumeirah, Dubai', 'Downtown Dubai', 'Dubai Marina', 'Al Barari, Dubai', 'Business Bay, Dubai', 'Jumeirah Golf Estates'];

export default function FloatingSearchBar() {
    const [location, setLocation] = useState(locations[0]);
    const [propertyType, setPropertyType] = useState(propertyTypes[0]);
    const [priceRange, setPriceRange] = useState(priceRanges[0]);

    const [openDropdown, setOpenDropdown] = useState<'location' | 'type' | 'price' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = () => {
        const event = new CustomEvent('update-filters', {
            detail: {
                propertyType: propertyType,
                minPrice: priceRange.min,
                maxPrice: priceRange.max,
                location: location === 'Any Location' ? 'All' : location
            }
        });
        window.dispatchEvent(event);

        const searchEngine = document.getElementById('search-engine');
        if (searchEngine) {
            searchEngine.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 1.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            ref={containerRef}
            className="mt-12 md:mt-16 w-[calc(100%-2rem)] md:w-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-full flex flex-col md:flex-row items-center max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative z-30"
        >
            {/* Location Dropdown */}
            <div className="flex-1 w-full relative">
                <div
                    onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
                    className="w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group rounded-t-2xl md:rounded-l-full md:rounded-tr-none"
                >
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Location</span>
                        <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-[150px]">{location}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/30 group-hover:text-white transition-all duration-500 ${openDropdown === 'location' ? 'rotate-180 text-white' : ''}`} />
                </div>

                <AnimatePresence>
                    {openDropdown === 'location' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-4 w-full md:w-64 bg-neutral-900 border border-neutral-800 md:rounded-xl shadow-2xl py-2 z-50 overflow-hidden max-h-64 overflow-y-auto custom-scrollbar"
                        >
                            {locations.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => { setLocation(loc); setOpenDropdown(null); }}
                                    className="w-full text-left px-6 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    {loc}
                                    {location === loc && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Property Type Dropdown */}
            <div className="flex-1 w-full relative">
                <div
                    onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
                    className="w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group"
                >
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Property Type</span>
                        <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500">{propertyType}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/30 group-hover:text-white transition-all duration-500 ${openDropdown === 'type' ? 'rotate-180 text-white' : ''}`} />
                </div>

                <AnimatePresence>
                    {openDropdown === 'type' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 mt-4 w-full md:w-56 bg-neutral-900 border border-neutral-800 md:rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                        >
                            {propertyTypes.map(type => (
                                <button
                                    key={type}
                                    onClick={() => { setPropertyType(type); setOpenDropdown(null); }}
                                    className="w-full text-left px-6 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    {type}
                                    {propertyType === type && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Price Range Dropdown */}
            <div className="flex-1 w-full relative">
                <div
                    onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
                    className="w-full flex items-center justify-between px-8 py-5 cursor-pointer hover:bg-white/[0.08] transition-all duration-500 group"
                >
                    <div className="flex flex-col text-left">
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 font-sans mb-1">Price Range</span>
                        <span className="text-white font-serif text-lg sm:text-xl group-hover:text-[var(--color-accent)] transition-colors duration-500">{priceRange.label === 'Any Price' ? 'Any' : priceRange.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-white/30 group-hover:text-white transition-all duration-500 ${openDropdown === 'price' ? 'rotate-180 text-white' : ''}`} />
                </div>

                <AnimatePresence>
                    {openDropdown === 'price' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-full left-0 md:left-auto md:right-0 mt-4 w-full md:w-64 bg-neutral-900 border border-neutral-800 md:rounded-xl shadow-2xl py-2 z-50 overflow-hidden"
                        >
                            {priceRanges.map(range => (
                                <button
                                    key={range.label}
                                    onClick={() => { setPriceRange(range); setOpenDropdown(null); }}
                                    className="w-full text-left px-6 py-3 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-between"
                                >
                                    {range.label}
                                    {priceRange.label === range.label && <Check className="w-4 h-4 text-white" />}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button
                onClick={handleSearch}
                className="w-full md:w-auto h-full px-10 py-5 md:py-0 bg-[var(--color-accent)] hover:bg-white text-black flex items-center justify-center transition-all duration-500 group rounded-b-2xl md:rounded-r-full md:rounded-bl-none self-stretch"
            >
                <span className="uppercase tracking-widest text-sm font-medium mr-3 md:hidden">Search</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </button>
        </motion.div>
    );
}
