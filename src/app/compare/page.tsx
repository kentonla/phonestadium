import { getAllPhones } from '@/lib/data';
import Link from 'next/link';
import { Phone } from '@/types/phone';

export default async function ComparePage({ searchParams }: { searchParams: Promise<{ p1?: string; p2?: string }> }) {
    const { p1, p2 } = await searchParams;
    const allPhones = getAllPhones();

    // Simple logic to find selected phones
    const phone1 = allPhones.find(p => p.id === p1);
    const phone2 = allPhones.find(p => p.id === p2);

    const comparisonList = [phone1, phone2].filter(Boolean) as Phone[];

    return (
        <div className="min-h-screen p-8 max-w-7xl mx-auto">
            <Link href="/" className="text-gray-500 hover:text-gray-900 mb-8 inline-block">&larr; Back to Home</Link>
            <h1 className="text-3xl font-bold mb-8">Compare Phones</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr>
                            <th className="p-4 border-b-2 bg-gray-50 min-w-[200px]">Feature</th>
                            {comparisonList.length > 0 ? comparisonList.map(phone => (
                                <th key={phone.id} className="p-4 border-b-2 min-w-[300px]">
                                    <div className="test-center">
                                        <div className="h-24 bg-gray-100 rounded mb-2 flex items-center justify-center text-2xl">📱</div>
                                        {phone.name}
                                        <div className="text-sm font-normal text-gray-500">{phone.price}</div>
                                    </div>
                                </th>
                            )) : (
                                <th className="p-4 border-b-2 text-gray-400 font-normal">Select phones to compare</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {['screen', 'processor', 'battery', 'camera', 'storage', 'ram'].map((spec) => (
                            <tr key={spec} className="border-b hover:bg-gray-50">
                                <td className="p-4 font-semibold text-gray-700 capitalize">{spec}</td>
                                {comparisonList.map((phone) => (
                                    <td key={phone.id} className="p-4 text-gray-900">
                                        {/* @ts-expect-error key access */}
                                        {phone.specs[spec]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {comparisonList.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg mt-4">
                    <p className="text-gray-500 mb-4">No phones selected for comparison.</p>
                    <Link href="/" className="text-blue-600 font-semibold hover:underline">Select phones from Home</Link>
                </div>
            )}
        </div>
    );
}
