import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface CompilerState {
  // Boot state
  bootComplete: boolean;
  isCompiling: boolean;
  
  // Navigation state
  currentSection: string;
  sections: string[];
  
  // UI state
  activeModal: string | null;
  cursorPosition: { x: number; y: number };
  
  // Actions
  setBootComplete: (complete: boolean) => void;
  setIsCompiling: (compiling: boolean) => void;
  setCurrentSection: (section: string) => void;
  setActiveModal: (modal: string | null) => void;
  setCursorPosition: (pos: { x: number; y: number }) => void;
}

export const useCompilerStore = create<CompilerState>()(
  subscribeWithSelector((set) => ({
    // Initial state
    bootComplete: false,
    isCompiling: false,
    currentSection: 'hero',
    sections: ['hero', 'archive', 'stack', 'timeline', 'contact'],
    activeModal: null,
    cursorPosition: { x: 0, y: 0 },
    
    // Actions
    setBootComplete: (complete) => set({ bootComplete: complete }),
    setIsCompiling: (compiling) => set({ isCompiling: compiling }),
    setCurrentSection: (section) => set({ currentSection: section }),
    setActiveModal: (modal) => set({ activeModal: modal }),
    setCursorPosition: (pos) => set({ cursorPosition: pos }),
  }))
);
