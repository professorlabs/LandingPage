
import React from 'react';

interface LegalSection {
  title: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const LegalPage: React.FC<LegalPageProps> = ({ title, lastUpdated, sections }) => {
  return (
    <div className="pt-[100px] pb-24 bg-white min-h-screen">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 pb-12 border-b border-gray-100">
            <h1 className="text-5xl font-black text-gray-900 mb-4">{title}</h1>
            <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">Last Updated: {lastUpdated}</p>
          </div>

          <div className="space-y-12">
            {sections.map((section, idx) => (
              <section key={idx}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <span className="text-blue-900 opacity-20 text-4xl font-mono">0{idx + 1}</span>
                  {section.title}
                </h2>
                <div className="text-gray-500 leading-relaxed space-y-4 ml-12">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 p-8 bg-gray-50 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Questions?</h3>
            <p className="text-gray-500 text-sm mb-4">If you have any questions regarding these documents, please contact our legal department.</p>
            <a href="mailto:legal@professorlab.co" className="text-blue-900 font-bold underline">legal@professorlab.co</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
