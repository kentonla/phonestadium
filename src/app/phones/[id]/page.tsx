import { getPhoneById, getAllPhones } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
    const phones = getAllPhones();
    return phones.map((phone) => ({
        id: phone.id,
    }));
}

export default async function PhoneDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const phone = getPhoneById(id);

    if (!phone) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white p-8 animate-fade-in">
            <Link href="/" className="text-gray-500 hover:text-gray-900 mb-8 inline-block">&larr; Back to Home</Link>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                    {/* Image placeholder */}
                    <div className="text-center">
                        <div className="text-6xl mb-4">📱</div>
                        <p className="text-gray-400">Image for {phone.name}</p>
                    </div>
                </div>

                <div>
                    <div className="mb-6">
                        <span className="text-blue-600 font-semibold">{phone.brand}</span>
                        <h1 className="text-4xl font-bold text-gray-900 mt-2">{phone.name}</h1>
                        <p className="text-2xl text-gray-700 mt-4">{phone.price}</p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold border-b pb-2">Specifications</h3>

                        <div className="grid grid-cols-[120px_1fr] gap-y-4 text-sm">
                            <span className="text-gray-500">Screen</span>
                            <span className="font-medium">{phone.specs.screen}</span>

                            <span className="text-gray-500">Processor</span>
                            <span className="font-medium">{phone.specs.processor}</span>

                            <span className="text-gray-500">Battery</span>
                            <span className="font-medium">{phone.specs.battery}</span>

                            <span className="text-gray-500">Camera</span>
                            <span className="font-medium">{phone.specs.camera}</span>

                            <span className="text-gray-500">Storage</span>
                            <span className="font-medium">{phone.specs.storage}</span>

                            <span className="text-gray-500">RAM</span>
                            <span className="font-medium">{phone.specs.ram}</span>
                        </div>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Link
                            href={`/compare?p1=${phone.id}`}
                            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg text-center font-medium hover:bg-gray-800 transition-colors"
                        >
                            Compare this phone
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
