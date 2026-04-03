'use client';

import { motion } from 'framer-motion';
import FloatingSearchBar from './FloatingSearchBar';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Optimized Preloaded Background Image (Acts as Poster) */}
            <Image
                src="/images/reliable/img_7ec0641a36a8.jpg"
                alt="Luxury Estate"
                fill
                priority
                quality={60}
                className="object-cover"
                sizes="100vw"
            />
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-mansion-at-sunset-31295-large.mp4" type="video/mp4" />
            </video>

            {/* Gradient Overlay for legibility & cinematic vignette */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none mix-blend-multiply" />

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-24 text-center">
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif text-white uppercase tracking-[0.15em] drop-shadow-2xl max-w-6xl leading-tight font-light"
                >
                    Curating Exceptional Living
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 text-lg md:text-xl text-white/70 font-sans font-light max-w-2xl drop-shadow-lg tracking-wide"
                >
                    Exclusive estates and architectural masterpieces.
                </motion.p>

                <FloatingSearchBar />
            </div>
        </section>
    );
}
