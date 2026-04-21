import { useEffect, useState } from 'react';

/**
 * Hook to detect if user prefers reduced motion.
 * Returns true if the user has requested reduced motion via OS settings.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial value
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook to get motion-safe duration values.
 * Returns 0.01ms for reduced motion, normal duration otherwise.
 */
export function useMotionSafeDuration(normalDuration: string): string {
  const prefersReducedMotion = useReducedMotion();
  return prefersReducedMotion ? '0.01ms' : normalDuration;
}
