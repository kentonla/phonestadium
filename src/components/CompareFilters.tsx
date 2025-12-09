'use client';

import { useState } from 'react';
import { SpecificationFilterModal } from './SpecificationFilterModal';

export function CompareFilters() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApply = (selected: string[]) => {
        // In a real app, this would update URL params or global state
        console.log('Filters applied:', selected);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="bg-gray-100 rounded-lg inline-block px-4 py-1">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-gray-900 font-semibold text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Filter Specifications
                </button>
            </div>

            <SpecificationFilterModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={handleApply}
            />
        </>
    );
}
