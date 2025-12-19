'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPortal } from 'react-dom';

interface AdvancedFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BRANDS = ['Apple', 'Google', 'Samsung', 'OnePlus', 'Xiaomi'];

export function AdvancedFilterModal({ isOpen, onClose }: AdvancedFilterModalProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [mounted, setMounted] = useState(false);

    // Local state for filters
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minYear, setMinYear] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize state from URL params when modal opens
    useEffect(() => {
        if (isOpen) {
            const brands = searchParams.get('brands')?.split(',') || [];
            setSelectedBrands(brands);
            setMinPrice(searchParams.get('minPrice') || '');
            setMaxPrice(searchParams.get('maxPrice') || '');
            setMinYear(searchParams.get('minYear') || '');
        }
    }, [isOpen, searchParams]);

    if (!mounted || !isOpen) return null;

    const handleBrandToggle = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleApply = () => {
        const params = new URLSearchParams(searchParams.toString());

        // Update brands
        if (selectedBrands.length > 0) {
            params.set('brands', selectedBrands.join(','));
        } else {
            params.delete('brands');
        }

        // Update price
        if (minPrice) params.set('minPrice', minPrice);
        else params.delete('minPrice');

        if (maxPrice) params.set('maxPrice', maxPrice);
        else params.delete('maxPrice');

        // Update year
        if (minYear) params.set('minYear', minYear);
        else params.delete('minYear');

        router.push(`/?${params.toString()}`);
        onClose();
    };

    const handleReset = () => {
        setSelectedBrands([]);
        setMinPrice('');
        setMaxPrice('');
        setMinYear('');
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-all animate-fade-in" onClick={onClose} />

            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up max-h-[90vh] overflow-y-auto z-10 scale-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Advanced Filters</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Brand Filter */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Manufacturer</h3>
                        <div className="flex flex-wrap gap-2">
                            {BRANDS.map(brand => (
                                <button
                                    key={brand}
                                    onClick={() => handleBrandToggle(brand)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${selectedBrands.includes(brand)
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Price Range */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Price Range ($)</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Min Price</label>
                                <input
                                    type="number"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(e.target.value)}
                                    placeholder="0"
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow text-gray-900"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-gray-500 mb-1 block">Max Price</label>
                                <input
                                    type="number"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(e.target.value)}
                                    placeholder="2000"
                                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow text-gray-900"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-100" />

                    {/* Release Year */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Release Year</h3>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Released After (Year)</label>
                            <input
                                type="number"
                                value={minYear}
                                onChange={(e) => setMinYear(e.target.value)}
                                placeholder="2023"
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-shadow text-gray-900"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex gap-3">
                    <button
                        onClick={handleReset}
                        className="flex-1 px-4 py-3 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        onClick={handleApply}
                        className="flex-1 px-4 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
