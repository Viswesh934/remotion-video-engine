/**
 * Core Animation Utilities
 * 
 * This module provides base animation functions using only Remotion primitives.
 * All animations use interpolate, spring, useCurrentFrame, and useVideoConfig.
 * 
 * @module animations/core
 */

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { EasingFunction } from "../types";

/**
 * Animation parameters for configuring animation behavior
 */
export interface AnimationParams {
	/** Start frame of the animation */
	start?: number;
	/** Duration of the animation in frames */
	duration: number;
	/** Easing function to apply */
	easing?: EasingFunction;
	/** Additional animation-specific parameters */
	[key: string]: unknown;
}

/**
 * Direction for slide animations
 */
export type SlideDirection = "left" | "right" | "top" | "bottom";

/**
 * Parameters for slide animations
 */
export interface SlideParams extends AnimationParams {
	/** Direction to slide from/to */
	direction?: SlideDirection;
	/** Distance to slide in pixels */
	distance?: number;
}

/**
 * Parameters for rotation animations
 */
export interface RotateParams extends AnimationParams {
	/** Starting rotation in degrees */
	from?: number;
	/** Ending rotation in degrees */
	to?: number;
}

/**
 * Parameters for blur animations
 */
export interface BlurParams extends AnimationParams {
	/** Starting blur amount in pixels */
	from?: number;
	/** Ending blur amount in pixels */
	to?: number;
}

/**
 * Parameters for zoom animations
 */
export interface ZoomParams extends AnimationParams {
	/** Starting scale */
	from?: number;
	/** Ending scale */
	to?: number;
}

/**
 * Convert easing function name to Remotion interpolate extrapolation config
 */
function getEasingConfig(easing: EasingFunction = "easeInOut") {
	switch (easing) {
		case "linear":
			return { easing: (t: number) => t };
		case "easeIn":
			return { easing: (t: number) => t * t };
		case "easeOut":
			return { easing: (t: number) => t * (2 - t) };
		case "easeInOut":
			return { easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) };
		case "easeInCubic":
			return { easing: (t: number) => t * t * t };
		case "easeOutCubic":
			return { easing: (t: number) => (--t) * t * t + 1 };
		case "easeInOutCubic":
			return { easing: (t: number) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1) };
		case "spring":
			// Spring is handled separately, return linear as fallback
			return { easing: (t: number) => t };
		default:
			return { easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) };
	}
}

/**
 * Fade in animation - animates opacity from 0 to 1
 * 
 * @param params - Animation parameters
 * @returns Opacity value (0-1)
 * 
 * @example
 * ```tsx
 * const opacity = useFadeIn({ duration: 30 });
 * return <div style={{ opacity }}>Content</div>;
 * ```
 */
export function useFadeIn(params: AnimationParams): number {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut" } = params;

	if (easing === "spring") {
		return spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	}

	return interpolate(
		frame,
		[start, start + duration],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			...getEasingConfig(easing),
		}
	);
}

/**
 * Fade out animation - animates opacity from 1 to 0
 * 
 * @param params - Animation parameters
 * @returns Opacity value (0-1)
 * 
 * @example
 * ```tsx
 * const opacity = useFadeOut({ start: 60, duration: 30 });
 * return <div style={{ opacity }}>Content</div>;
 * ```
 */
export function useFadeOut(params: AnimationParams): number {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut" } = params;

	if (easing === "spring") {
		return 1 - spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	}

	return interpolate(
		frame,
		[start, start + duration],
		[1, 0],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			...getEasingConfig(easing),
		}
	);
}

