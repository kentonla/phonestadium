import { getAllPhones } from '@/lib/data';
import { Phone } from '@/types/phone';
import { Header } from '@/components/Header';
import { CompareContent } from '@/components/CompareContent';

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

            <div className="px-8 max-w-[1400px] mx-auto">
                <CompareContent initialPhones={comparisonList} />
            </div>
        </main>
    );
}
