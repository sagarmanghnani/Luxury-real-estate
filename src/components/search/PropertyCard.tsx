'use client';

import { Property } from '@/types/property';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyCardProps {
    property: Property;
    onHoverAction: (id: string | null) => void;
}

export default function PropertyCard({ property, onHoverAction }: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col bg-black/40 hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 rounded-lg overflow-hidden group cursor-pointer"
            onMouseEnter={() => onHoverAction(property.id)}
            onMouseLeave={() => onHoverAction(null)}
        >
            {/* Image Slider Mockup */}
            <div className="relative w-full h-80 overflow-hidden bg-black">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-1000 ease-[0.25,1,0.5,1]"
                />

                {/* Subtle Vignette on Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Navigation Arrows for luxury feel */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white text-white hover:text-black transition-all duration-500">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white text-white hover:text-black transition-all duration-500">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="absolute bottom-6 left-6 pl-4 border-l-2 border-[var(--color-accent)] text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                    {property.status}
                </div>
            </div>

            {/* Property Details */}
            <div className="p-8 flex flex-col">
                <h3 className="text-3xl font-serif text-white tracking-wide mb-2 flex items-center justify-between font-light">
                    ${property.price.toLocaleString()}
                </h3>
                <p className="font-sans text-base text-white/60 mb-6 font-light tracking-wide">{property.title}</p>

                <div className="flex items-center space-x-6 text-[11px] font-sans text-white/50 tracking-[0.15em] uppercase">
                    <span className="flex items-center">
                        <strong className="text-white font-normal mr-2">{property.features.beds}</strong> BEDS
                    </span>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="flex items-center">
                        <strong className="text-white font-normal mr-2">{property.features.baths}</strong> BATHS
                    </span>
                    <span className="w-px h-3 bg-white/20" />
                    <span className="flex items-center">
                        <strong className="text-white font-normal mr-2">{(property.features.sqft).toLocaleString()}</strong> SQ.FT.
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
