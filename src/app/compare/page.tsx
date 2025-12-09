import { getAllPhones } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Phone } from '@/types/phone';
import { Header } from '@/components/Header';
import addIcon from '@/assets/add-icon.svg';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const allPhones = getAllPhones();

    // Extract all 'p' params
    const pParam = params['p'];
    const ids: string[] = [];

    if (Array.isArray(pParam)) {
        ids.push(...pParam);
    } else if (typeof pParam === 'string') {
        ids.push(pParam);
    }

    const comparisonList = ids.map(id => allPhones.find(p => p.id === id)).filter(Boolean) as Phone[];

    return (
        <main className="min-h-screen bg-transparent pb-12">
            <Header />

            <div className="px-8 mt-4 mb-8">
                <div className="bg-gray-100 rounded-lg inline-block px-4 py-1">
                    <span className="text-gray-900 font-semibold text-sm">Filter Specifications</span>
                </div>
            </div>

            <div className="px-8 max-w-[1400px] mx-auto overflow-x-auto pb-8">
                <div className="flex gap-4">
                    {/* Phone Columns */}
                    {comparisonList.map((phone) => (
                        <div key={phone.id} className="min-w-[320px] w-[320px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col animate-fade-in">
                            <div className="h-64 bg-gradient-to-b from-gray-50 to-gray-200 relative p-6 flex items-center justify-center">
                                <img src={phone.image} alt={phone.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="mb-6">
                                    <p className="text-gray-500 font-semibold mb-1">{phone.brand}</p>
                                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-4">{phone.name}</h2>

                                    <div className="space-y-3 text-sm">
                                        <div>
                                            <span className="font-semibold text-gray-900">Storage: </span>
                                            <span className="text-gray-600">{phone.storage_options?.join(', ')}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">Dimensions: </span>
                                            <span className="text-gray-600">{phone.specs.dimensions}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">Weight: </span>
                                            <span className="text-gray-600">{phone.specs.weight}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">Display: </span>
                                            <span className="text-gray-600">{phone.specs.screen}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">Processor: </span>
                                            <span className="text-gray-600">{phone.specs.processor}</span>
                                        </div>
                                        <div>
                                            <span className="font-semibold text-gray-900">Camera: </span>
                                            <span className="text-gray-600 block mt-1 leading-relaxed">{phone.specs.camera}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto pt-6 border-t border-gray-100">
                                    <div className="flex justify-end items-center mb-4">
                                        <span className="text-xs font-bold text-blue-600 uppercase mr-2">Starts At</span>
                                        <span className="text-xl font-bold text-blue-600">{phone.price}</span>
                                    </div>

                                    <Link href={`/compare?${ids.filter(id => id !== phone.id).map(id => `p=${id}`).join('&')}`} className="block">
                                        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 rounded-lg transition-colors">
                                            Remove
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Button */}
                    <div className="min-w-[100px] flex items-center justify-center">
                        <Link href="/" className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg">
                            <Image src={addIcon} alt="Add phone" width={32} height={32} />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
