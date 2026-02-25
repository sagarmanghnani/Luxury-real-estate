'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Property } from '@/types/property';

// Fix for default Leaflet icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default?.src || require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png').default?.src || require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default?.src || require('leaflet/dist/images/marker-shadow.png'),
});

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

    // Find active property for controller
    const activeProperty = properties.find(p => p.id === activePropertyId);

    return (
        <div className="w-full h-full relative border-l border-white/10 z-0">
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

                <MapController activeProperty={activeProperty} properties={properties} />
            </MapContainer>

            {/* Overlays to preserve contrast on edges */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#0a0a0a]/80 to-transparent pointer-events-none z-[1000]" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent pointer-events-none z-[1000]" />

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
      `}} />
        </div>
    );
}
