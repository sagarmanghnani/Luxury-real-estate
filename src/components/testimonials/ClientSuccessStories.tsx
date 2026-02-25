'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        quote: "The level of discretion and market knowledge provided was unparalleled. They secured our dream estate before it even hit the market.",
        author: "James & Sarah M.",
        role: "CEO, Tech Ventures",
    },
    {
        id: 2,
        quote: "Selling a legacy property requires nuance. The Luxe Engine team handled every detail with flawless execution and achieved a record price.",
        author: "Elena R.",
        role: "International Developer",
    },
    {
        id: 3,
        quote: "From the initial consultation to closing, the experience was effortlessly premium. A masterclass in high-end real estate representation.",
        author: "David L.",
        role: "Private Investor",
    }
];

export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <div className="relative w-full max-w-5xl mx-auto py-24 px-6 md:px-12">
            <div className="flex justify-center mb-10">
                <Quote className="w-12 h-12 text-[#C5A880]/30" />
            </div>

            <div className="relative h-[250px] md:h-[200px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className="absolute w-full text-center"
                    >
                        <p className="font-serif text-2xl md:text-4xl font-light leading-snug md:leading-relaxed text-white/90 mb-10 max-w-4xl mx-auto">
                            "{testimonials[currentIndex].quote}"
                        </p>
                        <div className="flex flex-col items-center">
                            <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.25em] text-[#C5A880] mb-2 font-medium">
                                {testimonials[currentIndex].author}
                            </span>
                            <span className="font-sans text-xs text-white/40 tracking-widest font-light">
                                {testimonials[currentIndex].role}
                            </span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-center items-center gap-8 mt-16">
                <button
                    onClick={handlePrevious}
                    className="p-3 rounded-full border border-white/10 text-white/60 hover:text-black hover:bg-[#C5A880] hover:border-[#C5A880] transition-all duration-300"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-4">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'bg-[#C5A880] w-8' : 'bg-white/20 hover:bg-white/40 w-1.5'}`}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    className="p-3 rounded-full border border-white/10 text-white/60 hover:text-black hover:bg-[#C5A880] hover:border-[#C5A880] transition-all duration-300"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
