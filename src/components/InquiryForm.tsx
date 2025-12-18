import React, { useState } from 'react';
import { saveInquiry } from '../app/actions/submissions';

const InquiryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    inquiry: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const result = await saveInquiry(formData);

    if (result.success) {
      setStatus('success');
      setFormData({ email: '', inquiry: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
    }
  };

  return (
    <section id="booking-section" className="w-full bg-[#071C35] text-white font-serif py-16 md:py-0 md:h-[545px]">
      <div className="container-custom h-full flex flex-col justify-center max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-medium mb-4 tracking-tight">We'd Love Your Feedback</h2>
          <p className="text-blue-200 text-lg font-light">
            What challenges are you facing? How can we make our products work better for you?
          </p>
        </div>

        {/* Form */}
        <form className="w-full max-w-2xl space-y-8" onSubmit={handleSubmit}>

          {/* Email Field */}
          <div className="group space-y-2">
            <label className="block text-sm font-medium tracking-wide">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              required
              type="email"
              disabled={status === 'loading'}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-white/30 py-2 text-xl focus:border-white outline-none placeholder:text-white/20 transition-colors rounded-none disabled:opacity-50"
            />
            <p className="text-xs text-blue-300/60 font-sans tracking-wide">
              Our team will review your inquiry and get back to you shortly
            </p>
          </div>

          {/* Product Inquiry Field */}
          <div className="group space-y-2">
            <label className="block text-sm font-medium tracking-wide">
              Product Inquiry <span className="text-red-400">*</span>
            </label>
            <textarea
              required
              disabled={status === 'loading'}
              maxLength={500}
              placeholder="Tell us which products interest you and what you're looking to achieve..."
              value={formData.inquiry}
              onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
              rows={3}
              className="w-full bg-transparent border-b border-white/30 py-2 text-xl focus:border-white outline-none placeholder:text-white/20 transition-colors resize-none rounded-none disabled:opacity-50"
            />
            <div className="text-right">
              <span className="text-xs text-blue-300/60 font-sans">
                {formData.inquiry.length}/500 characters
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="text-white border-b border-white pb-1 font-medium hover:text-blue-200 hover:border-blue-200 transition-colors uppercase tracking-widest text-sm disabled:opacity-50"
            >
              {status === 'loading' ? 'Sending...' : 'Submit Inquiry'}
            </button>

            {status === 'success' && (
              <span className="text-green-400 text-sm animate-in fade-in duration-300 font-sans">✓ Sent successfully! We'll be in touch soon.</span>
            )}
            {status === 'error' && (
              <span className="text-red-400 text-sm animate-in fade-in duration-300 font-sans">✗ Failed to send. Please try again.</span>
            )}
          </div>

        </form>
      </div>
    </section>
  );
};

export default InquiryForm;
