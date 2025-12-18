'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from 'next/image';
import searchIcon from '@/assets/search-icon.svg';
import { Phone } from '@/types/phone';
import { searchPhones } from '@/lib/data';

export function HeaderSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Phone[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle search changes
    useEffect(() => {
        if (query.trim()) {
            const searchResults = searchPhones(query);
            setResults(searchResults);
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query]);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (phoneId: string) => {
        router.push(`/phones/${phoneId}`);
        setIsOpen(false);
        setQuery('');
    };

    const handleAdd = (e: React.MouseEvent, phoneId: string) => {
        e.stopPropagation(); // Prevent navigation to detail page

        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.append('p', phoneId);

        // If we are already on the compare page, replace URL to update state
        // If not, push to compare page
        if (pathname === '/compare') {
            router.replace(`/compare?${currentParams.toString()}`);
        } else {
            router.push(`/compare?${currentParams.toString()}`);
        }

        setIsOpen(false);
        setQuery('');
    };

    return (
        <div className="relative w-full max-w-xl" ref={containerRef}>
            <div className="flex items-center gap-4 w-full">
                <input
                    type="text"
                    placeholder="Search here"
                    className="w-full bg-white text-gray-900 rounded-full py-3 px-6 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-white/20 transition-all font-medium"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
                <button className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors">
                    <Image src={searchIcon} alt="Search" width={32} height={32} />
                </button>
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-16 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-h-[400px] overflow-y-auto z-50 animate-fade-in-up py-2">
                    {results.map(phone => (
                        <div
                            key={phone.id}
                            onClick={() => handleSelect(phone.id)}
                            className="flex items-center p-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer border-b last:border-0 border-gray-50 group"
                        >
                            <div className="w-10 h-10 relative flex-shrink-0 mr-4">
                                <img
                                    src={phone.image}
                                    alt={phone.name}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm truncate group-hover:text-blue-600 transition-colors">{phone.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{phone.brand}</p>
                            </div>

                            <button
                                onClick={(e) => handleAdd(e, phone.id)}
                                className="ml-2 px-3 py-1.5 bg-gray-700 text-white text-xs font-bold rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                            >
                                Add +
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* No Results state (optional, can be helpful) */}
            {isOpen && query.trim() && results.length === 0 && (
                <div className="absolute top-full left-0 right-16 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 text-center text-gray-500 z-50">
                    No phones found matching "{query}"
                </div>
            )}
        </div>
    );
}
