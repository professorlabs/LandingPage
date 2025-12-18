
import React from 'react';
import { Service } from '../types';
import { COLORS } from '../constants';

/**
 * Factory for creating complex UI components to maintain SOLID principles
 * and demonstrate creational design patterns.
 */
export class UIComponentFactory {
  static createServiceCard(service: Service, onClick: () => void) {
    return (
      <div 
        key={service.id}
        onClick={onClick}
        className="group p-8 border border-gray-100 rounded-2xl hover:border-blue-200 transition-all duration-300 hover:shadow-xl cursor-pointer bg-white"
      >
        <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110">
          {service.icon}
        </div>
        <div className="text-xs font-bold tracking-widest text-blue-900 uppercase mb-2 opacity-50">
          {service.tag}
        </div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">{service.title}</h3>
        <p className="text-gray-500 leading-relaxed text-sm">
          {service.description}
        </p>
        <div className="mt-8 flex items-center text-blue-900 font-semibold text-sm group-hover:translate-x-2 transition-transform">
          Learn More 
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    );
  }

  static createPrimaryButton(text: string, onClick?: () => void, type: "button" | "submit" = "button") {
    return (
      <button
        type={type}
        onClick={onClick}
        style={{ backgroundColor: COLORS.royalBlue }}
        className="text-white px-8 py-4 rounded-lg font-bold tracking-wide hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-blue-900/20"
      >
        {text}
      </button>
    );
  }
}
