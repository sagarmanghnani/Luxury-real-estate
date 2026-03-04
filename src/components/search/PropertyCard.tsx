'use client';

import { useState } from 'react';
import { Property } from '@/types/property';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
    property: Property;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
    priority?: boolean;
}

export default function PropertyCard({ property, onMouseEnter, onMouseLeave, priority = false }: PropertyCardProps) {
    const fallbackImage = 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80';
    const [imageIndex, setImageIndex] = useState(0);

    const [imageError, setImageError] = useState(false);

    // State resets are handled by component remounts via key={property.id}

    const imgSrc = imageError ? fallbackImage : (property.media.heroImages[imageIndex] || fallbackImage);

    const handleNextImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.media.heroImages.length > 1) {
            setImageIndex((prev) => (prev + 1) % property.media.heroImages.length);
            setImageError(false);
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (property.media.heroImages.length > 1) {
            setImageIndex((prev) => (prev - 1 + property.media.heroImages.length) % property.media.heroImages.length);
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
                className="flex flex-col bg-black/40 hover:bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all duration-700 rounded-lg overflow-hidden group cursor-pointer"
                onMouseEnter={() => onMouseEnter(property.id)}
                onMouseLeave={onMouseLeave}
            >
                {/* Image Slider Mockup */}
                <div className="relative w-full h-80 overflow-hidden bg-black">
                    <motion.div
                        className="w-full h-full relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {imgSrc.match(/\.(mp4|webm)$/i) ? (
                            <video
                                src={imgSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <Image
                                src={imgSrc}
                                alt={property.title}
                                fill
                                onError={() => setImageError(true)}
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={priority}
                            />
                        )}
                    </motion.div>

                    {/* Subtle Vignette on Image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 pointer-events-none" />

                    {/* Navigation Arrows for luxury feel */}
                    {property.media.heroImages.length > 1 && (
                        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <button
                                onClick={handlePrevImage}
                                className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 pointer-events-auto"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-500 pointer-events-auto"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    <div className="absolute bottom-6 left-6 pl-4 border-l-2 border-[#C5A880] text-[10px] uppercase tracking-[0.2em] text-white/90 drop-shadow-md">
                        {property.status}
                    </div>
                </div>

                {/* Property Details */}
                <div className="p-8 flex flex-col bg-gradient-to-b from-transparent to-black/10">
                    <h3 className="text-3xl font-serif text-white tracking-wide mb-2 flex items-center justify-between font-light">
                        ${property.price.toLocaleString()}
                    </h3>
                    <p className="font-sans text-base text-white/60 mb-6 font-light tracking-wide">{property.title}</p>

                    <div className="flex items-center space-x-6 text-[11px] font-sans text-white/50 tracking-[0.15em] uppercase">
                        <span className="flex items-center">
                            <strong className="text-white font-medium mr-2">{property.features.beds}</strong> BEDS
                        </span>
                        <span className="w-px h-3 bg-white/20" />
                        <span className="flex items-center">
                            <strong className="text-white font-medium mr-2">{property.features.baths}</strong> BATHS
                        </span>
                        <span className="w-px h-3 bg-white/20" />
                        <span className="flex items-center">
                            <strong className="text-white font-medium mr-2">{(property.features.sqft).toLocaleString()}</strong> SQ.FT.
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
