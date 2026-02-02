'use client';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Aurora fade overlay - blocks aurora from radar zone */}
      <div
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: 'linear-gradient(to right, transparent 0%, transparent 35%, rgba(3,3,3,0.95) 55%, #030303 65%)'
        }}
      />

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
            style={{ transitionDelay: '600ms', fontFamily: 'var(--font-jetbrains-mono), monospace' }}
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
              className="shiny-cta group"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              <span className="shiny-cta-text flex items-center gap-2">
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
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              Learn More
            </a>
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
                shapeRendering="geometricPrecision"
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
                shapeRendering="geometricPrecision"
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
                strokeDasharray="80 320"
                strokeDashoffset="320"
                opacity="0"
                shapeRendering="geometricPrecision"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.01s"
                  begin="0s"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="320"
                  to="-80"
                  dur="3s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </path>

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
                strokeDasharray="80 320"
                strokeDashoffset="320"
                opacity="0"
                shapeRendering="geometricPrecision"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.01s"
                  begin="1.5s"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="320"
                  to="-80"
                  dur="3s"
                  begin="1.5s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </path>

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
                strokeDasharray="60 320"
                strokeDashoffset="320"
                opacity="0"
                shapeRendering="geometricPrecision"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.01s"
                  begin="0.75s"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="320"
                  to="-60"
                  dur="3s"
                  begin="0.75s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </path>

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
                strokeDasharray="60 320"
                strokeDashoffset="320"
                opacity="0"
                shapeRendering="geometricPrecision"
              >
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.01s"
                  begin="2.25s"
                  fill="freeze"
                />
                <animate
                  attributeName="stroke-dashoffset"
                  from="320"
                  to="-60"
                  dur="3s"
                  begin="2.25s"
                  repeatCount="indefinite"
                  calcMode="linear"
                />
              </path>

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

              {/* LOW LATENCY Label - Top Left */}
              <g transform="translate(80, 120)">
                <text
                  fill="#38BDF8"
                  fontSize="12"
                  letterSpacing="1.2"
                  style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
                >
                  LOW LATENCY
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

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg) translateZ(0);
          }
          100% {
            transform: rotate(360deg) translateZ(0);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
        }

        @keyframes spin-slower {
          0% {
            transform: rotate(0deg) translateZ(0);
          }
          100% {
            transform: rotate(-360deg) translateZ(0);
          }
        }

        .animate-spin-slower {
          animation: spin-slower 15s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
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

        /* CSS Custom Properties for animated gradients */
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @property --gradient-angle-offset {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        /* Shiny CTA Button */
        .shiny-cta {
          --gradient-angle: 0deg;
          --gradient-angle-offset: 0deg;
          --gradient-percent: 20%;
          --gradient-shine: #38BDF8;

          position: relative;
          overflow: hidden;
          border-radius: 9999px;
          padding: 1rem 2rem;
          font-size: 1rem;
          line-height: 1.2;
          font-weight: 500;
          color: #38BDF8;
          background:
            linear-gradient(#030303, #030303) padding-box,
            conic-gradient(
              from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
              transparent 0%,
              #0ea5e9 5%,
              var(--gradient-shine) 15%,
              #0ea5e9 30%,
              transparent 40%,
              transparent 100%
            ) border-box;
          border: 2px solid transparent;
          box-shadow: rgb(26, 24, 24) 0px 0px 0px 1px inset;
          outline: none;
          transition:
            --gradient-angle-offset 800ms cubic-bezier(0.25, 1, 0.5, 1),
            --gradient-percent 800ms cubic-bezier(0.25, 1, 0.5, 1),
            --gradient-shine 800ms cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.3s;
          cursor: pointer;
          isolation: isolate;
          animation: border-spin 2.5s linear infinite;
          text-decoration: none;
          display: inline-block;
        }

        .shiny-cta:hover {
          --gradient-shine: #67e8f9;
          box-shadow: rgb(26, 24, 24) 0px 0px 0px 1px inset,
                      rgba(56, 189, 248, 0.3) 0px 0px 20px 0px;
        }

        .shiny-cta:active {
          transform: translateY(1px);
        }

        /* Subtle inner texture */
        .shiny-cta::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          --size: calc(100% - 6px);
          width: var(--size);
          height: var(--size);
          background-size: 4px 4px;
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          pointer-events: none;
        }

        /* Shimmer light effect */
        .shiny-cta::after {
          content: "";
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          aspect-ratio: 1 / 1;
          background: linear-gradient(-50deg, transparent, rgba(14, 165, 233, 0.4), transparent);
          mask-image: radial-gradient(circle at center bottom, transparent 40%, black);
          opacity: 0.6;
          animation: shimmer 4s linear infinite;
        }

        /* Text wrapper */
        .shiny-cta-text {
          position: relative;
          z-index: 2;
          display: inline-flex;
        }

        /* Breathing glow behind text */
        .shiny-cta-text::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: -1;
          width: calc(100% + 1rem);
          height: calc(100% + 1rem);
          box-shadow: rgb(14, 165, 233) 0px -1ex 2rem 4px inset;
          opacity: 0;
          border-radius: inherit;
          transition: opacity 800ms cubic-bezier(0.25, 1, 0.5, 1);
          animation: text-breathe 4.5s linear infinite;
        }

        .shiny-cta:hover .shiny-cta-text::before {
          opacity: 0.4;
        }

        @keyframes border-spin {
          0% {
            --gradient-angle: 0deg;
          }
          100% {
            --gradient-angle: 360deg;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes text-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </section>
  );
}
