'use client';

import { useEffect, useRef } from 'react';
import { useCompilerStore } from '@/lib/store';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Proximity-based cursor that warps nearby UI elements.
 * Disabled for reduced motion preferences and mobile.
 */
export function ProximityCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const setCursorPosition = useCompilerStore((state) => state.setCursorPosition);

  useEffect(() => {
    // Skip for reduced motion or touch devices
    if (prefersReducedMotion || 'ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setCursorPosition({ x, y });

      // Update custom cursor position
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Apply proximity warp to interactive elements
      const warpElements = document.querySelectorAll('[data-warp]');
      warpElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = x - centerX;
        const distY = y - centerY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const maxDist = 150;
        
        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          const translateX = (distX / distance) * force * 8;
          const translateY = (distY / distance) * force * 8;
          
          (el as HTMLElement).style.transform = `translate(${translateX}px, ${translateY}px)`;
        } else {
          (el as HTMLElement).style.transform = 'translate(0, 0)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion, setCursorPosition]);

  if (prefersReducedMotion || 'ontouchstart' in window) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 w-8 h-8 -ml-4 -mt-4 mix-blend-difference"
      style={{ left: 0, top: 0 }}
      aria-hidden="true"
    >
      <div className="w-full h-full rounded-full border-2 border-compiler-primary/50 animate-pulse-glow" />
      <div className="absolute inset-2 rounded-full bg-compiler-primary/20" />
    </div>
  );
}
