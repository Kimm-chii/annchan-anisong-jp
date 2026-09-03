import React, { useEffect, useState, useMemo, useRef } from 'react';

interface GlowData {
  id: string;
  xPct: number;
  yPct: number;
  size: number;
  isPink: boolean;
  delay: number;
  duration: number;
  maxOpacity: number;
}

interface SparkleData {
  id: string;
  xPct: number;
  yPct: number;
  size: number;
  delay: number;
  duration: number;
  maxOpacity: number;
}

export const AmbientGlowBackground: React.FC = () => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const starsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 200);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.body.classList.add('ambient-paused');
      } else {
        document.body.classList.remove('ambient-paused');
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibility);
    
    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const radius = 160;
        starsRef.current.forEach((star) => {
          if (!star) return;
          const rect = star.getBoundingClientRect();
          const starX = rect.left + rect.width / 2;
          const starY = rect.top + rect.height / 2;
          const dx = starX - mx;
          const dy = starY - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const innerEl = star.firstElementChild as HTMLElement | null;

          if (dist < radius) {
            const force = (radius - dist) / radius;
            const angle = Math.atan2(dy, dx);
            const pushDist = force * 45;
            const px = Math.cos(angle) * pushDist;
            const py = Math.sin(angle) * pushDist;
            const scale = 1 + force * 0.7;
            
            star.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${scale})`;
            if (innerEl) {
              innerEl.style.color = '#f99db5';
              innerEl.style.textShadow = '0 0 12px rgba(249,157,181,0.9)';
              innerEl.style.opacity = '1';
            }
          } else {
            star.style.transform = 'translate3d(0, 0, 0) scale(1)';
            if (innerEl) {
              innerEl.style.color = '';
              innerEl.style.textShadow = '';
              innerEl.style.opacity = '';
            }
          }
        });
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const makeRandom = (seedStart: number) => {
    let seed = seedStart;
    return () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
  };

  const glows = useMemo(() => {
    const isMobile = dimensions.width < 768;
    const spawnChance = isMobile ? 0.12 : 0.25;
    const gridStep = 140;
    const cols = Math.ceil(dimensions.width / gridStep);
    const rows = Math.ceil(dimensions.height / gridStep);
    const items: GlowData[] = [];
    const pseudoRandom = makeRandom(108);

    const glowSizes = [90, 120, 160, 200];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pseudoRandom() > spawnChance) continue;

        const isPink = pseudoRandom() < 0.6;
        const delay = Math.round(pseudoRandom() * 80) / 10;
        const duration = Math.round((6.0 + pseudoRandom() * 5.0) * 10) / 10;
        const size = glowSizes[Math.floor(pseudoRandom() * glowSizes.length)];
        const maxOpacity = Math.round((0.12 + pseudoRandom() * 0.20) * 100) / 100;

        items.push({
          id: `glow-${r}-${c}`,
          xPct: ((c * gridStep) / dimensions.width) * 100,
          yPct: ((r * gridStep) / dimensions.height) * 100,
          size,
          isPink,
          delay,
          duration,
          maxOpacity,
        });
      }
    }

    return items;
  }, [dimensions.width, dimensions.height]);

  const sparkles = useMemo(() => {
    const isMobile = dimensions.width < 768;
    const spawnChance = isMobile ? 0.08 : 0.18;
    const gridStep = 80;
    const cols = Math.ceil(dimensions.width / gridStep);
    const rows = Math.ceil(dimensions.height / gridStep);
    const items: SparkleData[] = [];
    const pseudoRandom = makeRandom(542);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (pseudoRandom() > spawnChance) continue;

        const delay = Math.round(pseudoRandom() * 60) / 10;
        const duration = Math.round((2.0 + pseudoRandom() * 2.5) * 10) / 10;
        const size = 6 + Math.round(pseudoRandom() * 8);
        const maxOpacity = Math.round((0.40 + pseudoRandom() * 0.45) * 100) / 100;

        items.push({
          id: `sparkle-${r}-${c}`,
          xPct: ((c * gridStep) / dimensions.width) * 100,
          yPct: ((r * gridStep) / dimensions.height) * 100,
          size,
          delay,
          duration,
          maxOpacity,
        });
      }
    }

    return items;
  }, [dimensions.width, dimensions.height]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[5] select-none overflow-hidden"
    >
      <style>{`
        @keyframes ambientGlowFade {
          0%, 100% {
            opacity: 0.04;
            transform: scale(0.92);
          }
          50% {
            opacity: var(--max-op, 0.25);
            transform: scale(1);
          }
        }
        @keyframes sparkleTwinkle {
          0%, 100% {
            opacity: 0.15;
            transform: scale(0.7) rotate(0deg);
          }
          50% {
            opacity: var(--max-op, 0.7);
            transform: scale(1.1) rotate(25deg);
          }
        }
        
        .ambient-paused .will-animate,
        .ambient-paused .will-animate::before,
        .ambient-paused .will-animate::after {
          animation-play-state: paused !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .will-animate {
            animation: none !important;
            opacity: var(--max-op, 0.3) !important;
            transform: scale(1) !important;
          }
        }
      `}</style>

      {/* Ambient Orbs Blur Container */}
      <div className="relative w-full h-full -z-10" style={{ filter: 'blur(30px)' }}>
        {glows.map((glow) => (
          <div
            key={glow.id}
            className={`absolute rounded-full will-animate will-change-transform will-change-opacity ${
              glow.isPink ? 'bg-[#f99db5]' : 'bg-rose-200 dark:bg-purple-300'
            }`}
            style={{
              left: `${glow.xPct}%`,
              top: `${glow.yPct}%`,
              width: `${glow.size}px`,
              height: `${glow.size}px`,
              opacity: 0.04,
              animationName: 'ambientGlowFade',
              animationDuration: `${glow.duration}s`,
              animationTimingFunction: 'ease-in-out',
              animationDelay: `-${glow.delay}s`,
              animationIterationCount: 'infinite',
              animationFillMode: 'both',
              ['--max-op' as any]: glow.maxOpacity,
            }}
          />
        ))}
      </div>

      {/* Interactive Beacon Star Particles Layer */}
      <div className="relative w-full h-full">
        {sparkles.map((sparkle, index) => (
          <div
            key={sparkle.id}
            ref={(el) => { if (el) starsRef.current[index] = el; }}
            className="absolute transition-transform duration-300 ease-out pointer-events-none"
            style={{
              left: `${sparkle.xPct}%`,
              top: `${sparkle.yPct}%`,
              willChange: 'transform',
            }}
          >
            <div
              className={`flex items-center justify-center font-serif will-animate will-change-transform will-change-opacity transition-all duration-300 ${
                sparkle.delay % 2 === 0 ? 'text-[#f99db5]' : 'text-pink-300 dark:text-purple-300'
              }`}
              style={{
                fontSize: `${sparkle.size * 2}px`,
                animationName: 'sparkleTwinkle',
                animationDuration: `${sparkle.duration}s`,
                animationTimingFunction: 'ease-in-out',
                animationDelay: `-${sparkle.delay}s`,
                animationIterationCount: 'infinite',
                animationFillMode: 'both',
                ['--max-op' as any]: sparkle.maxOpacity,
              }}
            >
              ✦
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmbientGlowBackground;
