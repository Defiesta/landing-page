import React from 'react';

export default function ProofGenerationPipeline() {
  return (
    <div className="bg-gray-900/60 rounded-2xl p-6 border border-gray-700/50 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <h5 className="text-xl font-semibold text-white mb-2">
            Proof Generation Pipeline
          </h5>
          <p className="text-gray-400 text-sm">
            From private model weights to succinct on-chain verifiable proof
          </p>
        </div>

        {/* Main Diagram - Private Zone */}
        <div className="bg-slate-800/30 rounded-xl border-2 border-dashed border-purple-500/30 p-4 relative">
          {/* Zone Label */}
          <div className="absolute -top-3 left-4 px-3 py-1 bg-gray-900 rounded-full">
            <span className="text-purple-400 text-xs font-semibold flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              PRIVATE ZONE — Executor / Prover
            </span>
          </div>

          <div className="mt-4 space-y-3">
            
            {/* Step 1: Model Weights */}
            <div className="bg-gradient-to-r from-red-900/40 to-red-800/20 rounded-lg p-3 border border-red-700/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-white font-semibold text-sm mb-1">Private Model Weights</h6>
                  <p className="text-red-300 text-xs mb-2">Loaded into prover memory — never transmitted</p>
                  <div className="grid grid-cols-4 gap-1 text-xs">
                    <div className="bg-slate-900/50 rounded p-1 text-center">
                      <div className="text-slate-500 text-xs">Layer 0</div>
                      <div className="text-red-300 font-mono text-xs">W₀</div>
                      <div className="text-slate-600 text-xs">128×64</div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-1 text-center">
                      <div className="text-slate-500 text-xs">Layer 1</div>
                      <div className="text-red-300 font-mono text-xs">W₁</div>
                      <div className="text-slate-600 text-xs">64×32</div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-1 text-center">
                      <div className="text-slate-500 text-xs">Layer 2</div>
                      <div className="text-red-300 font-mono text-xs">W₂</div>
                      <div className="text-slate-600 text-xs">32×16</div>
                    </div>
                    <div className="bg-slate-900/50 rounded p-1 text-center">
                      <div className="text-slate-500 text-xs">Output</div>
                      <div className="text-red-300 font-mono text-xs">Wₒ</div>
                      <div className="text-slate-600 text-xs">16×4</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0 L10 14" stroke="#EF4444" strokeWidth="2"/>
                <path d="M6 10 L10 18 L14 10" fill="#EF4444"/>
              </svg>
            </div>

            {/* Step 2: zkVM Execution */}
            <div className="bg-gradient-to-r from-purple-900/40 to-purple-800/20 rounded-lg p-3 border border-purple-700/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-white font-semibold text-sm mb-1">RISC Zero zkVM Execution</h6>
                  <p className="text-purple-300 text-xs mb-2">Deterministic RISC-V emulation with execution trace capture</p>
                  
                  <div className="bg-slate-900/50 rounded-lg p-2 font-mono text-xs space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">1.</span>
                      <span className="text-purple-300">env::read()</span>
                      <span className="text-slate-500">→ Load input + weights</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">2.</span>
                      <span className="text-purple-300">inference(x, W)</span>
                      <span className="text-slate-500">→ Forward pass (f32 native)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">3.</span>
                      <span className="text-purple-300">constraints.validate()</span>
                      <span className="text-slate-500">→ Check bounds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">4.</span>
                      <span className="text-purple-300">env::commit(action)</span>
                      <span className="text-slate-500">→ Write to journal</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="bg-purple-800/50 px-2 py-1 rounded text-purple-200">
                      ~10M cycles
                    </div>
                    <div className="bg-purple-800/50 px-2 py-1 rounded text-purple-200">
                      RV32IM ISA
                    </div>
                    <div className="bg-purple-800/50 px-2 py-1 rounded text-purple-200">
                      BabyBear field
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0 L10 14" stroke="#8B5CF6" strokeWidth="2"/>
                <path d="M6 10 L10 18 L14 10" fill="#8B5CF6"/>
              </svg>
            </div>

            {/* Step 3: STARK Proving */}
            <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/20 rounded-lg p-3 border border-blue-700/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-white font-semibold text-sm mb-1">STARK Proof Generation</h6>
                  <p className="text-blue-300 text-xs mb-2">FRI-based polynomial commitment over execution trace</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Left: Segmentation */}
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="text-blue-200 text-xs font-semibold mb-1">Continuation Segments</div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-blue-700 rounded-sm"></div>
                          <span className="text-xs text-slate-400">Seg₀ (1M cycles)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-blue-600 rounded-sm"></div>
                          <span className="text-xs text-slate-400">Seg₁ (1M cycles)</span>
                        </div>
                        <div className="text-center text-slate-600 text-xs">...</div>
                      </div>
                    </div>

                    {/* Right: FRI Protocol */}
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="text-blue-200 text-xs font-semibold mb-1">FRI Commitment</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Field:</span>
                          <span className="text-blue-300 font-mono">BabyBear</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Hash:</span>
                          <span className="text-blue-300 font-mono">Poseidon2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Security:</span>
                          <span className="text-blue-300 font-mono">~100 bits</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="bg-blue-800/50 px-2 py-1 rounded text-blue-200">
                      GPU Accelerated
                    </div>
                    <div className="bg-blue-800/50 px-2 py-1 rounded text-blue-200">
                      ~5-15s per segment
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Arrow - STARK to SNARK transition */}
            <div className="flex justify-center items-center gap-2 py-1">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <div className="bg-amber-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                STARK → SNARK
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>

            {/* Step 4: Groth16 Compression */}
            <div className="bg-gradient-to-r from-amber-900/40 to-orange-800/20 rounded-lg p-3 border border-amber-700/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-white font-semibold text-sm mb-1">Groth16 SNARK Compression</h6>
                  <p className="text-amber-300 text-xs mb-2">Verify STARK inside Groth16 circuit → constant-size EVM-verifiable proof</p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {/* Left: Why wrapper */}
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="text-amber-200 text-xs font-semibold mb-1">Why SNARK Wrapper?</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-start gap-1">
                          <span className="text-red-400">✗</span>
                          <div>
                            <span className="text-slate-300">Raw STARK: </span>
                            <span className="text-red-300">~500 KB</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1">
                          <span className="text-emerald-400">✓</span>
                          <div>
                            <span className="text-slate-300">Groth16: </span>
                            <span className="text-emerald-300">~200 bytes</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Process */}
                    <div className="bg-slate-900/50 rounded-lg p-2">
                      <div className="text-amber-200 text-xs font-semibold mb-1">Process</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Input:</span>
                          <span className="text-amber-300 font-mono">STARK Π</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Circuit:</span>
                          <span className="text-amber-300 font-mono">STARK verifier</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Output:</span>
                          <span className="text-amber-300 font-mono">Groth16 π</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <div className="bg-amber-800/50 px-2 py-1 rounded text-amber-200">
                      BN254 pairing
                    </div>
                    <div className="bg-amber-800/50 px-2 py-1 rounded text-amber-200">
                      ~30s generation
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Output */}
            <div className="bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 rounded-lg p-3 border border-emerald-700/50">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h6 className="text-white font-semibold text-sm mb-1">Final Output: Receipt</h6>
                  <p className="text-emerald-300 text-xs mb-2">Ready for on-chain verification</p>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-emerald-300 font-mono text-sm mb-1">π</div>
                      <div className="text-xs text-slate-400">Groth16 Seal</div>
                      <div className="text-xs text-emerald-400 font-mono">~200 bytes</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-amber-300 font-mono text-sm mb-1">ID</div>
                      <div className="text-xs text-slate-400">Image ID</div>
                      <div className="text-xs text-amber-400 font-mono">32 bytes</div>
                    </div>
                    <div className="bg-slate-900/50 rounded-lg p-2 text-center">
                      <div className="text-blue-300 font-mono text-sm mb-1">J</div>
                      <div className="text-xs text-slate-400">Journal</div>
                      <div className="text-xs text-blue-400 font-mono">Variable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Comparison */}
        <div className="mt-4 bg-slate-800/50 rounded-lg p-3 border border-slate-700">
          <div className="text-sm text-slate-400 font-semibold mb-2 text-center">Proof Size Reduction Pipeline</div>
          <div className="flex items-center justify-center gap-2 text-xs">
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">Execution Trace</div>
              <div className="bg-red-600/30 rounded px-2 py-1">
                <span className="text-red-300 font-mono">~10 GB</span>
              </div>
            </div>
            <span className="text-slate-500">→</span>
            <div className="text-center">
              <div className="text-xs text-slate-500 mb-1">STARK Proofs</div>
              <div className="bg-blue-600/30 rounded px-2 py-1">
                <span className="text-blue-300 font-mono">~500 KB</span>
              </div>
            </div>
            <span className="text-amber-500">→</span>
            <div className="text-center">
              <div className="text-xs text-emerald-400 mb-1">Groth16</div>
              <div className="bg-emerald-600/30 rounded px-2 py-1">
                <span className="text-emerald-300 font-mono font-bold">~200 B</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-xs text-slate-500">
            50,000,000× compression from trace to final proof
          </div>
        </div>
      </div>
    </div>
  );
}