'use client';
import { useEffect, useState } from 'react';
import AuroraBackground from './AuroraBackground';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Base Background - Near Black */}
      <div className="absolute inset-0 z-0 bg-[#030303]" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 200px'
        }}
      />

      {/* Animated Aurora Background - Flowing Pixel Noise */}
      <div className="absolute inset-0 z-[2]">
        <AuroraBackground />
      </div>

      {/* Dot Pattern Overlay - Right Side */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none z-[3]"
        style={{
          backgroundImage: 'radial-gradient(rgb(255, 255, 255) 0.5px, transparent 0.5px)',
          backgroundSize: '18px 18px',
          opacity: 0.2,
          maskImage: 'linear-gradient(to left, rgba(0,0,0,0.4) 0%, transparent 60%)'
        }}
      />

      {/* Main Content Container - Split Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12 pt-32 pb-20 lg:py-20">

        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          {/* Main Heading */}
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-tight mb-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
              fontFamily: 'var(--font-playfair), serif',
              transitionDelay: '200ms'
            }}
          >
            <span className="block text-white whitespace-nowrap">
              <span className="italic">EVM</span> Verifiable
            </span>
            <span className="block mt-2">
              <span
                className="italic"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #38bdf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                ML Agents
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg md:text-xl text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms' }}
          >
            Deploy Machine Learning agents that execute DeFi strategies with{' '}
            <span className="text-[#38BDF8]">zero-knowledge proofs</span>.
            Trustless, verifiable, and autonomous.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap justify-center lg:justify-start gap-4 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '800ms' }}
          >
            <a
              href="https://www.docs.defiesta.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-8 py-4 rounded-full overflow-hidden"
            >
              <div
                className="absolute inset-0 rounded-full animate-border-spin"
                style={{
                  background: 'conic-gradient(from var(--gradient-angle, 0deg), #00d4ff, #0ea5e9, #38bdf8, #00d4ff)'
                }}
              />
              <div className="absolute inset-[1.5px] rounded-full bg-[#0a0a0f]" />
              <span className="relative z-10 flex items-center gap-2 text-[#38BDF8] font-medium">
                Initialize Protocol
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>

            <a
              href="/whitepaper"
              className="px-8 py-4 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Status Indicators */}
          <div
            className={`flex items-center justify-center lg:justify-start gap-6 mt-12 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 bg-white/20"></div>
              <div className="w-1 h-1 bg-white/20"></div>
              <div className="w-1 h-1 bg-[#38BDF8] animate-pulse"></div>
            </div>
            <span className="text-xs text-gray-500 tracking-wider uppercase">Protocol Active</span>
          </div>
        </div>

        {/* Right Side - Radar Visualization - Hidden on mobile */}
        <div
          className={`hidden lg:flex flex-1 justify-center lg:justify-end transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="relative w-[450px] h-[550px] md:w-[600px] md:h-[700px] lg:w-[700px] lg:h-[850px]">
            {/* Glow behind radar */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none animate-breathe"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(56, 189, 248, 0.08) 50%, transparent 70%)'
              }}
            />

            <svg viewBox="0 0 600 600" className="w-full h-full">
              <defs>
                {/* Center Glow Gradient */}
                <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </radialGradient>

                {/* Beam Gradient */}
                <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Pulsing Glow Behind Center */}
              <circle
                cx="300"
                cy="300"
                r="120"
                fill="url(#center-glow)"
                className="animate-pulse-glow"
              />

              {/* Sonar Waves - Three Expanding Rings */}
              {[0, 1, 2].map((i) => (
                <circle
                  key={`sonar-${i}`}
                  cx="300"
                  cy="300"
                  r="10"
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="1"
                  className="sonar-wave"
                  style={{
                    animationDelay: `${i}s`
                  }}
                />
              ))}

              {/* Outer Dashed Orbit - Slow Spin */}
              <circle
                cx="300"
                cy="300"
                r="160"
                fill="none"
                stroke="white"
                strokeOpacity="0.1"
                strokeWidth="1"
                strokeDasharray="10 20"
                className="animate-spin-slow"
                style={{ transformOrigin: '300px 300px' }}
              />

              {/* Inner Dashed Orbit - Slower Spin */}
              <circle
                cx="300"
                cy="300"
                r="110"
                fill="none"
                stroke="#38BDF8"
                strokeOpacity="0.2"
                strokeWidth="1"
                strokeDasharray="4 6"
                className="animate-spin-slower"
                style={{ transformOrigin: '300px 300px' }}
              />

              {/* Curved Bezier Lines - Upper */}
              <path
                d="M 50 200 C 150 200, 200 300, 300 300"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              <path
                d="M 50 200 C 150 200, 200 300, 300 300"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="80 1000"
                className="animate-beam"
              />

              {/* Curved Bezier Lines - Lower */}
              <path
                d="M 50 400 C 150 400, 200 300, 300 300"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              <path
                d="M 50 400 C 150 400, 200 300, 300 300"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="80 1000"
                className="animate-beam"
                style={{ animationDelay: '1.5s' }}
              />

              {/* Curved Line - Right Side Upper */}
              <path
                d="M 550 200 C 450 200, 400 300, 300 300"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              <path
                d="M 550 200 C 450 200, 400 300, 300 300"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="60 1000"
                className="animate-beam"
                style={{ animationDelay: '0.75s' }}
              />

              {/* Curved Line - Right Side Lower */}
              <path
                d="M 550 400 C 450 400, 400 300, 300 300"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeOpacity="0.1"
              />
              <path
                d="M 550 400 C 450 400, 400 300, 300 300"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="60 1000"
                className="animate-beam"
                style={{ animationDelay: '2.25s' }}
              />

              {/* Center Focal Point */}
              {/* Outer Ring */}
              <circle
                cx="300"
                cy="300"
                r="8"
                fill="#0A0A0A"
                stroke="#38BDF8"
                strokeWidth="2"
              />
              {/* Inner Core */}
              <circle
                cx="300"
                cy="300"
                r="4"
                fill="#38BDF8"
                style={{ filter: 'drop-shadow(0 0 6px #38BDF8)' }}
              />

              {/* Data Points scattered */}
              <circle cx="200" cy="220" r="2" fill="#38BDF8" fillOpacity="0.6" />
              <circle cx="380" cy="180" r="1.5" fill="#38BDF8" fillOpacity="0.4" />
              <circle cx="420" cy="350" r="2" fill="#38BDF8" fillOpacity="0.5" />
              <circle cx="180" cy="380" r="1.5" fill="#38BDF8" fillOpacity="0.3" />
              <circle cx="350" cy="420" r="2" fill="#38BDF8" fillOpacity="0.4" />
              <circle cx="240" cy="160" r="1.5" fill="#38BDF8" fillOpacity="0.5" />

              {/* ZERO LATENCY Label - Top Left */}
              <g transform="translate(80, 120)">
                <text
                  fill="#38BDF8"
                  fontSize="12"
                  letterSpacing="1.2"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  ZERO LATENCY
                </text>
                <line x1="0" y1="16" x2="95" y2="16" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
              </g>

              {/* DEFI NATIVE Label - Bottom Right */}
              <g transform="translate(420, 480)">
                <text
                  fill="#38BDF8"
                  fontSize="12"
                  letterSpacing="1.2"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  DEFI NATIVE
                </text>
                <line x1="0" y1="16" x2="85" y2="16" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.5" />
              </g>

              {/* Small Indicator Squares - Status */}
              <g transform="translate(520, 300)">
                <rect x="0" y="0" width="4" height="4" fill="rgba(255,255,255,0.2)" />
                <rect x="8" y="0" width="4" height="4" fill="rgba(255,255,255,0.2)" />
                <rect x="16" y="0" width="4" height="4" fill="#38BDF8" className="animate-pulse" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #030303 0%, transparent 100%)'
        }}
      />

      {/* Inline Styles for Animations */}
      <style jsx>{`
        @keyframes sonar-wave {
          0% {
            r: 15;
            opacity: 0.8;
            stroke-width: 1.5;
          }
          100% {
            r: 150;
            opacity: 0;
            stroke-width: 0;
          }
        }

        .sonar-wave {
          animation: sonar-wave 3s ease-out infinite;
        }

        @keyframes beam {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-beam {
          animation: beam 3s linear infinite;
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        @keyframes spin-slower {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }

        .animate-spin-slower {
          animation: spin-slower 15s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
          transform-origin: 300px 300px;
        }

        @keyframes breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.8;
          }
        }

        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }

        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-spin {
          0% {
            --gradient-angle: 0deg;
          }
          100% {
            --gradient-angle: 360deg;
          }
        }

        .animate-border-spin {
          animation: border-spin 3s linear infinite;
        }
      `}</style>
    </section>
  );
}
