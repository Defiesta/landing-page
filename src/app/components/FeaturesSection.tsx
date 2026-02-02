'use client';
import { useRef, useState } from 'react';

interface CardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  featured?: boolean;
}

function Card({ title, description, children, featured = false }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardContent = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col p-10 rounded-[32px] border border-white/10 bg-white/[0.02] overflow-hidden transition-all duration-500 h-full ${featured ? 'bg-[#050505]' : ''}`}
    >
      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.06), transparent 40%)`,
        }}
      />

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-[32px] border border-[#38BDF8]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50 pointer-events-none" />

      {/* Gradient overlay for featured card */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
      )}

      {/* Content */}
      <h3
        className="relative z-10 text-2xl font-light tracking-tight text-white mb-4"
        style={{ fontFamily: 'var(--font-playfair), serif' }}
      >
        {title}
      </h3>
      <p
        className="relative z-10 text-sm font-light text-white/50 leading-relaxed mb-12"
        style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
      >
        {description}
      </p>

      {/* Card specific content */}
      <div className="mt-auto relative z-10">
        {children}
      </div>
    </div>
  );

  if (featured) {
    return (
      <div className="p-[1px] lg:-mt-8 lg:mb-8 z-20 rounded-[32px] bg-gradient-to-b from-white/20 via-white/5 to-transparent">
        {cardContent}
      </div>
    );
  }

  return cardContent;
}

