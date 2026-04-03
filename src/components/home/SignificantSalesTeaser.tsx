'use client';

import { motion } from 'framer-motion';
import propertiesData from '@/data';
import { Property } from '@/types/property';
import SoldCard from '@/components/property/SoldCard';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function SignificantSalesTeaser() {
    // Get up to 3 properties with "Sold" status
    const soldProperties = (propertiesData as Property[])
        .filter(p => p.status === 'Sold')
        .slice(0, 3);

    if (soldProperties.length === 0) return null;

    return (
        <section className="py-32 px-6 bg-black relative border-t border-white/5">
            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 border border-[#C5A880]/30 rounded-full bg-[#C5A880]/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A880] font-medium">Track Record</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight">
                            Significant <span className="text-[#C5A880] italic">Sales</span>
                        </h2>
                    </div>

                    <Link href="/sold" className="group flex items-center gap-3 text-sm uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-300">
                        <span className="font-medium">View Portfolio</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {soldProperties.map((property, idx) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.15, ease: "easeOut" }}
                        >
                            <SoldCard property={property} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
