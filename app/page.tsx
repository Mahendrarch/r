'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useCompilerStore } from '@/lib/store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dynamic imports for code-splitting
const BootSequence = dynamic(
  () => import('@/components/compiler/BootSequence').then((mod) => ({ default: mod.BootSequence })),
  { ssr: false }
);

const SpatialCanvas = dynamic(
  () => import('@/components/compiler/SpatialCanvas').then((mod) => ({ default: mod.SpatialCanvas })),
  { ssr: false }
);

const CompilerOverlay = dynamic(
  () => import('@/components/compiler/CompilerOverlay').then((mod) => ({ default: mod.CompilerOverlay })),
  { ssr: false }
);

/**
 * Hero section - displayed after boot sequence.
 */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.fromTo(
      ref.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 md:px-12"
    >
      <div className="max-w-4xl text-center">
        <h1 className="font-display text-4xl md:text-7xl font-bold mb-6 text-glow">
          MAHENDRARCH
        </h1>
        <p className="font-mono text-compiler-primary text-lg md:text-xl mb-8">
          // THE REALITY COMPILER
        </p>
        <p className="text-compiler-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Web Developer | Digital Architect | Compiling Logic into Reality
        </p>
        <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="#archive"
            className="px-8 py-3 bg-compiler-primary text-compiler-bg font-mono font-semibold rounded-md hover:bg-compiler-primary/90 transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-8 py-3 border border-compiler-border text-compiler-text font-mono rounded-md hover:border-compiler-primary transition-colors"
          >
            Initialize Contact
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder sections for Phase 1.
 * Full implementations in subsequent phases.
 */
function ArchiveSection() {
  return (
    <section id="archive" className="min-h-screen px-6 md:px-12 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
          PROJECT ARCHIVE
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 bg-compiler-surface border border-compiler-border rounded-lg hover:border-compiler-primary/50 transition-colors cursor-pointer"
              data-warp
            >
              <div className="h-40 bg-compiler-border rounded mb-4" />
              <h3 className="font-mono text-compiler-primary mb-2">Project_0{i}</h3>
              <p className="text-compiler-muted text-sm">
                Interactive web experience with 3D elements
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="min-h-screen px-6 md:px-12 py-24 bg-compiler-surface/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
          TECH STACK
        </h2>
        <div className="flex flex-wrap gap-4">
          {['Next.js', 'React', 'TypeScript', 'Tailwind', 'Three.js', 'R3F', 'GSAP', 'Node.js'].map(
            (tech) => (
              <div
                key={tech}
                className="px-6 py-3 bg-compiler-border rounded-full font-mono text-sm hover:bg-compiler-primary hover:text-compiler-bg transition-colors cursor-default"
                data-warp
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="min-h-screen px-6 md:px-12 py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
          SIGNAL TIMELINE
        </h2>
        <div className="space-y-8">
          {[2024, 2023, 2022].map((year) => (
            <div key={year} className="flex gap-6">
              <div className="font-mono text-compiler-primary w-24">{year}</div>
              <div className="flex-1 p-6 bg-compiler-surface border border-compiler-border rounded-lg">
                <h3 className="font-semibold mb-2">Milestone Event</h3>
                <p className="text-compiler-muted text-sm">
                  Description of achievement or project completed this year.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="min-h-screen px-6 md:px-12 py-24 bg-compiler-surface/30">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">
          UPLINK CONTACT
        </h2>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-mono text-sm text-compiler-primary mb-2">
              IDENTIFIER
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 bg-compiler-bg border border-compiler-border rounded-md focus:border-compiler-primary focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-mono text-sm text-compiler-primary mb-2">
              FREQUENCY
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 bg-compiler-bg border border-compiler-border rounded-md focus:border-compiler-primary focus:outline-none transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block font-mono text-sm text-compiler-primary mb-2">
              TRANSMISSION
            </label>
            <textarea
              id="message"
              rows={5}
              className="w-full px-4 py-3 bg-compiler-bg border border-compiler-border rounded-md focus:border-compiler-primary focus:outline-none transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-4 bg-compiler-primary text-compiler-bg font-mono font-semibold rounded-md hover:bg-compiler-primary/90 transition-colors"
          >
            TRANSMIT
          </button>
        </form>
      </div>
    </section>
  );
}

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);
  const bootComplete = useCompilerStore((state) => state.bootComplete);
  const setCurrentSection = useCompilerStore((state) => state.setCurrentSection);
  const prefersReducedMotion = useReducedMotion();

  // Handle boot completion
  const handleBootComplete = () => {
    setShowMainContent(true);
  };

  // Track current section on scroll
  useEffect(() => {
    if (!bootComplete) return;

    const sections = ['hero', 'archive', 'stack', 'timeline', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [bootComplete, setCurrentSection]);

  return (
    <>
      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Main Content */}
      {(showMainContent || prefersReducedMotion) && (
        <>
          {/* 3D Background Canvas */}
          <SpatialCanvas visible={bootComplete} />

          {/* Global Overlay UI */}
          <CompilerOverlay />

          {/* Main Content */}
          <main id="main-content" className="relative z-10">
            <HeroSection />
            <ArchiveSection />
            <StackSection />
            <TimelineSection />
            <ContactSection />
          </main>

          {/* Footer */}
          <footer className="relative z-10 px-6 py-12 border-t border-compiler-border">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="font-mono text-xs text-compiler-muted">
                © 2024 MAHENDRARCH. All systems operational.
              </p>
              <p className="font-mono text-xs text-compiler-muted">
                Built with Next.js 14 + R3F + TypeScript
              </p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
