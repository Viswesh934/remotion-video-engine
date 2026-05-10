# Sequencing Utilities

This document describes the sequencing utilities available in the Remotion Video Engine. These utilities help orchestrate complex animation sequences with precise timing control.

## Overview

The sequencing utilities provide three main capabilities:

1. **Stagger Animations**: Sequential animations where each item starts after a delay from the previous one
2. **Timeline Animations**: Complex multi-step animations with precise timing control
3. **Time Utilities**: Helper functions for time/frame conversions and range checking

## Stagger Animations

Stagger animations are perfect for animating lists, grids, or any collection of elements where you want each item to animate in sequence.

### `useStagger(index, config)`

Hook for creating staggered animations.

**Parameters:**
- `index` (number): Index of the item to evaluate (0-based)
- `config` (StaggerConfig):
  - `count` (number): Total number of items
  - `stagger` (number): Delay between each item in frames
  - `start` (number, optional): Start frame for the first item (default: 0)
  - `duration` (number): Duration of each item's animation in frames
  - `easing` (EasingFunction, optional): Easing function for each item

**Returns:** StaggerResult object with:
- `progress` (number): Animation progress (0-1)
- `hasStarted` (boolean): Whether animation has started
- `isComplete` (boolean): Whether animation has completed
- `startFrame` (number): Start frame for this item
- `endFrame` (number): End frame for this item

**Example:**

```tsx
function StaggeredList() {
  const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  
  return (
    <div>
      {items.map((item, index) => (
        <StaggeredItem key={index} index={index} text={item} />
      ))}
    </div>
  );
}

function StaggeredItem({ index, text }) {
  const stagger = useStagger(index, {
    count: 4,
    stagger: 10,      // 10 frames between each item
    duration: 30,     // Each item animates for 30 frames
    easing: 'easeOut'
  });
  
  const opacity = stagger.progress;
  const translateY = (1 - stagger.progress) * 50;
  
  return (
    <div style={{ 
      opacity, 
      transform: `translateY(${translateY}px)` 
    }}>
      {text}
    </div>
  );
}
```

### Helper Functions

#### `calculateStaggerStart(index, staggerDelay, baseStart)`

Calculate the start frame for an item in a staggered sequence.

```tsx
const startFrame = calculateStaggerStart(2, 10, 0); // Returns 20
```

#### `calculateStaggerDuration(count, staggerDelay, itemDuration)`

Calculate the total duration of a staggered sequence.

```tsx
const totalDuration = calculateStaggerDuration(5, 10, 30);
// Returns 70 (4 * 10 stagger + 30 last item duration)
```

#### `createSequence(count, staggerDelay, baseStart)`

Create an array of start times for sequential animations.

```tsx
const startTimes = createSequence(5, 10, 0);
// Returns [0, 10, 20, 30, 40]
```

## Timeline Animations

Timeline animations allow you to orchestrate complex multi-step animations with precise timing control. Each step can have its own duration and easing.

### `useTimeline(config)`

Hook for creating timeline-based animations.

**Parameters:**
- `config` (TimelineConfig):
  - `steps` (TimelineStep[]): Array of timeline steps
  - `start` (number, optional): Start frame of the entire timeline (default: 0)
  - `loop` (boolean, optional): Whether to loop the timeline (default: false)

**TimelineStep:**
- `id` (string): Unique identifier for this step
- `start` (number): Start time relative to timeline start (in frames)
- `duration` (number): Duration of this step (in frames)
- `easing` (EasingFunction, optional): Easing function for this step
- `data` (Record<string, unknown>, optional): Custom data for this step

**Returns:** TimelineResult object with:
- `currentStep` (TimelineStep | null): Current active step
- `progress` (number): Progress of current step (0-1)
- `stepIndex` (number): Index of current step (-1 if no step is active)
- `overallProgress` (number): Overall timeline progress (0-1)
- `isComplete` (boolean): Whether timeline has completed

**Example:**

