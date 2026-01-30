'use client';
import { useEffect, useRef, useState } from 'react';

const MORPHING_WORDS = ['Autonomous', 'Intelligent', 'Trustless', 'Verifiable'];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const [morphWord, setMorphWord] = useState(MORPHING_WORDS[0]);
  const [morphIndex, setMorphIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const fullText = 'The Future of DeFi is';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setIsTypingComplete(true);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, []);

  // Word morphing effect
  useEffect(() => {
    if (!isTypingComplete) return;

    const morphInterval = setInterval(() => {
      setMorphIndex((prev) => (prev + 1) % MORPHING_WORDS.length);
    }, 3000);

    return () => clearInterval(morphInterval);
  }, [isTypingComplete]);

  useEffect(() => {
    setMorphWord(MORPHING_WORDS[morphIndex]);
  }, [morphIndex]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Animated gradient background - starts transparent to match header */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-500/5 to-emerald-500/5"></div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.3) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 212, 255, 0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto text-center relative z-10 px-8">
        <div className="space-y-8">
          {/* Typewriter text */}
          <div className="h-12 flex items-center justify-center">
            <span className="text-xl md:text-2xl text-gray-400 font-light tracking-wider animate-fade-in">
              {displayText}
              <span className="animate-blink">|</span>
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight">
            <span className="block">
              Blockchain Verifiable
            </span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-gradient-shift">
                  ML Agents
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400"></div>
              </span>
            </span>
          </h1>

          {/* Morphing word badge - fixed height container to prevent layout shift */}
          <div className="h-12 flex justify-center items-center mt-6">
            <div className="relative px-6 py-2 rounded-full border border-gray-700/50 bg-gray-900/30 backdrop-blur-sm overflow-hidden group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 via-purple-500/10 to-emerald-500/10 animate-shimmer"></div>
              <span className="relative text-sm text-gray-400">Powered by </span>
              <span className="relative font-medium morph-word" key={morphWord}>
                <span className="bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {morphWord}
                </span>
              </span>
              <span className="relative text-sm text-gray-400"> AI</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Deploy Machine Learning agents that execute DeFi strategies with{' '}
            <span className="text-cyan-400">zero-knowledge proofs</span>.
            Trustless, verifiable, and autonomous financial execution on-chain.
          </p>

          {/* CTA Link */}
          <div className="flex justify-center items-center pt-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
            <a
              href="/whitepaper"
              className="group relative px-8 py-4 rounded-full font-medium transition-all duration-300 overflow-hidden"
            >
              {/* Button background */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full"></div>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 rounded-full opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 text-white font-semibold">
                <span>Read Whitepaper</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-4 md:left-8">
          <div className="relative">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow"></div>
            <div className="absolute inset-0 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
          </div>
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <div className="relative">
            <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

      </div>



      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes expand-line {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.6;
            box-shadow: 0 0 10px currentColor;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor;
          }
        }

        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes scroll-indicator {
          0%, 100% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(10px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-expand-line {
          animation: expand-line 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-gradient-shift {
          animation: gradient-shift 4s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .animate-border-spin {
          animation: border-spin 8s linear infinite;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }

        .morph-word {
          display: inline-block;
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}
