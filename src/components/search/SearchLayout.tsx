'use client';

import { useState } from 'react';
import FilterBar from './FilterBar';
import PropertyCard from './PropertyCard';
import MapWrapper from '../MapWrapper';
import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';

export default function SearchLayout() {
    const [activePropertyId, setActivePropertyId] = useState<string | null>(null);
    const properties: Property[] = propertiesData as Property[];

    return (
        <section className="relative w-full h-screen bg-[#0A0A0A] flex flex-col" id="search-engine">
            <FilterBar propertyCount={properties.length} />

            {/* Split Screen Container */}
            <div className="flex flex-1 overflow-hidden">

                {/* Left Side: Scrollable Property Listings */}
                <div className="w-full lg:w-1/2 h-full overflow-y-auto custom-scrollbar relative z-10 bg-[#0A0A0A]">
                    <div className="p-4 md:p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 md:gap-10">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onMouseEnter={setActivePropertyId}
                                onMouseLeave={() => setActivePropertyId(null)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Side: Sticky Map Desktop View */}
                <div className="hidden lg:block lg:w-1/2 h-full sticky top-0 border-l border-white/5 relative z-0">
                    <MapWrapper
                        properties={properties}
                        activePropertyId={activePropertyId}
                    />
                </div>

            </div>
        </section>
    );
}
