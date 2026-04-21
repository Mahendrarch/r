import gsap from 'gsap';

/**
 * Boot sequence animation timeline.
 * Triggers glitch → scanlines → reality reveal transition.
 */
export function createBootTimeline(
  terminalElement: HTMLElement,
  canvasElement: HTMLElement,
  onComplete?: () => void
): gsap.core.Timeline {
  const tl = gsap.timeline({
    onComplete,
  });

  // Glitch effect on terminal
  tl.to(terminalElement, {
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
    )
    // Reveal canvas with clip-path
    .from(canvasElement, {
      duration: 0.6,
      clipPath: 'inset(50% 50% 50% 50%)',
      opacity: 0,
      ease: 'expo.out',
    })
    // Fade out terminal completely
    .set(terminalElement, { display: 'none' }, '-=0.4');

  return tl;
}

/**
 * Section transition animation.
 * Smooth scroll-based section entry with velocity-dependent effects.
 */
export function createSectionEnterAnimation(
  element: HTMLElement,
  velocity: number = 0
): gsap.core.Tween {
  const skewAmount = Math.min(Math.abs(velocity) * 2, 5); // Max 5deg skew
  
  return gsap.fromTo(
    element,
    {
      y: 50,
      opacity: 0,
      skewY: skewAmount,
      scale: 0.98,
    },
    {
      y: 0,
      opacity: 1,
      skewY: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    }
  );
}

/**
 * Text scramble/reveal effect for code-like appearance.
 */
export function scrambleText(
  element: HTMLElement,
  finalText: string,
  duration: number = 1
): gsap.core.Timeline {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_<>{}[]();:';
  const tl = gsap.timeline();
  
  let iterations = 0;
  const originalText = element.textContent || '';
  
  tl.to(element, {
    duration: duration,
    onUpdate: () => {
      iterations++;
      element.textContent = finalText
        .split('')
        .map((char, index) => {
          if (index < iterations / 3) {
            return finalText[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
    },
    onComplete: () => {
      element.textContent = finalText;
    },
  });
  
  return tl;
}

/**
 * Holographic decode effect for timeline items.
 */
export function holographicDecode(
  elements: NodeListOf<HTMLElement>,
  stagger: number = 0.1
): gsap.core.Timeline {
  const tl = gsap.timeline();
  
  tl.from(elements, {
    opacity: 0,
    filter: 'blur(10px)',
    y: 30,
    duration: 0.6,
    stagger,
    ease: 'power2.out',
  });
  
  return tl;
}

/**
 * Cursor proximity warp effect (CSS transform based).
 */
export function setupProximityWarp(
  container: HTMLElement,
  warpElements: HTMLElement[],
  warpStrength: number = 10
): () => void {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    warpElements.forEach((el) => {
      const elRect = el.getBoundingClientRect();
      const elCenterX = elRect.left + elRect.width / 2 - rect.left;
      const elCenterY = elRect.top + elRect.height / 2 - rect.top;
      
      const distX = mouseX - elCenterX;
      const distY = mouseY - elCenterY;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const maxDist = 200;
      
      if (distance < maxDist) {
        const force = (maxDist - distance) / maxDist;
        const translateX = (distX / distance) * force * warpStrength;
        const translateY = (distY / distance) * force * warpStrength;
        
        el.style.transform = `translate(${translateX}px, ${translateY}px)`;
      } else {
        el.style.transform = 'translate(0, 0)';
      }
    });
  };
  
  container.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
  };
}
