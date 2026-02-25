'use client';

import { useState, useEffect } from 'react';
import { Property } from '@/types/property';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SoldCardProps {
    property: Property;
}

export default function SoldCard({ property }: SoldCardProps) {
    const fallbackImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
    const [imageIndex, setImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        setImageIndex(0);
        setImageError(false);
    }, [property.id]);

    const imgSrc = imageError ? fallbackImage : (property.images[imageIndex] || fallbackImage);

    // Navigation handlers (same as PropertyCard)
    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.images.length > 1) {
            setImageIndex((prev) => (prev + 1) % property.images.length);
            setImageError(false);
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.images.length > 1) {
            setImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
            setImageError(false);
        }
    };

    return (
        <Link href={`/properties/${property.slug}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col bg-black/80 hover:bg-[#111] border border-white/10 hover:border-[#C5A880]/50 transition-all duration-700 rounded-lg overflow-hidden group cursor-pointer h-full"
            >
                {/* Image Slider Mockup */}
                <div className="relative w-full h-[300px] overflow-hidden bg-black shrink-0">
                    <motion.div
                        className="w-full h-full relative grayscale group-hover:grayscale-0 transition-all duration-700"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Image
                            src={imgSrc}
                            alt={property.title}
                            fill
                            unoptimized
                            onError={() => setImageError(true)}
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                    </motion.div>

                    {/* Subtle Vignette on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                    {/* Navigation Arrows for luxury feel */}
                    {property.images.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <button
                                onClick={handlePrevImage}
                                className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#C5A880] hover:text-black transition-all duration-500 pointer-events-auto"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-[#C5A880] hover:text-black transition-all duration-500 pointer-events-auto"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* SOLD BADGE */}
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-[#C5A880] text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full drop-shadow-md shadow-xl group-hover:bg-white transition-colors duration-500">
                        Sold
                    </div>
                </div>

                {/* Property Details */}
                <div className="p-8 flex flex-col bg-gradient-to-b from-transparent to-black/40 grow">
                    <div className="flex justify-between items-end mb-4">
                        <h3 className="text-2xl font-serif text-white/90 tracking-wide font-light">
                            ${(property.price / 1000000).toFixed(1)}M
                        </h3>
                        {/* Sold Label */}
                        <div className="text-[10px] uppercase font-sans text-white/40 tracking-[0.2em]">Recently Closed</div>
                    </div>
                    <p className="font-sans text-sm text-[#C5A880] mb-6 font-medium tracking-wider uppercase">{property.title}</p>

                    <div className="flex items-center space-x-6 text-[11px] font-sans text-white/40 tracking-[0.1em] uppercase mt-auto">
                        <span className="flex items-center">
                            <strong className="text-white/80 font-medium mr-2">{property.features.beds}</strong> BEDS
                        </span>
                        <span className="w-px h-3 bg-white/10" />
                        <span className="flex items-center">
                            <strong className="text-white/80 font-medium mr-2">{property.features.baths}</strong> BATHS
                        </span>
                        <span className="w-px h-3 bg-white/10" />
                        <span className="flex items-center">
                            <strong className="text-white/80 font-medium mr-2">{(property.features.sqft).toLocaleString()}</strong> SQ.FT.
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
