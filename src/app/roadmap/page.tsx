'use client';
import { useEffect } from 'react';
import InteractiveRoadmap from '../components/InteractiveRoadmap';
import AuroraBackground from '../components/AuroraBackground';

export default function RoadmapPage() {
  useEffect(() => {
    // Prevent scrolling on the body
    document.body.style.overflow = 'hidden';

    return () => {
      // Restore scrolling when leaving the page
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-[#030303] text-white">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AuroraBackground />
      </div>

      {/* Semi-transparent overlay to reduce aurora effect */}
      <div className="absolute inset-0 z-[1] bg-[#030303]/40 pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />
      <InteractiveRoadmap />
    </div>
  );
}