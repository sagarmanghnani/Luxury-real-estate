'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PropertyMedia } from '@/types/property';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ImmersiveLightboxProps {
    media: PropertyMedia;
    onClose: () => void;
}

export default function ImmersiveLightbox({ media, onClose }: ImmersiveLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Disable body scroll when open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, onClose]); // Ensure we have latest state

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % media.gallery.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + media.gallery.length) % media.gallery.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-50 p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Close Gallery"
            >
                <X className="w-8 h-8 stroke-[1.5]" />
            </button>

            <div className="absolute top-8 left-8 z-50 text-white/50 font-sans text-sm tracking-[0.2em] font-light">
                {currentIndex + 1} / {media.gallery.length}
            </div>

            {media.gallery.length > 1 && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute left-8 z-50 p-4 text-white/30 hover:text-white transition-colors group"
                        aria-label="Previous Image"
                    >
                        <ChevronLeft className="w-12 h-12 stroke-[1] group-hover:-translate-x-2 transition-transform" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-8 z-50 p-4 text-white/30 hover:text-white transition-colors group"
                        aria-label="Next Image"
                    >
                        <ChevronRight className="w-12 h-12 stroke-[1] group-hover:translate-x-2 transition-transform" />
                    </button>
                </>
            )}

            <div className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src={media.gallery[currentIndex]}
                            alt={`Gallery image ${currentIndex + 1}`}
                            fill
                            className="object-contain"
                            sizes="100vw"
                            priority
                            unoptimized
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
