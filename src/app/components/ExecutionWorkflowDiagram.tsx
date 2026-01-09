import React from 'react';

export default function ExecutionWorkflowDiagram() {
  return (
    <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/50 font-sans">
      <div className="w-full">
        {/* Title */}
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-white mb-2">
            Execution, Proof, and Settlement Workflow
          </h4>
        </div>

        {/* Phase Labels */}
        <div className="flex mb-4">
          <div className="flex-1 text-center">
            <span className="inline-block px-4 py-1 bg-purple-900/50 text-purple-300 text-xs font-semibold rounded-full border border-purple-700">
              OFF-CHAIN EXECUTION
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="inline-block px-4 py-1 bg-violet-900/50 text-violet-300 text-xs font-semibold rounded-full border border-violet-700">
              PROOF GENERATION
            </span>
          </div>
          <div className="flex-1 text-center">
            <span className="inline-block px-4 py-1 bg-emerald-900/50 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-700">
              ON-CHAIN SETTLEMENT
            </span>
          </div>
        </div>

        {/* Main Workflow */}
        <div className="relative bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          
          {/* Horizontal Flow Container */}
          <div className="flex items-stretch gap-1 overflow-x-auto">
            
            {/* Stage 1: User Request */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-linear-to-b from-blue-600 to-blue-800 rounded-lg p-2 border border-blue-500 shadow-lg shadow-blue-900/50 flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-6 h-6 bg-white text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h3 className="text-white font-semibold text-xs">User Request</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="bg-blue-900/50 rounded p-1 border border-blue-600">
                    <div className="text-blue-200 font-medium mb-1 text-xs">User Submits (API):</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Agent ID (Image Hash)<br/>
                      • Input Data (plaintext)<br/>
                      • Signed Authorization
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-500">User Client</span>
              </div>
            </div>

            {/* Arrow 1→2 */}
            <div className="flex items-center justify-center w-8">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradArrow1-unique" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path d="M2 10 L20 10" stroke="url(#gradArrow1-unique)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 5 L26 10 L18 15" fill="#8B5CF6"/>
              </svg>
            </div>

            {/* Stage 2: Agent Execution */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-linear-to-b from-purple-600 to-purple-800 rounded-lg p-2 border border-purple-500 shadow-lg shadow-purple-900/50 flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-6 h-6 bg-white text-purple-700 rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h3 className="text-white font-semibold text-xs">zkVM Execution</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="bg-purple-900/50 rounded p-1 border border-purple-600">
                    <div className="text-purple-200 font-medium mb-1 text-xs">RISC Zero R0VM:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Load Agent ELF Binary<br/>
                      • Execute RISC-V Code<br/>
                      • Run AI Inference
                    </div>
                  </div>
                  <div className="bg-purple-900/50 rounded p-1 border border-purple-600">
                    <div className="text-purple-200 font-medium mb-1 text-xs">Deterministic:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Fixed RNG seed<br/>
                      • No external calls<br/>
                      • Constraint validation
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-500">Executor Node</span>
              </div>
            </div>

            {/* Arrow 2→3 */}
            <div className="flex items-center justify-center w-8">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M2 10 L20 10" stroke="#8B5CF6" strokeWidth="2"/>
                <path d="M18 5 L26 10 L18 15" fill="#8B5CF6"/>
              </svg>
            </div>

            {/* Stage 3: Proof Generation */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-linear-to-b from-violet-600 to-violet-800 rounded-lg p-2 border border-violet-500 shadow-lg shadow-violet-900/50 flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-6 h-6 bg-white text-violet-700 rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h3 className="text-white font-semibold text-xs">Proof Generation</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="bg-violet-900/50 rounded p-1 border border-violet-600">
                    <div className="text-violet-200 font-medium mb-1 text-xs">STARK Proving:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Execution Trace<br/>
                      • Segment Proofs<br/>
                      • Recursive Aggregation
                    </div>
                  </div>
                  <div className="bg-violet-900/50 rounded p-1 border border-violet-600">
                    <div className="text-violet-200 font-medium mb-1 text-xs">SNARK Compression:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      STARK → Groth16<br/>
                      Output: ~200 bytes
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-500">Bonsai / GPU Prover</span>
              </div>
            </div>

            {/* Arrow 3→4 */}
            <div className="flex items-center justify-center w-8">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="gradArrow3-unique" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path d="M2 10 L20 10" stroke="url(#gradArrow3-unique)" strokeWidth="2" strokeLinecap="round"/>
                <path d="M18 5 L26 10 L18 15" fill="#10B981"/>
              </svg>
            </div>

            {/* Stage 4: Proof Verification */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-linear-to-b from-teal-600 to-teal-800 rounded-lg p-2 border border-teal-500 shadow-lg shadow-teal-900/50 flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-6 h-6 bg-white text-teal-700 rounded-full flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h3 className="text-white font-semibold text-xs">Proof Verification</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="bg-teal-900/50 rounded p-1 border border-teal-600">
                    <div className="text-teal-200 font-medium mb-1 text-xs">Verifier Contract:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      verify(seal, imageId, journal)
                    </div>
                  </div>
                  <div className="bg-teal-900/50 rounded p-1 border border-teal-600">
                    <div className="text-teal-200 font-medium mb-1 text-xs">Gas Cost:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      ~250,000 gas<br/>
                      (BN254 pairing check)
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-500">Ethereum / L2</span>
              </div>
            </div>

            {/* Arrow 4→5 */}
            <div className="flex items-center justify-center w-8">
              <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                <path d="M2 10 L20 10" stroke="#10B981" strokeWidth="2"/>
                <path d="M18 5 L26 10 L18 15" fill="#10B981"/>
              </svg>
            </div>

            {/* Stage 5: Settlement */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="bg-linear-to-b from-emerald-600 to-emerald-800 rounded-lg p-2 border border-emerald-500 shadow-lg shadow-emerald-900/50 flex-1">
                <div className="flex items-center gap-1 mb-2">
                  <div className="w-6 h-6 bg-white text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h3 className="text-white font-semibold text-xs">Settlement</h3>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="bg-emerald-900/50 rounded p-1 border border-emerald-600">
                    <div className="text-emerald-200 font-medium mb-1 text-xs">State Update:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Execute proven action<br/>
                      • Update vault state<br/>
                      • New Merkle root
                    </div>
                  </div>
                  <div className="bg-emerald-900/50 rounded p-1 border border-emerald-600">
                    <div className="text-emerald-200 font-medium mb-1 text-xs">Fee Distribution:</div>
                    <div className="text-slate-300 font-mono text-xs leading-tight">
                      • Executor reward<br/>
                      • Developer royalty<br/>
                      • Protocol fee
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-slate-500">Ethereum / L2</span>
              </div>
            </div>
          </div>

          {/* Journal Contents - NEW SECTION */}
          <div className="mt-4 pt-3 border-t border-slate-700">
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-amber-300 font-semibold text-xs">Journal (Proven Public Output)</span>
                <span className="text-xs text-slate-500 ml-2">— Input commitment embedded in proof, not pre-committed on-chain</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div className="bg-slate-700/50 rounded p-2 border border-slate-600">
                  <div className="text-slate-400 font-medium mb-1">Input Hash</div>
                  <div className="text-amber-300 font-mono">keccak256(input)</div>
                </div>
                <div className="bg-slate-700/50 rounded p-2 border border-slate-600">
                  <div className="text-slate-400 font-medium mb-1">Agent ID</div>
                  <div className="text-amber-300 font-mono">imageId (32 bytes)</div>
                </div>
                <div className="bg-slate-700/50 rounded p-2 border border-slate-600">
                  <div className="text-slate-400 font-medium mb-1">Output Action</div>
                  <div className="text-amber-300 font-mono">AgentAction struct</div>
                </div>
                <div className="bg-slate-700/50 rounded p-2 border border-slate-600">
                  <div className="text-slate-400 font-medium mb-1">Constraints Hash</div>
                  <div className="text-amber-300 font-mono">keccak256(constraints)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Data Flow Legend */}
          <div className="mt-4 pt-3 border-t border-slate-700">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
              
              {/* Left: Key Components */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 font-semibold mb-2">KEY COMPONENTS</div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-600"></div>
                  <span className="text-xs text-slate-400">User Request (Off-chain)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-600"></div>
                  <span className="text-xs text-slate-400">Execution Layer (zkVM)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-600"></div>
                  <span className="text-xs text-slate-400">Settlement Layer (Chain)</span>
                </div>
              </div>

              {/* Center: Trust Assumptions */}
              <div className="bg-slate-800 rounded-lg p-2 border border-slate-600">
                <div className="text-xs text-slate-400 font-semibold mb-1">TRUST ASSUMPTIONS</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="text-slate-500">Cryptographic:</div>
                  <div className="text-slate-300">BN254 Discrete Log</div>
                  <div className="text-slate-500">Trusted Setup:</div>
                  <div className="text-slate-300">Groth16 CRS</div>
                  <div className="text-slate-500">Execution:</div>
                  <div className="text-emerald-400">Trustless (Proven)</div>
                </div>
              </div>

              {/* Right: Performance */}
              <div className="bg-slate-800 rounded-lg p-2 border border-slate-600">
                <div className="text-xs text-slate-400 font-semibold mb-1">PERFORMANCE</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="text-slate-500">Proof Size:</div>
                  <div className="text-slate-300">~200 bytes</div>
                  <div className="text-slate-500">Verify Gas:</div>
                  <div className="text-slate-300">~250k gas</div>
                  <div className="text-slate-500">Prove Time:</div>
                  <div className="text-slate-300">5-30s (GPU)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Separation of Concerns */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-purple-900/20 rounded-lg p-3 border border-purple-800">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
              <span className="text-purple-300 font-semibold text-xs">Execution</span>
            </div>
            <p className="text-xs text-slate-400">
              Deterministic computation inside RISC Zero zkVM. Agent code + model weights committed via Image ID. No trust required in executor.
            </p>
          </div>
          
          <div className="bg-violet-900/20 rounded-lg p-3 border border-violet-800">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-violet-300 font-semibold text-xs">Verification</span>
            </div>
            <p className="text-xs text-slate-400">
              On-chain Groth16 verification via precompiled pairing checks. Proof validates execution trace matches committed program and inputs.
            </p>
          </div>
          
          <div className="bg-emerald-900/20 rounded-lg p-3 border border-emerald-800">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-emerald-300 font-semibold text-xs">Settlement</span>
            </div>
            <p className="text-xs text-slate-400">
              Atomic state updates after successful verification. Actions execute trustlessly based on proven agent outputs in journal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}