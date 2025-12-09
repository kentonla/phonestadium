import { getAllPhones } from '@/lib/data';
import { PhoneCard } from '@/components/PhoneCard';

export default function Home() {
  const phones = getAllPhones();

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-4 tracking-tight">
          PhoneStadium
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Compare the latest flagship phones side-by-side. Find your perfect match.
        </p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {phones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </section>
    </main>
  );
}
