'use client';

import { motion } from 'framer-motion';
import FloatingSearchBar from './FloatingSearchBar';

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover"
                poster="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mansion-at-sunset-31295-large.mp4" type="video/mp4" />
                {/* Fallback image is purely visual from poster */}
            </video>

            {/* Gradient Overlay for legibility */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 via-black/20 to-black/80" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-24 text-center">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-wide drop-shadow-2xl max-w-5xl"
                >
                    Curating Exceptional Living
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 text-lg md:text-xl text-gray-300 font-sans font-light max-w-2xl drop-shadow-md"
                >
                    Exclusive estates and architectural masterpieces.
                </motion.p>

                <FloatingSearchBar />
            </div>
        </section>
    );
}
