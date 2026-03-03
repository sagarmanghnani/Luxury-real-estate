'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface CinematicVideoPlayerProps {
    videoUrl: string;
    coverImage: string;
    onClose: () => void;
}

export default function CinematicVideoPlayer({ videoUrl, onClose }: CinematicVideoPlayerProps) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 z-50 p-2 text-white/50 hover:text-white transition-colors"
                aria-label="Close Video"
            >
                <X className="w-8 h-8 stroke-[1.5]" />
            </button>

            <div className="w-full max-w-7xl aspect-video relative rounded-xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                <video
                    src={videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                />
            </div>
        </motion.div>
    );
}
