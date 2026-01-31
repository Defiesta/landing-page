'use client';
import { useState, useRef, useEffect } from 'react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  quarter: string;
  x: number;
  y: number;
  category: 'zkvm' | 'agents' | 'marketplace' | 'ecosystem' | 'defi';
  details?: string[];
  success_criteria?: string[];
  non_goals?: string[];
  link?: string;
}

interface Connection {
  from: string;
  to: string;
}

const roadmapData: RoadmapItem[] = [
  // Phase 1 - Core Protocol (Q1-Q2 2026)
  {
    id: 'canonical-zkvm-guest',
    title: 'Canonical zkVM Guest + Constraint Kernel',
    description: 'RISC Zero execution sandbox with deterministic constraints and proof pipeline',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 240,
    y: 320,
    category: 'zkvm',
    details: [
      'RISC Zero zkVM implementation',
      'Constraint engine for agent execution',
      'Deterministic execution boundaries',
      'Proof pipeline to Ethereum',
      'Operating Envelope: 1-10M params, sub-10s proving, 10-20M cycles'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },
  {
    id: 'agent-trait-interface',
    title: 'Agent Trait Interface',
    description: 'Canonical agent interface with input/output formats and execution semantics',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 440,
    y: 320,
    category: 'agents',
    details: [
      'Agent trait: init(), execute(), constraints()',
      'Input format specification',
      'Output/actions format',
      'Constraint enforcement semantics'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },
  {
    id: 'transcript-determinism',
    title: 'Transcript & Replay Protection',
    description: 'Input commitment design, journal canonicalization, and replay protection',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 640,
    y: 320,
    category: 'zkvm',
    details: [
      'Input commitment design',
      'Journal shaping & canonicalization',
      'Replay protection mechanisms',
      'Deterministic Runtime Profile: no time, no network, no parallel reductions',
      'Deterministic math primitives (canonical f32 / fixed-point)'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },
  {
    id: 'developer-sdk',
    title: 'Developer Tooling (SDK & CLI)',
    description: 'Complete SDK with guest generation CLI and example agents',
    status: 'completed',
    quarter: 'Q1 2026',
    x: 840,
    y: 320,
    category: 'ecosystem',
    details: [
      'Kernel SDK for agent development',
      'Guest generation CLI',
      'Example agents and templates',
      'CI/testing suite for guest + host'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },
  {
    id: 'on-chain-interfaces',
    title: 'On-Chain Interface Standards',
    description: 'Vault, proof submission, and registry interfaces with multionce scheme',
    status: 'completed',
    quarter: 'Q2 2026',
    x: 240,
    y: 480,
    category: 'ecosystem',
    details: [
      'Vault interface standard',
      'Proof submission interface',
      'Agent registry specification',
      'Replay/multinonce scheme',
      'Freshness bounds for state-sensitive actions',
      'State-binding constraints (price deviation, block bounds)'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/contracts'
  },
  {
    id: 'execution-flow-mvp',
    title: 'Execution Flow v1',
    description: 'Complete user-to-settlement flow with first agent deployment',
    status: 'completed',
    quarter: 'Q2 2026',
    x: 440,
    y: 480,
    category: 'agents',
    details: [
      'End-to-end execution pipeline',
      'First agent deployment + proof settlement',
      'User allocation to agents',
      'Automatic settlement'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },
  {
    id: 'defi-integration-mvp',
    title: 'DeFi & On-chain Integration',
    description: 'Vaults, registry, and verifier contracts with basic DeFi interactions',
    status: 'completed',
    quarter: 'Q2 2026',
    x: 640,
    y: 480,
    category: 'defi',
    details: [
      'User vault contracts',
      'Agent registry deployment',
      'Proof verifier contracts',
      'Basic DeFi interaction patterns'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/contracts'
  },
  {
    id: 'proof-format-standard',
    title: 'Proof Format Standardization',
    description: 'Receipt structure, journal formats, and verification specifications',
    status: 'completed',
    quarter: 'Q2 2026',
    x: 840,
    y: 480,
    category: 'zkvm',
    details: [
      'Receipt structure specification',
      'Journal format standards',
      'Verification interface',
      'Proof metadata schemas'
    ],
    link: 'https://github.com/Defiesta/execution-kernel/crates'
  },

  // Phase 2 - Marketplace & Economics (Q3 2026)
  {
    id: 'agent-marketplace-v1',
    title: 'Verifiable ML Marketplace v1',
    description: 'Verifiable ML agent marketplace optimized for risk management, rebalancing, and policy-based execution',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 240,
    y: 640,
    category: 'marketplace',
    details: [
      'Agent listing and discovery UI',
      'Versioning and metadata',
      'Agent performance metrics',
      'Search and filtering',
      'Best-fit use case documentation (risk, rebalancing, governance)',
      'Operating envelope visibility per agent'
    ]
  },
  {
    id: 'economic-layer-mvp',
    title: 'Economic Layer (Fees & Royalties)',
    description: 'MVP allocation and fee routing',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 440,
    y: 640,
    category: 'ecosystem',
    details: [
      'Allocation + fee routing',
      'Developer royalties',
      'Transparent fee structure'
    ]
  },
  {
    id: 'allocator-dashboard',
    title: 'Allocator Dashboard',
    description: 'Better UX for allocators with portfolio management and analytics',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 640,
    y: 640,
    category: 'marketplace',
    details: [
      'Portfolio management interface',
      'Agent performance analytics',
      'Allocation tools',
      'Risk management dashboard'
    ]
  },
  {
    id: 'monitoring-observability',
    title: 'Monitoring & Observability',
    description: 'Proof latency, execution cost, and uptime dashboards for allocators',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 840,
    y: 640,
    category: 'ecosystem',
    details: [
      'Proof latency monitoring',
      'Execution cost tracking',
      'Uptime dashboards',
      'Performance metrics'
    ]
  },

  // Phase 3 - Scale & Security (Q4 2026)
  {
    id: 'performance-optimizations',
    title: 'Performance Improvements',
    description: 'Proof size reduction, batch verification, and cost optimizations',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 240,
    y: 800,
    category: 'zkvm',
    details: [
      'Proof size reduction',
      'Batch verification',
      'Cost optimizations',
      'Scalability improvements'
    ]
  },
  {
    id: 'security-audit',
    title: 'Security & Formalization',
    description: 'External audits, formal specification, and security benchmarks',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 440,
    y: 800,
    category: 'ecosystem',
    details: [
      'External security audits',
      'Formal specification',
      'Security benchmarks',
      'Vulnerability assessments'
    ]
  },
  {
    id: 'constraint-system-spec',
    title: 'Constraint System Specification',
    description: 'Advanced constraint engine with formal verification and composability',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 640,
    y: 800,
    category: 'zkvm',
    details: [
      'Formal constraint specification',
      'Advanced constraint types',
      'Constraint composability',
      'Verification guarantees'
    ]
  },
  {
    id: 'multi-agent-composition',
    title: 'Multi-Agent Composition',
    description: 'Agent-to-agent calls with proof aggregation and composable patterns',
    status: 'upcoming',
    quarter: 'Q4 2026',
    x: 840,
    y: 800,
    category: 'agents',
    details: [
      'Agent → Agent communication',
      'Proof aggregation strategies',
      'Multi-agent composition primitives',
      'Composable execution patterns'
    ]
  },

  // Future/Post-MVP (2027+) - Moved from earlier phases
  {
    id: 'stateful-agents-future',
    title: 'Stateful & Long-Running Agents',
    description: 'Long-lived stateful agents with persistent state (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 240,
    y: 960,
    category: 'agents',
    details: [
      'Persistent agent state',
      'Long-running execution',
      'State management protocols',
      'Complex workflows'
    ]
  },
  {
    id: 'decentralized-execution-future',
    title: 'Decentralized Execution Network',
    description: 'Multiple executors with proof races and decentralized infrastructure (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 440,
    y: 960,
    category: 'ecosystem',
    details: [
      'Multiple executor network',
      'Proof race mechanisms',
      'Decentralized infrastructure',
      'Executor reputation system'
    ]
  },
  {
    id: 'governance-future',
    title: 'Governance Layer',
    description: 'Protocol governance and community management (Post-MVP)',
    status: 'upcoming',
    quarter: '2027+',
    x: 640,
    y: 960,
    category: 'ecosystem',
    details: [
      'Protocol governance',
      'Parameter management',
      'Community coordination',
      'Treasury management'
    ]
  },
  {
    id: 'privacy-confidentiality',
    title: 'Privacy & Strategy Confidentiality',
    description: 'Privacy as a staged capability - preserving verifiability without forcing strategy disclosure',
    status: 'upcoming',
    quarter: '2027+',
    x: 840,
    y: 960,
    category: 'ecosystem',
    details: [
      'Input-hiding commitment schemes for sensitive parameters',
      'Selective disclosure of journal fields',
      'TEE-backed confidentiality with ZK policy compliance',
      'Hybrid execution options for heavyweight models'
    ],
    success_criteria: [
      'Strategy parameters hidden from public journals',
      'Verifiability preserved for constraint compliance',
      'Optional privacy modes available per agent'
    ],
    non_goals: [
      'Full computation hiding (out of scope for MVP)',
      'Replacing ZK verification with TEE-only'
    ]
  }
];

const connections: Connection[] = [
  // Phase 1: Horizontal flow within phase
  { from: 'zkvm-guest-kernel', to: 'constraint-enforcement' },
  { from: 'constraint-enforcement', to: 'deterministic-framework' },
  { from: 'proof-pipeline', to: 'agent-registry' },
  { from: 'agent-registry', to: 'vault-infrastructure' },
  { from: 'vault-infrastructure', to: 'developer-sdk' },
  
  // Phase 1 to Phase 2: Only key foundational connections
  { from: 'developer-sdk', to: 'execution-orchestration' },
  { from: 'vault-infrastructure', to: 'financial-agents' },
  { from: 'agent-registry', to: 'mvp-deployment' },
  
  // Phase 2: Horizontal flow within phase
  { from: 'execution-orchestration', to: 'financial-agents' },
  { from: 'financial-agents', to: 'mvp-deployment' },
  
  // Phase 2 to Phase 3: Production readiness flow
  { from: 'mvp-deployment', to: 'security-audit' },
  { from: 'execution-orchestration', to: 'performance-optimization' },
  { from: 'financial-agents', to: 'monitoring-observability' },
  
  // Phase 3: Horizontal flow within phase
  { from: 'security-audit', to: 'performance-optimization' },
  { from: 'performance-optimization', to: 'monitoring-observability' },
  
  // Phase 3 to Future: Advanced capabilities
  { from: 'monitoring-observability', to: 'advanced-execution' },
  { from: 'security-audit', to: 'network-decentralization' },
  { from: 'performance-optimization', to: 'ecosystem-expansion' }
];

export default function InteractiveRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 0, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragMoved, setDragMoved] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Unified cyan color scheme with opacity variations for hierarchy
  const cyanPrimary = '#22D3EE'; // cyan-400
  const cyanLight = '#67E8F9';   // cyan-300
  const cyanDark = '#06B6D4';    // cyan-500

  const phaseColors: Record<string, string> = {
    'Q1 2026': cyanPrimary,
    'Q2 2026': cyanPrimary,
    'Q3 2026': cyanLight,
    'Q4 2026': cyanDark,
    '2027+': '#0891B2'  // cyan-600
  };

  const statusColors = {
    completed: '#4ADE80',  // green-400
    'in-progress': cyanPrimary,
    upcoming: '#164E63'  // cyan-900
  };


  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.4, Math.min(3, scale * scaleChange));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as Element;
    // Only start dragging on background elements, not on interactive elements
    if (target.tagName === 'svg' || target.tagName === 'rect' || 
        (target.closest('svg') === svgRef.current && !target.closest('.milestone-node'))) {
      setIsDragging(true);
      setDragMoved(false);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Track if mouse has moved significantly
      if (Math.abs(newX - position.x) > 5 || Math.abs(newY - position.y) > 5) {
        setDragMoved(true);
      }
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Reset drag moved state after a short delay
    setTimeout(() => setDragMoved(false), 100);
  };

  const resetView = () => {
    setScale(0.8);
    setPosition({ x: 0, y: -100 });
    setSelectedItem(null);
  };

  const zoomIn = () => setScale(prev => Math.min(3, prev * 1.1));
  const zoomOut = () => setScale(prev => Math.max(0.4, prev * 0.9));

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
        if (isFullscreen) setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  return (
    <div 
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : 'w-full h-full'} overflow-hidden`}
    >

      {/* Home Button */}
      <a
        href="/"
        className="absolute top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-gray-950/90 hover:bg-cyan-400/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 transition-all backdrop-blur-sm group"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="text-sm font-medium">Home</span>
      </a>

      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-1.5">
        <button
          onClick={zoomOut}
          className="w-9 h-9 flex items-center justify-center bg-gray-950/90 hover:bg-cyan-400/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 transition-all backdrop-blur-sm"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          className="w-9 h-9 flex items-center justify-center bg-gray-950/90 hover:bg-cyan-400/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 transition-all backdrop-blur-sm"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={resetView}
          className="w-9 h-9 flex items-center justify-center bg-gray-950/90 hover:bg-cyan-400/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 transition-all backdrop-blur-sm"
          title="Reset View"
        >
          ⌂
        </button>
        <button
          onClick={toggleFullscreen}
          className="w-9 h-9 flex items-center justify-center bg-gray-950/90 hover:bg-cyan-400/10 rounded-lg border border-cyan-400/20 hover:border-cyan-400/40 text-cyan-400 transition-all backdrop-blur-sm"
          title="Fullscreen"
        >
          ⛶
        </button>
      </div>

      {/* Phase Color Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-gray-950/90 rounded-xl p-4 border border-cyan-400/20 backdrop-blur-md shadow-lg shadow-cyan-500/10">
        <h3 className="text-sm font-bold mb-3 text-cyan-400 tracking-wide">Development Phases</h3>
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full border border-cyan-300/50" style={{ backgroundColor: '#22D3EE', boxShadow: '0 0 12px #22D3EE60' }} />
            <span className="text-gray-300 font-medium">Phase 1: Core Protocol (Q1-Q2 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full border border-cyan-400/50" style={{ backgroundColor: '#06B6D4', boxShadow: '0 0 10px #06B6D450' }} />
            <span className="text-gray-300 font-medium">Phase 2: MVP Execution (Q3 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full border border-cyan-500/50" style={{ backgroundColor: '#0891B2', boxShadow: '0 0 8px #0891B240' }} />
            <span className="text-gray-300 font-medium">Phase 3: Production (Q4 2026)</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="w-3 h-3 rounded-full border border-cyan-600/50" style={{ backgroundColor: '#155E75', boxShadow: '0 0 6px #155E7530' }} />
            <span className="text-gray-400 font-medium">Future: Advanced (2027+)</span>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-cyan-400/10">
          <h4 className="text-xs font-semibold mb-2 text-cyan-400/80">Status</h4>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-sm shadow-green-400/50" />
              <span className="text-gray-400">Done</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-gray-400">Active</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-900" />
              <span className="text-gray-400">Next</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main SVG */}
      <div 
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          viewBox="0 0 1000 1000"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`
          }}
        >
          {/* Enhanced Background with Futuristic Grid */}
          <defs>
            <pattern id="futuristicGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" stroke="#1E293B" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="1" fill="#06B6D4" opacity="0.4">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite"/>
              </circle>
            </pattern>
            
            {/* Glowing effects */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
            
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/> 
              </feMerge>
            </filter>
            
            {/* Animated gradient for connections - cyan only */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9">
                <animate attributeName="stopOpacity"
                  values="0.9;0.4;0.9"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6">
                <animate attributeName="stopOpacity"
                  values="0.6;1;0.6"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0.9">
                <animate attributeName="stopOpacity"
                  values="0.9;0.4;0.9"
                  dur="3s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width="100%" height="100%" fill="#0A0A0A"/>
          <rect width="100%" height="100%" fill="url(#futuristicGrid)" opacity="0.6"/>

          {/* Technical Header Section */}
          <foreignObject x="200" y="25" width="600" height="220">
            <div className="relative bg-gray-950/95 rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-md overflow-hidden">
              {/* Animated glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-cyan-500/5 via-cyan-400/10 to-cyan-500/5">
                <div className="absolute inset-0 bg-linear-to-b from-cyan-400/5 to-transparent animate-pulse"></div>
              </div>
              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-px bg-linear-to-r from-cyan-400 to-transparent"></div>
              <div className="absolute top-0 left-0 w-px h-16 bg-linear-to-b from-cyan-400 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-16 h-px bg-linear-to-l from-cyan-400 to-transparent"></div>
              <div className="absolute bottom-0 right-0 w-px h-16 bg-linear-to-t from-cyan-400 to-transparent"></div>

              <div className="relative z-10 text-center">
                <h1 className="text-3xl font-bold mb-2 text-cyan-400 tracking-tight">
                  Protocol Development Roadmap
                </h1>
                <div className="text-sm text-cyan-300/80 mb-5 font-medium tracking-wide">
                  Verifiable Execution Kernel for Bounded Financial Agents
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-cyan-400/10 rounded-lg p-3 border border-cyan-400/30 hover:border-cyan-400/50 transition-colors">
                    <div className="font-bold text-cyan-300 mb-1">Phase 1</div>
                    <div className="text-gray-300 text-xs">Core Protocol</div>
                    <div className="text-cyan-400/60 text-xs mt-1 font-mono">Q1-Q2 2026</div>
                  </div>
                  <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/30 hover:border-cyan-500/50 transition-colors">
                    <div className="font-bold text-cyan-400 mb-1">Phase 2</div>
                    <div className="text-gray-300 text-xs">MVP Execution</div>
                    <div className="text-cyan-400/60 text-xs mt-1 font-mono">Q3 2026</div>
                  </div>
                  <div className="bg-cyan-600/10 rounded-lg p-3 border border-cyan-600/30 hover:border-cyan-600/50 transition-colors">
                    <div className="font-bold text-cyan-500 mb-1">Phase 3</div>
                    <div className="text-gray-300 text-xs">Production</div>
                    <div className="text-cyan-400/60 text-xs mt-1 font-mono">Q4 2026</div>
                  </div>
                </div>
              </div>
            </div>
          </foreignObject>

          {/* Connections */}
          {connections.map((connection, index) => {
            const fromItem = roadmapData.find(item => item.id === connection.from);
            const toItem = roadmapData.find(item => item.id === connection.to);

            if (!fromItem || !toItem) return null;

            return (
              <line
                key={index}
                x1={fromItem.x}
                y1={fromItem.y}
                x2={toItem.x}
                y2={toItem.y}
                stroke="#374151"
                strokeWidth="2"
                strokeDasharray="4,4"
                opacity="0.6"
              />
            );
          })}

          {/* Phase Separator Lines */}
          {[
            { y: 560, label: 'Phase 2' },
            { y: 720, label: 'Phase 3' },
            { y: 880, label: 'Future' }
          ].map((separator, index) => (
            <g key={`separator-${index}`}>
              {/* Main horizontal line */}
              <line
                x1="170"
                y1={separator.y}
                x2="920"
                y2={separator.y}
                stroke="#22D3EE"
                strokeWidth="1"
                opacity="0.15"
              />
              {/* Gradient fade on left */}
              <line
                x1="170"
                y1={separator.y}
                x2="300"
                y2={separator.y}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                opacity="0.4"
              />
              {/* Gradient fade on right */}
              <line
                x1="800"
                y1={separator.y}
                x2="920"
                y2={separator.y}
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                opacity="0.4"
              />
            </g>
          ))}

          {/* Technical Phase Indicators - Unified Cyan */}
          {[
            {
              label: 'Phase 1',
              subtitle: 'Core Protocol',
              period: 'Q1-Q2 2026',
              y: 280,
              opacity: 1,
              glow: '#22D3EE'
            },
            {
              label: 'Phase 2',
              subtitle: 'MVP Execution',
              period: 'Q3 2026',
              y: 600,
              opacity: 0.85,
              glow: '#06B6D4'
            },
            {
              label: 'Phase 3',
              subtitle: 'Production',
              period: 'Q4 2026',
              y: 760,
              opacity: 0.7,
              glow: '#0891B2'
            },
            {
              label: 'Future',
              subtitle: 'Advanced',
              period: '2027+',
              y: 920,
              opacity: 0.55,
              glow: '#155E75'
            }
          ].map((phase, index) => (
            <g key={index}>
              {/* Glowing background */}
              <rect
                x="20"
                y={phase.y - 10}
                width="140"
                height="70"
                fill={phase.glow}
                opacity={0.15 * phase.opacity}
                rx="12"
                filter="url(#glow)"
              />

              {/* Main phase container */}
              <foreignObject x="25" y={phase.y - 5} width="130" height="65">
                <div
                  className="h-full p-3 rounded-xl border backdrop-blur-sm flex flex-col justify-center"
                  style={{
                    background: `linear-gradient(135deg, rgba(34,211,238,${0.2 * phase.opacity}) 0%, rgba(6,182,212,${0.1 * phase.opacity}) 100%)`,
                    borderColor: `rgba(34,211,238,${0.4 * phase.opacity})`
                  }}
                >
                  <div className="text-xs font-bold text-cyan-300" style={{ opacity: phase.opacity }}>{phase.label}</div>
                  <div className="text-xs text-cyan-100 font-medium mt-1 leading-tight" style={{ opacity: phase.opacity * 0.9 }}>{phase.subtitle}</div>
                  <div className="text-xs text-cyan-200/70 mt-1 font-mono" style={{ opacity: phase.opacity * 0.8 }}>{phase.period}</div>
                </div>
              </foreignObject>

              {/* Animated side indicator */}
              <rect
                x="10"
                y={phase.y + 13}
                width="3"
                height="30"
                fill={phase.glow}
                rx="1.5"
                opacity={0.8 * phase.opacity}
              >
                <animate attributeName="opacity" values={`${0.4 * phase.opacity};${1 * phase.opacity};${0.4 * phase.opacity}`} dur="2s" repeatCount="indefinite" begin={`${index * 0.5}s`}/>
              </rect>
            </g>
          ))}

          {/* Enhanced Roadmap Items */}
          {roadmapData.map((item) => {
            const isSelected = selectedItem === item.id;
            const nodeSize = isSelected ? 35 : 28;
            const phaseColor = phaseColors[item.quarter];
            const statusColor = statusColors[item.status];
            const isCompleted = item.status === 'completed';
            const nodeColor = isCompleted ? '#4ADE80' : phaseColor;  // green-400 for completed

            return (
              <g key={item.id}>
                {/* Outer glow ring */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize + 8}
                  fill={nodeColor}
                  opacity={isCompleted ? "0.4" : "0.2"}
                  filter="url(#nodeGlow)"
                  className={`transition-all duration-300 ${isSelected ? 'opacity-40' : ''}`}
                >
                  {!isCompleted && (
                    <animate attributeName="r" values={`${nodeSize + 6};${nodeSize + 12};${nodeSize + 6}`} dur="3s" repeatCount="indefinite"/>
                  )}
                </circle>

                {/* Status ring */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize + 3}
                  fill="none"
                  stroke={statusColor}
                  strokeWidth={isCompleted ? "3" : "2"}
                  opacity={isCompleted ? "1" : "0.8"}
                  className="transition-all duration-300"
                />

                {/* Main node */}
                <circle
                  cx={item.x}
                  cy={item.y}
                  r={nodeSize}
                  fill={nodeColor}
                  stroke={isCompleted ? '#4ADE80' : phaseColor}
                  strokeWidth={isCompleted ? "4" : "3"}
                  className="milestone-node cursor-pointer transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!dragMoved) {
                      setSelectedItem(selectedItem === item.id ? null : item.id);
                    }
                  }}
                  filter="url(#nodeGlow)"
                  opacity="0.9"
                />

                {/* Inner icon/indicator - Checkmark for completed, circle for others */}
                {isCompleted ? (
                  <g
                    className="milestone-node cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!dragMoved) {
                        setSelectedItem(selectedItem === item.id ? null : item.id);
                      }
                    }}
                  >
                    <circle
                      cx={item.x}
                      cy={item.y}
                      r={nodeSize - 10}
                      fill="rgba(74, 222, 128, 0.3)"
                    />
                    <path
                      d={`M ${item.x - 8} ${item.y} L ${item.x - 2} ${item.y + 6} L ${item.x + 10} ${item.y - 6}`}
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                ) : (
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={nodeSize - 12}
                    fill={item.status === 'in-progress' ? statusColor : 'rgba(255,255,255,0.9)'}
                    opacity={item.status === 'in-progress' ? '0.9' : '0.7'}
                    className="milestone-node cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!dragMoved) {
                        setSelectedItem(selectedItem === item.id ? null : item.id);
                      }
                    }}
                  >
                    {item.status === 'in-progress' && (
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                    )}
                  </circle>
                )}
                
                {/* Enhanced Label */}
                <foreignObject 
                  x={item.x - 60} 
                  y={item.y - 70} 
                  width="120" 
                  height="35"
                  className="pointer-events-none"
                >
                  <div className="text-center">
                    <div className="text-xs font-bold text-white drop-shadow-lg leading-tight">
                      {item.title.length > 30 ? 
                        item.title.substring(0, 30) + '...' : 
                        item.title
                      }
                    </div>
                    <div className="text-xs text-gray-300 mt-1 opacity-80">
                      {item.quarter}
                    </div>
                  </div>
                </foreignObject>
                
                {/* Progress indicator for in-progress items */}
                {item.status === 'in-progress' && (
                  <circle
                    cx={item.x}
                    cy={item.y}
                    r={nodeSize + 5}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * (nodeSize + 5) * 0.75} ${2 * Math.PI * (nodeSize + 5) * 0.25}`}
                    opacity="0.9"
                    transform={`rotate(-90 ${item.x} ${item.y})`}
                  >
                    <animateTransform 
                      attributeName="transform" 
                      type="rotate" 
                      from={`-90 ${item.x} ${item.y}`}
                      to={`270 ${item.x} ${item.y}`}
                      dur="2s" 
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Enhanced Selected Item Details */}
      {selectedItem && (
        <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-96 bg-gray-950/95 rounded-2xl p-6 border border-cyan-400/30 backdrop-blur-xl z-30 shadow-xl shadow-cyan-500/10">
          {(() => {
            const item = roadmapData.find(i => i.id === selectedItem);
            if (!item) return null;

            const phaseColor = phaseColors[item.quarter];
            const statusColor = statusColors[item.status];

            return (
              <>
                {/* Subtle animated glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-cyan-500/5 via-transparent to-cyan-400/5 animate-pulse"></div>
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-12 h-px bg-linear-to-r from-cyan-400 to-transparent"></div>
                <div className="absolute top-0 left-0 w-px h-12 bg-linear-to-b from-cyan-400 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-12 h-px bg-linear-to-l from-cyan-400 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-px h-12 bg-linear-to-t from-cyan-400 to-transparent"></div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-cyan-400 tracking-tight">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-500 hover:text-cyan-400 text-xl transition-colors duration-200 hover:scale-110 w-8 h-8 flex items-center justify-center rounded-full hover:bg-cyan-400/10"
                    >
                      ×
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{
                        backgroundColor: statusColor + '15',
                        color: statusColor,
                        borderColor: statusColor + '30'
                      }}
                    >
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{
                        backgroundColor: phaseColor + '15',
                        color: phaseColor,
                        borderColor: phaseColor + '30'
                      }}
                    >
                      {item.quarter.includes('Q1') || item.quarter.includes('Q2') ? 'PHASE 1' :
                       item.quarter.includes('Q3') ? 'PHASE 2' :
                       item.quarter.includes('Q4') ? 'PHASE 3' : 'FUTURE'}
                    </span>
                    <span className="text-xs text-cyan-400/70 font-mono bg-cyan-400/5 px-2 py-1 rounded border border-cyan-400/20">
                      {item.quarter}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed mb-4 bg-gray-900/50 p-3 rounded-lg border border-cyan-400/10">
                    {item.description}
                  </p>

                  {item.link && (
                    <div className="mb-4">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-300 rounded-lg border border-cyan-400/30 hover:border-cyan-400/50 transition-all text-sm font-medium"
                      >
                        <span>View Repository</span>
                        <span className="text-cyan-400">→</span>
                      </a>
                    </div>
                  )}

                  {item.details && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-cyan-400">Technical Deliverables</h4>
                      <ul className="text-xs text-gray-300 space-y-2">
                        {item.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 bg-cyan-400/5 p-2 rounded border border-cyan-400/10">
                            <span className="text-cyan-400 mt-0.5">›</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Success Criteria - unified cyan styling */}
                  {(item.success_criteria || item.quarter.includes('Q1') || item.quarter.includes('Q2') || item.quarter.includes('Q3') || item.quarter.includes('Q4')) && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-cyan-300">Success Criteria</h4>
                      <ul className="text-xs text-gray-300 space-y-1.5">
                        {item.success_criteria ? (
                          item.success_criteria.map((criteria, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>{criteria}</span>
                            </li>
                          ))
                        ) : item.quarter.includes('Q1') || item.quarter.includes('Q2') ? (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>Sub-10s end-to-end proving for MVP agents (1-10M params)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>Operating envelope enforced: 10-20M cycles per execution</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>All constraint violations result in proof generation failure</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>Execution receipts verify on-chain within 300k gas budget</span>
                            </li>
                          </>
                        ) : item.quarter.includes('Q3') ? (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>&lt;5 minute end-to-end execution latency</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>Zero custody errors across 100+ execution cycles</span>
                            </li>
                          </>
                        ) : item.quarter.includes('Q4') ? (
                          <>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>5+ production-ready financial agents deployed</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>Average proof generation cost &lt;$0.50 per execution</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-cyan-400 mt-0.5">✓</span>
                              <span>99.9% execution success rate with constraint compliance</span>
                            </li>
                          </>
                        ) : null}
                      </ul>
                    </div>
                  )}

                  {/* Non-Goals - show when item has custom non_goals */}
                  {item.non_goals && (
                    <div className="mb-4">
                      <h4 className="text-sm font-bold mb-3 text-cyan-300/70">Non-Goals</h4>
                      <ul className="text-xs text-gray-400 space-y-1.5">
                        {item.non_goals.map((nonGoal, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-gray-500 mt-0.5">✗</span>
                            <span>{nonGoal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Protocol Invariants */}
                  <div className="bg-cyan-400/5 p-3 rounded-lg border border-cyan-400/20">
                    <h4 className="text-sm font-bold mb-2 text-cyan-400">Protocol Invariants</h4>
                    <ul className="text-xs text-gray-400 space-y-1.5">
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">›</span>
                        <span>Execution Determinism: Identical inputs → identical outputs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">›</span>
                        <span>Capital Safety: User funds remain in controlled vaults</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">›</span>
                        <span>Constraint Enforcement: All actions respect declared bounds</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-cyan-500">›</span>
                        <span>Proof Completeness: Every state change is cryptographically backed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 right-4 z-20 bg-gray-950/90 rounded-lg p-3 border border-cyan-400/20 backdrop-blur-md shadow-lg shadow-cyan-500/5">
        <div className="text-xs text-cyan-400 font-semibold mb-2 tracking-wide">Navigation</div>
        <div className="text-xs text-gray-400 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm shadow-cyan-400/50"></span>
            <span>Scroll to zoom • Drag to pan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-sm shadow-cyan-500/50"></span>
            <span>Click nodes for details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-600 rounded-full shadow-sm shadow-cyan-600/50"></span>
            <span>Press ESC to deselect</span>
          </div>
        </div>
      </div>
    </div>
  );
}