'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Property } from '@/types/property';
import { MapPin, Expand, Play } from 'lucide-react';
import dynamic from 'next/dynamic';

const ImmersiveLightbox = dynamic(() => import('./ImmersiveLightbox'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-[#C5A880] animate-spin" /></div>
});

const CinematicVideoPlayer = dynamic(() => import('./CinematicVideoPlayer'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"><div className="w-8 h-8 rounded-full border-t-2 border-white animate-spin" /></div>
});

interface HeroGalleryProps {
    property: Property;
}

export function HeroGallery({ property }: HeroGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        if (property.media.heroImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % property.media.heroImages.length);
        }, 5000); // Crossfade every 5 seconds
        return () => clearInterval(interval);
    }, [property.media.heroImages]);

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <>
            <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden bg-black">
                {/* Auto-crossfade Hero Images */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={property.media.heroImages[currentImageIndex]}
                            alt={property.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 md:pb-16 max-w-7xl mx-auto space-y-4 pointer-events-none">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 pointer-events-auto">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-white">{property.status}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight leading-tight text-white">{property.title}</h1>
                            <div className="flex items-center text-neutral-300 text-sm md:text-base gap-2">
                                <MapPin className="w-4 h-4" />
                                <p>{property.address}</p>
                            </div>
                        </div>

                        <div className="text-left md:text-right flex flex-col md:items-end gap-4">
                            <div>
                                <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-1">Asking Price</p>
                                <p className="text-4xl md:text-5xl font-light tracking-tight text-white">{formattedPrice}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-3 pointer-events-auto">
                                {property.media.cinematicVideo && (
                                    <button
                                        onClick={() => setIsVideoOpen(true)}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium transition-all group"
                                    >
                                        <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                                        <span>Watch Film</span>
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsLightboxOpen(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium transition-all group"
                                >
                                    <Expand className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    <span>View Gallery ({property.media.gallery.length})</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals placed via AnimatePresence */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <ImmersiveLightbox
                        media={property.media}
                        onClose={() => setIsLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isVideoOpen && property.media.cinematicVideo && (
                    <CinematicVideoPlayer
                        videoUrl={property.media.cinematicVideo}
                        coverImage={property.media.heroImages[0]}
                        onClose={() => setIsVideoOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
