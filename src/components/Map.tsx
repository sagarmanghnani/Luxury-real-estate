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

// Create a custom luxury gold icon
const goldIcon = new L.Icon({
    ...L.Icon.Default.prototype.options,
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#C5A880" width="32" height="32">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  `),
    iconRetinaUrl: undefined,
    shadowUrl: undefined,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
});

// Create an active (hovered) icon state with a more dramatic pulse
const activeGoldIcon = new L.Icon({
    ...goldIcon.options,
    iconUrl: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" width="56" height="56">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path filter="url(#glow)" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      <circle cx="12" cy="9" r="8" fill="none" stroke="#C5A880" stroke-width="2" opacity="0.8"/>
      <circle cx="12" cy="9" r="12" fill="none" stroke="#C5A880" stroke-width="0.5" opacity="0.4"/>
    </svg>
  `),
    iconSize: [56, 56],
    iconAnchor: [28, 56],
    popupAnchor: [0, -56],
});

// Component to handle map view updates based on hover state
function MapController({ hoveredProperty, properties }: { hoveredProperty?: Property, properties: Property[] }) {
    const map = useMap();

    useEffect(() => {
        if (hoveredProperty) {
            // Using panTo instead of flyTo for a snappier, more robust "app-like" feel
            // flyTo can feel sluggish if the user hovers rapidly between cards
            map.panTo([hoveredProperty.coordinates.lat, hoveredProperty.coordinates.lng], {
                animate: true,
                duration: 0.8,
                easeLinearity: 0.1
            });
        }
    }, [hoveredProperty, map]);

    return null;
}

interface MapProps {
    properties: Property[];
    hoveredPropertyId: string | null;
}

export default function Map({ properties, hoveredPropertyId }: MapProps) {
    const mapRef = useRef<L.Map>(null);

    // Find hovered property for controller
    const hoveredProperty = properties.find(p => p.id === hoveredPropertyId);

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
                    const isActive = hoveredPropertyId === property.id;
                    return (
                        <Marker
                            key={property.id}
                            position={[property.coordinates.lat, property.coordinates.lng]}
                            icon={isActive ? activeGoldIcon : goldIcon}
                            zIndexOffset={isActive ? 1000 : 0}
                        >
                            <Popup className="luxury-popup">
                                <div style={{ padding: '4px', fontFamily: 'ui-sans-serif, system-ui, sans-serif' }}>
                                    <strong style={{ display: 'block', fontSize: '14px', marginBottom: '2px', color: '#000' }}>
                                        ${(property.price / 1000000).toFixed(1)}M
                                    </strong>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                <MapController hoveredProperty={hoveredProperty} properties={properties} />
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
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
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
