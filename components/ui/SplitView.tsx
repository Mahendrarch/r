'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';

interface SplitViewProps {
  previewContent: React.ReactNode;
  codeContent: string;
  language?: string;
}

/**
 * SplitView component with draggable slider to reveal/hide code vs UI preview.
 * Uses spring physics for smooth handle animation.
 */
export function SplitView({ previewContent, codeContent, language = 'typescript' }: SplitViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [splitPosition, setSplitPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const [{ x }, api] = useSpring(() => ({ x: splitPosition }));

  const handleMouseDown = () => setIsDragging(true);
  
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(20, Math.min(80, newX));
    setSplitPosition(clampedX);
    api.start({ x: clampedX, config: { tension: 300, friction: 30 } });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const newX = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    const clampedX = Math.max(20, Math.min(80, newX));
    setSplitPosition(clampedX);
    api.start({ x: clampedX, config: { tension: 300, friction: 30 } });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[600px] flex overflow-hidden rounded-lg border border-compiler-border bg-compiler-bg"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Preview Panel (Left) */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 bg-compiler-surface overflow-hidden"
        style={{ width: x.to((val) => `${val}%`) }}
      >
        <div className="absolute top-0 left-0 right-0 p-2 bg-compiler-border/30 border-b border-compiler-border z-10">
          <span className="font-mono text-xs text-compiler-primary">PREVIEW</span>
        </div>
        <div className="pt-8 h-full p-4 overflow-auto">{previewContent}</div>
      </motion.div>

      {/* Code Panel (Right) */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 bg-[#0d1117] overflow-hidden"
        style={{ 
          left: x.to((val) => `${val}%`),
          width: x.to((val) => `${100 - val}%`) 
        }}
      >
        <div className="absolute top-0 left-0 right-0 p-2 bg-compiler-border/30 border-b border-compiler-border z-10">
          <span className="font-mono text-xs text-compiler-primary">SOURCE // {language.toUpperCase()}</span>
        </div>
        <div className="pt-8 h-full p-4 overflow-auto">
          <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap">
            <code>{codeContent}</code>
          </pre>
        </div>
      </motion.div>

      {/* Drag Handle */}
      <motion.div
        className="absolute top-0 bottom-0 w-1 bg-compiler-primary cursor-col-resize z-20 hover:w-1.5 transition-all"
        style={{ left: x.to((val) => `calc(${val}% - 2px)`) }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-compiler-primary flex items-center justify-center shadow-lg">
          <svg className="w-4 h-4 text-compiler-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    preview: React.ReactNode;
    code: string;
    language?: string;
  };
  onClose: () => void;
}

/**
 * Project case study modal with SplitView.
 */
export function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="w-full max-w-6xl max-h-[90vh] overflow-auto bg-compiler-bg rounded-lg border border-compiler-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-compiler-surface border-b border-compiler-border">
            <div>
              <h2 id="modal-title" className="font-display text-xl font-bold text-compiler-primary">
                {project.title}
              </h2>
              <p className="font-mono text-xs text-compiler-muted mt-1">{project.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-compiler-border rounded-md transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5 text-compiler-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* SplitView Content */}
          <div className="p-6">
            <SplitView
              previewContent={project.preview}
              codeContent={project.code}
              language={project.language}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
