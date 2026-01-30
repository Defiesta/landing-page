'use client';
import { useEffect, useRef, useState } from 'react';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/Defiesta',
    color: '#ffffff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.300 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  },
  {
    name: 'X',
    href: 'https://x.com/defiestaxyz',
    color: '#ffffff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    )
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/v3Se8GytFc',
    color: '#5865F2',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    )
  },
  {
    name: 'Telegram',
    href: 'https://t.me/defiesta',
    color: '#0088cc',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  },
  {
    name: 'Medium',
    href: 'https://medium.com/@mehd1b',
    color: '#ffffff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    )
  }
];

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 mt-20">
      {/* Gradient divider */}
      <div className="h-[1px] bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>

      {/* Glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-linear-to-r from-transparent via-cyan-500/50 to-transparent blur-sm"></div>

      <div className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center space-y-8">
            {/* Logo and tagline */}
            <div className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-400 via-purple-500 to-emerald-400 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xl font-semibold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  DeFiesta
                </span>
              </div>
              <p className="text-gray-500 text-sm">The Future of DeFi is Autonomous</p>
            </div>

            {/* Social links */}
            <div className={`flex items-center gap-4 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative p-3 rounded-full transition-all duration-300"
                  aria-label={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 rounded-full bg-gray-800/50 transition-all duration-300 group-hover:bg-gray-700/60"></div>

                  {/* Glow effect on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
                    style={{ background: `${link.color}30` }}
                  ></div>

                  {/* Border ring */}
                  <div
                    className="absolute inset-0 rounded-full border border-transparent transition-all duration-300"
                    style={{
                      borderColor: hoveredIndex === index ? `${link.color}40` : 'transparent'
                    }}
                  ></div>

                  {/* Icon */}
                  <div
                    className="relative z-10 text-gray-400 transition-all duration-300 group-hover:scale-110"
                    style={{ color: hoveredIndex === index ? link.color : undefined }}
                  >
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>

            {/* Links row */}
            <div className={`flex flex-wrap items-center justify-center gap-6 text-sm transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href="/whitepaper" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 relative group">
                Whitepaper
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-gray-700">|</span>
              <a href="/roadmap" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 relative group">
                Roadmap
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-purple-400 group-hover:w-full transition-all duration-300"></span>
              </a>
              <span className="text-gray-700">|</span>
              <a href="/about" className="text-gray-500 hover:text-gray-300 transition-colors duration-300 relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>

            {/* Copyright */}
            <div className={`flex items-center gap-2 text-gray-600 text-sm transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span>&copy; 2026 DeFiesta Protocol.</span>
              <span className="text-gray-700">|</span>
              <span>All rights reserved.</span>
            </div>

            {/* Decorative dots */}
            <div className={`flex items-center gap-2 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-1 h-1 rounded-full bg-cyan-400/50 animate-pulse"></div>
              <div className="w-1 h-1 rounded-full bg-purple-400/50 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1 h-1 rounded-full bg-emerald-400/50 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
