export interface PhoneSpecs {
    screen: string;
    processor: string;
    battery: string;
    camera: string;
    storage: string;
    ram: string;
    // Detailed specs for comparison
    dimensions?: string;
    weight?: string;
}

export interface Phone {
    id: string;
    name: string;
    brand: string;
    price: string; // Display price e.g. "$999"
    priceValue?: number; // For sorting
    image: string;
    storage_options?: string[];
    specs: PhoneSpecs;
}
