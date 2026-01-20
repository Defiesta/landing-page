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
    status: 'in-progress',
    quarter: 'Q1 2026',
    x: 200,
    y: 300,
    category: 'zkvm',
    details: [
      'RISC Zero zkVM implementation',
      'Constraint engine for agent execution',
      'Deterministic execution boundaries',
      'Proof pipeline to Ethereum'
    ]
  },
  {
    id: 'agent-trait-interface',
    title: 'Agent Trait Interface',
    description: 'Canonical agent interface with input/output formats and execution semantics',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 380,
    y: 260,
    category: 'agents',
    details: [
      'Agent trait: init(), execute(), constraints()',
      'Input format specification',
      'Output/actions format',
      'Constraint enforcement semantics'
    ]
  },
  {
    id: 'transcript-determinism',
    title: 'Transcript & Replay Protection',
    description: 'Input commitment design, journal canonicalization, and replay protection',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 550,
    y: 300,
    category: 'zkvm',
    details: [
      'Input commitment design',
      'Journal shaping & canonicalization',
      'Replay protection mechanisms',
      'Deterministic execution guarantees'
    ]
  },
  {
    id: 'developer-sdk',
    title: 'Developer Tooling (SDK & CLI)',
    description: 'Complete SDK with guest generation CLI and example agents',
    status: 'upcoming',
    quarter: 'Q1 2026',
    x: 720,
    y: 260,
    category: 'ecosystem',
    details: [
      'Kernel SDK for agent development',
      'Guest generation CLI',
      'Example agents and templates',
      'CI/testing suite for guest + host'
    ]
  },
  {
    id: 'on-chain-interfaces',
    title: 'On-Chain Interface Standards',
    description: 'Vault, proof submission, and registry interfaces with multionce scheme',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 150,
    y: 450,
    category: 'ecosystem',
    details: [
      'Vault interface standard',
      'Proof submission interface',
      'Agent registry specification',
      'Replay/multinonce scheme'
    ]
  },
  {
    id: 'execution-flow-mvp',
    title: 'Execution Flow v1',
    description: 'Complete user-to-settlement flow with first agent deployment',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 350,
    y: 420,
    category: 'agents',
    details: [
      'End-to-end execution pipeline',
      'First agent deployment + proof settlement',
      'User allocation to agents',
      'Automatic settlement'
    ]
  },
  {
    id: 'defi-integration-mvp',
    title: 'DeFi & On-chain Integration',
    description: 'Vaults, registry, and verifier contracts with basic DeFi interactions',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 550,
    y: 450,
    category: 'defi',
    details: [
      'User vault contracts',
      'Agent registry deployment',
      'Proof verifier contracts',
      'Basic DeFi interaction patterns'
    ]
  },
  {
    id: 'proof-format-standard',
    title: 'Proof Format Standardization',
    description: 'Receipt structure, journal formats, and verification specifications',
    status: 'upcoming',
    quarter: 'Q2 2026',
    x: 750,
    y: 420,
    category: 'zkvm',
    details: [
      'Receipt structure specification',
      'Journal format standards',
      'Verification interface',
      'Proof metadata schemas'
    ]
  },

  // Phase 2 - Marketplace & Economics (Q3 2026)
  {
    id: 'agent-marketplace-v1',
    title: 'Agent Marketplace v1',
    description: 'Listing/registry UI with agent discovery and versioning',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 200,
    y: 600,
    category: 'marketplace',
    details: [
      'Agent listing and discovery UI',
      'Versioning and metadata',
      'Agent performance metrics',
      'Search and filtering'
    ]
  },
  {
    id: 'economic-layer-mvp',
    title: 'Economic Layer (Fees & Royalties)',
    description: 'MVP allocation, fee routing, and basic subscription models',
    status: 'upcoming',
    quarter: 'Q3 2026',
    x: 400,
    y: 570,
    category: 'ecosystem',
    details: [
      'Allocation + fee routing',
      'Basic subscription models',
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
    x: 600,
    y: 600,
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
    x: 800,
    y: 570,
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
    x: 250,
    y: 750,
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
    x: 450,
    y: 720,
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
    x: 650,
    y: 750,
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
    x: 850,
    y: 720,
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
    x: 300,
    y: 900,
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
    x: 550,
    y: 880,
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
    x: 800,
    y: 900,
    category: 'ecosystem',
    details: [
      'Protocol governance',
      'Parameter management',
      'Community coordination',
      'Treasury management'
    ]
  }
];

