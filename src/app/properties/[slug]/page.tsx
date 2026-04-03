import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/types/property';
import propertiesData from '@/data';
import { VirtualTour } from '@/components/property/VirtualTour';
import { HeroGallery } from '@/components/property/HeroGallery';
import { BentoGrid } from '@/components/property/BentoGrid';
import { NeighborhoodDataPanel } from '@/components/property/NeighborhoodDataPanel';
import { RentalYieldCalculator } from '@/components/property/RentalYieldCalculator';
import { LeadCaptureSidebar } from '@/components/property/LeadCaptureSidebar';
import { AgentCard } from '@/components/property/AgentCard';
import { BedDouble, Bath, SquareSigma, MapPin, ChevronLeft } from 'lucide-react';

// Next.js feature for Static Site Generation
export async function generateStaticParams() {
    return propertiesData.map((property) => ({
        slug: property.slug,
    }));
}

export default async function PropertyPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const property = propertiesData.find((p) => p.slug === resolvedParams.slug) as Property;

    if (!property) {
        notFound();
    }

    // Format price
    const formattedPrice = new Intl.NumberFormat('en-AE', {
        style: 'currency',
        currency: 'AED',
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <main className="min-h-screen bg-black text-white pb-24 relative">
            {/* Back Button */}
            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white text-sm font-medium shadow-xl transition-all hover:scale-105"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Search
                </Link>
            </div>

            {/* Hero Image Section */}
            <HeroGallery property={property} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Content Column */}
                <div className="lg:col-span-2 space-y-16">

                    {/* Property Features Bar */}
                    <div className="flex flex-wrap gap-8 items-center py-6 border-y border-neutral-800">
                        <div className="flex items-center gap-3 text-neutral-300">
                            <BedDouble className="w-6 h-6 text-neutral-500" />
                            <span className="text-xl font-light"><span className="font-semibold text-white">{property.features.beds}</span> Beds</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-300">
                            <Bath className="w-6 h-6 text-neutral-500" />
                            <span className="text-xl font-light"><span className="font-semibold text-white">{property.features.baths}</span> Baths</span>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-300">
                            <SquareSigma className="w-6 h-6 text-neutral-500" />
                            <span className="text-xl font-light"><span className="font-semibold text-white">{property.features.sqft.toLocaleString()}</span> Sq Ft</span>
                        </div>
                    </div>

                    {/* Virtual Tour Section */}
                    {property.virtualTourUrl && (
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-semibold tracking-wide uppercase">Immersive 3D Tour</h2>
                                <div className="hidden md:flex items-center gap-2 text-xs text-neutral-400 font-medium uppercase tracking-widest">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    Powered by Matterport
                                </div>
                            </div>
                            <VirtualTour url={property.virtualTourUrl} />
                        </section>
                    )}

                    {/* Neighborhood Data Section */}
                    {property.neighborhood && (
                        <section className="space-y-6">
                            <NeighborhoodDataPanel data={property.neighborhood} />
                        </section>
                    )}

                    {/* ROI & Rental Yield Calculator */}
                    <section className="space-y-6 pt-6 border-t border-neutral-800">
                        <RentalYieldCalculator propertyPrice={property.price} />
                    </section>

                    {/* Description (Placeholder for now) */}
                    <section className="space-y-6 text-neutral-300 leading-relaxed font-light text-lg">
                        <h2 className="text-2xl font-semibold tracking-wide uppercase text-white">About The Property</h2>
                        <p>
                            Experience the epitome of luxury living in this architectural masterpiece.
                            Every detail has been meticulously curated to offer an unparalleled lifestyle of comfort and elegance.
                            Floor-to-ceiling glass walls seamlessly blend the indoor and outdoor spaces, offering sweeping, majestic views of the surrounding landscape.
                        </p>

                        {/* Distinctive Bento Grid Image Layout */}
                        {property.media.gallery.length >= 6 && (
                            <BentoGrid images={property.media.gallery.slice(3, 6)} />
                        )}

                        <p>
                            The state-of-the-art chef&apos;s kitchen features imported Italian marble countertops, custom cabinetry, and top-of-the-line appliances.
                            Retreat to the opulent primary suite, complete with a spa-like bathroom, dual vanity sinks, and an expansive walk-in closet.
                            Step outside to your private oasis, highlighted by a zero-edge infinity pool and meticulously landscaped grounds, perfect for extravagant entertaining or quiet reflection.
                        </p>
                    </section>

                </div>

                {/* Sidebar Column (Lead Gen / Agent Info) */}
                <div className="lg:col-span-1 relative z-50">
                    <div className="sticky top-12">
                        <LeadCaptureSidebar
                            propertySlug={property.slug}
                            propertyTitle={property.title}
                        />
                        <AgentCard />
                    </div>
                </div>

            </div>
        </main>
    );
}
