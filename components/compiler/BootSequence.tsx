'use client';

import { useEffect, useRef, useState } from 'react';
import { useCompilerStore } from '@/lib/store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';

interface BootSequenceProps {
  onComplete?: () => void;
}

/**
 * Terminal-style boot sequence component.
 * Auto-types or accepts click to trigger: `> init mahendrarch`
 * Plays compile transition (glitch → scanlines → reality reveal)
 */
export function BootSequence({ onComplete }: BootSequenceProps) {
  const terminalRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const setBootComplete = useCompilerStore((state) => state.setBootComplete);

  const targetText = '> init mahendrarch';

  useEffect(() => {
    if (prefersReducedMotion) {
      // Instant completion for reduced motion
      setDisplayedText(targetText);
      setIsComplete(true);
      setTimeout(() => {
        setBootComplete(true);
        onComplete?.();
      }, 500);
      return;
    }

    // Typewriter effect
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (charIndex < targetText.length) {
        setDisplayedText(targetText.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setIsComplete(true);
        
        // Auto-trigger after short delay
        setTimeout(() => {
          handleCompile();
        }, 800);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [prefersReducedMotion, onComplete, setBootComplete]);

  const handleCompile = () => {
    if (!terminalRef.current || !onComplete) return;

    // GSAP boot timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setBootComplete(true);
        onComplete();
      },
    });

    // Glitch effect
    tl.to(terminalRef.current, {
      duration: 0.3,
      scaleX: [1, 1.02, 0.98, 1],
      opacity: 0,
      filter: 'blur(10px)',
      ease: 'power2.inOut',
    })
      // Scanline sweep
      .fromTo(
        '.scanline-overlay',
        { translateY: '-100%' },
        {
          translateY: '100%',
          duration: 0.5,
          ease: 'power1.inOut',
        },
        '-=0.2'
      );
  };

  const handleClick = () => {
    if (isComplete && !prefersReducedMotion) {
      handleCompile();
    }
  };

  return (
    <div
      ref={terminalRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-compiler-bg cursor-pointer"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Boot sequence - Click to initialize"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* CRT scanline overlay */}
      <div className="scanline-overlay absolute inset-0 pointer-events-none" />
      
      {/* Terminal content */}
      <div className="relative font-mono text-compiler-primary">
        <div className="text-sm md:text-base opacity-50 mb-4">
          MAHENDRARCH // THE REALITY COMPILER v1.0.0
        </div>
        
        <div className="text-xl md:text-3xl flex items-center gap-2">
          <span ref={textRef}>{displayedText}</span>
          {!isComplete && (
            <span className="w-3 h-6 bg-compiler-primary animate-pulse" />
          )}
        </div>

        {isComplete && !prefersReducedMotion && (
          <div className="mt-4 text-sm text-compiler-muted animate-pulse">
            [ Click or press Enter to compile ]
          </div>
        )}

        {isComplete && prefersReducedMotion && (
          <div className="mt-4 text-sm text-compiler-muted">
            Loading...
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-compiler-muted hidden md:block">
        <div>SYSTEM READY</div>
        <div>MEMORY: OPTIMAL</div>
        <div>RENDER ENGINE: ONLINE</div>
      </div>

      <div className="absolute bottom-8 right-8 font-mono text-xs text-compiler-muted hidden md:block text-right">
        <div>BUILD: 2024.01</div>
        <div>NEXT.JS 14 + R3F</div>
        <div>TYPESCRIPT STRICT</div>
      </div>
    </div>
  );
}
