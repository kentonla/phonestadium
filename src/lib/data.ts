import phones from '@/data/phones.json';
import { Phone } from '@/types/phone';

export function getAllPhones(): Phone[] {
    return phones as Phone[];
}

export function getPhoneById(id: string): Phone | undefined {
    return (phones as Phone[]).find((phone) => phone.id === id);
}

export function searchPhones(query: string): Phone[] {
    const lowerQuery = query.toLowerCase();
    return (phones as Phone[]).filter((phone) =>
        phone.name.toLowerCase().includes(lowerQuery) ||
        phone.brand.toLowerCase().includes(lowerQuery)
    );
}
