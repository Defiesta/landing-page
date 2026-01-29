'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: 'small' | 'medium' | 'orb';
  pulsePhase: number;
}

const COLORS = {
  cyan: { r: 0, g: 212, b: 255 },
};

const COLOR_KEYS = Object.keys(COLORS) as (keyof typeof COLORS)[];

export default function AnimatedBackground({ hidden = false }: { hidden?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const getRandomColor = () => {
      return COLOR_KEYS[Math.floor(Math.random() * COLOR_KEYS.length)];
    };

    const createParticles = () => {
      const baseCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 10000));
      particles = [];

      // Small particles (majority)
      for (let i = 0; i < baseCount; i++) {
        const colorKey = getRandomColor();
        const color = COLORS[colorKey];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2,
          color: `rgb(${color.r}, ${color.g}, ${color.b})`,
          type: 'small',
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Medium glowing particles
      for (let i = 0; i < Math.floor(baseCount / 8); i++) {
        const colorKey = getRandomColor();
        const color = COLORS[colorKey];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          size: Math.random() * 3 + 2,
          opacity: Math.random() * 0.4 + 0.3,
          color: `rgb(${color.r}, ${color.g}, ${color.b})`,
          type: 'medium',
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // Large orbs (very few)
      for (let i = 0; i < 5; i++) {
        const colorKey = getRandomColor();
        const color = COLORS[colorKey];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
          size: Math.random() * 80 + 40,
          opacity: 0.03 + Math.random() * 0.02,
          color: `rgb(${color.r}, ${color.g}, ${color.b})`,
          type: 'orb',
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const drawParticle = (particle: Particle) => {
      const pulseFactor = 1 + Math.sin(time * 0.002 + particle.pulsePhase) * 0.2;

      if (particle.type === 'orb') {
        // Large glowing orbs with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * pulseFactor
        );
        gradient.addColorStop(0, particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity * pulseFactor})`));
        gradient.addColorStop(0.5, particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity * 0.3 * pulseFactor})`));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
      } else if (particle.type === 'medium') {
        // Medium particles with glow
        const glowSize = particle.size * 3 * pulseFactor;
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        gradient.addColorStop(0, particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity * pulseFactor})`));
        gradient.addColorStop(0.4, particle.color.replace('rgb', 'rgba').replace(')', `, ${particle.opacity * 0.3})`));
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.globalAlpha = particle.opacity * pulseFactor;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small particles
        ctx.globalAlpha = particle.opacity * 0.8;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawConnection = (p1: Particle, p2: Particle, distance: number) => {
      if (p1.type === 'orb' || p2.type === 'orb') return;

      const maxDistance = 120;
      const opacity = (1 - distance / maxDistance) * 0.15;

      // Create gradient line between particles
      const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
      gradient.addColorStop(0, p1.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));
      gradient.addColorStop(1, p2.color.replace('rgb', 'rgba').replace(')', `, ${opacity})`));

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const drawCursorGlow = () => {
      if (mouseX < 0 || mouseY < 0) return;

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.08)');
      gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.04)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 200, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawAurora = () => {
      const auroraY = canvas.height * 0.1;
      const waveAmplitude = 50;
      const waveFrequency = 0.002;

      ctx.save();
      ctx.globalCompositeOperation = 'screen';

      // Cyan aurora wave
      const gradient1 = ctx.createLinearGradient(0, auroraY - 100, 0, auroraY + 100);
      gradient1.addColorStop(0, 'transparent');
      gradient1.addColorStop(0.5, 'rgba(0, 212, 255, 0.03)');
      gradient1.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient1;
      ctx.beginPath();
      ctx.moveTo(0, auroraY);
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = auroraY + Math.sin(x * waveFrequency + time * 0.0005) * waveAmplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      // Second cyan aurora wave
      const gradient2 = ctx.createLinearGradient(0, auroraY - 80, 0, auroraY + 120);
      gradient2.addColorStop(0, 'transparent');
      gradient2.addColorStop(0.5, 'rgba(0, 212, 255, 0.025)');
      gradient2.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient2;
      ctx.beginPath();
      ctx.moveTo(0, auroraY + 30);
      for (let x = 0; x <= canvas.width; x += 10) {
        const y = auroraY + 30 + Math.sin(x * waveFrequency * 1.3 + time * 0.0007 + 2) * waveAmplitude * 0.8;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(canvas.width, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.fill();

      ctx.restore();
    };

    const updateParticles = () => {
      particles.forEach((particle) => {
        // Mouse interaction (repulsion)
        const mouseDistance = Math.sqrt(
          Math.pow(particle.x - mouseX, 2) + Math.pow(particle.y - mouseY, 2)
        );

        const interactionRadius = particle.type === 'orb' ? 200 : 120;
        if (mouseDistance < interactionRadius && particle.type !== 'orb') {
          const force = (interactionRadius - mouseDistance) / interactionRadius;
          const angle = Math.atan2(particle.y - mouseY, particle.x - mouseX);
          particle.vx += Math.cos(angle) * force * 0.02;
          particle.vy += Math.sin(angle) * force * 0.02;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping
        const damping = particle.type === 'orb' ? 0.995 : 0.98;
        particle.vx *= damping;
        particle.vy *= damping;

        // Boundary handling
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw aurora first (background)
      drawAurora();

      // Draw cursor glow
      drawCursorGlow();

      updateParticles();

      // Draw orbs first (behind everything)
      particles.filter(p => p.type === 'orb').forEach(drawParticle);

      // Draw connections
      const smallMediumParticles = particles.filter(p => p.type !== 'orb');
      for (let i = 0; i < smallMediumParticles.length; i++) {
        for (let j = i + 1; j < smallMediumParticles.length; j++) {
          const dx = smallMediumParticles[i].x - smallMediumParticles[j].x;
          const dy = smallMediumParticles[i].y - smallMediumParticles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            drawConnection(smallMediumParticles[i], smallMediumParticles[j], distance);
          }
        }
      }

      // Draw medium particles
      particles.filter(p => p.type === 'medium').forEach(drawParticle);

      // Draw small particles last (on top)
      particles.filter(p => p.type === 'small').forEach(drawParticle);

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
      createParticles();
    };

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-500 ${hidden ? 'opacity-0' : 'opacity-100'}`}
      style={{ background: 'transparent' }}
    />
  );
}
