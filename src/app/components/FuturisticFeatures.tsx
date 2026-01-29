'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface Feature {
  title: string;
  description: string;
  iconType: 'circuit' | 'lock' | 'vault';
  color: string;
  gradient: string;
}

const features: Feature[] = [
  {
    title: "Agent Kernel",
    description: "Agent-agnostic execution kernel running on RISC Zero zkVM. Each agent's code hash is cryptographically bound to its imageId for on-chain verification.",
    iconType: "circuit",
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600"
  },
  {
    title: "Zero-Knowledge Proofs",
    description: "RISC Zero generates cryptographic receipts for every execution. Proofs verify on-chain within 300k gas, ensuring deterministic and constraint-compliant behavior.",
    iconType: "lock",
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600"
  },
  {
    title: "Kernel Vaults",
    description: "ERC4626-style vaults with agent-controlled execution. Constraint enforcement guarantees bounded leverage, position sizing, and drawdown protection.",
    iconType: "vault",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600"
  }
];

const IconComponent = ({ type, color, isHovered }: { type: string; color: string; isHovered: boolean }) => {
  const baseClass = `transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`;

  switch (type) {
    case 'circuit':
      // AI Neural Network Icon - Brain/nodes representing AI agents
      return (
        <svg className={`w-10 h-10 ${baseClass}`} viewBox="0 0 40 40" fill="none">
          {/* Central brain/processor */}
          <circle cx="20" cy="20" r="6" stroke={color} strokeWidth="1.5" fill={`${color}20`} />
          <circle cx="20" cy="20" r="3" fill={color} className={isHovered ? 'animate-pulse' : ''} />

          {/* Outer nodes */}
          <circle cx="8" cy="12" r="3" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="32" cy="12" r="3" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="8" cy="28" r="3" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="32" cy="28" r="3" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="20" cy="6" r="2.5" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="20" cy="34" r="2.5" stroke={color} strokeWidth="1.5" fill={`${color}15`} />

          {/* Connection lines */}
          <path d="M14 17L10.5 13.5M26 17L29.5 13.5M14 23L10.5 26.5M26 23L29.5 26.5M20 14V8.5M20 26V31.5"
            stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.6" />

          {/* Inner pulse rings */}
          <circle cx="20" cy="20" r="9" stroke={color} strokeWidth="0.5" opacity="0.3"
            className={isHovered ? 'animate-ping' : ''} style={{ animationDuration: '2s' }} />
        </svg>
      );
    case 'lock':
      // Zero-Knowledge Shield - Hexagonal cryptographic shield
      return (
        <svg className={`w-10 h-10 ${baseClass}`} viewBox="0 0 40 40" fill="none">
          {/* Outer hexagon shield */}
          <path d="M20 4L34 12V28L20 36L6 28V12L20 4Z" stroke={color} strokeWidth="1.5" fill={`${color}10`} />

          {/* Inner hexagon */}
          <path d="M20 10L28 15V25L20 30L12 25V15L20 10Z" stroke={color} strokeWidth="1.5" fill={`${color}15`} />

          {/* ZK symbol - infinity/proof symbol */}
          <path d="M15 20C15 17.5 17.5 17.5 20 20C22.5 22.5 25 22.5 25 20"
            stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M15 20C15 22.5 17.5 22.5 20 20C22.5 17.5 25 17.5 25 20"
            stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Corner accents */}
          <circle cx="20" cy="4" r="1.5" fill={color} className={isHovered ? 'animate-pulse' : ''} />
          <circle cx="6" cy="12" r="1" fill={color} opacity="0.6" />
          <circle cx="34" cy="12" r="1" fill={color} opacity="0.6" />
          <circle cx="6" cy="28" r="1" fill={color} opacity="0.6" />
          <circle cx="34" cy="28" r="1" fill={color} opacity="0.6" />
          <circle cx="20" cy="36" r="1.5" fill={color} className={isHovered ? 'animate-pulse' : ''} style={{ animationDelay: '0.5s' }} />
        </svg>
      );
    case 'vault':
      // Trustless Vault - Secure cube/vault with blockchain elements
      return (
        <svg className={`w-10 h-10 ${baseClass}`} viewBox="0 0 40 40" fill="none">
          {/* 3D Cube vault */}
          <path d="M20 6L34 14V26L20 34L6 26V14L20 6Z" stroke={color} strokeWidth="1.5" fill={`${color}08`} />
          <path d="M20 6V18M20 18L6 26M20 18L34 26" stroke={color} strokeWidth="1" opacity="0.4" />

          {/* Inner secure core */}
          <circle cx="20" cy="20" r="7" stroke={color} strokeWidth="1.5" fill={`${color}15`} />
          <circle cx="20" cy="20" r="4" stroke={color} strokeWidth="1.5" fill={`${color}20`} />

          {/* Lock mechanism */}
          <circle cx="20" cy="20" r="2" fill={color} className={isHovered ? 'animate-pulse' : ''} />

          {/* Security rings */}
          <circle cx="20" cy="20" r="10" stroke={color} strokeWidth="0.5" strokeDasharray="3 3" opacity="0.4"
            className={isHovered ? 'animate-spin' : ''} style={{ animationDuration: '8s', transformOrigin: 'center' }} />

          {/* Corner locks */}
          <rect x="7" y="13" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
          <rect x="30" y="13" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
          <rect x="7" y="24" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
          <rect x="30" y="24" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
        </svg>
      );
    default:
      return null;
  }
};

