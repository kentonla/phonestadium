'use client';

import { useState } from 'react';
import { Phone } from '@/types/phone';
import { CompareFilters } from './CompareFilters';
import { DraggableComparison } from './DraggableComparison';

interface CompareContentProps {
    initialPhones: Phone[];
}

const DEFAULT_FILTERS = [
    'Storage', 'Dimensions', 'Weight', 'Display', 'Processor', 'Camera'
];

export function CompareContent({ initialPhones }: CompareContentProps) {
    const [selectedFilters, setSelectedFilters] = useState<string[]>(DEFAULT_FILTERS);

    return (
        <>
            <div className="mt-4 mb-8">
                <CompareFilters
                    selectedFilters={selectedFilters}
                    onFiltersChange={setSelectedFilters}
                />
            </div>

            <DraggableComparison
                initialPhones={initialPhones}
                visibleSpecs={selectedFilters}
            />
        </>
    );
}