// Terminal Mockup Component
function TerminalMockup() {
  return (
    <div className="w-full h-72 rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-[10px] font-mono text-white/30 uppercase tracking-wider">terminal</span>
      </div>
      {/* Terminal content */}
      <div className="p-4 font-mono text-sm">
        <div className="flex items-center gap-2 text-white/50">
          <span className="text-[#38BDF8]">$</span>
          <span>defiesta deploy --agent yield-optimizer</span>
        </div>
        <div className="mt-2 text-white/30">
          <span className="text-green-400">✓</span> Compiling agent to RISC-V...
        </div>
        <div className="mt-1 text-white/30">
          <span className="text-green-400">✓</span> Computing image commitment...
        </div>
        <div className="mt-1 text-white/30">
          <span className="text-green-400">✓</span> Registering on-chain...
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-[#38BDF8]">→</span>
          <span className="text-white/70">Agent deployed:</span>
          <span className="text-[#38BDF8]">0x7a3f...8b2c</span>
        </div>
      </div>
    </div>
  );
}

// Network Visualization Component - Orbital Design
function NetworkVisualization() {
  return (
    <div className="group w-full h-80 rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden relative flex items-center justify-center">
      {/* Network Paths SVG - Animated beams */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
        viewBox="0 0 400 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="smart-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="50%" stopColor="rgba(56, 189, 248, 0.8)"/>
            <stop offset="100%" stopColor="transparent"/>
          </linearGradient>
        </defs>

        {/* Path 1: Top Right into Center (static base) */}
        <path d="M420,40 C320,40 280,160 200,160" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        {/* Path 1: Animated beam */}
        <path
          d="M420,40 C320,40 280,160 200,160"
          fill="none"
          stroke="url(#smart-beam-grad)"
          strokeWidth="1.5"
          strokeDasharray="100 1000"
          strokeLinecap="round"
          className="animate-beam"
        />

        {/* Path 2: Bottom Left into Center (static base) */}
        <path d="M-20,280 C80,280 120,160 200,160" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
        {/* Path 2: Animated beam */}
        <path
          d="M-20,280 C80,280 120,160 200,160"
          fill="none"
          stroke="url(#smart-beam-grad)"
          strokeWidth="1.5"
          strokeDasharray="80 1000"
          strokeLinecap="round"
          className="animate-beam-delayed"
        />
      </svg>

      {/* Orbital Rings Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Ring 1 - Outer Ping */}
        <div className="absolute w-72 h-72 rounded-full border border-[#38BDF8]/5 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-10" />

        {/* Ring 2 - Middle Ping */}
        <div className="absolute w-60 h-60 rounded-full border border-white/5 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20" style={{ animationDelay: '700ms' }} />

        {/* Ring 3 - Spin Slow */}
        <div className="absolute w-48 h-48 rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />

        {/* Ring 4 - Spin Medium */}
        <div className="absolute w-44 h-44 rounded-full border border-white/10 animate-[spin_30s_linear_infinite]" />

        {/* Ring 5 - Dashed Reverse */}
        <div className="absolute w-32 h-32 rounded-full border border-white/5 border-dashed animate-[spin_20s_linear_infinite_reverse]" />

        {/* Center Hub */}
        <div className="z-10 flex group-hover:border-[#38BDF8]/40 transition-colors duration-500 bg-[#0F110E] w-20 h-20 border-white/10 border rounded-3xl relative items-center justify-center overflow-hidden shadow-2xl">
          {/* Layers Icon */}
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-20 group-hover:text-[#38BDF8] transition-colors duration-500">
            <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
            <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
            <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
          </svg>

          {/* Pulse overlay */}
          <div className="animate-[pulse_2s_infinite] bg-gradient-to-tr from-transparent via-[#38BDF8]/10 to-transparent absolute inset-0 z-10" />
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute bottom-4 flex flex-col items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 group-hover:border-[#38BDF8]/20 transition-colors">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38BDF8] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#38BDF8]" />
          </span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">Network Active</span>
        </div>
      </div>

      {/* Beam animation styles */}
      <style jsx>{`
        .animate-beam {
          animation: beam 3s linear infinite;
        }
        .animate-beam-delayed {
          animation: beam 4s linear infinite;
        }
        @keyframes beam {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

// Proof Badge Component
function ProofBadge() {
  return (
    <div className="w-full h-72 rounded-2xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden relative flex flex-col items-center justify-center p-6">
      {/* ZK Proof visualization */}
      <div className="relative mb-6">
        {/* Hexagon shape */}
        <svg viewBox="0 0 100 100" className="w-24 h-24">
          <defs>
            <linearGradient id="proof-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <polygon
            points="50,5 90,25 90,75 50,95 10,75 10,25"
            fill="none"
            stroke="url(#proof-gradient)"
            strokeWidth="2"
          />
          <polygon
            points="50,20 75,35 75,65 50,80 25,65 25,35"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1"
            opacity="0.5"
          />
          <circle cx="50" cy="50" r="8" fill="#38BDF8" className="animate-[pulse_2s_infinite]" />
        </svg>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 group-hover:border-[#38BDF8]/20 transition-colors">
        <div className="relative">
          <div className="absolute h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
          <div className="h-2 w-2 rounded-full bg-green-400" />
        </div>
        <span className="text-[10px] font-mono text-white/70 uppercase tracking-wider">Verified</span>
      </div>

      {/* Proof details */}
      <div className="mt-4 text-center">
        <div className="text-[10px] font-mono text-white/30 uppercase tracking-wider mb-1">Groth16 Proof</div>
        <div className="text-sm font-mono text-[#38BDF8]">~200 bytes</div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <section className="relative z-10 flex flex-col items-center bg-[#030303]/50 backdrop-blur-xl border-t border-white/5 px-6 py-32 lg:px-12 overflow-hidden">
      {/* Section header */}
      <div className="text-center mb-16 max-w-3xl">
        <h2
          className="text-4xl md:text-5xl font-light mb-6"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          <span className="italic">Trustless</span> by Design
        </h2>
        <p
          className="text-lg text-white/50 leading-relaxed"
          style={{ fontFamily: 'var(--font-jetbrains-mono), monospace' }}
        >
          Every action is cryptographically verified. No trust assumptions beyond math.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {/* Card 1 - Deploy */}
        <Card
          title="Deploy Verifiable Agents"
          description="Compile ML models to deterministic RISC-V, generate cryptographic commitments, and register on-chain in minutes."
        >
          <TerminalMockup />
        </Card>

        {/* Card 2 - Featured/Middle */}
        <Card
          title="Decentralized Execution"
          description="Executors run your agents off-chain and generate zero-knowledge proofs. No single point of failure."
          featured
        >
          <NetworkVisualization />
        </Card>

        {/* Card 3 - Verify */}
        <Card
          title="On-Chain Verification"
          description="Proofs are verified on Ethereum for ~250k gas. Only valid, constraint-compliant actions settle."
        >
          <ProofBadge />
        </Card>
      </div>
    </section>
  );
}
