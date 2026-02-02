'use client';
import { useEffect, useRef, useState, useCallback } from 'react';

interface MarketFeature {
  title: string;
  description: string;
  value: string;
  color: string;
  gradient: string;
  icon: React.ReactNode;
}

const marketFeatures: MarketFeature[] = [
  {
    title: "Agent Tokenization",
    description: "Transform ML agents into tradeable assets with fractional ownership and transparent performance metrics.",
    value: "Coming Soon",
    color: "#00d4ff",
    gradient: "from-cyan-400 to-blue-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M6 12h12" />
      </svg>
    )
  },
  {
    title: "Yield Generation",
    description: "Earn passive income from agent performance with automated profit distribution to token holders.",
    value: "Coming Soon",
    color: "#a855f7",
    gradient: "from-purple-400 to-violet-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    title: "Liquidity Pools",
    description: "Deep liquidity markets for agent tokens enable seamless entry and exit for investors.",
    value: "Coming Soon",
    color: "#10b981",
    gradient: "from-emerald-400 to-teal-600",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  }
];

interface CardState {
  rotateX: number;
  rotateY: number;
  spotlightX: number;
  spotlightY: number;
}

export default function CapitalMarketsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cardStates, setCardStates] = useState<CardState[]>(
    marketFeatures.map(() => ({ rotateX: 0, rotateY: 0, spotlightX: 50, spotlightY: 50 }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateY = (mouseX / (rect.width / 2)) * 10;
    const rotateX = -(mouseY / (rect.height / 2)) * 10;
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
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-950/5 to-transparent"></div>

      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-[10%] w-125 h-125 rounded-full blur-3xl opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-20 right-[10%] w-100 h-100 rounded-full blur-3xl opacity-[0.03]"
          style={{ background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)' }}
        />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-32 left-[15%] w-64 h-64 border border-cyan-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute bottom-32 right-[15%] w-48 h-48 border border-purple-400/20 rounded-full animate-float-medium" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-400/20 rounded-full animate-float-fast" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
            <span className="text-sm text-gray-400 tracking-wider uppercase">Capital Markets</span>
          </div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-light mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Tokenized Intelligence
            </span>
          </h2>

          <p className={`text-lg text-gray-400 max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Tokenize ML agents, create liquid markets, and democratize access to autonomous financial execution
          </p>

          <div className={`w-32 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full transition-all duration-1000 delay-400 ${isVisible ? 'scale-x-100 opacity-60' : 'scale-x-0 opacity-0'}`}></div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-20">
          {marketFeatures.map((feature, index) => (
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
                className="relative h-95 transition-transform duration-200 ease-out cursor-pointer"
                style={{
                  transform: `rotateX(${cardStates[index].rotateX}deg) rotateY(${cardStates[index].rotateY}deg)`,
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-800/50 transition-all duration-500 group-hover:border-gray-700/60 group-hover:bg-gray-900/70"></div>

                {/* Cursor spotlight */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at ${cardStates[index].spotlightX}% ${cardStates[index].spotlightY}%, ${feature.color}15, transparent 50%)`
                  }}
                ></div>

                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}></div>

                {/* Top glow line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col">
                  {/* Badge */}
                  <div className="mb-6">
                    <div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(135deg, ${feature.color}20, ${feature.color}10)`,
                        border: `1px solid ${feature.color}30`
                      }}
                    >
                      <div style={{ color: feature.color }}>{feature.icon}</div>
                      <span className="text-sm font-medium" style={{ color: feature.color }}>{feature.value}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold mb-4 text-gray-100 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed flex-1 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.description}
                  </p>

                  {/* Bottom indicator */}
                  <div className="mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: feature.color, animationDelay: `${i * 0.2}s` }}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm" style={{ color: feature.color }}>Explore</span>
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

        {/* CTA Section */}
        <div className={`text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative inline-block">
            {/* Glow background */}
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl opacity-50"></div>

            <div className="relative bg-gray-900/40 backdrop-blur-xl rounded-3xl border border-gray-800/50 p-12 max-w-2xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-light mb-4">
                <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                  Join The Society
                </span>
              </h3>
              <p className="text-xl text-white mb-2">of ML Agents.</p>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Discover the future of autonomous financial intelligence and verifiable ML execution.
              </p>

              <a
                href="/whitepaper"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300 relative overflow-hidden"
              >
                {/* Button background */}
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full"></div>
                <div className="absolute inset-0 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

                <span className="relative z-10 text-white font-semibold">Read Whitepaper</span>
                <svg className="relative z-10 w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 6s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
