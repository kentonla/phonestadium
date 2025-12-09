'use client';

import Image from 'next/image';
import dropDownArrow from '@/assets/drop-down-arrow.svg';

export function FilterBar() {
    return (
        <div className="bg-[#1a1c2e]/80 backdrop-blur-sm px-8 py-3 w-full">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-gray-400 mr-4 font-medium">Filter:</span>
                    {['Price', 'Manufacturer', 'Release year', 'Advanced'].map((filter) => (
                        <button
                            key={filter}
                            className="px-4 py-1 text-white font-semibold hover:text-gray-300 transition-colors"
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-white text-sm">Sort by:</span>
                    <div className="bg-white rounded px-3 py-1 flex items-center gap-2 cursor-pointer min-w-[140px] justify-between">
                        <span className="text-gray-900 text-sm font-medium">Relevance</span>
                        {/* Ensure width/height are set for image */}
                        <Image src={dropDownArrow} alt="dropdown" width={10} height={6} className="opacity-70" />
                    </div>
                </div>
            </div>
        </div>
    );
}
