import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';
import { VirtualTour } from '@/components/property/VirtualTour';
import { NeighborhoodDataPanel } from '@/components/property/NeighborhoodDataPanel';
import { BedDouble, Bath, SquareSigma, MapPin } from 'lucide-react';

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
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(property.price);

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            {/* Hero Image Section */}
            <div className="relative w-full h-[60vh] md:h-[75vh]">
                <Image
                    src={property.images[0]}
                    alt={property.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Title and Key Details Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 md:pb-16 max-w-7xl mx-auto space-y-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-semibold uppercase tracking-widest text-white">{property.status}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tight leading-tight">{property.title}</h1>
                            <div className="flex items-center text-neutral-300 text-sm md:text-base gap-2">
                                <MapPin className="w-4 h-4" />
                                <p>{property.address}</p>
                            </div>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-1">Asking Price</p>
                            <p className="text-4xl md:text-5xl font-light tracking-tight">{formattedPrice}</p>
                        </div>
                    </div>
                </div>
            </div>

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

                    {/* Description (Placeholder for now) */}
                    <section className="space-y-6 text-neutral-300 leading-relaxed font-light text-lg">
                        <h2 className="text-2xl font-semibold tracking-wide uppercase text-white">About The Property</h2>
                        <p>
                            Experience the epitome of luxury living in this architectural masterpiece.
                            Every detail has been meticulously curated to offer an unparalleled lifestyle of comfort and elegance.
                            Floor-to-ceiling glass walls seamlessly blend the indoor and outdoor spaces, offering sweeping, majestic views of the surrounding landscape.
                        </p>
                        <p>
                            The state-of-the-art chef's kitchen features imported Italian marble countertops, custom cabinetry, and top-of-the-line appliances.
                            Retreat to the opulent primary suite, complete with a spa-like bathroom, dual vanity sinks, and an expansive walk-in closet.
                            Step outside to your private oasis, highlighted by a zero-edge infinity pool and meticulously landscaped grounds, perfect for extravagant entertaining or quiet reflection.
                        </p>
                    </section>

                </div>

                {/* Sidebar Column (Lead Gen / Agent Info) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-12 bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
                        <h3 className="text-xl font-semibold mb-6 uppercase tracking-wider text-white">Interested in this property?</h3>
                        <p className="text-neutral-400 mb-8 font-light">Contact our premier agents to schedule a private viewing or to request more information.</p>

                        <form className="space-y-4">
                            <input type="text" placeholder="Full Name" className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors" />
                            <input type="email" placeholder="Email Address" className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors" />
                            <input type="tel" placeholder="Phone Number" className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors" />
                            <textarea placeholder="Message" rows={4} className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors resize-none"></textarea>

                            <button type="button" className="w-full bg-white text-black font-semibold py-4 rounded-lg hover:bg-neutral-200 transition-colors uppercase tracking-widest text-sm mt-4">
                                Request Details
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </main>
    );
}
