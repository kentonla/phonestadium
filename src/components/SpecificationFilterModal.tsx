'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SpecificationFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (selected: string[]) => void;
}

const FILTER_OPTIONS = [
    'Storage', 'Dimensions', 'Weight', 'Display', 'Processor', 'Camera',
    'Resolution', 'System chip', 'Operating system', 'RAM', 'Refresh rate',
    'Brightness', 'GPU', 'Battery power', 'Audio', 'Connectivity and features'
];

export function SpecificationFilterModal({ isOpen, onClose, onApply }: SpecificationFilterModalProps) {
    const [selected, setSelected] = useState<string[]>([]);

    if (!isOpen) return null;

    const toggleFilter = (filter: string) => {
        setSelected(prev =>
            prev.includes(filter)
                ? prev.filter(f => f !== filter)
                : [...prev, filter]
        );
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl w-full max-w-md p-6 shadow-2xl animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                </button>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h2 className="text-xl font-bold text-gray-900">Specification Filter</h2>
                </div>

                <div className="space-y-4 max-h-[60vh] overflow-y-auto mb-8 pr-2">
                    {FILTER_OPTIONS.map(option => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selected.includes(option) ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-300 group-hover:border-gray-500'}`}>
                                {selected.includes(option) && (
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={selected.includes(option)}
                                onChange={() => toggleFilter(option)}
                            />
                            <span className="text-gray-700 font-semibold">{option}</span>
                        </label>
                    ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-900 font-semibold px-4 py-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onApply(selected)}
                        className="bg-[#2a2b2f] text-white font-semibold px-8 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
}
