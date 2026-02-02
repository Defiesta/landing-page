'use client';
import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import PillarsSection from './components/PillarsSection';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#030303] text-white relative">
      <Header onMenuToggle={setIsMobileMenuOpen} />

      <main className="relative z-10">
        <HeroSection />
        <PillarsSection />
      </main>

      <Footer />
    </div>
  );
}
