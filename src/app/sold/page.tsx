import Navbar from '@/components/layout/Navbar';
import propertiesData from '@/data/properties.json';
import { Property } from '@/types/property';
import SoldCard from '@/components/property/SoldCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Sold Collection | Luxe Engine',
    description: 'A curated showcase of our most significant recent transactions.',
};

export default function SoldCollectionPage() {
    // Only fetch properties with "Sold" status
    const soldProperties = (propertiesData as Property[]).filter(p => p.status === 'Sold');

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#C5A880] selection:text-black">
            <Navbar />

            <div className="pt-40 pb-20 px-6 max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="mb-20 flex flex-col items-center text-center">
                    <h1 className="text-5xl md:text-6xl font-serif font-light tracking-tight mb-6">
                        The <span className="text-[#C5A880] italic">Sold</span> Collection
                    </h1>
                    <p className="text-white/60 font-sans tracking-wide max-w-2xl font-light leading-relaxed">
                        A curated showcase of our most significant recent transactions. These architectural masterpieces represent the pinnacle of luxury living, successfully matched with discerning buyers.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {soldProperties.map((property) => (
                        <SoldCard key={property.id} property={property} />
                    ))}
                </div>

                {soldProperties.length === 0 && (
                    <div className="text-center py-32 text-white/40 font-sans tracking-widest uppercase text-sm border border-white/5 rounded-xl bg-white/[0.02]">
                        No recent transactions available.
                    </div>
                )}

                {/* Back to Home CTA */}
                <div className="mt-32 flex justify-center border-t border-white/10 pt-16">
                    <Link href="/" className="group flex items-center space-x-4 text-white hover:text-[#C5A880] transition-colors duration-300">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
                        <span className="font-sans text-sm uppercase tracking-[0.2em] font-medium">Return to Active Collection</span>
                    </Link>
                </div>
            </div>
        </main>
    );
}
