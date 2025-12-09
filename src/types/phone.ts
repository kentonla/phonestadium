export interface PhoneSpecs {
    screen: string;
    processor: string;
    battery: string;
    camera: string;
    storage: string;
    ram: string;
}

export interface Phone {
    id: string;
    name: string;
    brand: string;
    price: string; // Display price
    image: string;
    specs: PhoneSpecs;
}
