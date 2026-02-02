'use client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuroraBackground from '../components/AuroraBackground';

// Futuristic SVG Icons
const GenesisIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="genesis-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
      </linearGradient>
      <filter id="genesis-glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Outer ring */}
    <circle cx="60" cy="60" r="50" fill="none" stroke="url(#genesis-gradient)" strokeWidth="1" strokeDasharray="4 4" opacity="0.5">
      <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="20s" repeatCount="indefinite" />
    </circle>
    {/* Middle ring */}
    <circle cx="60" cy="60" r="38" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="15s" repeatCount="indefinite" />
    </circle>
    {/* Hexagon core */}
    <polygon
      points="60,30 82,45 82,75 60,90 38,75 38,45"
      fill="none"
      stroke="#38BDF8"
      strokeWidth="2"
      filter="url(#genesis-glow)"
    />
    {/* Inner connections */}
    <line x1="60" y1="30" x2="60" y2="90" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
    <line x1="38" y1="45" x2="82" y2="75" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
    <line x1="82" y1="45" x2="38" y2="75" stroke="#38BDF8" strokeWidth="0.5" opacity="0.4" />
    {/* Center pulse */}
    <circle cx="60" cy="60" r="8" fill="#38BDF8" opacity="0.8" filter="url(#genesis-glow)">
      <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.8;0.4;0.8" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Corner nodes */}
    <circle cx="60" cy="30" r="3" fill="#38BDF8" />
    <circle cx="82" cy="45" r="3" fill="#38BDF8" />
    <circle cx="82" cy="75" r="3" fill="#38BDF8" />
    <circle cx="60" cy="90" r="3" fill="#38BDF8" />
    <circle cx="38" cy="75" r="3" fill="#38BDF8" />
    <circle cx="38" cy="45" r="3" fill="#38BDF8" />
  </svg>
);

const PurposeIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="purpose-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
      </linearGradient>
      <filter id="purpose-glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Outer orbit */}
    <circle cx="60" cy="60" r="48" fill="none" stroke="#38BDF8" strokeWidth="1" strokeDasharray="2 6" opacity="0.3">
      <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="25s" repeatCount="indefinite" />
    </circle>
    {/* Target rings */}
    <circle cx="60" cy="60" r="40" fill="none" stroke="url(#purpose-gradient)" strokeWidth="1" opacity="0.5" />
    <circle cx="60" cy="60" r="28" fill="none" stroke="url(#purpose-gradient)" strokeWidth="1" opacity="0.6" />
    <circle cx="60" cy="60" r="16" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
    {/* Crosshairs */}
    <line x1="60" y1="15" x2="60" y2="40" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
    <line x1="60" y1="80" x2="60" y2="105" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
    <line x1="15" y1="60" x2="40" y2="60" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
    <line x1="80" y1="60" x2="105" y2="60" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />
    {/* Direction arrows */}
    <polygon points="60,20 56,28 64,28" fill="#38BDF8" opacity="0.6" />
    {/* Center core */}
    <circle cx="60" cy="60" r="6" fill="#38BDF8" filter="url(#purpose-glow)">
      <animate attributeName="r" values="5;7;5" dur="1.5s" repeatCount="indefinite" />
    </circle>
    {/* Orbital dots */}
    <circle cx="60" cy="20" r="2" fill="#38BDF8" opacity="0.8">
      <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="8s" repeatCount="indefinite" />
    </circle>
    <circle cx="100" cy="60" r="2" fill="#38BDF8" opacity="0.6">
      <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="-360 60 60" dur="12s" repeatCount="indefinite" />
    </circle>
  </svg>
);

