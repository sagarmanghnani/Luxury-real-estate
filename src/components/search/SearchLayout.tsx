'use client';

import { useState, useMemo, useEffect } from 'react';
import FilterBar from './FilterBar';
import PropertyCard from './PropertyCard';
import MapWrapper from '../MapWrapper';
import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';

export type Filters = {
    propertyType: string;
    minPrice: number;
    maxPrice: number;
    minBeds: number;
    location?: string;
};

export default function SearchLayout() {
    const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
    const properties: Property[] = propertiesData as Property[];

    const [filters, setFilters] = useState<Filters>({
        propertyType: 'All',
        minPrice: 0,
        maxPrice: 100000000,
        minBeds: 0,
        location: 'All',
    });

    useEffect(() => {
        const handleUpdateFilters = (event: Event) => {
            const customEvent = event as CustomEvent;
            if (customEvent.detail) {
                setFilters((prev) => ({
                    ...prev,
                    propertyType: customEvent.detail.propertyType ?? prev.propertyType,
                    minPrice: customEvent.detail.minPrice ?? prev.minPrice,
                    maxPrice: customEvent.detail.maxPrice ?? prev.maxPrice,
                    location: customEvent.detail.location ?? prev.location,
                }));
            }
        };

        window.addEventListener('update-filters', handleUpdateFilters);
        return () => window.removeEventListener('update-filters', handleUpdateFilters);
    }, []);

    const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

    const filteredProperties = useMemo(() => {
        let result = properties.filter((p) => {
            if (filters.propertyType !== 'All' && p.propertyType !== filters.propertyType) return false;
            if (p.price < filters.minPrice || p.price > filters.maxPrice) return false;
            if (filters.minBeds > 0 && p.features.beds < filters.minBeds) return false;
            if (filters.location && filters.location !== 'All') {
                // simple location match: check if location string is in address
                const locationQuery = filters.location.split(',')[0].trim();
                if (!p.address.includes(locationQuery)) return false;
            }
            return true;
        });

        result.sort((a, b) => {
            if (sortOrder === 'desc') return b.price - a.price;
            return a.price - b.price;
        });

        return result;
    }, [properties, filters, sortOrder]);

    return (
        <section className="relative w-full h-screen bg-[#0A0A0A] flex flex-col" id="search-engine">
            <FilterBar
                propertyCount={filteredProperties.length}
                filters={filters}
                setFilters={setFilters}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            {/* Split Screen Container */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left Side: Scrollable Property Listings */}
                <div className="w-full lg:w-1/2 h-full overflow-y-auto custom-scrollbar relative z-10 bg-[#0A0A0A]">
                    <div className="p-4 md:p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
                        {filteredProperties.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-neutral-500 font-light">
                                <p className="text-xl">No properties match your exact criteria.</p>
                                <button
                                    onClick={() => setFilters({ propertyType: 'All', minPrice: 0, maxPrice: 100000000, minBeds: 0, location: 'All' })}
                                    className="mt-4 text-white underline hover:text-neutral-300 transition-colors"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : (
                            filteredProperties.map((property) => (
                                <PropertyCard
                                    key={property.id}
                                    property={property}
                                    onMouseEnter={setActivePropertyId}
                                    onMouseLeave={() => setActivePropertyId(null)}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* Right Side: Sticky Map Desktop View */}
                <div className="hidden lg:block lg:w-1/2 h-full sticky top-0 border-l border-white/5 relative z-0">
                    <MapWrapper
                        properties={filteredProperties}
                        activePropertyId={activePropertyId}
                    />
                </div>

            </div>
        </section>
    );
}