interface CardState {
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

export default function FuturisticFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardStates, setCardStates] = useState<CardState[]>(
    features.map(() => ({ rotateX: 0, rotateY: 0, spotlightX: 50, spotlightY: 50 }))
  );
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D tilt effect handler
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    // Calculate rotation (max 15 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 15;
    const rotateX = -(mouseY / (rect.height / 2)) * 15;

    // Calculate spotlight position (0-100%)
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
    <section className="py-24 relative overflow-hidden">
      {/* Section background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-950/5 to-transparent"></div>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at center, rgba(0, 212, 255, 0.3) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Section header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm mb-6">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span className="text-sm text-gray-400 tracking-wider uppercase">Core Technology</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">
            <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Built for the Future
            </span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Three pillars of trustless AI execution, designed from the ground up for DeFi
          </p>
          <div className="w-32 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full mt-8 opacity-60"></div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={`relative group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                perspective: '1000px'
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* 3D Card wrapper */}
              <div
                className="relative h-105 transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${cardStates[index].rotateX}deg) rotateY(${cardStates[index].rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Card background with glassmorphism */}
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 transition-all duration-500 group-hover:border-gray-700/60 group-hover:bg-gray-900/70"></div>

                {/* Holographic border effect */}
                <div
                  className="absolute inset-0 rounded-3xl p-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.color}40, transparent 40%, transparent 60%, ${feature.color}40)`,
                  }}
                >
                  <div className="absolute inset-px rounded-3xl bg-gray-900/90"></div>
                </div>

                {/* Cursor spotlight effect */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${cardStates[index].spotlightX}% ${cardStates[index].spotlightY}%, ${feature.color}15, transparent 50%)`
                  }}
                ></div>

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}></div>

                {/* Top glow line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                ></div>

                {/* Content container */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Icon section */}
                  <div className="mb-8 flex justify-center">
                    <div className="relative">
                      {/* Icon background glow */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl transition-all duration-500 opacity-20 group-hover:opacity-40"
                        style={{ background: feature.color }}
                      ></div>

                      {/* Icon container */}
                      <div
                        className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${feature.color}10, ${feature.color}20)`,
                          border: `1px solid ${feature.color}30`
                        }}
                      >
                        <IconComponent type={feature.iconType} color={feature.color} isHovered={hoveredIndex === index} />
                      </div>

                      {/* Orbital rings */}
                      <div
                        className="absolute -inset-3 rounded-full border border-dashed opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                        style={{
                          borderColor: feature.color,
                          animation: 'spin 20s linear infinite'
                        }}
                      ></div>
                      <div
                        className="absolute -inset-6 rounded-full border border-dotted opacity-10 group-hover:opacity-30 transition-opacity duration-500"
                        style={{
                          borderColor: feature.color,
                          animation: 'spin 30s linear infinite reverse'
                        }}
                      ></div>

                      {/* Floating particles */}
                      <div
                        className="absolute -top-2 -right-2 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 animate-float-particle"
                        style={{ background: feature.color }}
                      ></div>
                      <div
                        className="absolute -bottom-1 -left-3 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 animate-float-particle"
                        style={{ background: feature.color, animationDelay: '0.5s' }}
                      ></div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-center text-gray-100 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-center leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom action hint */}
                  <div className="mt-6 flex justify-center">
                    <div
                      className="flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                      style={{ color: feature.color }}
                    >
                      <span>Learn more</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 pointer-events-none">
                  <div
                    className="absolute top-0 left-0 w-full h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ background: `linear-gradient(90deg, ${feature.color}, transparent)` }}
                  ></div>
                  <div
                    className="absolute top-0 left-0 w-0.5 h-full transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-100"
                    style={{ background: `linear-gradient(180deg, ${feature.color}, transparent)` }}
                  ></div>
                </div>

                <div className="absolute bottom-4 right-4 w-8 h-8 pointer-events-none">
                  <div
                    className="absolute bottom-0 right-0 w-full h-0.5 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-200"
                    style={{ background: `linear-gradient(270deg, ${feature.color}, transparent)` }}
                  ></div>
                  <div
                    className="absolute bottom-0 right-0 w-0.5 h-full transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300 delay-300"
                    style={{ background: `linear-gradient(0deg, ${feature.color}, transparent)` }}
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

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(5px);
            opacity: 1;
          }
        }

        .animate-float-particle {
          animation: float-particle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
