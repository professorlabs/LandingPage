'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node) && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link href="/" className="navbar-brand">
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

                {/* Mobile Menu Overlay */}
                <div className={`navbar-overlay ${isMenuOpen ? 'open' : ''}`} onClick={() => setIsMenuOpen(false)}></div>

                <div
                    ref={menuRef}
                    className={`navbar-menu-container ${isMenuOpen ? 'open' : ''}`}
                >
                    <div className="menu-header">
                        <span className="menu-title">মেনু</span>
                        <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                            ✕
                        </button>
                    </div>
                    <ul className="navbar-menu">
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
            </div>
        </nav>
    );
}

