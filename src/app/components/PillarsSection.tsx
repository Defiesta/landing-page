'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactElement;
  color: string;
  gradient: string;
  number: string;
}

const pillars: Pillar[] = [
  {
    title: "Agent Registry",
    description: "Deploy and register ML agents with cryptographic identity binding. Each agent's code hash and imageId are committed on-chain, ensuring only verified code executes.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        {/* Connected nodes representing registry network */}
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
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
    number: "01"
  },
  {
    title: "Proof Infrastructure",
    description: "RISC Zero generates cryptographic proofs for every agent execution. SHA-256 commitments bind inputs, outputs, and constraints into a 209-byte journal verified on-chain.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        {/* Layered hexagons representing blockchain proof layers */}
        <path d="M14 3L24 9V19L14 25L4 19V9L14 3Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.05" />
        <path d="M14 7L20 11V17L14 21L8 17V11L14 7Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M14 11L17 13V17L14 19L11 17V13L14 11Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />
        {/* Checkmark in center */}
        <path d="M11.5 14.5L13 16L16.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Corner dots */}
        <circle cx="14" cy="3" r="1" fill="currentColor" />
        <circle cx="24" cy="9" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="24" cy="19" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="14" cy="25" r="1" fill="currentColor" />
        <circle cx="4" cy="19" r="1" fill="currentColor" opacity="0.5" />
        <circle cx="4" cy="9" r="1" fill="currentColor" opacity="0.5" />
      </svg>
    ),
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
    number: "02"
  },
  {
    title: "Execution Engine",
    description: "RISC Zero zkVM executes agent logic with cryptographic proofs. Every execution produces a verifiable receipt that settles on-chain within bounded gas costs.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        {/* zkVM processor with proof generation */}
        <rect x="6" y="6" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <rect x="10" y="10" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="14" r="2" fill="currentColor" />
        {/* Connection pins */}
        <path d="M9 6V3M14 6V3M19 6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 22V25M14 22V25M19 22V25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6 9H3M6 14H3M6 19H3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M22 9H25M22 14H25M22 19H25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Energy pulse lines */}
        <path d="M11 14H13L14 12.5L15 15.5L16 14H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      </svg>
    ),
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
    number: "03"
  },
  {
    title: "Capital Allocation",
    description: "ERC4626-style vaults allow allocators to deposit capital into agent-controlled strategies. Constraint enforcement ensures bounded risk with leverage, position sizing, and drawdown limits.",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 28 28" fill="none">
        {/* Vault with shield representing constrained capital */}
        <rect x="5" y="10" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <path d="M5 14H23" stroke="currentColor" strokeWidth="1.5" />
        {/* Vault door/lock */}
        <circle cx="14" cy="19" r="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="19" r="1" fill="currentColor" />
        {/* Constraint indicators on top */}
        <path d="M9 10V7C9 5.5 11 4 14 4C17 4 19 5.5 19 7V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Safety bars */}
        <path d="M8 14V24M11 14V24M17 14V24M20 14V24" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      </svg>
    ),
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
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

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-emerald-950/5 to-transparent"></div>

      {/* Top border with gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-800 to-transparent"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-[5%] w-100 h-100 rounded-full blur-3xl opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-[5%] w-87.5 h-87.5 rounded-full blur-3xl opacity-[0.02]"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-sm text-gray-400 tracking-wider uppercase">Foundation</span>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              The DeFi Agent Economy
            </span>
          </h2>

          <p className={`text-lg text-gray-400 max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Four pillars powering autonomous financial execution
          </p>

          <div className={`w-32 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full transition-all duration-1000 delay-400 ${isVisible ? 'scale-x-100 opacity-60' : 'scale-x-0 opacity-0'}`}></div>
        </div>

        {/* Pillars grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
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
                className="relative h-80 transition-transform duration-200 ease-out cursor-pointer"
                style={{
                  transform: `rotateX(${cardStates[index].rotateX}deg) rotateY(${cardStates[index].rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-800/50 transition-all duration-500 group-hover:border-gray-700/60 group-hover:bg-gray-900/60"></div>

                {/* Cursor spotlight */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${cardStates[index].spotlightX}% ${cardStates[index].spotlightY}%, ${pillar.color}12, transparent 50%)`
                  }}
                ></div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${pillar.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`}></div>

                {/* Number indicator */}
                <div
                  className="absolute top-6 right-6 text-6xl font-extralight opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500 select-none"
                  style={{ color: pillar.color }}
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
                        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500 opacity-20 group-hover:opacity-40"
                        style={{ background: pillar.color }}
                      ></div>

                      {/* Icon container */}
                      <div
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `linear-gradient(135deg, ${pillar.color}20, ${pillar.color}10)`,
                          border: `1px solid ${pillar.color}30`,
                          color: pillar.color
                        }}
                      >
                        {pillar.icon}
                      </div>

                      {/* Orbital ring */}
                      <div
                        className="absolute -inset-2 rounded-full border border-dashed opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          borderColor: pillar.color,
                          animation: hoveredIndex === index ? 'spin 15s linear infinite' : 'none'
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-100 group-hover:text-white transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {pillar.description}
                  </p>

                  {/* Bottom indicator */}
                  <div className="mt-4 flex items-center gap-3">
                    <div
                      className="h-0.5 flex-1 rounded-full transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100"
                      style={{ background: `linear-gradient(90deg, ${pillar.color}, transparent)` }}
                    ></div>
                    <div
                      className="flex items-center gap-1 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                      style={{ color: pillar.color }}
                    >
                      <span>Explore</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-6 h-6 pointer-events-none">
                  <div
                    className="absolute top-0 left-0 w-full h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: `linear-gradient(90deg, ${pillar.color}80, transparent)` }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-0.5 h-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-75"
                    style={{ background: `linear-gradient(180deg, ${pillar.color}80, transparent)` }}
                  ></div>
                </div>

                <div className="absolute bottom-4 right-4 w-6 h-6 pointer-events-none">
                  <div
                    className="absolute bottom-0 right-0 w-full h-0.5 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-150"
                    style={{ background: `linear-gradient(270deg, ${pillar.color}80, transparent)` }}
                  ></div>
                  <div
                    className="absolute bottom-0 right-0 w-0.5 h-full transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-225"
                    style={{ background: `linear-gradient(0deg, ${pillar.color}80, transparent)` }}
                  ></div>
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
