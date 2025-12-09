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
        <div className="fixed bottom-0 left-0 top-[180px] w-[260px] bg-black/40 border-r border-gray-800 p-4 flex flex-col z-40 animate-slide-in">
            <div className="flex-1 overflow-y-auto space-y-4">
                {selectedPhones.map(phone => (
                    <div key={phone.id} className="flex gap-3 bg-white p-2 rounded-lg relative group">
                        <div className="w-12 h-16 bg-gray-100 flex-shrink-0 flex items-center justify-center">
                            <img src={phone.image} alt={phone.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-semibold">{phone.brand}</p>
                            <p className="text-sm font-bold text-gray-900 leading-tight">{phone.name}</p>
                            <button
                                onClick={() => removePhone(phone.id)}
                                className="absolute bottom-2 right-2 p-1 hover:bg-gray-100 rounded"
                            >
                                <Image src={removeIcon} alt="Remove" width={16} height={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 space-y-3">
                <button
                    onClick={clearAll}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition-colors"
                >
                    Clear all
                </button>

                <Link
                    href={`/compare?${selectedPhones.map(p => `p=${p.id}`).join('&')}`}
                    className="block w-full"
                >
                    <button className="w-full bg-gray-200 hover:bg-white text-gray-900 font-bold py-3 rounded-lg transition-colors">
                        Compare
                    </button>
                </Link>
            </div>
        </div>
    );
}
