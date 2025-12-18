'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Reorder, useDragControls } from 'framer-motion';
import { Phone } from '@/types/phone';
import addIcon from '@/assets/add-icon.svg';

interface DraggableComparisonProps {
    initialPhones: Phone[];
    visibleSpecs: string[];
}

// Subcomponent for individual items to support useDragControls per item
function DraggableItem({ phone, items, getRemoveUrl, visibleSpecs }: { phone: Phone, items: Phone[], getRemoveUrl: (id: string) => string, visibleSpecs: string[] }) {
    const controls = useDragControls();

    const renderSpec = (label: string, value: string | undefined | null) => {
        if (!visibleSpecs.includes(label)) return null;
        return (
            <div>
                <span className="font-semibold text-gray-900">{label}: </span>
                <span className="text-gray-600">{value || '-'}</span>
            </div>
        );
    };

    return (
        <Reorder.Item
            value={phone}
            dragListener={false}
            dragControls={controls}
            className="min-w-[320px] w-[320px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group"
        >
            <div
                className="h-64 bg-gradient-to-b from-gray-50 to-gray-200 relative p-6 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-100 transition-colors select-none"
                onPointerDown={(e) => controls.start(e)}
            >
                <img src={phone.image} alt={phone.name} className="max-w-full max-h-full object-contain drop-shadow-lg pointer-events-none" />
            </div>

            <div className="p-6 flex-1 flex flex-col cursor-text select-text">
                <div className="mb-6">
                    <p className="text-gray-500 font-semibold mb-1">{phone.brand}</p>
                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">{phone.name}</h2>

                    <div className="space-y-3 text-sm">
                        {renderSpec('Storage', phone.storage_options?.join(', '))}
                        {renderSpec('Dimensions', phone.specs.dimensions)}
                        {renderSpec('Weight', phone.specs.weight)}
                        {renderSpec('Display', phone.specs.screen)}
                        {renderSpec('Processor', phone.specs.processor)}
                        {renderSpec('Camera', phone.specs.camera)}
                        {renderSpec('RAM', phone.specs.ram)}
                        {renderSpec('Battery power', phone.specs.battery)}
                    </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100">
                    <div className="flex justify-end items-center mb-4">
                        <span className="text-xs font-bold text-blue-600 uppercase mr-2">Starts At</span>
                        <span className="text-xl font-bold text-blue-600">{phone.price}</span>
                    </div>

                    <Link href={getRemoveUrl(phone.id)} className="block" prefetch={false}>
                        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors cursor-pointer">
                            Remove
                        </button>
                    </Link>
                </div>
            </div>
        </Reorder.Item>
    );
}

export function DraggableComparison({ initialPhones, visibleSpecs }: DraggableComparisonProps) {
    const [items, setItems] = useState(initialPhones);

    useEffect(() => {
        setItems(initialPhones);
    }, [initialPhones]);

    const getRemoveUrl = (idToRemove: string) => {
        const remainingIds = items
            .filter(item => item.id !== idToRemove)
            .map(item => item.id);

        if (remainingIds.length === 0) return '/compare';

        return `/compare?${remainingIds.map(id => `p=${id}`).join('&')}`;
    };

    return (
        <div className="overflow-x-auto pb-8">
            <Reorder.Group
                axis="x"
                values={items}
                onReorder={setItems}
                className="flex gap-4 min-w-max"
            >
                {items.map((phone) => (
                    <DraggableItem key={phone.id} phone={phone} items={items} getRemoveUrl={getRemoveUrl} visibleSpecs={visibleSpecs} />
                ))}

                {/* Add Button */}
                <div className="min-w-[100px] flex items-center justify-center">
                    <Link href="/" className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
                        <Image src={addIcon} alt="Add phone" width={32} height={32} />
                    </Link>
                </div>
            </Reorder.Group>
        </div>
    );
}
