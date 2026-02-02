'use client';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';
import AuroraBackground from './components/AuroraBackground';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-white relative">
      {/* Global Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AuroraBackground />
      </div>

      {/* Grid Pattern - spans entire page */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <Header onMenuToggle={setIsMobileMenuOpen} />

      <main className="relative z-10">
        <HeroSection />
        <PillarsSection />
      </main>

      <Footer />
    </div>
  );
}
