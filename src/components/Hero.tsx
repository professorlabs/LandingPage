
import React from 'react';
import { FORMULAS } from '../constants';
import { UIComponentFactory } from '../services/ComponentFactory';
import { Star } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-[80vh] pt-[60px] flex items-center overflow-hidden bg-white" role="banner">
      {/* Animated Background Formulas */}
      <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none formula-bg flex flex-wrap gap-x-12 gap-y-8 p-10 overflow-hidden" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, i) => (
          <React.Fragment key={i}>
            {FORMULAS.map((formula, idx) => (
              <span key={`${i}-${idx}`} className="text-2xl font-mono whitespace-nowrap leading-relaxed">
                {formula}
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="container-custom relative z-10 flex flex-col items-center gap-12 py-24 md:py-32">
        <div className="w-full text-center">
          <div className="inline-block px-5 py-2 mb-8 bg-blue-50/30 backdrop-blur-md border border-blue-100/50 rounded-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-blue-900 tracking-[0.2em] uppercase">
              <Star className="w-4 h-4 text-yellow-600 fill-yellow-600" aria-hidden="true" />
              Where AI Meets Scalable Product Engineering
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-[1.05] tracking-tight mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
            <span className="block text-blue-900 mb-4">ProfessorLab</span>
            Engineering Intelligence.
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mb-12 leading-relaxed mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            A leading Engineering Intelligence company delivering AI Solutions, iOS Apps, Android Apps, Web Apps, and Enterprise AI products. We build top-class software with the best user experience for B2B and B2C markets.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Hero;
