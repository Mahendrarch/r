'use client';

import { useRef, useEffect, useState } from 'react';
import { useCompilerStore } from '@/lib/store';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectModal } from '@/components/ui/SplitView';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  preview: React.ReactNode;
  code: string;
  language: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NEON_DASHBOARD',
    description: 'Real-time analytics dashboard with 3D data visualization',
    tags: ['Next.js', 'Three.js', 'WebSocket'],
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse" />
          <p className="font-mono text-sm text-compiler-primary">Live Data Stream</p>
        </div>
      </div>
    ),
    code: `// NEON_DASHBOARD - Core Component
import { Canvas } from '@react-three/fiber';

export default function Dashboard() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <DataVisualization />
      <OrbitControls />
    </Canvas>
  );
}`,
    language: 'typescript',
  },
  {
    id: 2,
    title: 'QUANTUM_PORTFOLIO',
    description: 'Interactive portfolio with physics-based navigation',
    tags: ['React', 'GSAP', 'Matter.js'],
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-900/20 to-teal-900/20 rounded">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 rotate-45" />
          <p className="font-mono text-sm text-compiler-primary">Physics Engine</p>
        </div>
      </div>
    ),
    code: `// QUANTUM_PORTFOLIO - Physics Integration
import Matter from 'matter-js';

export function usePhysics() {
  const engine = Matter.Engine.create();
  const world = engine.world;
  
  useEffect(() => {
    Matter.Runner.run(engine);
  }, []);
  
  return { world };
}`,
    language: 'typescript',
  },
  {
    id: 3,
    title: 'VOID_ECOMMERCE',
    description: 'Headless e-commerce with immersive product previews',
    tags: ['Shopify', 'R3F', 'Zustand'],
    preview: (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-orange-500 animate-spin" />
          <p className="font-mono text-sm text-compiler-primary">3D Product View</p>
        </div>
      </div>
    ),
    code: `// VOID_ECOMMERCE - Product Store
import { create } from 'zustand';

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (p) => set({ selectedProduct: p }),
}));`,
    language: 'typescript',
  },
];

/**
 * ArchiveSection displays projects as orbiting crystals.
 * Click expands to case study modal with SplitView.
 */
export function ArchiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate project cards on scroll enter
      gsap.fromTo(
        '.project-card',
        { y: 100, opacity: 0, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Crystal floating animation
      gsap.to('.crystal', {
        y: '+=10',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.3,
          from: 'random',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        id="archive"
        className="min-h-screen px-6 md:px-12 py-24 relative"
      >
        <div ref={containerRef} className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            PROJECT ARCHIVE
          </h2>
          <p className="font-mono text-compiler-muted mb-12">
            // Select a crystal to inspect source code
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-card group relative p-6 bg-compiler-surface border border-compiler-border rounded-lg hover:border-compiler-primary/50 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedProject(project);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${project.title} case study`}
              >
                {/* Crystal decoration */}
                <div className="crystal absolute -right-4 -top-4 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-compiler-primary">
                    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="h-40 bg-compiler-border/50 rounded mb-4 flex items-center justify-center overflow-hidden">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-compiler-primary to-compiler-primary/50 animate-pulse" />
                  </div>

                  <h3 className="font-mono text-compiler-primary text-lg mb-2 group-hover:text-compiler-primary/80 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-compiler-muted text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-compiler-border/50 rounded text-xs font-mono text-compiler-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-compiler-primary/0 to-compiler-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
