'use client';

import { useState } from 'react';
import FilterBar from './FilterBar';
import PropertyCard from './PropertyCard';
import MapWrapper from '../MapWrapper';
import { Property } from '@/types/property';
import propertiesData from '@/data/properties.json';

export default function SplitScreenLayout() {
    const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
    const properties: Property[] = propertiesData as Property[];

    return (
        <div className="relative w-full h-screen bg-[#0A0A0A] overflow-hidden flex flex-col pt-24" id="properties">
            {/* Optional Top Navigation Offset if doing full scroll context, but here we keep it within view */}
            <FilterBar propertyCount={properties.length} />

            <div className="flex flex-1 overflow-hidden">
                {/* Left Column - Scrollable Listings */}
                <div className="w-full lg:w-1/2 h-full overflow-y-auto custom-scrollbar relative z-10 bg-[#0A0A0A]">
                    <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8">
                        {properties.map((property) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                onHoverAction={setHoveredPropertyId}
                            />
                        ))}
                    </div>
                </div>

                {/* Right Column - Fixed Map */}
                <div className="hidden lg:block lg:w-1/2 h-full bg-[#0A0A0A] relative z-0">
                    <MapWrapper
                        properties={properties}
                        hoveredPropertyId={hoveredPropertyId}
                    />
                </div>
            </div>
        </div>
    );
}
