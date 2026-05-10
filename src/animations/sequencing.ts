/**
 * Sequencing Utilities
 * 
 * This module provides timing and sequencing helpers for orchestrating
 * complex animation sequences. These utilities help coordinate multiple
 * animations with precise timing control.
 * 
 * @module animations/sequencing
 */

import { useCurrentFrame, useVideoConfig } from "remotion";
import type { EasingFunction } from "../types";

/**
 * Configuration for a single animation step in a timeline
 */
export interface TimelineStep {
	/** Unique identifier for this step */
	id: string;
	/** Start time relative to timeline start (in frames) */
	start: number;
	/** Duration of this step (in frames) */
	duration: number;
	/** Easing function for this step */
	easing?: EasingFunction;
	/** Custom data for this step */
	data?: Record<string, unknown>;
}

/**
 * Timeline configuration
 */
export interface TimelineConfig {
	/** Array of timeline steps */
	steps: TimelineStep[];
	/** Start frame of the entire timeline */
	start?: number;
	/** Whether to loop the timeline */
	loop?: boolean;
}

/**
 * Result of timeline evaluation
 */
export interface TimelineResult {
	/** Current active step (null if no step is active) */
	currentStep: TimelineStep | null;
	/** Progress of current step (0-1) */
	progress: number;
	/** Index of current step (-1 if no step is active) */
	stepIndex: number;
	/** Overall timeline progress (0-1) */
	overallProgress: number;
	/** Whether timeline has completed */
	isComplete: boolean;
}

/**
 * Stagger configuration for sequential animations
 */
export interface StaggerConfig {
	/** Number of items to stagger */
	count: number;
	/** Delay between each item (in frames) */
	stagger: number;
	/** Start frame for the first item */
	start?: number;
	/** Duration of each item's animation (in frames) */
	duration: number;
	/** Easing function for each item */
	easing?: EasingFunction;
}

/**
 * Result of stagger evaluation for a specific item
 */
export interface StaggerResult {
	/** Progress of this item's animation (0-1) */
	progress: number;
	/** Whether this item's animation has started */
	hasStarted: boolean;
	/** Whether this item's animation has completed */
	isComplete: boolean;
	/** Start frame for this item */
	startFrame: number;
	/** End frame for this item */
	endFrame: number;
}

/**
 * Calculate the start frame for an item in a staggered sequence
 * 
 * @param index - Index of the item (0-based)
 * @param staggerDelay - Delay between items in frames
 * @param baseStart - Base start frame (default: 0)
 * @returns Start frame for the item
 * 
 * @example
 * ```tsx
 * const startFrame = calculateStaggerStart(2, 5, 0); // Returns 10
 * ```
 */
export function calculateStaggerStart(
	index: number,
	staggerDelay: number,
	baseStart: number = 0
): number {
	return baseStart + index * staggerDelay;
}

/**
 * Calculate the total duration of a staggered sequence
 * 
 * @param count - Number of items
 * @param staggerDelay - Delay between items in frames
 * @param itemDuration - Duration of each item's animation in frames
 * @returns Total duration in frames
 * 
 * @example
 * ```tsx
 * const totalDuration = calculateStaggerDuration(5, 10, 30);
 * // Returns 70 (4 * 10 stagger + 30 last item duration)
 * ```
 */
export function calculateStaggerDuration(
	count: number,
	staggerDelay: number,
	itemDuration: number
): number {
	if (count === 0) return 0;
	return (count - 1) * staggerDelay + itemDuration;
}

/**
 * Hook for staggered animations - evaluates animation state for a specific item
 * 
 * Use this hook to create sequential animations where each item starts
 * after a delay from the previous one. Perfect for animating lists,
 * grids, or any collection of elements.
 * 
 * @param index - Index of the item to evaluate
 * @param config - Stagger configuration
 * @returns Stagger result with progress and timing info
 * 
 * @example
 * ```tsx
 * const items = ['Item 1', 'Item 2', 'Item 3'];
 * 
 * function StaggeredList() {
 *   return (
 *     <div>
 *       {items.map((item, index) => (
 *         <StaggeredItem key={index} index={index} text={item} />
 *       ))}
 *     </div>
 *   );
 * }
 * 
 * function StaggeredItem({ index, text }) {
 *   const stagger = useStagger(index, {
 *     count: 3,
 *     stagger: 10,
 *     duration: 30,
 *     easing: 'easeOut'
 *   });
 *   
 *   const opacity = stagger.progress;
 *   const translateY = (1 - stagger.progress) * 50;
 *   
 *   return (
 *     <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
 *       {text}
 *     </div>
 *   );
 * }
 * ```
 */
