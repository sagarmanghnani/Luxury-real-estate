export interface Coordinates {
    lng: number;
    lat: number;
}

export interface PropertyFeatures {
    beds: number;
    baths: number;
    sqft: number;
}

export interface NeighborhoodData {
    commuteToTechHub: string;
    schoolDistrictRating: string;
    nearestMetro: string;
    walkabilityScore: number;
}

export interface Property {
    id: string;
    title: string;
    slug: string;
    price: number;
    address: string;
    coordinates: Coordinates;
    features: PropertyFeatures;
    images: string[];
    status: 'Active' | 'Pending' | 'Sold';
    propertyType: 'Villa' | 'Mansion' | 'Penthouse' | 'Estate' | 'Modern';
    virtualTourUrl?: string;
    neighborhood?: NeighborhoodData;
}