```tsx
function ComplexAnimation() {
  const timeline = useTimeline({
    steps: [
      { id: 'fadeIn', start: 0, duration: 30, easing: 'easeIn' },
      { id: 'scale', start: 30, duration: 20, easing: 'spring' },
      { id: 'rotate', start: 50, duration: 40, easing: 'easeOut' },
      { id: 'fadeOut', start: 90, duration: 30, easing: 'easeIn' }
    ]
  });
  
  let style = {};
  
  if (timeline.currentStep?.id === 'fadeIn') {
    style.opacity = timeline.progress;
  } else if (timeline.currentStep?.id === 'scale') {
    style.transform = `scale(${1 + timeline.progress * 0.5})`;
  } else if (timeline.currentStep?.id === 'rotate') {
    style.transform = `rotate(${timeline.progress * 360}deg)`;
  } else if (timeline.currentStep?.id === 'fadeOut') {
    style.opacity = 1 - timeline.progress;
  }
  
  return <div style={style}>Animated Content</div>;
}
```

### Helper Functions

#### `getActiveStep(frame, steps, start)`

Get the active step from a timeline at a specific frame (non-hook version).

```tsx
const steps = [
  { id: 'step1', start: 0, duration: 30 },
  { id: 'step2', start: 30, duration: 30 }
];
const activeStep = getActiveStep(45, steps); // Returns step2
```

#### `batchTimelineSteps(ids, startFrames, duration, easing)`

Create multiple timeline steps quickly when they share common properties.

```tsx
const steps = batchTimelineSteps(
  ['fadeIn', 'slideIn', 'scaleIn'],
  [0, 30, 60],
  30,
  'easeOut'
);
```

## Time Utilities

### Frame/Time Conversion

#### `secondsToFrames(seconds, fps)`

Convert seconds to frames.

```tsx
const frames = secondsToFrames(2.5, 30); // Returns 75
```

#### `framesToSeconds(frames, fps)`

Convert frames to seconds.

```tsx
const seconds = framesToSeconds(90, 30); // Returns 3
```

#### `delayFromSeconds(seconds, fps)`

Calculate delay in frames from seconds.

```tsx
const delayFrames = delayFromSeconds(1.5, 30); // Returns 45
```

#### `durationFromSeconds(seconds, fps)`

Calculate duration in frames from seconds.

```tsx
const durationFrames = durationFromSeconds(2, 30); // Returns 60
```

### Time Hooks

#### `useCurrentTime()`

Get current time in seconds.

```tsx
const currentTime = useCurrentTime();
console.log(`Current time: ${currentTime}s`);
```

#### `useDuration()`

Get total video duration in seconds.

```tsx
const totalDuration = useDuration();
console.log(`Video duration: ${totalDuration}s`);
```

### Range Utilities

#### `useIsInRange(start, duration)`

Check if current frame is within a time range.

```tsx
const isActive = useIsInRange(30, 60);
if (isActive) {
  // Render something
}
```

#### `useRangeProgress(start, duration)`

Get progress within a time range (0-1).

```tsx
const progress = useRangeProgress(30, 60);
const opacity = progress; // Fade in over the range
```

#### `calculateEndFrame(start, duration)`

Calculate the end frame for an animation.

```tsx
const endFrame = calculateEndFrame(30, 60); // Returns 90
```

### Overlap Detection

#### `calculateOverlap(start1, duration1, start2, duration2)`

Calculate overlap between two time ranges.

```tsx
const overlap = calculateOverlap(10, 30, 25, 20);
// Returns 15 (frames 25-40 overlap with frames 10-40)
```

#### `hasOverlap(start1, duration1, start2, duration2)`

Check if two time ranges overlap.

```tsx
const overlaps = hasOverlap(10, 30, 25, 20); // Returns true
const noOverlap = hasOverlap(10, 20, 40, 20); // Returns false
```

## Best Practices

### 1. Use Stagger for Lists

When animating lists or grids, use `useStagger` for clean, sequential animations:

```tsx
// Good
const stagger = useStagger(index, { count: items.length, stagger: 5, duration: 20 });

// Avoid manually calculating delays
const delay = index * 5; // Don't do this
```

### 2. Use Timeline for Complex Sequences

For multi-step animations, use `useTimeline` instead of managing multiple animation states:

```tsx
// Good
const timeline = useTimeline({
  steps: [
    { id: 'intro', start: 0, duration: 30 },
    { id: 'content', start: 30, duration: 60 },
    { id: 'outro', start: 90, duration: 30 }
  ]
});

// Avoid multiple useAnimationProgress calls
const progress1 = useAnimationProgress(0, 30);
const progress2 = useAnimationProgress(30, 60);
const progress3 = useAnimationProgress(90, 30);
```

### 3. Use Time Utilities for Readability

Convert time values to frames for better readability:

```tsx
// Good
const duration = durationFromSeconds(2.5, fps);

// Less readable
const duration = Math.round(2.5 * fps);
```

### 4. Use Range Utilities for Conditional Rendering

Use `useIsInRange` for conditional rendering based on time:

```tsx
// Good
const showElement = useIsInRange(30, 60);
if (showElement) {
  return <Element />;
}

// Avoid manual frame comparisons
const frame = useCurrentFrame();
if (frame >= 30 && frame < 90) {
  return <Element />;
}
```

### 5. Batch Timeline Steps

When creating multiple steps with similar properties, use `batchTimelineSteps`:

```tsx
// Good
const steps = batchTimelineSteps(
  ['step1', 'step2', 'step3'],
  [0, 30, 60],
  20,
  'easeOut'
);

// Avoid repetitive step creation
const steps = [
  { id: 'step1', start: 0, duration: 20, easing: 'easeOut' },
  { id: 'step2', start: 30, duration: 20, easing: 'easeOut' },
  { id: 'step3', start: 60, duration: 20, easing: 'easeOut' }
];
```

## Performance Considerations

1. **Stagger Count**: Keep stagger count reasonable (< 100 items) for smooth performance
2. **Timeline Steps**: Limit timeline steps to essential animations (< 20 steps)
3. **Loop Carefully**: Use looping timelines sparingly as they run indefinitely
4. **Range Checks**: Use `useIsInRange` to avoid rendering off-screen elements

## Common Patterns

### Staggered Grid

```tsx
function StaggeredGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
      {items.map((item, index) => {
        const stagger = useStagger(index, {
          count: items.length,
          stagger: 3,
          duration: 20
        });
        
        return (
          <div 
            key={index}
            style={{ 
              opacity: stagger.progress,
              transform: `scale(${stagger.progress})`
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
```

### Multi-Scene Timeline

```tsx
function MultiSceneVideo() {
  const timeline = useTimeline({
    steps: [
      { id: 'scene1', start: 0, duration: 90 },
      { id: 'transition1', start: 90, duration: 15 },
      { id: 'scene2', start: 105, duration: 90 },
      { id: 'transition2', start: 195, duration: 15 },
      { id: 'scene3', start: 210, duration: 90 }
    ]
  });
  
  return (
    <>
      {timeline.currentStep?.id === 'scene1' && <Scene1 />}
      {timeline.currentStep?.id === 'transition1' && <Transition progress={timeline.progress} />}
      {timeline.currentStep?.id === 'scene2' && <Scene2 />}
      {timeline.currentStep?.id === 'transition2' && <Transition progress={timeline.progress} />}
      {timeline.currentStep?.id === 'scene3' && <Scene3 />}
    </>
  );
}
```

### Timed Captions

```tsx
function TimedCaptions() {
  const captions = [
    { text: 'First caption', start: 0, duration: 60 },
    { text: 'Second caption', start: 60, duration: 60 },
    { text: 'Third caption', start: 120, duration: 60 }
  ];
  
  return (
    <>
      {captions.map((caption, index) => {
        const isVisible = useIsInRange(caption.start, caption.duration);
        const progress = useRangeProgress(caption.start, caption.duration);
        
        if (!isVisible) return null;
        
        return (
          <div 
            key={index}
            style={{ 
              opacity: progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1
            }}
          >
            {caption.text}
          </div>
        );
      })}
    </>
  );
}
```

## See Also

- [Core Animations](./CORE_ANIMATIONS.md) - Basic animation utilities
- [Cinematic Effects](./CINEMATIC_EFFECTS.md) - Advanced cinematic effects
- [Animation System README](./README.md) - Overview of the animation system