export function useStagger(index: number, config: StaggerConfig): StaggerResult {
	const frame = useCurrentFrame();
	const { start = 0, stagger, duration } = config;

	const startFrame = calculateStaggerStart(index, stagger, start);
	const endFrame = startFrame + duration;
	const relativeFrame = frame - startFrame;

	const hasStarted = frame >= startFrame;
	const isComplete = frame >= endFrame;

	let progress = 0;
	if (hasStarted && !isComplete) {
		progress = relativeFrame / duration;
	} else if (isComplete) {
		progress = 1;
	}

	// Clamp progress to 0-1
	progress = Math.max(0, Math.min(1, progress));

	return {
		progress,
		hasStarted,
		isComplete,
		startFrame,
		endFrame,
	};
}

/**
 * Hook for timeline-based animations - orchestrates multiple animation steps
 * 
 * Use this hook to create complex multi-step animations with precise timing
 * control. Each step can have its own duration and easing, and you can
 * query which step is currently active.
 * 
 * @param config - Timeline configuration
 * @returns Timeline result with current step and progress
 * 
 * @example
 * ```tsx
 * function ComplexAnimation() {
 *   const timeline = useTimeline({
 *     steps: [
 *       { id: 'fadeIn', start: 0, duration: 30, easing: 'easeIn' },
 *       { id: 'scale', start: 30, duration: 20, easing: 'spring' },
 *       { id: 'rotate', start: 50, duration: 40, easing: 'easeOut' },
 *       { id: 'fadeOut', start: 90, duration: 30, easing: 'easeIn' }
 *     ]
 *   });
 *   
 *   let style = {};
 *   
 *   if (timeline.currentStep?.id === 'fadeIn') {
 *     style.opacity = timeline.progress;
 *   } else if (timeline.currentStep?.id === 'scale') {
 *     style.transform = `scale(${1 + timeline.progress * 0.5})`;
 *   } else if (timeline.currentStep?.id === 'rotate') {
 *     style.transform = `rotate(${timeline.progress * 360}deg)`;
 *   } else if (timeline.currentStep?.id === 'fadeOut') {
 *     style.opacity = 1 - timeline.progress;
 *   }
 *   
 *   return <div style={style}>Animated Content</div>;
 * }
 * ```
 */
export function useTimeline(config: TimelineConfig): TimelineResult {
	const frame = useCurrentFrame();
	const { steps, start = 0, loop = false } = config;

	if (steps.length === 0) {
		return {
			currentStep: null,
			progress: 0,
			stepIndex: -1,
			overallProgress: 0,
			isComplete: true,
		};
	}

	const relativeFrame = frame - start;

	// Calculate total timeline duration
	const totalDuration = steps.reduce((max, step) => {
		const stepEnd = step.start + step.duration;
		return Math.max(max, stepEnd);
	}, 0);

	// Handle looping
	let activeFrame = relativeFrame;
	if (loop && relativeFrame >= totalDuration) {
		activeFrame = relativeFrame % totalDuration;
	}

	// Find the current active step
	let currentStep: TimelineStep | null = null;
	let stepIndex = -1;
	let progress = 0;

	for (let i = 0; i < steps.length; i++) {
		const step = steps[i];
		const stepStart = step.start;
		const stepEnd = step.start + step.duration;

		if (activeFrame >= stepStart && activeFrame < stepEnd) {
			currentStep = step;
			stepIndex = i;
			progress = (activeFrame - stepStart) / step.duration;
			break;
		}
	}

	// Calculate overall progress
	const overallProgress = Math.min(relativeFrame / totalDuration, 1);
	const isComplete = !loop && relativeFrame >= totalDuration;

	return {
		currentStep,
		progress: Math.max(0, Math.min(1, progress)),
		stepIndex,
		overallProgress: Math.max(0, Math.min(1, overallProgress)),
		isComplete,
	};
}

