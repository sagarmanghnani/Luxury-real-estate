'use client';

import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';
import { Coffee, GraduationCap, Activity } from 'lucide-react';

// Fix for default Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default?.src || require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png').default?.src || require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default?.src || require('leaflet/dist/images/marker-shadow.png'),
});

const AMENITY_OFFSETS = {
    cafes: [
        { name: 'Artisan Roasters', latOffset: 0.004, lngOffset: 0.005 },
        { name: 'Morning Brew', latOffset: -0.005, lngOffset: -0.003 },
        { name: 'Cafe Luxe', latOffset: 0.006, lngOffset: -0.006 },
    ],
    schools: [
        { name: 'International Prep', latOffset: 0.012, lngOffset: 0.008 },
        { name: 'Elite Academy', latOffset: -0.010, lngOffset: -0.011 },
    ],
    medical: [
        { name: 'Premium Clinic', latOffset: 0.015, lngOffset: -0.005 },
        { name: 'General Hospital', latOffset: -0.008, lngOffset: 0.012 },
    ]
};

// Create dynamic divIcon based on active state using Tailwind classes for CSS animations
const createCustomIcon = (isActive: boolean) => {
    return new L.DivIcon({
        className: 'bg-transparent border-0',
        html: `<div class="relative flex items-center justify-center transition-all duration-300 ease-out flex-col ${isActive
            ? 'scale-150 z-50 drop-shadow-[0_0_15px_rgba(197,168,128,0.5)]'
            : 'hover:scale-110 z-0 drop-shadow-md'
            }">
            <svg viewBox="0 0 24 24" fill="${isActive ? '#C5A880' : 'rgba(10,10,10,0.95)'}" stroke="${isActive ? '#ffffff' : '#C5A880'}" stroke-width="${isActive ? '1' : '1.5'}" class="w-10 h-10 transition-all duration-300">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="3.5" fill="${isActive ? '#ffffff' : '#C5A880'}" stroke="none" />
            </svg>
        </div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

const createPoiIcon = (type: 'cafes' | 'schools' | 'medical') => {
    let iconSvg = '';
    let bgColor = '';
    if (type === 'cafes') {
        bgColor = '#8B5A2B';
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:16px;height:16px;"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`;
    } else if (type === 'schools') {
        bgColor = '#2B5A8B';
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:16px;height:16px;"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
    } else {
        bgColor = '#8B2B2B';
        iconSvg = `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" style="width:16px;height:16px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`;
    }

    return new L.DivIcon({
        className: 'bg-transparent border-0',
        html: `<div class="relative flex items-center justify-center transition-all duration-300 ease-out hover:scale-110 drop-shadow-md z-40" style="background-color: ${bgColor}; width: 28px; height: 28px; border-radius: 50%; border: 2px solid white;">
            ${iconSvg}
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -14],
    });
};

// Component to handle map view updates based on hover state
function MapController({ activeProperty, properties }: { activeProperty?: Property, properties: Property[] }) {
    const map = useMap();

    useEffect(() => {
        if (activeProperty) {
            const targetLatLng = L.latLng(activeProperty.coordinates.lat, activeProperty.coordinates.lng);
            const currentCenter = map.getCenter();
            const distance = currentCenter.distanceTo(targetLatLng);

            // If the property is more than 50km away, fly to it to avoid a hyper-speed pan across the globe
            if (distance > 50000) {
                map.flyTo(targetLatLng, 12, {
                    animate: true,
                    duration: 1.5
                });
            } else {
                // For nearby properties, a quick pan is snappier and feels better
                map.panTo(targetLatLng, {
                    animate: true,
                    duration: 0.8,
                    easeLinearity: 0.1
                });
            }
        }
    }, [activeProperty, map]);

    return null;
}

interface MapProps {
    properties: Property[];
    activePropertyId: string | null;
}

export default function Map({ properties, activePropertyId }: MapProps) {
    const mapRef = useRef<L.Map>(null);
    const [toggles, setToggles] = useState({
        cafes: false,
        schools: false,
        medical: false
    });

    // Find active property for controller
    const activeProperty = properties.find(p => p.id === activePropertyId);

    // Determine the center for calculating POIs (use active property, or the first property)
    const centerForPois = activeProperty || properties[0] || { coordinates: { lat: 34.05, lng: -118.5 } };

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="w-full h-full relative border-l border-white/10 z-0 flex">
            {/* Amenities Floating Panel */}
            <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2 pointer-events-auto">
                <div className="bg-black/80 backdrop-blur-md border border-[#C5A880]/30 p-4 rounded-xl shadow-2xl">
                    <h3 className="text-[#C5A880] text-xs font-semibold uppercase tracking-widest mb-4">Local Amenities</h3>
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={() => handleToggle('cafes')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${toggles.cafes ? 'bg-[#8B5A2B]/20 text-[#C5A880] border border-[#8B5A2B]/50' : 'bg-transparent text-white/60 hover:text-white border border-transparent hover:bg-white/5'}`}
                        >
                            <Coffee className="w-4 h-4" />
                            <span className="text-sm font-medium">Cafes & Dining</span>
                        </button>
                        <button
                            onClick={() => handleToggle('schools')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${toggles.schools ? 'bg-[#2B5A8B]/20 text-[#60A5FA] border border-[#2B5A8B]/50' : 'bg-transparent text-white/60 hover:text-white border border-transparent hover:bg-white/5'}`}
                        >
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-sm font-medium">Schools</span>
                        </button>
                        <button
                            onClick={() => handleToggle('medical')}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${toggles.medical ? 'bg-[#8B2B2B]/20 text-[#F87171] border border-[#8B2B2B]/50' : 'bg-transparent text-white/60 hover:text-white border border-transparent hover:bg-white/5'}`}
                        >
                            <Activity className="w-4 h-4" />
                            <span className="text-sm font-medium">Medical</span>
                        </button>
                    </div>
                </div>
            </div>

            <MapContainer
                center={[34.05, -118.5]} // Default LA center
                zoom={10}
                scrollWheelZoom={false}
                className="w-full h-full bg-[#0a0a0a]"
                ref={mapRef}
            >
                {/* CartoDB Dark Matter Tiles - Free, No API Key, Premium Dark Aesthetic */}
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {/* Primary Property Markers */}
                {properties.map((property) => {
                    const isActive = activePropertyId === property.id;
                    return (
                        <Marker
                            key={property.id}
                            position={[property.coordinates.lat, property.coordinates.lng]}
                            icon={createCustomIcon(isActive)}
                            zIndexOffset={isActive ? 1000 : 0}
                        >
                            <Popup className="luxury-popup">
                                <a href={`/properties/${property.slug}`} style={{ textDecoration: 'none' }}>
                                    <div style={{ padding: '4px', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
                                        <strong style={{ display: 'block', fontSize: '14px', marginBottom: '4px', color: '#000' }}>
                                            ${(property.price / 1000000).toFixed(1)}M
                                        </strong>
                                        <span style={{ color: '#C5A880', fontSize: '12px', fontWeight: 'bold' }}>View Details &rarr;</span>
                                    </div>
                                </a>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* POI Markers */}
                {['cafes', 'schools', 'medical'].map((type) => {
                    const amenityType = type as keyof typeof toggles;
                    if (!toggles[amenityType]) return null;

                    return AMENITY_OFFSETS[amenityType].map((poi, idx) => {
                        const lat = centerForPois.coordinates.lat + poi.latOffset;
                        const lng = centerForPois.coordinates.lng + poi.lngOffset;
                        return (
                            <Marker
                                key={`${type}-${idx}`}
                                position={[lat, lng]}
                                icon={createPoiIcon(amenityType)}
                                zIndexOffset={500}
                            >
                                <Popup className="luxury-popup amenity-popup">
                                    <div style={{ padding: '2px', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
                                        <strong style={{ display: 'block', fontSize: '13px', color: '#000' }}>
                                            {poi.name}
                                        </strong>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    });
                })}

                <MapController activeProperty={activeProperty} properties={properties} />
            </MapContainer>

            {/* Overlays to preserve contrast on edges */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent pointer-events-none z-[900]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent pointer-events-none z-[900]" />

            {/* Global styles for leaflet popup customization since we can't easily use tailwind inside it */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .leaflet-container {
          background-color: #0a0a0a !important;
        }
        /* Smooth marker transitions */
        .leaflet-marker-icon {
            transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .luxury-popup .leaflet-popup-content-wrapper {
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(8px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
          color: #111;
        }
        .luxury-popup .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.9);
        }
        .amenity-popup .leaflet-popup-content-wrapper {
          padding: 2px 4px;
        }
        .amenity-popup .leaflet-popup-content {
          margin: 8px 10px;
        }
      `}} />
        </div>
    );
}
