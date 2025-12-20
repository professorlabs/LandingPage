'use client';

import { useState, useEffect, useRef } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
}

export default function SearchBar({
    onSearch,
    placeholder = 'ভিডিও খুঁজুন...'
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Cleanup on unmount
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Debounce search for better performance
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            onSearch(value);
        }, 300);
    };

    const handleClear = () => {
        setQuery('');
        onSearch('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        onSearch(query);
    };

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <div className="search-bar-container">
                <svg
                    className="search-bar-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                    <path d="M16 16 L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                    type="text"
                    className="search-bar-input"
                    value={query}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label="Search videos"
                />
                {query && (
                    <button
                        type="button"
                        className="search-bar-clear"
                        onClick={handleClear}
                        aria-label="Clear search"
                    >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                )}
            </div>
        </form>
    );
}
