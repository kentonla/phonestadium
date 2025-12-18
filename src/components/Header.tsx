import { HeaderSearch } from '@/components/HeaderSearch';
import Image from 'next/image';
import Link from 'next/link';
import searchIcon from '@/assets/search-icon.svg';

export function Header() {
    return (
        <header className="pt-8 pb-4 px-8 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between gap-8 mb-4">
                {/* Logo */}
                <Link href="/" className="flex flex-col group">
                    <h1 className="text-4xl font-black tracking-tight text-white leading-none group-hover:text-gray-200 transition-colors">
                        PhoneStadium
                    </h1>
                    <span className="text-sm text-white font-medium tracking-[0.2em] pl-0.5 group-hover:text-gray-300 transition-colors">
                        Phone  search  made  easy
                    </span>
                </Link>

                {/* Centered Search and Nav */}
                <div className="flex-1 flex flex-col items-center gap-6">
                    {/* Search Bar */}
                    <HeaderSearch />

                    {/* Navigation Links */}
                    <nav className="flex items-center justify-center gap-16 text-gray-200">
                        {['Phones', 'Reviews', 'Benchmarks', 'Discussions'].map((item) => (
                            <Link key={item} href="#" className="hover:text-white font-bold text-base transition-colors tracking-wide">
                                {item}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Auth */}
                <div className="text-white font-medium text-lg min-w-[140px] text-right">
                    <span className="cursor-pointer hover:text-gray-300 transition-colors">Sign Up</span>
                    <span className="mx-2 text-gray-400">or</span>
                    <span className="cursor-pointer hover:text-gray-300 font-bold transition-colors">Login</span>
                </div>
            </div>
        </header>
    );
}
