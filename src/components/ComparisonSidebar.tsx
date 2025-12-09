'use client';

import { useComparison } from '@/context/ComparisonContext';
import { Phone } from '@/types/phone';
import Image from 'next/image';
import Link from 'next/link';

// Placeholder for remove icon path if not imported directly
// In real app, import from assets
import removeIcon from '@/assets/remove-icon.svg';

export function ComparisonSidebar() {
    const { selectedPhones, removePhone, clearAll } = useComparison();

    if (selectedPhones.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 top-[220px] w-[360px] bg-black/40 border-r border-gray-800 p-4 flex flex-col z-40 animate-slide-in">
            <div className="flex-1 overflow-y-auto space-y-4">
                {selectedPhones.map(phone => (
                    <div key={phone.id} className="flex gap-4 bg-white p-3 rounded-xl relative group shadow-sm">
                        <div className="w-20 h-24 bg-gray-50 rounded-md flex-shrink-0 flex items-center justify-center p-1">
                            <img src={phone.image} alt={phone.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex-1 pr-6">
                            <p className="text-sm text-gray-500 font-semibold mb-0.5">{phone.brand}</p>
                            <p className="text-base font-bold text-gray-900 leading-tight">{phone.name}</p>
                            <div className="mt-1 space-y-0.5">
                                <p className="text-xs text-gray-500 font-medium">
                                    {phone.storage_options?.join('/')}
                                </p>
                                <p className="text-xs text-blue-600 font-bold">
                                    Starts at {phone.price}
                                </p>
                            </div>
                            <button
                                onClick={() => removePhone(phone.id)}
                                className="absolute bottom-2 right-2 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <Image src={removeIcon} alt="Remove" width={24} height={24} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                <button
                    onClick={clearAll}
                    className="w-full bg-gray-400 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                >
                    Clear all
                </button>

                <Link
                    href={`/compare?${selectedPhones.map(p => `p=${p.id}`).join('&')}`}
                    className="block w-full"
                >
                    <button className="w-full h-18 bg-gray-200 hover:bg-white text-gray-900 font-bold py-3 rounded-lg transition-colors">
                        Compare
                    </button>
                </Link>
            </div>
        </div>
    );
}
