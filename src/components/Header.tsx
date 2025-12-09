import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '@/assets/search-icon.svg';

export function Header() {
    return (
        <header className="pt-6 pb-2 px-8 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between gap-8 mb-4">
                {/* Logo */}
                <Link href="/" className="flex flex-col">
                    <h1 className="text-3xl font-extrabold tracking-tight text-white leading-none">
                        PhoneStadium
                    </h1>
                    <span className="text-xs text-white font-medium tracking-widest pl-0.5">
                        Phone  search  made  easy
                    </span>
                </Link>

                {/* Search Bar */}
                <div className="flex-1 max-w-xl relative">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search here"
                            className="w-full bg-white text-gray-900 rounded-full py-3 px-6 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Image src={searchIcon} alt="Search" width={24} height={24} />
                        </button>
                    </div>
                </div>

                {/* Auth */}
                <div className="text-white font-medium">
                    <span className="cursor-pointer hover:text-gray-300">Sign Up</span>
                    <span className="mx-1 text-gray-400">or</span>
                    <span className="cursor-pointer hover:text-gray-300 font-bold">Login</span>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex items-center justify-center gap-12 text-gray-200 mt-2">
                {['Phones', 'Reviews', 'Benchmarks', 'Discussions'].map((item) => (
                    <Link key={item} href="#" className="hover:text-white font-medium text-sm transition-colors">
                        {item}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
