# Core Animation Utilities

This document provides comprehensive documentation for the core animation utilities in the Remotion Video Engine.

## Overview

The core animation system provides a set of React hooks that create smooth, performant animations using only Remotion primitives (`interpolate`, `spring`, `useCurrentFrame`, `useVideoConfig`). All animations are frame-based and work seamlessly with Remotion's rendering pipeline.

## Animation Hooks

### Fade Animations

#### `useFadeIn(params: AnimationParams): number`

Animates opacity from 0 to 1.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")

**Returns:** Opacity value (0-1)

**Example:**
```tsx
import { useFadeIn } from "./animations";

const MyComponent = () => {
  const opacity = useFadeIn({ duration: 30 });
  
  return (
    <div style={{ opacity }}>
      This content fades in over 30 frames
    </div>
  );
};
```

#### `useFadeOut(params: AnimationParams): number`

Animates opacity from 1 to 0.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")

**Returns:** Opacity value (0-1)

**Example:**
```tsx
const opacity = useFadeOut({ start: 60, duration: 30 });
```

### Slide Animations

#### `useSlideIn(params: SlideParams): string`

Animates position from off-screen to final position.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")
- `direction` (SlideDirection, optional): Direction to slide from - "left", "right", "top", or "bottom" (default: "left")
- `distance` (number, optional): Distance to slide in pixels (default: 100)

**Returns:** Transform translate value

**Example:**
```tsx
const transform = useSlideIn({ 
  duration: 30, 
  direction: "left", 
  distance: 200 
});

return <div style={{ transform }}>Slides in from left</div>;
```

#### `useSlideOut(params: SlideParams): string`

Animates position from current to off-screen.

**Parameters:** Same as `useSlideIn`

**Returns:** Transform translate value

### Scale Animations

#### `useScaleIn(params: AnimationParams): string`

Animates scale from 0 to 1.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")

**Returns:** Transform scale value

**Example:**
```tsx
const transform = useScaleIn({ duration: 30 });
return <div style={{ transform }}>Scales in</div>;
```

#### `useScaleOut(params: AnimationParams): string`

Animates scale from 1 to 0.

**Parameters:** Same as `useScaleIn`

**Returns:** Transform scale value

### Zoom Animation

#### `useZoom(params: ZoomParams): string`

Animates scale from one value to another (useful for Ken Burns effect).

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")
- `from` (number, optional): Starting scale (default: 1)
- `to` (number, optional): Ending scale (default: 1.5)

**Returns:** Transform scale value

**Example:**
```tsx
const transform = useZoom({ 
  duration: 90, 
  from: 1, 
  to: 1.5 
});

return <div style={{ transform }}>Zooms from 1x to 1.5x</div>;
```

### Rotate Animation

#### `useRotate(params: RotateParams): string`

Animates rotation from one angle to another.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")
- `from` (number, optional): Starting rotation in degrees (default: 0)
- `to` (number, optional): Ending rotation in degrees (default: 360)

**Returns:** Transform rotate value

**Example:**
```tsx
const transform = useRotate({ 
  duration: 60, 
  from: 0, 
  to: 360 
});

return <div style={{ transform }}>Rotates 360 degrees</div>;
```

### Blur Animation

#### `useBlur(params: BlurParams): string`

Animates blur filter from one value to another.

**Parameters:**
- `duration` (number, required): Duration of the animation in frames
- `start` (number, optional): Start frame of the animation (default: 0)
- `easing` (EasingFunction, optional): Easing function to apply (default: "easeInOut")
- `from` (number, optional): Starting blur amount in pixels (default: 10)
- `to` (number, optional): Ending blur amount in pixels (default: 0)

**Returns:** CSS filter blur value

**Example:**
```tsx
const filter = useBlur({ 
  duration: 30, 
  from: 10, 
  to: 0 
});

return <div style={{ filter }}>Blurs to focus</div>;
```

## Utility Functions

### `useAnimationProgress(start: number, duration: number, easing?: EasingFunction): number`

Get the current progress of an animation (0-1). Useful for creating custom animations.

**Example:**
```tsx
const progress = useAnimationProgress(0, 60, "easeInOut");
const customValue = progress * 100;
const color = `rgb(${progress * 255}, 0, 0)`;

return (
  <div style={{ 
    width: `${customValue}%`,
    backgroundColor: color 
  }}>
    Custom animation
  </div>
);
```

### `combineTransforms(transforms: string[]): string`

Combine multiple transform values into a single transform string.

