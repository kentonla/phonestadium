import { getAllPhones } from '@/lib/data'
import { PhoneCard } from '@/components/PhoneCard'
import { Header } from '@/components/Header'
import { FilterBar } from '@/components/FilterBar'
import { ComparisonSidebar } from '@/components/ComparisonSidebar'
import { ComparisonProvider } from '@/context/ComparisonContext'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const sort = typeof params.sort === 'string' ? params.sort : 'relevance'

  // Advanced Filter Params
  const brands = typeof params.brands === 'string' ? params.brands.split(',') : []
  const minPrice = typeof params.minPrice === 'string' ? parseFloat(params.minPrice) : 0
  const maxPrice = typeof params.maxPrice === 'string' ? parseFloat(params.maxPrice) : Infinity
  const minYear = typeof params.minYear === 'string' ? parseInt(params.minYear, 10) : 0

  const allPhones = getAllPhones()
  let phones = allPhones.filter(phone => {
    // Brand Filter
    if (brands.length > 0 && !brands.includes(phone.brand)) return false;

    // Price Filter
    const price = phone.priceValue || 0;
    if (price < minPrice || price > maxPrice) return false;

    // Year Filter
    if (minYear > 0) {
      const year = new Date(phone.releaseDate || '2000-01-01').getFullYear();
      if (year < minYear) return false;
    }

    return true;
  });

  // Sorting Logic
  switch (sort) {
    case 'name':
      phones.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'price':
      // Low to High
      phones.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0))
      break
    case 'year':
      // Newest First
      phones.sort((a, b) => {
        const dateA = new Date(a.releaseDate || '2000-01-01').getTime()
        const dateB = new Date(b.releaseDate || '2000-01-01').getTime()
        return dateB - dateA
      })
      break
    default:
      // Relevance / Default order
      break
  }

  return (
    <Suspense fallback={null}>
      <ComparisonProvider>
        <main className="min-h-screen bg-transparent pb-32">
          <div className="relative z-10">
            <Header />
            <FilterBar />
          </div>

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

          <ComparisonSidebar />
        </main>
      </ComparisonProvider>
    </Suspense>
  )
}
