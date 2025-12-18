import React, { useEffect, useRef, useState } from 'react';
import { Service } from '../types';
import { saveBooking } from '../app/actions/submissions';

interface ServiceCardProps {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isExpanded, onToggle }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isExpanded && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [isExpanded]);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isExpanded) {
      onToggle();
    }
  };

  const handleInlineSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: '', // phone not in inline form
      softwareType: 'direct_order',
      description: formData.get('description') as string,
    };

    const result = await saveBooking(data);

    if (result.success) {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus('error');
    }
  };

  const isBookOrder = service.id === 'book-order';

  return (
    <div
      ref={cardRef}
      onClick={handleCardClick}
      style={{
        width: isExpanded ? '100%' : '275px',
        height: isExpanded ? 'auto' : '36px',
        borderRadius: '4px',
      }}
      className={`relative overflow-hidden border border-[#002366] transition-all duration-500 ease-in-out cursor-pointer bg-white flex flex-col font-sans
        ${isExpanded
          ? 'col-span-full shadow-2xl z-50 order-first my-8 font-serif rounded-[4px]' // col-span-full works in grid
          : 'col-span-1 hover:bg-[#002366] justify-center items-center hover:scale-[1.02] group'
        }`}
    >
      <div className={`flex flex-col h-full w-full ${isExpanded ? 'p-8 bg-gray-50/50' : 'px-4'}`}>

        {/* Collapsed View (Button/Pill) */}
        {!isExpanded && (
          <div className="flex items-center justify-center gap-3 w-full h-full pointer-events-none">
            <div className="text-lg text-gray-700 group-hover:text-white transition-colors">
              {service.icon}
            </div>
            <h3 className="text-[14px] font-normal text-gray-900 group-hover:text-white tracking-wide text-center truncate transition-colors">
              {service.title}
            </h3>
          </div>
        )}

        {/* Expanded View (Full Content) */}
        {isExpanded && (
          <div className="animate-in fade-in zoom-in-95 duration-500 w-full cursor-default">
            <button
              onClick={(e) => { e.stopPropagation(); onToggle(); }}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-start justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="text-4xl text-blue-900">
                  {service.icon}
                </div>
                <div>
                  <div className="text-[10px] font-black tracking-[0.2em] text-blue-900 uppercase opacity-60 mb-1">
                    {service.tag}
                  </div>
                  <h3 className="font-medium text-gray-900 text-3xl font-serif">
                    {service.title}
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-gray-500 leading-relaxed text-lg max-w-2xl mb-8">
              {service.description}
            </p>

            {isBookOrder ? (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8" onSubmit={handleInlineSubmit} onClick={e => e.stopPropagation()}>
                  {/* Simplified Form for compactness */}
                  <h4 className="col-span-full text-xl font-bold text-gray-900 mb-2">Direct Order Request</h4>
                  <input name="name" type="text" disabled={status === 'loading'} className="border-b-2 border-gray-100 py-2 focus:border-blue-900 outline-none w-full disabled:opacity-50" placeholder="Full Name" required />
                  <input name="email" type="email" disabled={status === 'loading'} className="border-b-2 border-gray-100 py-2 focus:border-blue-900 outline-none w-full disabled:opacity-50" placeholder="Email" required />
                  <textarea name="description" disabled={status === 'loading'} className="col-span-full border-b-2 border-gray-100 py-2 focus:border-blue-900 outline-none resize-none h-24 w-full disabled:opacity-50" placeholder="Project Description" required />

                  <div className="col-span-full flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      style={{ backgroundColor: '#002366' }}
                      className="text-white py-4 rounded-lg font-bold uppercase tracking-widest hover:brightness-110 disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Submitting...' : 'Submit'}
                    </button>

                    {status === 'success' && (
                      <p className="text-green-600 text-sm font-sans animate-in fade-in duration-300">✓ Order submitted! We'll contact you shortly.</p>
                    )}
                    {status === 'error' && (
                      <p className="text-red-600 text-sm font-sans animate-in fade-in duration-300">✗ Error submitting order. Please try again.</p>
                    )}
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
                <div className="h-px bg-gray-200 w-full" />
                <p className="text-sm text-gray-500">
                  Our {service.title} solutions are built for enterprise scalability and reliability.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
