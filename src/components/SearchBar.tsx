import type { InputHTMLAttributes } from 'react';

interface SearchBarProps extends InputHTMLAttributes<HTMLInputElement> {
    onSearch?: (value: string) => void;
}

const SearchBar = ({ className = '', ...props }: SearchBarProps) => {
    return (
        <div className={`relative w-full ${className}`}>
            <input
                type="text"
                placeholder="Cari buku"
                className="w-full px-6 py-3 rounded-full bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-sm sm:text-base"
                {...props}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SearchBar;