const BuildIcon = () => (
  <svg viewBox="0 0 120 120" className="w-full h-full">
    <defs>
      <linearGradient id="build-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
      </linearGradient>
      <filter id="build-glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    {/* Background circuit pattern */}
    <circle cx="60" cy="60" r="50" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="1 8" opacity="0.3">
      <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="30s" repeatCount="indefinite" />
    </circle>
    {/* Cube - top face */}
    <polygon points="60,25 90,42 60,59 30,42" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.8" />
    {/* Cube - left face */}
    <polygon points="30,42 60,59 60,93 30,76" fill="none" stroke="url(#build-gradient)" strokeWidth="1.5" opacity="0.6" />
    {/* Cube - right face */}
    <polygon points="90,42 60,59 60,93 90,76" fill="none" stroke="url(#build-gradient)" strokeWidth="1.5" opacity="0.6" />
    {/* Inner cube structure */}
    <line x1="60" y1="59" x2="60" y2="93" stroke="#38BDF8" strokeWidth="1" opacity="0.8" />
    {/* Connection nodes */}
    <circle cx="60" cy="25" r="4" fill="#38BDF8" filter="url(#build-glow)" />
    <circle cx="90" cy="42" r="3" fill="#38BDF8" opacity="0.8" />
    <circle cx="30" cy="42" r="3" fill="#38BDF8" opacity="0.8" />
    <circle cx="60" cy="93" r="3" fill="#38BDF8" opacity="0.8" />
    <circle cx="30" cy="76" r="3" fill="#38BDF8" opacity="0.6" />
    <circle cx="90" cy="76" r="3" fill="#38BDF8" opacity="0.6" />
    {/* Center node with pulse */}
    <circle cx="60" cy="59" r="5" fill="#38BDF8" filter="url(#build-glow)">
      <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
    </circle>
    {/* Data flow particles */}
    <circle cx="45" cy="34" r="1.5" fill="#38BDF8" opacity="0.6">
      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="34" r="1.5" fill="#38BDF8" opacity="0.6">
      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="45" cy="68" r="1.5" fill="#38BDF8" opacity="0.6">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="75" cy="68" r="1.5" fill="#38BDF8" opacity="0.6">
      <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Card data for the three About sections
const ABOUT_CARDS = [
  {
    title: 'How We Started',
    description: 'Defiesta began as a small research-driven initiative focused on understanding how decentralized finance systems behave under real constraints. What started as exploratory work—analyzing protocols, incentives, and on-chain mechanics—gradually evolved into a broader effort to build tools and frameworks that prioritize correctness, transparency, and long-term reliability.',
    icon: GenesisIcon,
  },
  {
    title: 'Our Purpose',
    description: 'Our purpose is to contribute to a more understandable and resilient decentralized ecosystem. We aim to reduce unnecessary complexity by focusing on clear designs, verifiable behavior, and well-defined assumptions. Rather than chasing short-term trends, we concentrate on fundamentals that help protocols and users reason more clearly about the systems they rely on.',
    icon: PurposeIcon,
  },
  {
    title: 'What We Do',
    description: 'We design and develop infrastructure, research artifacts, and open-source components related to decentralized finance. Our work spans protocol analysis, system design, and implementation, with an emphasis on correctness, security, and composability. When possible, we share our findings and tools publicly to support broader ecosystem learning.',
    icon: BuildIcon,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-white relative">
      {/* Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <AuroraBackground />
      </div>

      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 z-[1] bg-[#030303]/80 pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="fixed inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      <Header />

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        {/* Hero Section */}
        <header className="text-center mb-20">
          <h1
            className="text-5xl md:text-7xl font-light mb-6"
            style={{ fontFamily: 'var(--font-playfair), serif' }}
          >
            <span className="italic">Our</span> Story
          </h1>
          <p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            Founded in 2025 to bring{' '}
            <span className="text-[#38BDF8]">verifiable AI agents</span> to the masses.
          </p>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent mx-auto"></div>
        </header>

        {/* CTA Button */}
        <div className="flex justify-center mb-24">
          <a
            href="mailto:mehd1b@defiesta.xyz"
            className="shiny-cta"
            style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
          >
            <span className="shiny-cta-text">Get in Touch</span>
          </a>
        </div>

        {/* Three Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {ABOUT_CARDS.map((card) => (
            <div
              key={card.title}
              className="group relative bg-[#0a0a0f]/60 backdrop-blur-sm rounded-2xl p-8 border border-white/5 hover:border-[#38BDF8]/20 transition-all duration-500"
            >
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#38BDF8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* SVG Icon container */}
              <div className="relative flex justify-center mb-8">
                <div className="w-32 h-32 md:w-40 md:h-40">
                  <card.icon />
                </div>
              </div>

              <h3
                className="text-2xl font-light text-white mb-4 text-center"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                {card.title}
              </h3>
              <p
                className="text-gray-500 leading-relaxed text-center text-sm"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Join Us CTA */}
        <section className="text-center">
          <div className="relative bg-[#0a0a0f]/60 backdrop-blur-sm rounded-2xl p-12 border border-white/5 overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 via-transparent to-[#38BDF8]/5 pointer-events-none" />

            <h2
              className="relative text-3xl md:text-4xl font-light text-white mb-4"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Join Our <span className="italic">Journey</span>
            </h2>
            <p
              className="relative text-gray-400 mb-10 max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
            >
              We're always looking for talented individuals who share our passion for{' '}
              <span className="text-[#38BDF8]">trustless systems</span> and verifiable AI.
            </p>
            <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/defiesta"
                target="_blank"
                rel="noopener noreferrer"
                className="shiny-cta"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                <span className="shiny-cta-text">Telegram</span>
              </a>
              <a
                href="https://github.com/Defiesta"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
                style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
              >
                View GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Shiny CTA Button Styles */}
      <style jsx>{`
        @property --gradient-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        .shiny-cta {
          --gradient-angle: 0deg;
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
              from var(--gradient-angle),
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
          cursor: pointer;
          isolation: isolate;
          animation: border-spin 2.5s linear infinite;
          text-decoration: none;
          display: inline-block;
        }

        .shiny-cta:active {
          transform: translateY(1px);
        }

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

        .shiny-cta-text {
          position: relative;
          z-index: 2;
          display: inline-flex;
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
      `}</style>
    </div>
  );
}