const connections: Connection[] = [
  // Phase 1 internal connections
  { from: 'canonical-zkvm-guest', to: 'agent-trait-interface' },
  { from: 'agent-trait-interface', to: 'transcript-determinism' },
  { from: 'transcript-determinism', to: 'developer-sdk' },
  { from: 'canonical-zkvm-guest', to: 'on-chain-interfaces' },
  { from: 'agent-trait-interface', to: 'execution-flow-mvp' },
  { from: 'transcript-determinism', to: 'defi-integration-mvp' },
  { from: 'developer-sdk', to: 'proof-format-standard' },
  
  // Phase 1 to Phase 2 connections
  { from: 'on-chain-interfaces', to: 'agent-marketplace-v1' },
  { from: 'execution-flow-mvp', to: 'economic-layer-mvp' },
  { from: 'defi-integration-mvp', to: 'allocator-dashboard' },
  { from: 'proof-format-standard', to: 'monitoring-observability' },
  
  // Phase 2 to Phase 3 connections
  { from: 'agent-marketplace-v1', to: 'performance-optimizations' },
  { from: 'economic-layer-mvp', to: 'security-audit' },
  { from: 'allocator-dashboard', to: 'constraint-system-spec' },
  { from: 'monitoring-observability', to: 'multi-agent-composition' },
  
  // Phase 3 to Future connections
  { from: 'performance-optimizations', to: 'stateful-agents-future' },
  { from: 'security-audit', to: 'decentralized-execution-future' },
  { from: 'constraint-system-spec', to: 'governance-future' }
];

