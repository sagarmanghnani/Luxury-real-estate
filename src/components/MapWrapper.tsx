'use client';

import dynamic from 'next/dynamic';
import { Property } from '@/types/property';

// Dynamically import the Map component with ssr: false
// This ensures Leaflet, which relies on the window object, only loads on the client side
const DynamicMap = dynamic(() => import('./Map'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center border-l border-white/10">
            <div className="w-8 h-8 rounded-full border-t-2 border-[var(--color-accent)] animate-spin" />
        </div>
    )
});

interface MapWrapperProps {
    properties: Property[];
    hoveredPropertyId: string | null;
}

export default function MapWrapper(props: MapWrapperProps) {
    return <DynamicMap {...props} />;
}
