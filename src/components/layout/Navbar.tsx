'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 md:py-6 flex items-center justify-between"
        >
            {/* Brand logo */}
            <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-serif tracking-widest text-white uppercase drop-shadow-md">
                    Luxe Engine
                </Link>
            </div>

            {/* Navigation Links and CTA */}
            <div className="flex items-center space-x-8">
                <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-sans text-white/90 font-medium items-center">
                    <Link href="#properties" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                        Properties
                    </Link>
                    <Link href="#agents" className="hover:text-[var(--color-accent)] transition-colors duration-300">
                        Agents
                    </Link>
                    <Link href="/sold" className="px-4 py-1.5 border border-[#C5A880]/30 hover:border-[#C5A880] text-[#C5A880] rounded hover:bg-[#C5A880]/10 transition-all duration-300 font-bold tracking-[0.2em] text-xs">
                        [ Sold Portfolio ]
                    </Link>
                </div>

                {/* WhatsApp Icon Wrapper */}
                <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-[var(--color-accent)] transition-all duration-300"
                    aria-label="Contact us on WhatsApp"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-5 h-5 text-white"
                    >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                    </svg>
                </a>
            </div>
        </motion.nav>
    );
}