/**
 * Get the active step from a timeline at a specific frame
 * 
 * Utility function to determine which step is active at a given frame
 * without using hooks. Useful for calculations outside of components.
 * 
 * @param frame - Frame number to evaluate
 * @param steps - Array of timeline steps
 * @param start - Start frame of timeline (default: 0)
 * @returns Active step or null if no step is active
 * 
 * @example
 * ```tsx
 * const steps = [
 *   { id: 'step1', start: 0, duration: 30 },
 *   { id: 'step2', start: 30, duration: 30 }
 * ];
 * const activeStep = getActiveStep(45, steps); // Returns step2
 * ```
 */
export function getActiveStep(
	frame: number,
	steps: TimelineStep[],
	start: number = 0
): TimelineStep | null {
	const relativeFrame = frame - start;

	for (const step of steps) {
		const stepStart = step.start;
		const stepEnd = step.start + step.duration;

		if (relativeFrame >= stepStart && relativeFrame < stepEnd) {
			return step;
		}
	}

	return null;
}

/**
 * Calculate delay in frames from seconds
 * 
 * @param seconds - Delay in seconds
 * @param fps - Frames per second (default: 30)
 * @returns Delay in frames
 * 
 * @example
 * ```tsx
 * const delayFrames = delayFromSeconds(1.5, 30); // Returns 45
 * ```
 */
export function delayFromSeconds(seconds: number, fps: number = 30): number {
	return Math.round(seconds * fps);
}

/**
 * Calculate duration in frames from seconds
 * 
 * @param seconds - Duration in seconds
 * @param fps - Frames per second (default: 30)
 * @returns Duration in frames
 * 
 * @example
 * ```tsx
 * const durationFrames = durationFromSeconds(2, 30); // Returns 60
 * ```
 */
export function durationFromSeconds(seconds: number, fps: number = 30): number {
	return Math.round(seconds * fps);
}

/**
 * Convert frames to seconds
 * 
 * @param frames - Number of frames
 * @param fps - Frames per second (default: 30)
 * @returns Time in seconds
 * 
 * @example
 * ```tsx
 * const seconds = framesToSeconds(90, 30); // Returns 3
 * ```
 */
export function framesToSeconds(frames: number, fps: number = 30): number {
	return frames / fps;
}

/**
 * Convert seconds to frames
 * 
 * @param seconds - Time in seconds
 * @param fps - Frames per second (default: 30)
 * @returns Number of frames
 * 
 * @example
 * ```tsx
 * const frames = secondsToFrames(2.5, 30); // Returns 75
 * ```
 */
export function secondsToFrames(seconds: number, fps: number = 30): number {
	return Math.round(seconds * fps);
}

/**
 * Hook to get current time in seconds
 * 
 * @returns Current time in seconds
 * 
 * @example
 * ```tsx
 * const currentTime = useCurrentTime();
 * console.log(`Current time: ${currentTime}s`);
 * ```
 */
export function useCurrentTime(): number {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	return framesToSeconds(frame, fps);
}

/**
 * Hook to get total video duration in seconds
 * 
 * @returns Total duration in seconds
 * 
 * @example
 * ```tsx
 * const totalDuration = useDuration();
 * console.log(`Video duration: ${totalDuration}s`);
 * ```
 */
export function useDuration(): number {
	const { durationInFrames, fps } = useVideoConfig();
	return framesToSeconds(durationInFrames, fps);
}

/**
 * Calculate the end frame for an animation
 * 
 * @param start - Start frame
 * @param duration - Duration in frames
 * @returns End frame
 * 
 * @example
 * ```tsx
 * const endFrame = calculateEndFrame(30, 60); // Returns 90
 * ```
 */
export function calculateEndFrame(start: number, duration: number): number {
	return start + duration;
}

/**
 * Check if current frame is within a time range
 * 
 * @param start - Start frame
 * @param duration - Duration in frames
 * @returns True if current frame is within range
 * 
 * @example
 * ```tsx
 * const isActive = useIsInRange(30, 60);
 * if (isActive) {
 *   // Render something
 * }
 * ```
 */
