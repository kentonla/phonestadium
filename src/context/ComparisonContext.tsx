'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Phone } from '@/types/phone';

interface ComparisonContextType {
    selectedPhones: Phone[];
    addPhone: (phone: Phone) => void;
    removePhone: (phoneId: string) => void;
    clearAll: () => void;
    isPhoneSelected: (phoneId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: React.ReactNode }) {
    const [selectedPhones, setSelectedPhones] = useState<Phone[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('comparisonList');
        if (saved) {
            try {
                setSelectedPhones(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse comparison list', e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('comparisonList', JSON.stringify(selectedPhones));
    }, [selectedPhones]);

    const addPhone = (phone: Phone) => {
        if (!selectedPhones.find((p) => p.id === phone.id)) {
            setSelectedPhones((prev) => [...prev, phone]);
        }
    };

    const removePhone = (phoneId: string) => {
        setSelectedPhones((prev) => prev.filter((p) => p.id !== phoneId));
    };

    const clearAll = () => {
        setSelectedPhones([]);
    };

    const isPhoneSelected = (phoneId: string) => {
        return selectedPhones.some((p) => p.id === phoneId);
    };

    return (
        <ComparisonContext.Provider value={{ selectedPhones, addPhone, removePhone, clearAll, isPhoneSelected }}>
            {children}
        </ComparisonContext.Provider>
    );
}

export function useComparison() {
    const context = useContext(ComparisonContext);
    if (context === undefined) {
        throw new Error('useComparison must be used within a ComparisonProvider');
    }
    return context;
}
