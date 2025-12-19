'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import dropDownArrow from '@/assets/drop-down-arrow.svg';

const SORT_OPTIONS = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Name', value: 'name' },
    { label: 'Price', value: 'price' },
    { label: 'Release Year', value: 'year' },
];

export function FilterBar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentSort = searchParams.get('sort') || 'relevance';
    const currentLabel = SORT_OPTIONS.find(opt => opt.value === currentSort)?.label || 'Relevance';

    const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === 'relevance') {
            params.delete('sort');
        } else {
            params.set('sort', value);
        }
        router.push(`/?${params.toString()}`);
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="bg-[#1a1c2e]/80 backdrop-blur-sm px-8 py-3 w-full relative z-20">
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
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-white rounded px-3 py-1 flex items-center gap-2 cursor-pointer min-w-[140px] justify-between hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-gray-900 text-sm font-medium">{currentLabel}</span>
                            <Image
                                src={dropDownArrow}
                                alt="dropdown"
                                width={10}
                                height={6}
                                className={`opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {/* Sort Dropdown */}
                        {isOpen && (
                            <div className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-xl overflow-hidden min-w-[140px] animate-fade-in-up">
                                {SORT_OPTIONS.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleSort(option.value)}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${currentSort === option.value ? 'font-bold text-blue-600 bg-blue-50' : 'text-gray-700'
                                            }`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
