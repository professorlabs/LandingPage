'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavItem {
    label: string;
    href: string;
}

const navItems: NavItem[] = [
    { label: 'হোম', href: '/' },
    { label: 'গ্যালারি', href: '/' },
    { label: 'ব্লগ', href: '/blog' },
    { label: 'আমাদের সম্পর্কে', href: '/about' }
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-brand">
                    <div className="navbar-logo">
                        <Image
                            src="/osman-hadi.png"
                            alt="Osman Hadi Logo"
                            width={32}
                            height={32}
                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                        />
                    </div>
                    <span className="navbar-title">Osman Hadi Archive</span>
                </Link>

                <button
                    className="navbar-toggle"
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </button>

                <ul className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.href + item.label} className="navbar-item">
                            <Link
                                href={item.href}
                                className="navbar-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
