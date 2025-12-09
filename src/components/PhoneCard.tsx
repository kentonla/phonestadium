'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone } from '@/types/phone';
import { useComparison } from '@/context/ComparisonContext';

export function PhoneCard({ phone }: { phone: Phone }) {
    const { addPhone, removePhone, isPhoneSelected } = useComparison();
    const selected = isPhoneSelected(phone.id);

    const toggleSelection = () => {
        if (selected) {
            removePhone(phone.id);
        } else {
            addPhone(phone);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <div className="relative h-56 bg-gradient-to-b from-gray-50 to-gray-200">
                {/* Using Next.js Image with fill for responsive sizing */}
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                    <img src={phone.image} alt={phone.name} className="max-w-full max-h-full object-contain drop-shadow-xl" />
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex-1">
                    <p className="text-gray-500 font-semibold mb-1">{phone.brand}</p>
                    <h3 className="font-bold text-xl text-gray-900 leading-tight mb-2">{phone.name}</h3>

                    <div className="mb-4">
                        <p className="text-xs text-gray-500 font-medium mb-1">Storage: {phone.storage_options?.join(', ')}</p>
                    </div>
                </div>

                <div className="flex items-end justify-between mt-auto">
                    <div>
                        <p className="text-blue-600 font-bold text-2xl leading-none tracking-tight">{phone.price}</p>
                        <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wide">Starts At</p>
                    </div>

                    <button
                        onClick={toggleSelection}
                        className={`px-6 py-2 rounded-md font-bold text-sm transition-colors ${selected
                                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                    >
                        {selected ? 'Remove' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}
