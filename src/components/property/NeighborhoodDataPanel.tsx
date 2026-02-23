import React from 'react';
import { NeighborhoodData } from '@/types/property';
import { Car, GraduationCap, Train, Footprints } from 'lucide-react';

interface NeighborhoodDataPanelProps {
    data: NeighborhoodData;
}

export const NeighborhoodDataPanel: React.FC<NeighborhoodDataPanelProps> = ({ data }) => {
    const stats = [
        {
            label: 'Commute to Tech Hub',
            value: data.commuteToTechHub,
            icon: Car,
        },
        {
            label: 'School District',
            value: data.schoolDistrictRating,
            icon: GraduationCap,
        },
        {
            label: 'Nearest Metro',
            value: data.nearestMetro,
            icon: Train,
        },
        {
            label: 'Walkability',
            value: `${data.walkabilityScore}/100`,
            icon: Footprints,
        },
    ];

    return (
        <div className="w-full bg-neutral-900/50 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-neutral-800 shadow-xl">
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-6 uppercase tracking-wider">
                Neighborhood
            </h3>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="flex flex-col gap-3 group">
                        <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:bg-neutral-700 transition-colors duration-300">
                            <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg md:text-xl font-semibold text-white mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
