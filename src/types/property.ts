export interface Coordinates {
    lng: number;
    lat: number;
}

export interface PropertyFeatures {
    beds: number;
    baths: number;
    sqft: number;
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
}
