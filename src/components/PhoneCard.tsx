import Link from 'next/link';
import { Phone } from '@/types/phone';

export function PhoneCard({ phone }: { phone: Phone }) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100 flex flex-col items-center">
            <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                {/* Placeholder for image if not actually loading from assets yet */}
                {phone.image ? (
                    <span className="text-sm">Image: {phone.name}</span>
                ) : (
                    <span>No Image</span>
                )}
            </div>
            <h3 className="font-semibold text-lg text-gray-900">{phone.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{phone.brand}</p>
            <p className="font-bold text-blue-600 mb-4">{phone.price}</p>

            <div className="flex gap-2 w-full">
                <Link
                    href={`/phones/${phone.id}`}
                    className="flex-1 px-4 py-2 bg-gray-900 text-white text-center text-sm rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Details
                </Link>
                <Link
                    href={`/compare?p1=${phone.id}`}
                    className="flex-1 px-4 py-2 bg-white text-gray-900 border border-gray-200 text-center text-sm rounded-lg hover:bg-gray-50 transition-colors"
                >
                    Compare
                </Link>
            </div>
        </div>
    );
}
