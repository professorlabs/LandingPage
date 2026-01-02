import React from 'react';

const products = [
    {
        title: "LuminaOCR",
        url: "https://luminaocr.vercel.app/",
        description: "Advanced OCR technology supporting 80+ languages. Convert images to text with high precision.",
        features: ["80+ Languages", "High Accuracy", "Full Free"],
        color: "from-blue-600 to-indigo-600"
    },
    {
        title: "VisionScan AI",
        url: "https://visionscan-ai.vercel.app/",
        description: "A comprehensive suite of 10+ AI-driven tools including scanner, filter, text extraction, and more.",
        features: ["10+ Tools", "AI Driven", "Full Free"],
        color: "from-purple-600 to-pink-600"
    }
];

const ProductsSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.4] pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#002366] mb-4 tracking-tight">Our Products</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Explore our suite of powerful, AI-driven software tools available for free.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {products.map((product) => (
                        <a
                            key={product.title}
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block bg-white"
                        >
                            <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${product.color}`} />
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#002366] transition-colors">{product.title}</h3>
                                    <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-100 text-xs font-bold uppercase tracking-wider rounded-full">Free</span>
                                </div>
                                <p className="text-gray-600 mb-6 leading-relaxed min-h-[60px]">{product.description}</p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {product.features.map(f => (
                                        <span key={f} className="px-3 py-1 bg-gray-50 text-gray-600 border border-gray-100 text-xs font-semibold rounded-md">{f}</span>
                                    ))}
                                </div>
                                <div className="flex items-center text-[#002366] font-bold text-sm tracking-widest uppercase group-hover:gap-3 transition-all">
                                    Launch App <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductsSection;
