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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col bg-[#111] border border-white/5 hover:border-[var(--color-accent)]/50 transition-colors duration-300 rounded-sm overflow-hidden group cursor-pointer"
            onMouseEnter={() => onHoverAction(property.id)}
            onMouseLeave={() => onHoverAction(null)}
        >
            {/* Image Slider Mockup */}
            <div className="relative w-full h-72 overflow-hidden bg-black">
                <img
                    src={property.images[0]}
                    alt={property.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Navigation Arrows for luxury feel */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-xs uppercase tracking-widest px-3 py-1 text-white border border-white/10 rounded-full">
                    {property.status}
                </div>
            </div>

            {/* Property Details */}
            <div className="p-6 flex flex-col">
                <h3 className="text-2xl font-serif text-white tracking-wide mb-1 flex items-center justify-between">
                    ${property.price.toLocaleString()}
                </h3>
                <p className="font-sans text-lg text-white/90 mb-4">{property.title}</p>

                <div className="flex items-center space-x-4 text-sm font-sans text-white/60 tracking-wider">
                    <span className="flex items-center">
                        <strong className="text-white font-medium mr-1">{property.features.beds}</strong> Beds
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center">
                        <strong className="text-white font-medium mr-1">{property.features.baths}</strong> Baths
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center">
                        <strong className="text-white font-medium mr-1">{(property.features.sqft).toLocaleString()}</strong> Sq.Ft.
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
