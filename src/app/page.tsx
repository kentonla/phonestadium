import { getAllPhones } from '@/lib/data';
import { PhoneCard } from '@/components/PhoneCard';
import { Header } from '@/components/Header';
import { FilterBar } from '@/components/FilterBar';
import { ComparisonSidebar } from '@/components/ComparisonSidebar';
import { ComparisonProvider } from '@/context/ComparisonContext';

export default function Home() {
  const phones = getAllPhones();

  return (
    <ComparisonProvider>
      <main className="min-h-screen bg-transparent pb-32">
        {/* Header Section */}
        <div className="relative z-10">
          <Header />
          <FilterBar />
        </div>

        {/* Result Count and Grid */}
        <section className="px-8 pt-6 pb-12 max-w-[1400px] mx-auto flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6 text-gray-300 text-sm">
            <p>Results: 1-{phones.length} of {phones.length}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
            {phones.map((phone) => (
              <PhoneCard key={phone.id} phone={phone} />
            ))}
          </div>
        </section>

        {/* Comparison Panel */}
        <ComparisonSidebar />
      </main>
    </ComparisonProvider>
  );
}
