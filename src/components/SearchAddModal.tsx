'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Phone } from '@/types/phone';
import { searchPhones } from '@/lib/data';

interface SearchAddModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentPhoneIds: string[];
}

export function SearchAddModal({ isOpen, onClose, currentPhoneIds }: SearchAddModalProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Phone[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (query.trim()) {
            const searchResults = searchPhones(query);
            setResults(searchResults);
        } else {
            setResults([]);
        }
    }, [query]);

    if (!isOpen) return null;

    const handleAdd = (phoneId: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.append('p', phoneId);
        router.push(`/compare?${currentParams.toString()}`);
        onClose();
        setQuery(''); // Reset query after adding
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl w-full max-w-lg p-6 shadow-2xl animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-6">Add Phone to Compare</h2>

                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search for a phone..."
                        className="w-full px-4 py-3 pl-10 bg-gray-100 border-transparent focus:bg-white focus:border-gray-300 rounded-lg outline-none transition-colors"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <svg
                        className="absolute left-3 top-3.5 text-gray-400"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>

                    {/* Dropdown Results (In-flow to avoid clipping) */}
                    {query.trim() && (
                        <div className="mt-2 bg-white rounded-lg shadow-sm border border-gray-100 max-h-[300px] overflow-y-auto animate-fade-in-up">
                            {results.length > 0 ? (
                                results.map(phone => {
                                    const isAdded = currentPhoneIds.includes(phone.id);
                                    return (
                                        <div key={phone.id} className="flex items-center p-3 hover:bg-gray-50 transition-colors border-b last:border-0 border-gray-50">
                                            <div className="w-10 h-10 relative flex-shrink-0 mr-3">
                                                <img
                                                    src={phone.image}
                                                    alt={phone.name}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 text-sm truncate">{phone.name}</h3>
                                                <p className="text-xs text-gray-500 truncate">{phone.brand}</p>
                                            </div>
                                            <button
                                                onClick={() => !isAdded && handleAdd(phone.id)}
                                                disabled={isAdded}
                                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap ml-2 ${isAdded
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                            >
                                                {isAdded ? 'Added' : 'Add'}
                                            </button>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center py-4 text-gray-500 text-sm">
                                    No phones found
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Placeholder/Instructions when not searching */}
                {!query.trim() && (
                    <div className="text-center py-12 text-gray-400">
                        <p>Search for a phone to add it to the comparison</p>
                    </div>
                )}
            </div>
        </div>
    );
}
