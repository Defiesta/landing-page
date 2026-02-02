'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactElement;
  number: string;
}

const pillars: Pillar[] = [
  {
    title: "Agent Registry",
    description: "Deploy and register ML agents with cryptographic identity binding. Each agent's code hash and imageId are committed on-chain, ensuring only verified code executes.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="4" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
        <circle cx="6" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="22" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="6" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <circle cx="22" cy="20" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M10.5 11.5L8 9.5M17.5 11.5L20 9.5M10.5 16.5L8 18.5M17.5 16.5L20 18.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="14" cy="4" r="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
        <circle cx="14" cy="24" r="1.5" stroke="currentColor" strokeWidth="1" fill="currentColor" fillOpacity="0.2" />
        <path d="M14 10V5.5M14 18V22.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    number: "01"
  },
  {
    title: "Proof Infrastructure",
    description: "RISC Zero generates cryptographic proofs for every agent execution. SHA-256 commitments bind inputs, outputs, and constraints into a 209-byte journal verified on-chain.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <path d="M14 3L24 9V19L14 25L4 19V9L14 3Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <path d="M14 7L20 11V17L14 21L8 17V11L14 7Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M14 11L17 13V17L14 19L11 17V13L14 11Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        <path d="M11.5 14.5L13 16L16.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="14" cy="3" r="1" fill="currentColor" />
        <circle cx="24" cy="9" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="19" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="25" r="1" fill="currentColor" />
        <circle cx="4" cy="19" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="4" cy="9" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    number: "02"
  },
  {
    title: "Execution Engine",
    description: "RISC Zero zkVM executes agent logic with cryptographic proofs. Every execution produces a verifiable receipt that settles on-chain within bounded gas costs.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="6" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <rect x="10" y="10" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        <path d="M9 6V3M14 6V3M19 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 22V25M14 22V25M19 22V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 9H3M6 14H3M6 19H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 9H25M22 14H25M22 19H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M11 14H13L14 12.5L15 15.5L16 14H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
    number: "03"
  },
  {
    title: "Capital Allocation",
    description: "ERC4626-style vaults allow allocators to deposit capital into agent-controlled strategies. Constraint enforcement ensures bounded risk with leverage, position sizing, and drawdown limits.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        <rect x="5" y="10" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M5 14H23" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="19" r="1" fill="currentColor" />
        <path d="M9 10V7C9 5.5 11 4 14 4C17 4 19 5.5 19 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 14V24M11 14V24M17 14V24M20 14V24" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </svg>
    ),
    number: "04"
  }
];

interface CardState {
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

export default function PillarsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardStates, setCardStates] = useState<CardState[]>(
    pillars.map(() => ({ rotateX: 0, rotateY: 0, spotlightX: 50, spotlightY: 50 }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * 8;
    const rotateX = -(mouseY / (rect.height / 2)) * 8;
    const spotlightX = ((e.clientX - rect.left) / rect.width) * 100;
    const spotlightY = ((e.clientY - rect.top) / rect.height) * 100;

    setCardStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { rotateX, rotateY, spotlightX, spotlightY };
      return newStates;
    });
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    setHoveredIndex(null);
    setCardStates((prev) => {
      const newStates = [...prev];
      newStates[index] = { rotateX: 0, rotateY: 0, spotlightX: 50, spotlightY: 50 };
      return newStates;
    });
  }, []);

  const cyanColor = "#38BDF8";

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden bg-[#030303]">
      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Subtle cyan glow accents */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-[10%] w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.04]"
          style={{ background: `radial-gradient(circle, ${cyanColor} 0%, transparent 70%)` }}
        />
        <div
          className="absolute bottom-1/4 right-[10%] w-[350px] h-[350px] rounded-full blur-3xl opacity-[0.03]"
          style={{ background: `radial-gradient(circle, ${cyanColor} 0%, transparent 70%)` }}
        />
      </div>

      {/* Top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56, 189, 248, 0.3), transparent)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          {/* Label badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse" />
            <span
              className="text-xs tracking-widest text-gray-400 uppercase"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Foundation
            </span>
          </div>

          {/* Main heading - Playfair Display */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            <span className="text-white">The </span>
            <span className="italic text-[#38BDF8]">DeFi Agent</span>
            <span className="text-white"> Economy</span>
          </h2>

          <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Four pillars powering autonomous financial execution
          </p>

          {/* Decorative line */}
          <div
            className={`w-24 h-px mx-auto transition-all duration-1000 delay-400 ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}`}
            style={{ background: 'linear-gradient(90deg, transparent, #38BDF8, transparent)' }}
          />
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`relative group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${500 + index * 150}ms`, perspective: '1000px' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div
                className="relative h-72 transition-transform duration-200 ease-out cursor-pointer"
                style={{
                  transform: `rotateX(${cardStates[index].rotateX}deg) rotateY(${cardStates[index].rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Card background */}
                <div
                  className="absolute inset-0 rounded-2xl border transition-all duration-500"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderColor: hoveredIndex === index ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.05)'
                  }}
                />

                {/* Cursor spotlight */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${cardStates[index].spotlightX}% ${cardStates[index].spotlightY}%, rgba(56, 189, 248, 0.08), transparent 50%)`
                  }}
                />

                {/* Number indicator */}
                <div
                  className="absolute top-6 right-6 text-5xl font-extralight opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 select-none"
                  style={{
                    color: cyanColor,
                    fontFamily: 'var(--font-jetbrains-mono), monospace'
                  }}
                >
                  {pillar.number}
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="relative inline-block">
                      {/* Icon glow */}
                      <div
                        className="absolute inset-0 rounded-xl blur-xl transition-all duration-500 opacity-0 group-hover:opacity-40"
                        style={{ background: cyanColor }}
                      />

                      {/* Icon container */}
                      <div
                        className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: 'rgba(56, 189, 248, 0.1)',
                          border: '1px solid rgba(56, 189, 248, 0.2)',
                          color: cyanColor
                        }}
                      >
                        {pillar.icon}
                      </div>

                      {/* Orbital ring on hover */}
                      <div
                        className="absolute -inset-2 rounded-full border border-dashed opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{
                          borderColor: cyanColor,
                          animation: hoveredIndex === index ? 'spin 15s linear infinite' : 'none'
                        }}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl font-medium mb-3 text-white group-hover:text-[#38BDF8] transition-colors duration-300"
                    style={{ fontFamily: 'var(--font-geist-sans), sans-serif' }}
                  >
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-sm leading-relaxed flex-1 group-hover:text-gray-400 transition-colors duration-300">
                    {pillar.description}
                  </p>

                  {/* Bottom indicator line */}
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="h-px flex-1 rounded-full transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ background: `linear-gradient(90deg, ${cyanColor}, transparent)` }}
                    />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 left-3 w-4 h-4 pointer-events-none">
                  <div
                    className="absolute top-0 left-0 w-full h-px transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: `${cyanColor}60` }}
                  />
                  <div
                    className="absolute top-0 left-0 w-px h-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-75"
                    style={{ background: `${cyanColor}60` }}
                  />
                </div>

                <div className="absolute bottom-3 right-3 w-4 h-4 pointer-events-none">
                  <div
                    className="absolute bottom-0 right-0 w-full h-px transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-150"
                    style={{ background: `${cyanColor}60` }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-px h-full transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-200"
                    style={{ background: `${cyanColor}60` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
