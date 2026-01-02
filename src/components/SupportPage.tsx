
import React from 'react';

const SupportPage: React.FC = () => {
  const categories = [
    { title: "Technical Documentation", desc: "API references, deployment guides, and architecture blueprints.", icon: "📄" },
    { title: "Product Support", desc: "Troubleshooting for our iOS, Android, and Web applications.", icon: "🔧" },
    { title: "Billing & Accounts", desc: "Manage your subscriptions, enterprise contracts, and invoices.", icon: "💳" },
    { title: "Developer Community", desc: "Join our Engineering Intelligence forum to discuss AI/ML trends.", icon: "👥" }
  ];

  return (
    <div className="pt-[100px] pb-24 bg-white min-h-screen">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">Support Center</h1>
            <p className="text-gray-500 text-lg">Our engineering team is dedicated to your success. Find answers or reach out directly.</p>
          </div>

          {/* Search Bar Placeholder */}
          <div className="mb-20">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search for documentation, guides, or error codes..." 
                className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-blue-900 focus:shadow-xl transition-all outline-none text-gray-700"
              />
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-blue-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {categories.map((cat, i) => (
              <div key={i} className="p-8 border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-900 transition-colors">{cat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* SLA & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 bg-blue-900 rounded-3xl text-white">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Enterprise SLA</h2>
              <p className="text-blue-100 text-sm leading-relaxed mb-6">
                For our B2B partners and Enterprise AI customers, we provide 24/7 priority support with a guaranteed 2-hour response time for critical infrastructure incidents. Our systems maintain 99.8% operational accuracy.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                  Open Support Ticket
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center border-l border-blue-800 md:pl-8">
              <div className="mb-4">
                <div className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">Email</div>
                <div className="font-mono text-sm">support@professorlab.co</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">Response Time</div>
                <div className="font-mono text-sm">&lt; 24 Hours (Std)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
