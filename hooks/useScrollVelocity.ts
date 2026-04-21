import { useEffect, useState, useRef } from 'react';

/**
 * Hook to track scroll velocity for parallax and motion effects.
 * Returns current scroll velocity (pixels per frame).
 */
export function useScrollVelocity(): number {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateVelocity = () => {
      const currentTime = performance.now();
      const currentScrollY = window.scrollY;
      
      const timeDelta = currentTime - lastTime.current;
      const scrollDelta = currentScrollY - lastScrollY.current;
      
      // Calculate velocity (pixels per millisecond, scaled)
      const newVelocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;
      
      // Smooth the velocity with exponential decay
      setVelocity((prev) => prev * 0.9 + newVelocity * 0.1);
      
      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
      
      rafId.current = requestAnimationFrame(updateVelocity);
    };

    rafId.current = requestAnimationFrame(updateVelocity);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return velocity;
}

/**
 * Hook to get scroll progress (0-1) for a specific element or page.
 */
export function useScrollProgress(elementRef?: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      if (elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const elementHeight = elementRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        const start = viewportHeight;
        const end = -elementHeight;
        const total = start - end;
        const current = start - rect.top;
        
        setProgress(Math.max(0, Math.min(1, current / total)));
      } else {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(window.scrollY / scrollHeight);
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [elementRef]);

  return progress;
}