export default function InteractiveRoadmap() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scale, setScale] = useState(0.8);
  const [position, setPosition] = useState({ x: 0, y: -100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const categoryColors = {
    zkvm: '#00D4FF', // Electric Blue
    agents: '#00FF88', // Neon Green
    marketplace: '#FF00FF', // Magenta
    ecosystem: '#FFD700', // Gold
    defi: '#FF4081' // Pink
  };

  const statusColors = {
    completed: '#00FF88',
    'in-progress': '#FFD700',
    upcoming: '#8B5CF6'
  };


  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const scaleChange = e.deltaY > 0 ? 0.95 : 1.05;
    const newScale = Math.max(0.4, Math.min(3, scale * scaleChange));
    setScale(newScale);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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

      {/* Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <button
          onClick={zoomOut}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Zoom Out"
        >
          −
        </button>
        <button
          onClick={zoomIn}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={resetView}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Reset View"
        >
          ⌂
        </button>
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-gray-800/90 hover:bg-gray-700 rounded-lg border border-gray-600 text-white transition-colors"
          title="Fullscreen"
        >
          ⛶
        </button>
      </div>

      {/* Enhanced Legend */}
      <div className="absolute bottom-4 left-4 z-20 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-xl p-4 border border-cyan-500/30 backdrop-blur-sm">
        <h3 className="text-sm font-bold mb-3 text-cyan-300">Categories</h3>
        <div className="space-y-2">
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-3 text-xs">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white/20"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}40` }}
              />
              <span className="text-gray-300 font-medium capitalize">{category === 'zkvm' ? 'zkVM' : category === 'defi' ? 'DeFi' : category}</span>
            </div>
          ))}
        </div>
        <h3 className="text-sm font-bold mt-4 mb-3 text-purple-300">Status</h3>
        <div className="space-y-2">
          {Object.entries(statusColors).map(([status, color]) => (
            <div key={status} className="flex items-center gap-3 text-xs">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white/20"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}40` }}
              />
              <span className="text-gray-300 font-medium capitalize">{status.replace('-', ' ')}</span>
            </div>
          ))}
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
            
            {/* Animated gradient for connections */}
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8">
                <animate attributeName="stopColor" 
                  values="#06B6D4;#8B5CF6;#10B981;#06B6D4" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.6">
                <animate attributeName="stopColor" 
                  values="#8B5CF6;#10B981;#06B6D4;#8B5CF6" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8">
                <animate attributeName="stopColor" 
                  values="#10B981;#06B6D4;#8B5CF6;#10B981" 
                  dur="4s" repeatCount="indefinite"/>
              </stop>
            </linearGradient>
          </defs>
          
          {/* Background */}
          <rect width="100%" height="100%" fill="#0A0A0A"/>
          <rect width="100%" height="100%" fill="url(#futuristicGrid)" opacity="0.6"/>

          {/* Header Section - Inside SVG */}
          <foreignObject x="150" y="20" width="600" height="120">
            <div className="bg-gray-900/95 rounded-lg p-4 border border-gray-700">
              <div className="text-center mb-3">
                <h1 className="text-2xl font-light mb-1 text-white">
                  DeFiesta Roadmap
                </h1>
                <div className="text-xs text-gray-400 mb-3">
                  Our journey to verifiable on-chain AI agents
                </div>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <h2 className="text-sm font-semibold mb-2 text-center bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent">
                  Vision 2026: Three-Phase Protocol Rollout
                </h2>
                <p className="text-xs text-gray-300 text-center leading-relaxed">
                  Phase 1: Core execution sandbox + constraints • Phase 2: Marketplace + economics • Phase 3: Performance + security hardening
                </p>
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

          {/* Phase Labels */}
          {[
            { label: 'Phase 1\nCore Protocol\n(Q1-Q2 2026)', y: 180 },
            { label: 'Phase 2\nMarketplace\n(Q3 2026)', y: 500 },
            { label: 'Phase 3\nScale & Security\n(Q4 2026)', y: 660 },
            { label: 'Future\n(2027+)', y: 820 }
          ].map((phase, index) => (
            <g key={index}>
              <rect
                x="20"
                y={phase.y}
                width="90"
                height="60"
                fill="#1F2937"
                stroke="#374151"
                rx="6"
              />
              {phase.label.split('\n').map((line, lineIndex) => (
                <text
                  key={lineIndex}
                  x="65"
                  y={phase.y + 18 + lineIndex * 12}
                  className={lineIndex === 0 ? "text-sm font-semibold" : "text-xs"}
                  fill="#9CA3AF"
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          ))}

          {/* Roadmap Items */}
          {roadmapData.map((item) => (
            <g key={item.id}>
              {/* Item Circle */}
              <circle
                cx={item.x}
                cy={item.y}
                r={selectedItem === item.id ? "28" : "22"}
                fill={statusColors[item.status]}
                stroke={categoryColors[item.category]}
                strokeWidth="4"
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              />
              
              {/* Item Label */}
              <text
                x={item.x}
                y={item.y - 38}
                textAnchor="middle"
                className="text-xs font-medium pointer-events-none max-w-30"
                fill="white"
              >
                <tspan x={item.x} dy="0">{item.title.split(' ').slice(0, 2).join(' ')}</tspan>
                {item.title.split(' ').length > 2 && (
                  <tspan x={item.x} dy="12">{item.title.split(' ').slice(2).join(' ')}</tspan>
                )}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Enhanced Selected Item Details */}
      {selectedItem && (
        <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-96 bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 rounded-2xl p-6 border border-cyan-500/30 backdrop-blur-xl z-30">
          {(() => {
            const item = roadmapData.find(i => i.id === selectedItem);
            if (!item) return null;
            
            const categoryColor = categoryColors[item.category];
            const statusColor = statusColors[item.status];
            
            return (
              <>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-emerald-500/5 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="text-gray-400 hover:text-cyan-400 text-xl transition-colors duration-200 hover:scale-110"
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: statusColor + '20',
                        color: statusColor,
                        borderColor: statusColor + '40'
                      }}
                    >
                      {item.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm"
                      style={{ 
                        backgroundColor: categoryColor + '20',
                        color: categoryColor,
                        borderColor: categoryColor + '40'
                      }}
                    >
                      {item.category === 'zkvm' ? 'zkVM' : item.category === 'defi' ? 'DeFi' : item.category.toUpperCase()}
                    </span>
                    <span className="text-xs text-cyan-300 font-medium bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/30">
                      {item.quarter}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 leading-relaxed mb-4 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                    {item.description}
                  </p>
                  
                  {item.details && (
                    <div>
                      <h4 className="text-sm font-bold mb-3 text-cyan-300">Key Deliverables:</h4>
                      <ul className="text-xs text-gray-300 space-y-2">
                        {item.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-3 bg-gray-800/30 p-2 rounded border border-gray-700/30">
                            <span className="text-cyan-400 mt-1 font-bold">→</span>
                            <span className="leading-relaxed">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 right-4 z-20 bg-gray-900/80 rounded-lg p-3 border border-cyan-500/30 backdrop-blur-sm">
        <div className="text-xs text-cyan-300 font-medium mb-1">Navigation</div>
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
            <span>Scroll to zoom • Drag to pan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
            <span>Click nodes for details</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span>Press ESC to deselect</span>
          </div>
        </div>
      </div>
    </div>
  );
}