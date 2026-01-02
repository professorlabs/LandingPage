import React from 'react';

interface MobileStickyCTAProps {
    onBookNow: () => void;
}

const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({ onBookNow }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:hidden bg-gradient-to-t from-white via-white to-transparent pb-6 pt-12">
            <button
                onClick={onBookNow}
                style={{ backgroundColor: '#002366' }}
                className="w-full text-white font-bold tracking-[0.2em] uppercase py-4 rounded-full shadow-lg active:scale-[0.98] transition-all relative overflow-hidden group"
            >
                <div className="light-sweep"></div>
                Book Now
            </button>
        </div>
    );
};

export default MobileStickyCTA;
