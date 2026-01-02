"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import InquiryForm from '../components/InquiryForm';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import BookNowModal from '../components/BookNowModal';
import LegalPage from '../components/LegalPage';
import { SERVICES } from '../constants';
import { PageType } from '../types';
import MobileStickyCTA from '../components/MobileStickyCTA';
import ProductsSection from '../components/ProductsSection';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const privacySections = [
    {
      title: "Introduction",
      content: (
        <p>At ProfessorLab, we are committed to protecting your privacy and ensuring the security of your information. This Privacy Policy explains how we collect, use, and safeguard data in our capacity as both a SaaS provider and a professional service agency.</p>
      )
    },
    {
      title: "Information Collection",
      content: (
        <>
          <p>We collect information that you provide directly to us when you request a service, sign up for our SaaS products, or communicate with us. This includes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Contact Information: Name, email address, phone number.</li>
            <li>Project Details: Information about your software needs, goals, and business logic.</li>
            <li>Usage Data: Technical information on how you interact with our platforms.</li>
          </ul>
        </>
      )
    },
    {
      title: "Data Utilization",
      content: (
        <p>Your data is used to provide high-quality engineering intelligence services, personalize your experience, process transactions, and improve our proprietary AI models and software frameworks. We prioritize data sovereignty and adhere to zero-trust architecture principles.</p>
      )
    },
    {
      title: "Data Sharing",
      content: (
        <p>ProfessorLab does not sell your personal information. We only share data with trusted third-party partners necessary for service delivery (e.g., cloud hosting providers) or when required by law. All partners are vetted for compliance with global security standards.</p>
      )
    },
    {
      title: "Security Measures",
      content: (
        <p>We implement industry-standard encryption, zero-trust access controls, and regular security audits to protect your intellectual property and personal data from unauthorized access or disclosure.</p>
      )
    }
  ];

  const termsSections = [
    {
      title: "Acceptance of Terms",
      content: (
        <p>By accessing ProfessorLab.co or engaging our services, you agree to comply with and be bound by these Terms of Service. These terms apply to all visitors, users, and clients of ProfessorLab Ltd.</p>
      )
    },
    {
      title: "Services & Scope",
      content: (
        <p>ProfessorLab provides engineering services including AI Solution development, Web application engineering, and Android (Flutter) development. Our iOS and Kotlin Android products are offered as in-house SaaS and are subject to specific licensing agreements.</p>
      )
    },
    {
      title: "Intellectual Property",
      content: (
        <p>Unless otherwise agreed in a written Service Agreement, all proprietary frameworks, AI models developed by ProfessorLab, and the ProfessorLab brand remain the exclusive property of ProfessorLab Ltd. Custom code developed specifically for a client will be transferred upon full payment as defined in the specific contract.</p>
      )
    },
    {
      title: "Service Reliability",
      content: (
        <p>While we strive for 99.8% operational accuracy in our Engineering Intelligence systems, all services are provided "as is". ProfessorLab Ltd. is not liable for indirect damages arising from the use of our experimental AI agents or software products.</p>
      )
    },
    {
      title: "Compliance & Jurisdiction",
      content: (
        <p>Users are responsible for ensuring their use of our technology complies with local laws and regulations. These terms are governed by the laws of our registration jurisdiction.</p>
      )
    }
  ];

  const renderContent = () => {
    switch (currentPage) {
      case PageType.PRIVACY:
        return <LegalPage title="Privacy Policy" lastUpdated="December 2024" sections={privacySections} />;
      case PageType.TERMS:
        return <LegalPage title="Terms of Service" lastUpdated="December 2024" sections={termsSections} />;
      case PageType.HOME:
      default:
        return (
          <>
            <Hero />
            <section id="services-section" className="py-32 relative">
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] pointer-events-none" />
              <div
                className="container-custom relative z-10 flex flex-col items-center min-h-[600px]"
                onClick={() => setExpandedServiceId(null)}
              >
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl place-items-center transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  {SERVICES.map(service => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      isExpanded={expandedServiceId === service.id}
                      onToggle={() => setExpandedServiceId(expandedServiceId === service.id ? null : service.id)}
                    />
                  ))}
                </div>
              </div>
            </section>
            <ProductsSection />
            <InquiryForm />
          </>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onBookNow={() => setIsBookModalOpen(true)}
        onNavigate={setCurrentPage}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <MobileStickyCTA onBookNow={() => setIsBookModalOpen(true)} />
      <BookNowModal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} />
    </div>
  );
}
