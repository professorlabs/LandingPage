import React, { useState } from 'react';
import { PageType } from '../types';

interface NavbarProps {
  onBookNow: () => void;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page: PageType) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const handleBookNow = () => {
    onBookNow();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container-custom h-full flex items-center justify-between relative">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => handleNavigate(PageType.HOME)}
        >
          <img src="/logo.svg" alt="ProfessorLab Official Logo - Engineering Intelligence" title="ProfessorLab Logo" className="w-6 h-6" />
          <span className="font-extrabold text-lg md:text-xl tracking-tighter text-gray-900 whitespace-nowrap">
            ProfessorLab
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <button
            style={{ backgroundColor: '#002366' }}
            className="text-white px-5 py-2 rounded text-xs font-bold uppercase tracking-wider relative overflow-hidden group"
            onClick={onBookNow}
          >
            <div className="light-sweep"></div>
            Book Now
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none p-2"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-[60px] left-0 right-0 bg-white border-b border-gray-100 shadow-xl p-4 md:hidden flex flex-col gap-4 animate-in slide-in-from-top-2">
            <button
              className="text-left font-semibold text-gray-900 py-2 border-b border-gray-50"
              onClick={() => handleNavigate(PageType.HOME)}
            >
              Home
            </button>
            <button
              style={{ backgroundColor: '#002366' }}
              className="text-white px-5 py-3 rounded text-sm font-bold uppercase tracking-wider text-center"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