**Example:**
```tsx
const slide = useSlideIn({ duration: 30 });
const scale = useScaleIn({ duration: 30 });
const rotate = useRotate({ duration: 30, from: -10, to: 0 });

const transform = combineTransforms([
  "translate(-50%, -50%)",
  slide,
  scale,
  rotate
]);

return <div style={{ transform }}>Multiple transforms</div>;
```

### `useDelay<T, R>(delayFrames: number, animationHook: (params: T) => R, params: T): R`

Create a delayed animation by offsetting the start frame.

**Example:**
```tsx
// Start fade in after 30 frames
const opacity = useDelay(30, useFadeIn, { duration: 30 });

return <div style={{ opacity }}>Delayed fade in</div>;
```

## Easing Functions

All animation hooks support the following easing functions:

- `"linear"`: Constant speed throughout
- `"easeIn"`: Slow start, fast end (quadratic)
- `"easeOut"`: Fast start, slow end (quadratic)
- `"easeInOut"`: Slow start and end, fast middle (quadratic)
- `"easeInCubic"`: Slow start, fast end (cubic)
- `"easeOutCubic"`: Fast start, slow end (cubic)
- `"easeInOutCubic"`: Slow start and end, fast middle (cubic)
- `"spring"`: Spring physics animation (bouncy effect)

**Example:**
```tsx
// Linear fade
const linearFade = useFadeIn({ duration: 30, easing: "linear" });

// Spring bounce
const springScale = useScaleIn({ duration: 60, easing: "spring" });

// Cubic ease
const cubicSlide = useSlideIn({ 
  duration: 30, 
  easing: "easeInOutCubic" 
});
```

## Frame Timing

All animations are frame-based. To convert between seconds and frames:

```tsx
import { useVideoConfig } from "remotion";

const { fps } = useVideoConfig();
const durationInSeconds = 1; // 1 second
const durationInFrames = durationInSeconds * fps; // 30 frames at 30fps

const opacity = useFadeIn({ duration: durationInFrames });
```

## Common Patterns

### Entrance Animation

Combine multiple animations for a dramatic entrance:

```tsx
const opacity = useFadeIn({ duration: 30 });
const slide = useSlideIn({ duration: 30, direction: "bottom", distance: 50 });
const scale = useScaleIn({ duration: 30 });

const transform = combineTransforms([slide, scale]);

return (
  <div style={{ opacity, transform }}>
    Dramatic entrance!
  </div>
);
```

### Exit Animation

Animate elements out before they disappear:

```tsx
const opacity = useFadeOut({ start: 60, duration: 30 });
const slide = useSlideOut({ 
  start: 60, 
  duration: 30, 
  direction: "top", 
  distance: 100 
});

return (
  <div style={{ opacity, transform: slide }}>
    Exits upward while fading
  </div>
);
```

### Staggered Animations

Create staggered animations using the delay utility:

```tsx
const items = ["First", "Second", "Third"];

return (
  <>
    {items.map((item, index) => {
      const opacity = useDelay(
        index * 10, // 10 frame delay between each
        useFadeIn,
        { duration: 20 }
      );
      
      return (
        <div key={item} style={{ opacity }}>
          {item}
        </div>
      );
    })}
  </>
);
```

### Ken Burns Effect

Create a slow zoom and pan effect for images:

```tsx
const zoom = useZoom({ duration: 300, from: 1, to: 1.2 });

return (
  <div style={{ 
    transform: zoom,
    transformOrigin: "center center" 
  }}>
    <img src="image.jpg" alt="Zooming image" />
  </div>
);
```

### Focus Effect

Blur in to focus:

```tsx
const filter = useBlur({ duration: 30, from: 10, to: 0 });

return (
  <div style={{ filter }}>
    Comes into focus
  </div>
);
```

## Performance Tips

1. **Use frame-based timing**: All animations are frame-based, which ensures smooth playback at any frame rate.

2. **Avoid CSS transitions**: Don't use CSS transitions or animations - they can cause flickering in Remotion. Use these hooks instead.

3. **Combine transforms**: Use `combineTransforms` to apply multiple transform animations efficiently.

4. **Clamp extrapolation**: All animations automatically clamp values before and after the animation range, preventing unexpected behavior.

5. **Spring animations**: Spring animations provide natural, physics-based motion but may take longer to settle. Adjust the duration accordingly.

## Testing

Test components are available in `core.test.tsx` to visually verify all animations work correctly. These can be registered as Remotion compositions for preview.

## Type Safety

All animation hooks are fully typed with TypeScript. Import types as needed:

```tsx
import type { 
  AnimationParams, 
  SlideParams, 
  RotateParams,
  BlurParams,
  ZoomParams 
} from "./animations";
```
