'use client';

import { useEffect } from 'react';
import { useCompilerStore } from '@/lib/store';
import { ProximityCursor } from '@/ui/ProximityCursor';

/**
 * Global state manager and transition orchestrator.
 * Handles section routing, loading states, and transition effects.
 */
export function CompilerOverlay() {
  const bootComplete = useCompilerStore((state) => state.bootComplete);
  const isCompiling = useCompilerStore((state) => state.isCompiling);
  const currentSection = useCompilerStore((state) => state.currentSection);

  // Listen for section changes and update URL hash
  useEffect(() => {
    if (bootComplete && currentSection) {
      window.history.replaceState(null, '', `#${currentSection}`);
    }
  }, [bootComplete, currentSection]);

  // Compile indicator
  if (isCompiling) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-compiler-bg/90 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-compiler-primary border-t-transparent rounded-full animate-spin" />
          <div className="font-mono text-compiler-primary text-sm animate-pulse">
            COMPILING...
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Proximity cursor - only shown after boot */}
      {bootComplete && <ProximityCursor />}

      {/* Section progress indicator */}
      {bootComplete && (
        <nav
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
          aria-label="Section navigation"
        >
          {['hero', 'archive', 'stack', 'timeline', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => {
                document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSection === section
                  ? 'bg-compiler-primary scale-150'
                  : 'bg-compiler-border hover:bg-compiler-muted'
              }`}
              aria-label={`Navigate to ${section} section`}
              aria-current={currentSection === section ? 'true' : undefined}
            />
          ))}
        </nav>
      )}

      {/* Scanline overlay - persistent CRT effect */}
      {bootComplete && (
        <div
          className="scanline-overlay fixed inset-0 pointer-events-none z-[55] opacity-30"
          aria-hidden="true"
        />
      )}

      {/* Keyboard shortcuts hint */}
      {bootComplete && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 font-mono text-xs text-compiler-muted/50 hidden md:block">
          Scroll to navigate • Click projects to inspect
        </div>
      )}
    </>
  );
}