/**
 * Slide in animation - animates position from off-screen to final position
 * 
 * @param params - Slide animation parameters
 * @returns Transform translate value
 * 
 * @example
 * ```tsx
 * const transform = useSlideIn({ duration: 30, direction: "left" });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useSlideIn(params: SlideParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", direction = "left", distance = 100 } = params;

	let progress: number;

	if (easing === "spring") {
		progress = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	} else {
		progress = interpolate(
			frame,
			[start, start + duration],
			[0, 1],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	const offset = (1 - progress) * distance;

	switch (direction) {
		case "left":
			return `translateX(-${offset}px)`;
		case "right":
			return `translateX(${offset}px)`;
		case "top":
			return `translateY(-${offset}px)`;
		case "bottom":
			return `translateY(${offset}px)`;
		default:
			return `translateX(-${offset}px)`;
	}
}

/**
 * Slide out animation - animates position from current to off-screen
 * 
 * @param params - Slide animation parameters
 * @returns Transform translate value
 * 
 * @example
 * ```tsx
 * const transform = useSlideOut({ start: 60, duration: 30, direction: "right" });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useSlideOut(params: SlideParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", direction = "left", distance = 100 } = params;

	let progress: number;

	if (easing === "spring") {
		progress = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	} else {
		progress = interpolate(
			frame,
			[start, start + duration],
			[0, 1],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	const offset = progress * distance;

	switch (direction) {
		case "left":
			return `translateX(-${offset}px)`;
		case "right":
			return `translateX(${offset}px)`;
		case "top":
			return `translateY(-${offset}px)`;
		case "bottom":
			return `translateY(${offset}px)`;
		default:
			return `translateX(-${offset}px)`;
	}
}

/**
 * Scale in animation - animates scale from 0 to 1
 * 
 * @param params - Animation parameters
 * @returns Transform scale value
 * 
 * @example
 * ```tsx
 * const transform = useScaleIn({ duration: 30 });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useScaleIn(params: AnimationParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut" } = params;

	let scale: number;

	if (easing === "spring") {
		scale = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	} else {
		scale = interpolate(
			frame,
			[start, start + duration],
			[0, 1],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	return `scale(${scale})`;
}

/**
 * Scale out animation - animates scale from 1 to 0
 * 
 * @param params - Animation parameters
 * @returns Transform scale value
 * 
 * @example
 * ```tsx
 * const transform = useScaleOut({ start: 60, duration: 30 });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useScaleOut(params: AnimationParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut" } = params;

	let scale: number;

	if (easing === "spring") {
		scale = 1 - spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	} else {
		scale = interpolate(
			frame,
			[start, start + duration],
			[1, 0],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	return `scale(${scale})`;
}

/**
 * Zoom animation - animates scale from one value to another
 * 
 * @param params - Zoom animation parameters
 * @returns Transform scale value
 * 
 * @example
 * ```tsx
 * const transform = useZoom({ duration: 60, from: 1, to: 1.5 });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useZoom(params: ZoomParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", from = 1, to = 1.5 } = params;

	let scale: number;

	if (easing === "spring") {
		const progress = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
		scale = from + (to - from) * progress;
	} else {
		scale = interpolate(
			frame,
			[start, start + duration],
			[from, to],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	return `scale(${scale})`;
}

/**
 * Rotate animation - animates rotation from one angle to another
 * 
 * @param params - Rotation animation parameters
 * @returns Transform rotate value
 * 
 * @example
 * ```tsx
 * const transform = useRotate({ duration: 60, from: 0, to: 360 });
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function useRotate(params: RotateParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", from = 0, to = 360 } = params;

	let angle: number;

	if (easing === "spring") {
		const progress = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
		angle = from + (to - from) * progress;
	} else {
		angle = interpolate(
			frame,
			[start, start + duration],
			[from, to],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	return `rotate(${angle}deg)`;
}

/**
 * Blur animation - animates blur filter from one value to another
 * 
 * @param params - Blur animation parameters
 * @returns CSS filter blur value
 * 
 * @example
 * ```tsx
 * const filter = useBlur({ duration: 30, from: 10, to: 0 });
 * return <div style={{ filter }}>Content</div>;
 * ```
 */
export function useBlur(params: BlurParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", from = 10, to = 0 } = params;

	let blurAmount: number;

	if (easing === "spring") {
		const progress = spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
		blurAmount = from + (to - from) * progress;
	} else {
		blurAmount = interpolate(
			frame,
			[start, start + duration],
			[from, to],
			{
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
				...getEasingConfig(easing),
			}
		);
	}

	return `blur(${blurAmount}px)`;
}

/**
 * Animation timing utilities for easing functions
 */

/**
 * Get the current progress of an animation (0-1)
 * 
 * @param start - Start frame
 * @param duration - Duration in frames
 * @param easing - Easing function to apply
 * @returns Progress value (0-1)
 * 
 * @example
 * ```tsx
 * const progress = useAnimationProgress(0, 30, "easeInOut");
 * const customValue = progress * 100; // Use progress for custom animations
 * ```
 */
export function useAnimationProgress(
	start: number,
	duration: number,
	easing: EasingFunction = "linear"
): number {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	if (easing === "spring") {
		return spring({
			frame: frame - start,
			fps,
			config: {
				damping: 200,
			},
		});
	}

	return interpolate(
		frame,
		[start, start + duration],
		[0, 1],
		{
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
			...getEasingConfig(easing),
		}
	);
}

/**
 * Combine multiple transform values into a single transform string
 * 
 * @param transforms - Array of transform strings
 * @returns Combined transform string
 * 
 * @example
 * ```tsx
 * const transform = combineTransforms([
 *   useSlideIn({ duration: 30 }),
 *   useScaleIn({ duration: 30 })
 * ]);
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function combineTransforms(transforms: string[]): string {
	return transforms.filter(Boolean).join(" ");
}

/**
 * Create a delayed animation by offsetting the start frame
 * 
 * @param delayFrames - Number of frames to delay
 * @param animationHook - Animation hook to delay
 * @param params - Animation parameters
 * @returns Result of the animation hook
 * 
 * @example
 * ```tsx
 * const opacity = useDelay(30, useFadeIn, { duration: 30 });
 * return <div style={{ opacity }}>Content</div>;
 * ```
 */
export function useDelay<T extends AnimationParams, R>(
	delayFrames: number,
	animationHook: (params: T) => R,
	params: T
): R {
	const adjustedParams = {
		...params,
		start: (params.start || 0) + delayFrames,
	};
	return animationHook(adjustedParams);
}
