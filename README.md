# MAHENDRARCH // THE REALITY COMPILER

A production-ready, highly interactive personal branding landing page that behaves like a living compiler.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D/Spatial**: @react-three/fiber, @react-three/drei
- **Animation**: GSAP + ScrollTrigger, Framer Motion
- **Smooth Scroll**: Lenis
- **State**: Zustand
- **Forms**: React Hook Form + Zod

## 📁 Project Structure

```
app/
  layout.tsx          # Root layout with fonts and metadata
  page.tsx            # Main page with boot sequence and sections
  globals.css         # Global styles and CSS variables
components/
  compiler/
    BootSequence.tsx  # Terminal-style hero with compile transition
    SpatialCanvas.tsx # R3F canvas with procedural geometry
    CompilerOverlay.tsx # Global state manager and UI overlay
  sections/           # Section components (Phase 2+)
  ui/                 # Reusable UI components
hooks/
  useReducedMotion.ts # Accessibility hook for reduced motion
  useScrollVelocity.ts # Scroll velocity tracking
lib/
  store.ts            # Zustand state management
  animations.ts       # GSAP animation utilities
  utils.ts            # Helper functions
public/
  fonts/              # Font files
  shaders/            # GLSL shader placeholders
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ✨ Features

- **Boot Sequence**: Terminal-style intro with typewriter effect
- **Spatial Canvas**: 3D background with floating "data crystals"
- **Proximity Cursor**: Warps nearby UI elements on hover
- **Reduced Motion Support**: Respects OS accessibility settings
- **Responsive Design**: Mobile-first with graceful degradation
- **Performance Optimized**: Code-splitting, lazy loading, minimal JS

## 🎯 Performance Targets

- LCP: <1.5s on 4G
- Initial JS: <150KB
- Lighthouse: Performance ≥90, Accessibility ≥95

## 📄 License

MIT
