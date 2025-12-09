import { getAllPhones } from '@/lib/data';
import { Phone } from '@/types/phone';
import { Header } from '@/components/Header';
import { DraggableComparison } from '@/components/DraggableComparison';

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

    // Helper function to generate remove path (passed to client component)
    // This logic needs to be client-side compatible or pre-calculated
    // We'll pass a simple prop or handle URL generation in the client component
    // For simplicity, let's pass a function prop isn't serializable.
    // We'll handle URL generation inside the client component, or pass the base logic.
    // Better: The client component can handle the remove logic if we give it the current list.

    return (
        <main className="min-h-screen bg-transparent pb-12">
            <Header />

            <div className="px-8 mt-4 mb-8">
                <div className="bg-gray-100 rounded-lg inline-block px-4 py-1">
                    <span className="text-gray-900 font-semibold text-sm">Filter Specifications</span>
                </div>
            </div>

            <div className="px-8 max-w-[1400px] mx-auto">
                <DraggableComparison
                    initialPhones={comparisonList}
                />
            </div>
        </main>
    );
}
