# Cinematic Effects and Transitions

This document provides comprehensive documentation for all cinematic effects and transitions available in the Remotion Video Engine.

## Overview

The cinematic effects module provides advanced animation effects designed for professional video production. All effects use only Remotion primitives (`interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`) and are optimized for smooth, high-quality animations.

## Effects

### 1. Ken Burns Effect

The Ken Burns effect creates a slow zoom and pan motion commonly used in documentaries to add life to static images.

**Function:** `useKenBurns(params: KenBurnsParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `easing?: EasingFunction` - Easing function (default: "linear")
- `fromScale?: number` - Starting scale (default: 1)
- `toScale?: number` - Ending scale (default: 1.2)
- `fromX?: number` - Starting X position in % (default: 0)
- `toX?: number` - Ending X position in % (default: 10)
- `fromY?: number` - Starting Y position in % (default: 0)
- `toY?: number` - Ending Y position in % (default: 10)

**Returns:** `{ transform: string, scale: number }`

**Example:**
```tsx
import { useKenBurns } from './animations';

const MyComponent = () => {
  const { transform } = useKenBurns({
    duration: 300,
    fromScale: 1,
    toScale: 1.3,
    fromX: 0,
    toX: -5,
    fromY: 0,
    toY: -5,
    easing: "linear"
  });

  return (
    <img 
      src="landscape.jpg" 
      style={{ transform, width: '100%', height: '100%' }} 
    />
  );
};
```

**Use Cases:**
- Documentary-style image presentations
- Photo montages
- Background imagery with subtle motion
- Title sequences over static images

---

### 2. Parallax Effect

Creates depth through layered motion where elements move at different speeds based on their depth layer.

**Function:** `useParallax(params: ParallaxParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `easing?: EasingFunction` - Easing function (default: "linear")
- `intensity?: number` - Speed multiplier (default: 1)
- `direction?: "horizontal" | "vertical" | "both"` - Movement direction (default: "vertical")

**Returns:** `string` (transform value)

**Example:**
```tsx
import { useParallax } from './animations';

const ParallaxScene = () => {
  const bgParallax = useParallax({ duration: 300, intensity: 0.3 });
  const fgParallax = useParallax({ duration: 300, intensity: 1.5 });

  return (
    <>
      <div style={{ transform: bgParallax }}>Background Layer</div>
      <div style={{ transform: fgParallax }}>Foreground Layer</div>
    </>
  );
};
```

**Use Cases:**
- Creating depth in 2D scenes
- Scrolling backgrounds
- Layered title sequences
- Multi-plane camera effects

**Tips:**
- Use intensity < 1 for background layers (slower movement)
- Use intensity > 1 for foreground layers (faster movement)
- Combine with other effects for complex motion

---

### 3. Glitch Effect

Creates digital distortion effects with random offsets and color shifts, perfect for tech aesthetics.

**Function:** `useGlitch(params: GlitchParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `intensity?: number` - Effect intensity 0-1 (default: 0.5)
- `frequency?: number` - Glitch occurrence rate (default: 5)

**Returns:** `{ transform: string, filter: string, opacity: number }`

**Example:**
```tsx
import { useGlitch } from './animations';

const GlitchyTitle = () => {
  const glitch = useGlitch({
    duration: 60,
    intensity: 0.8,
    frequency: 10
  });

  return (
    <div style={{
      transform: glitch.transform,
      filter: glitch.filter,
      opacity: glitch.opacity,
      color: '#00ff00',
      fontSize: 72
    }}>
      SYSTEM ERROR
    </div>
  );
};
```

**Use Cases:**
- Tech/cyberpunk aesthetics
- Error states or system failures
- Transition effects
- Attention-grabbing moments
- Retro VHS effects

**Tips:**
- Higher frequency = more frequent glitches
- Higher intensity = more dramatic distortion
- Works well with monospace fonts and neon colors
- Combine with scanline effects for VHS look

---

### 4. Typewriter Effect

Animates text appearing character by character, simulating typing.

**Function:** `useTypewriter(params: TypewriterParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `text: string` - Text to animate (required)
- `speed?: number` - Characters per frame (default: 1)
- `showCursor?: boolean` - Show blinking cursor (default: true)

**Returns:** `{ visibleText: string, showCursor: boolean, progress: number }`

**Example:**
```tsx
import { useTypewriter } from './animations';

const TypedText = () => {
  const { visibleText, showCursor } = useTypewriter({
    text: "Hello, World!",
    duration: 60,
    speed: 0.5,
    showCursor: true
  });

  return (
    <div style={{ fontFamily: 'monospace', fontSize: 48 }}>
      {visibleText}
      {showCursor && <span style={{ borderRight: '3px solid white' }} />}
    </div>
  );
};
```

**Use Cases:**
- Code demonstrations
- Terminal/command line simulations
- Narrative text reveals
- Subtitle animations
- Chat message effects

**Tips:**
- Use monospace fonts for authentic typewriter look
- Adjust speed based on text length and desired pacing
- The cursor blinks every 15 frames (0.5s at 30fps)
- Progress value useful for triggering follow-up animations

---

### 5. Wipe Transition

Directional reveal/hide transition that moves a mask across the screen.

**Function:** `useWipe(params: WipeParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `easing?: EasingFunction` - Easing function (default: "easeInOut")
- `direction?: "left" | "right" | "top" | "bottom"` - Wipe direction (default: "left")

**Returns:** `{ clipPath: string, progress: number }`

**Example:**
```tsx
import { useWipe } from './animations';

const WipeTransition = () => {
  const wipe = useWipe({
    duration: 30,
    direction: "left",
    easing: "easeInOut"
  });

  return (
    <div style={{ clipPath: wipe.clipPath }}>
      New Scene Content
    </div>
  );
};
```

**Use Cases:**
- Scene transitions
- Revealing content
- Page turns
- Directional emphasis
- Split-screen effects

**Tips:**
- Use "easeInOut" for smooth, professional transitions
- Combine with opposite direction for back-and-forth effects
- Works well for revealing text or images
- Can be used on multiple layers simultaneously

---

### 6. Dissolve Transition

Smooth opacity-based crossfade between two scenes or elements.

**Function:** `useDissolve(params: DissolveParams)`

**Parameters:**
- `start?: number` - Start frame (default: 0)
- `duration: number` - Duration in frames (required)
- `easing?: EasingFunction` - Easing function (default: "easeInOut")
- `intensity?: number` - Transition sharpness (default: 1)

**Returns:** `{ outgoing: number, incoming: number, progress: number }`

**Example:**
```tsx
import { useDissolve } from './animations';

const CrossfadeScenes = () => {
  const dissolve = useDissolve({
    duration: 30,
    easing: "easeInOut"
  });

  return (
    <>
      <div style={{ opacity: dissolve.outgoing }}>
        Scene A
      </div>
      <div style={{ opacity: dissolve.incoming }}>
        Scene B
      </div>
    </>
  );
};
```

**Use Cases:**
- Smooth scene transitions
- Image crossfades
- Mood changes
- Time passage
- Gentle transitions

**Tips:**
- intensity > 1 makes transition more abrupt
- intensity < 1 makes transition more gradual
- Classic, professional transition for most contexts
- Works well with any content type

---

## Combining Effects

Use `combineCinematicTransforms()` to combine multiple transform-based effects:

```tsx
import { useKenBurns, useParallax, combineCinematicTransforms } from './animations';

const CombinedEffects = () => {
  const kenBurns = useKenBurns({ duration: 300 });
  const parallax = useParallax({ duration: 300, intensity: 0.5 });
  
  const transform = combineCinematicTransforms([
    kenBurns.transform,
    parallax
  ]);

  return <div style={{ transform }}>Content</div>;
};
```

## Easing Functions

All effects support the following easing functions:
- `linear` - Constant speed
- `easeIn` - Slow start, fast end
- `easeOut` - Fast start, slow end
- `easeInOut` - Slow start and end (default for most)
- `easeInCubic` - More pronounced ease in
- `easeOutCubic` - More pronounced ease out
- `easeInOutCubic` - More pronounced ease in and out
- `spring` - Physics-based spring animation

## Performance Tips

1. **Use appropriate durations**: Longer durations for subtle effects (Ken Burns), shorter for transitions
2. **Limit glitch frequency**: High frequency can be visually overwhelming
3. **Combine effects sparingly**: Too many simultaneous effects can be distracting
4. **Test at target frame rate**: Effects are frame-based, so test at your render FPS
5. **Use linear easing for Ken Burns**: Matches traditional documentary style

## Best Practices

1. **Ken Burns**: Use subtle movements (10-30% scale, 5-10% pan) for professional look
2. **Parallax**: Layer 3-5 elements with varying intensities for best depth effect
3. **Glitch**: Use sparingly for impact; continuous glitching loses effectiveness
4. **Typewriter**: Match speed to reading pace; too fast is hard to follow
5. **Wipe**: 20-30 frames (0.67-1 second at 30fps) is ideal for most transitions
6. **Dissolve**: 15-30 frames for quick cuts, 30-60 for mood transitions

## Examples by Use Case

### Documentary Style
```tsx
const { transform } = useKenBurns({
  duration: 300,
  fromScale: 1,
  toScale: 1.15,
  fromX: 0,
  toX: -5,
  easing: "linear"
});
```

### Tech/Cyberpunk
```tsx
const glitch = useGlitch({
  duration: 60,
  intensity: 0.7,
  frequency: 8
});
```

### Code Tutorial
```tsx
const { visibleText, showCursor } = useTypewriter({
  text: "npm install remotion",
  duration: 90,
  speed: 0.3,
  showCursor: true
});
```

### Scene Transition
```tsx
const dissolve = useDissolve({
  duration: 30,
  easing: "easeInOut"
});
```
