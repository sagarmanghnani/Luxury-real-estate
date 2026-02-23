import React from 'react';

interface VirtualTourProps {
    url: string;
}

export const VirtualTour: React.FC<VirtualTourProps> = ({ url }) => {
    // Append standard Matterport URL parameters
    const tourUrl = new URL(url);
    tourUrl.searchParams.set('play', '1');
    tourUrl.searchParams.set('mls', '1');

    return (
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl relative bg-neutral-900 border border-neutral-800">
            <iframe
                src={tourUrl.toString()}
                className="absolute top-0 left-0 w-full h-full border-none"
                allowFullScreen
                allow="xr-spatial-tracking"
                title="3D Virtual Tour"
            ></iframe>

            {/* Loading placeholder skeleton (shows before iframe loads) */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center bg-neutral-900 animate-pulse">
                <span className="text-neutral-500 font-medium tracking-widest text-sm uppercase">Loading 3D Experience</span>
            </div>
        </div>
    );
};
