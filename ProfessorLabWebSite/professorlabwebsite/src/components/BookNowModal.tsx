import React, { useState } from 'react';
import { X } from 'lucide-react';
import { saveBooking } from '../app/actions/submissions';

interface BookNowModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const softwareOptions = [
    { value: 'ai_agent', label: 'AI Solutions (LLM Agents)', disabled: false },
    { value: 'webapp', label: 'Web App', disabled: false },
    { value: 'android_apps', label: 'Android App', disabled: false },
    { value: 'ios', label: 'iOS App - In-House Only', disabled: true },
];

const BookNowModal: React.FC<BookNowModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        softwareType: '',
        description: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'description') {
            const words = value.trim().split(/\s+/);
            const wordCount = value.trim() === '' ? 0 : words.length;

            if (wordCount > 200) return;

            // Basic sanitization
            if (/[<>{}]/g.test(value)) return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const result = await saveBooking(formData);

        if (result.success) {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    softwareType: '',
                    description: '',
                });
            }, 2000);
        } else {
            setStatus('error');
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
            <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-6 shadow-xl animate-in slide-in-from-bottom duration-300 font-serif max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="relative text-center mb-8">
                    <button
                        onClick={onClose}
                        className="absolute right-0 top-0 text-gray-400 hover:text-gray-600 p-1"
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl text-black font-medium mb-1">Tell us your interest</h2>
                    <p className="text-sm text-gray-400 font-light tracking-wide uppercase">Engineering intelligence</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Name */}
                    <div className="group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border-0 border-b border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-0 bg-transparent transition-colors"
                        />
                    </div>

                    {/* Phone */}
                    <div className="group">
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone Number"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border-0 border-b border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-0 bg-transparent transition-colors"
                        />
                    </div>

                    {/* Email */}
                    <div className="group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border-0 border-b border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-0 bg-transparent transition-colors"
                        />
                    </div>

                    {/* Software Type */}
                    <div className="group">
                        <select
                            name="softwareType"
                            value={formData.softwareType}
                            onChange={handleChange}
                            required
                            className="w-full border-0 border-b border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-0 bg-transparent transition-colors appearance-none"
                        >
                            <option value="" disabled>Select Software Type</option>
                            {softwareOptions.map(option => (
                                <option key={option.value} value={option.value} disabled={option.disabled} className={option.disabled ? 'text-gray-300' : 'text-gray-900'}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="group">
                        <label className="block text-xs text-gray-400 mb-1">
                            Tell us about your project (Max 200 words)
                        </label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe your requirements..."
                            className="w-full border-0 border-b border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-black focus:ring-0 bg-transparent transition-colors resize-none"
                        />
                        <p className="text-xs text-right text-gray-400 mt-1">
                            {formData.description.trim() === '' ? 0 : formData.description.trim().split(/\s+/).length}/200 words
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-4 mt-4">
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-black text-white py-4 rounded-none hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm font-medium disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Processing...' : 'Submit Inquiry'}
                        </button>

                        {status === 'success' && (
                            <p className="text-center text-green-600 text-sm font-sans animate-in fade-in duration-300">
                                ✓ Inquiry saved! Closing in 2 seconds...
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="text-center text-red-600 text-sm font-sans animate-in fade-in duration-300">
                                ✗ Something went wrong. Please try again.
                            </p>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default BookNowModal;
