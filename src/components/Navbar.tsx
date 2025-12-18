
import React from 'react';
import { PageType } from '../types';

interface NavbarProps {
  onBookNow: () => void;
  onNavigate: (page: PageType) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onBookNow, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[60px] bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container-custom h-full flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate(PageType.HOME)}
        >
          <img src="/logo.svg" alt="ProfessorLab Official Logo - Engineering Intelligence" title="ProfessorLab Logo" className="w-6 h-6" />
          <span className="font-extrabold text-xl tracking-tighter text-gray-900">
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
          <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