export function useIsInRange(start: number, duration: number): boolean {
	const frame = useCurrentFrame();
	return frame >= start && frame < start + duration;
}

/**
 * Get progress within a time range (0-1)
 * 
 * @param start - Start frame
 * @param duration - Duration in frames
 * @returns Progress (0-1), clamped to range
 * 
 * @example
 * ```tsx
 * const progress = useRangeProgress(30, 60);
 * const opacity = progress; // Fade in over the range
 * ```
 */
export function useRangeProgress(start: number, duration: number): number {
	const frame = useCurrentFrame();
	const relativeFrame = frame - start;
	const progress = relativeFrame / duration;
	return Math.max(0, Math.min(1, progress));
}

/**
 * Create a sequence of timing values for multiple items
 * 
 * Utility function to generate an array of start times for sequential animations.
 * Useful for pre-calculating timing values.
 * 
 * @param count - Number of items
 * @param staggerDelay - Delay between items in frames
 * @param baseStart - Base start frame (default: 0)
 * @returns Array of start frames
 * 
 * @example
 * ```tsx
 * const startTimes = createSequence(5, 10, 0);
 * // Returns [0, 10, 20, 30, 40]
 * 
 * startTimes.forEach((start, index) => {
 *   console.log(`Item ${index} starts at frame ${start}`);
 * });
 * ```
 */
export function createSequence(
	count: number,
	staggerDelay: number,
	baseStart: number = 0
): number[] {
	return Array.from({ length: count }, (_, index) =>
		calculateStaggerStart(index, staggerDelay, baseStart)
	);
}

/**
 * Batch multiple timeline steps with the same duration and easing
 * 
 * Helper function to create multiple timeline steps quickly when they
 * share common properties.
 * 
 * @param ids - Array of step IDs
 * @param startFrames - Array of start frames (must match ids length)
 * @param duration - Common duration for all steps
 * @param easing - Common easing for all steps
 * @returns Array of timeline steps
 * 
 * @example
 * ```tsx
 * const steps = batchTimelineSteps(
 *   ['fadeIn', 'slideIn', 'scaleIn'],
 *   [0, 30, 60],
 *   30,
 *   'easeOut'
 * );
 * 
 * const timeline = useTimeline({ steps });
 * ```
 */
export function batchTimelineSteps(
	ids: string[],
	startFrames: number[],
	duration: number,
	easing?: EasingFunction
): TimelineStep[] {
	if (ids.length !== startFrames.length) {
		throw new Error("ids and startFrames arrays must have the same length");
	}

	return ids.map((id, index) => ({
		id,
		start: startFrames[index],
		duration,
		easing,
	}));
}

/**
 * Calculate overlap between two time ranges
 * 
 * @param start1 - Start frame of first range
 * @param duration1 - Duration of first range
 * @param start2 - Start frame of second range
 * @param duration2 - Duration of second range
 * @returns Overlap duration in frames (0 if no overlap)
 * 
 * @example
 * ```tsx
 * const overlap = calculateOverlap(10, 30, 25, 20);
 * // Returns 15 (frames 25-40 overlap with frames 10-40)
 * ```
 */
export function calculateOverlap(
	start1: number,
	duration1: number,
	start2: number,
	duration2: number
): number {
	const end1 = start1 + duration1;
	const end2 = start2 + duration2;

	const overlapStart = Math.max(start1, start2);
	const overlapEnd = Math.min(end1, end2);

	return Math.max(0, overlapEnd - overlapStart);
}

/**
 * Check if two time ranges overlap
 * 
 * @param start1 - Start frame of first range
 * @param duration1 - Duration of first range
 * @param start2 - Start frame of second range
 * @param duration2 - Duration of second range
 * @returns True if ranges overlap
 * 
 * @example
 * ```tsx
 * const overlaps = hasOverlap(10, 30, 25, 20); // Returns true
 * const noOverlap = hasOverlap(10, 20, 40, 20); // Returns false
 * ```
 */
export function hasOverlap(
	start1: number,
	duration1: number,
	start2: number,
	duration2: number
): boolean {
	return calculateOverlap(start1, duration1, start2, duration2) > 0;
}
