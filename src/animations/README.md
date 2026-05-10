# Animations

This directory contains animation utilities and timing functions for the Remotion Video Engine.

## Purpose
- Core animation primitives (fade, slide, zoom, scale, rotate, blur)
- Cinematic effects and transitions
- Sequencing utilities for complex animations

## Modules

### Core Animations (`core.ts`)
Base animation hooks using only Remotion primitives. All animations are frame-based and use `interpolate`, `spring`, `useCurrentFrame`, and `useVideoConfig`.

**Available Hooks:**
- `useFadeIn` / `useFadeOut` - Opacity animations
- `useSlideIn` / `useSlideOut` - Position animations
- `useScaleIn` / `useScaleOut` - Scale animations
- `useZoom` - Custom scale range animations
- `useRotate` - Rotation animations
- `useBlur` - Blur filter animations
- `useAnimationProgress` - Get animation progress (0-1)
- `combineTransforms` - Combine multiple transforms
- `useDelay` - Delay animation start

**Supported Easing Functions:**
- linear, easeIn, easeOut, easeInOut
- easeInCubic, easeOutCubic, easeInOutCubic
- spring (physics-based)

See [CORE_ANIMATIONS.md](./CORE_ANIMATIONS.md) for detailed documentation.

### Cinematic Effects (`cinematic.ts`)
Advanced cinematic effects and scene transitions for professional video production. All effects use only Remotion primitives.

**Available Effects:**
- `useKenBurns` - Slow zoom and pan effect for images
- `useParallax` - Layered motion for depth
- `useGlitch` - Digital distortion for tech aesthetics
- `useTypewriter` - Character-by-character text reveal
- `useWipe` - Directional reveal/hide transition
- `useDissolve` - Smooth opacity-based crossfade
- `combineCinematicTransforms` - Combine multiple cinematic effects

See [CINEMATIC_EFFECTS.md](./CINEMATIC_EFFECTS.md) for detailed documentation.

### Sequencing Utilities (`sequencing.ts`)
Timing and sequencing helpers for orchestrating complex animation sequences. These utilities help coordinate multiple animations with precise timing control.

**Available Utilities:**
- `useStagger` - Sequential animations with delays between items
- `useTimeline` - Complex multi-step animations with precise timing
- `useCurrentTime` / `useDuration` - Time information hooks
- `useIsInRange` / `useRangeProgress` - Range-based animation control
- `secondsToFrames` / `framesToSeconds` - Time/frame conversion
- `calculateStaggerStart` / `calculateStaggerDuration` - Stagger calculations
- `createSequence` / `batchTimelineSteps` - Helper functions for sequences
- `calculateOverlap` / `hasOverlap` - Overlap detection utilities

See [SEQUENCING_UTILITIES.md](./SEQUENCING_UTILITIES.md) for detailed documentation.

### Test Components
- `core.test.tsx` - Visual test components for core animations
- `cinematic.test.tsx` - Visual test components for cinematic effects
- `sequencing.test.tsx` - Visual test components for sequencing utilities

Test components can be registered as Remotion compositions for preview.

## Usage

### Core Animations
```tsx
import { useFadeIn, useSlideIn, combineTransforms } from "./animations";

const MyComponent = () => {
  const opacity = useFadeIn({ duration: 30 });
  const slide = useSlideIn({ duration: 30, direction: "left" });
  
  return (
    <div style={{ opacity, transform: slide }}>
      Animated content
    </div>
  );
};
```

### Cinematic Effects
```tsx
import { useKenBurns, useTypewriter, useDissolve } from "./animations";

const CinematicScene = () => {
  const { transform } = useKenBurns({
    duration: 300,
    fromScale: 1,
    toScale: 1.3
  });
  
  const { visibleText, showCursor } = useTypewriter({
    text: "Hello, World!",
    duration: 60,
    speed: 0.5
  });
  
  return (
    <>
      <img style={{ transform }} src="background.jpg" />
      <div>{visibleText}{showCursor && '|'}</div>
    </>
  );
};
```

### Sequencing Utilities
```tsx
import { useStagger, useTimeline, batchTimelineSteps } from "./animations";

// Staggered list animation
const StaggeredList = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => {
        const stagger = useStagger(index, {
          count: items.length,
          stagger: 10,
          duration: 30
        });
        
        return (
          <div 
            key={index}
            style={{ 
              opacity: stagger.progress,
              transform: `translateY(${(1 - stagger.progress) * 50}px)`
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

// Timeline-based animation
const TimelineScene = () => {
  const timeline = useTimeline({
    steps: batchTimelineSteps(
      ['fadeIn', 'scale', 'rotate', 'fadeOut'],
      [0, 30, 60, 90],
      30,
      'easeInOut'
    )
  });
  
  let style = {};
  if (timeline.currentStep?.id === 'fadeIn') {
    style.opacity = timeline.progress;
  } else if (timeline.currentStep?.id === 'scale') {
    style.transform = `scale(${1 + timeline.progress * 0.5})`;
  }
  // ... handle other steps
  
  return <div style={style}>Animated Content</div>;
};
```

## Guidelines
- Use Remotion's interpolate and spring functions
- Create reusable animation hooks and utilities
- Keep animations smooth and performant
- Document timing and easing parameters
- All animations must be frame-based (no CSS transitions)
- Use `combineTransforms` or `combineCinematicTransforms` for multiple transform animations
- Test effects at target frame rate before final render
