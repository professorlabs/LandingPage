import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F8F9FA] py-12 border-t border-gray-100">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.svg" alt="ProfessorLab Official Logo - Engineering Intelligence" title="ProfessorLab Logo" className="w-6 h-6" />
              <span className="font-extrabold text-lg tracking-tighter text-gray-900">
                ProfessorLab
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-sm text-center md:text-left">
              ProfessorLab is a leading Engineering Intelligence company focused on delivering AI Solutions, iOS Apps, Android Apps, Web Apps, and Enterprise AI products. We build top-class apps with the best user experience, serving both B2C and B2B markets, transforming businesses through cutting-edge technology.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-gray-600 uppercase tracking-widest">
            <button onClick={() => onNavigate(PageType.PRIVACY)} className="hover:text-blue-900 cursor-pointer">Privacy</button>
            <button onClick={() => onNavigate(PageType.TERMS)} className="hover:text-blue-900 cursor-pointer">Terms</button>
            <a href="https://www.linkedin.com/company/professorlab/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-900">LinkedIn</a>
            <span className="text-gray-300 cursor-not-allowed">YouTube</span>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 font-medium gap-4">
          <p>© 2024 ProfessorLab Ltd. All rights reserved</p>
          <div className="flex gap-4">
            <span>Built with Engineering Intelligence</span>
            <span className="text-blue-900 font-bold underline">Professorlab.co</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
