/**
 * Cinematic Effects and Transitions
 * 
 * This module provides advanced cinematic effects and scene transitions
 * using only Remotion primitives. These effects are designed for professional
 * video production with smooth, high-quality animations.
 * 
 * @module animations/cinematic
 */

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import type { EasingFunction } from "../types";

/**
 * Base parameters for cinematic effects
 */
export interface CinematicParams {
	/** Start frame of the effect */
	start?: number;
	/** Duration of the effect in frames */
	duration: number;
	/** Easing function to apply */
	easing?: EasingFunction;
}

/**
 * Parameters for Ken Burns effect
 */
export interface KenBurnsParams extends CinematicParams {
	/** Starting scale (default: 1) */
	fromScale?: number;
	/** Ending scale (default: 1.2) */
	toScale?: number;
	/** Starting X position in percentage (default: 0) */
	fromX?: number;
	/** Ending X position in percentage (default: 10) */
	toX?: number;
	/** Starting Y position in percentage (default: 0) */
	fromY?: number;
	/** Ending Y position in percentage (default: 10) */
	toY?: number;
}

/**
 * Parameters for parallax effect
 */
export interface ParallaxParams extends CinematicParams {
	/** Parallax intensity/speed multiplier (default: 1) */
	intensity?: number;
	/** Direction of parallax movement */
	direction?: "horizontal" | "vertical" | "both";
}

/**
 * Parameters for glitch effect
 */
export interface GlitchParams extends CinematicParams {
	/** Intensity of the glitch effect (0-1, default: 0.5) */
	intensity?: number;
	/** Frequency of glitch occurrences (default: 5) */
	frequency?: number;
}

/**
 * Parameters for typewriter effect
 */
export interface TypewriterParams extends CinematicParams {
	/** Text to animate */
	text: string;
	/** Characters per frame (default: 1) */
	speed?: number;
	/** Show cursor (default: true) */
	showCursor?: boolean;
}

/**
 * Parameters for wipe transition
 */
export interface WipeParams extends CinematicParams {
	/** Direction of wipe */
	direction?: "left" | "right" | "top" | "bottom";
}

/**
 * Parameters for dissolve transition
 */
export interface DissolveParams extends CinematicParams {
	/** Dissolve pattern intensity (default: 1) */
	intensity?: number;
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
			return { easing: (t: number) => t };
		default:
			return { easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t) };
	}
}

/**
 * Ken Burns effect - slow zoom and pan for cinematic feel
 * 
 * Creates a slow, smooth zoom and pan effect commonly used in documentaries
 * to add motion to static images. The effect gradually scales and translates
 * the content over time.
 * 
 * @param params - Ken Burns effect parameters
 * @returns Object with transform string and current scale
 * 
 * @example
 * ```tsx
 * const { transform, scale } = useKenBurns({
 *   duration: 300,
 *   fromScale: 1,
 *   toScale: 1.3,
 *   fromX: 0,
 *   toX: -5,
 *   fromY: 0,
 *   toY: -5
 * });
 * return <img style={{ transform }} src="image.jpg" />;
 * ```
 */
export function useKenBurns(params: KenBurnsParams): { transform: string; scale: number } {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const {
		start = 0,
		duration,
		easing = "linear",
		fromScale = 1,
		toScale = 1.2,
		fromX = 0,
		toX = 10,
		fromY = 0,
		toY = 10,
	} = params;

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

	const scale = fromScale + (toScale - fromScale) * progress;
	const x = fromX + (toX - fromX) * progress;
	const y = fromY + (toY - fromY) * progress;

	const transform = `scale(${scale}) translate(${x}%, ${y}%)`;

	return { transform, scale };
}

/**
 * Parallax effect - layered motion for depth
 * 
 * Creates a parallax scrolling effect where elements move at different speeds
 * based on their depth layer. Use different intensity values for different
 * layers to create a sense of depth.
 * 
 * @param params - Parallax effect parameters
 * @returns Transform string for parallax movement
 * 
 * @example
 * ```tsx
 * // Background layer (slower)
 * const bgTransform = useParallax({ duration: 300, intensity: 0.3 });
 * 
 * // Foreground layer (faster)
 * const fgTransform = useParallax({ duration: 300, intensity: 1.5 });
 * 
 * return (
 *   <>
 *     <div style={{ transform: bgTransform }}>Background</div>
 *     <div style={{ transform: fgTransform }}>Foreground</div>
 *   </>
 * );
 * ```
 */
export function useParallax(params: ParallaxParams): string {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const {
		start = 0,
		duration,
		easing = "linear",
		intensity = 1,
		direction = "vertical",
	} = params;

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

	const movement = progress * 100 * intensity;

	switch (direction) {
		case "horizontal":
			return `translateX(${movement}px)`;
		case "vertical":
			return `translateY(${movement}px)`;
		case "both":
			return `translate(${movement}px, ${movement}px)`;
		default:
			return `translateY(${movement}px)`;
	}
}

/**
 * Glitch effect - digital distortion for tech aesthetics
 * 
 * Creates a glitch/distortion effect with random offsets and color shifts.
 * The effect uses pseudo-random values based on frame number to create
 * consistent but chaotic-looking glitches.
 * 
 * @param params - Glitch effect parameters
 * @returns Object with transform, filter, and opacity values
 * 
 * @example
 * ```tsx
 * const glitch = useGlitch({ duration: 60, intensity: 0.8, frequency: 10 });
 * return (
 *   <div style={{
 *     transform: glitch.transform,
 *     filter: glitch.filter,
 *     opacity: glitch.opacity
 *   }}>
 *     Glitchy Content
 *   </div>
 * );
 * ```
 */
export function useGlitch(params: GlitchParams): {
	transform: string;
	filter: string;
	opacity: number;
} {
	const frame = useCurrentFrame();
	const { start = 0, duration, intensity = 0.5, frequency = 5 } = params;

	const relativeFrame = frame - start;

	// Only apply glitch within the duration
	if (relativeFrame < 0 || relativeFrame > duration) {
		return {
			transform: "translate(0, 0)",
			filter: "none",
			opacity: 1,
		};
	}

	// Pseudo-random function based on frame number
	const random = (seed: number) => {
		const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
		return x - Math.floor(x);
	};

	// Determine if glitch should be active this frame
	const glitchActive = random(relativeFrame) < (frequency / 100);

	if (!glitchActive) {
		return {
			transform: "translate(0, 0)",
			filter: "none",
			opacity: 1,
		};
	}

	// Generate glitch offsets
	const offsetX = (random(relativeFrame * 2) - 0.5) * 20 * intensity;
	const offsetY = (random(relativeFrame * 3) - 0.5) * 10 * intensity;

	// Generate color shift
	const hueRotate = (random(relativeFrame * 4) - 0.5) * 180 * intensity;
	const saturate = 1 + (random(relativeFrame * 5) - 0.5) * intensity;

	// Occasional opacity flicker
	const opacity = 1 - (random(relativeFrame * 6) * 0.3 * intensity);

	return {
		transform: `translate(${offsetX}px, ${offsetY}px)`,
		filter: `hue-rotate(${hueRotate}deg) saturate(${saturate})`,
		opacity,
	};
}

/**
 * Typewriter effect - character-by-character text reveal
 * 
 * Animates text appearing character by character, like typing on a typewriter.
 * Optionally shows a blinking cursor at the end of the visible text.
 * 
 * @param params - Typewriter effect parameters
 * @returns Object with visible text and cursor visibility
 * 
 * @example
 * ```tsx
 * const { visibleText, showCursor } = useTypewriter({
 *   text: "Hello, World!",
 *   duration: 60,
 *   speed: 1,
 *   showCursor: true
 * });
 * return (
 *   <div>
 *     {visibleText}
 *     {showCursor && <span className="cursor">|</span>}
 *   </div>
 * );
 * ```
 */
export function useTypewriter(params: TypewriterParams): {
	visibleText: string;
	showCursor: boolean;
	progress: number;
} {
	const frame = useCurrentFrame();
	const { start = 0, text, speed = 1, showCursor = true } = params;

	const relativeFrame = frame - start;

	// Calculate how many characters should be visible
	const totalChars = text.length;
	const charsPerFrame = speed;
	const visibleChars = Math.min(
		Math.floor(relativeFrame * charsPerFrame),
		totalChars
	);

	// Clamp to valid range
	const clampedChars = Math.max(0, Math.min(visibleChars, totalChars));
	const visibleText = text.substring(0, clampedChars);

	// Cursor blinks every 15 frames (0.5 seconds at 30fps)
	const cursorVisible = showCursor && Math.floor(frame / 15) % 2 === 0;

	// Progress (0-1)
	const progress = Math.min(clampedChars / totalChars, 1);

	return {
		visibleText,
		showCursor: cursorVisible && progress < 1,
		progress,
	};
}

/**
 * Wipe transition - directional reveal/hide
 * 
 * Creates a wipe transition that reveals or hides content by moving a mask
 * across the screen in the specified direction. Use this for scene transitions.
 * 
 * @param params - Wipe transition parameters
 * @returns Object with clip-path CSS value
 * 
 * @example
 * ```tsx
 * const wipe = useWipe({ duration: 30, direction: "left" });
 * return <div style={{ clipPath: wipe.clipPath }}>Content</div>;
 * ```
 */
export function useWipe(params: WipeParams): { clipPath: string; progress: number } {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", direction = "left" } = params;

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

	const percentage = progress * 100;

	let clipPath: string;

	switch (direction) {
		case "left":
			clipPath = `inset(0 ${100 - percentage}% 0 0)`;
			break;
		case "right":
			clipPath = `inset(0 0 0 ${100 - percentage}%)`;
			break;
		case "top":
			clipPath = `inset(0 0 ${100 - percentage}% 0)`;
			break;
		case "bottom":
			clipPath = `inset(${100 - percentage}% 0 0 0)`;
			break;
		default:
			clipPath = `inset(0 ${100 - percentage}% 0 0)`;
	}

	return { clipPath, progress };
}

/**
 * Dissolve transition - gradual opacity-based transition
 * 
 * Creates a smooth dissolve/crossfade transition between scenes or elements.
 * This is a classic transition effect that gradually changes opacity.
 * 
 * @param params - Dissolve transition parameters
 * @returns Object with opacity values for outgoing and incoming content
 * 
 * @example
 * ```tsx
 * const dissolve = useDissolve({ duration: 30 });
 * return (
 *   <>
 *     <div style={{ opacity: dissolve.outgoing }}>Old Content</div>
 *     <div style={{ opacity: dissolve.incoming }}>New Content</div>
 *   </>
 * );
 * ```
 */
export function useDissolve(params: DissolveParams): {
	outgoing: number;
	incoming: number;
	progress: number;
} {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const { start = 0, duration, easing = "easeInOut", intensity = 1 } = params;

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

	// Apply intensity to make the transition more or less abrupt
	const adjustedProgress = Math.pow(progress, 1 / intensity);

	return {
		outgoing: 1 - adjustedProgress,
		incoming: adjustedProgress,
		progress,
	};
}

/**
 * Combine multiple cinematic effects
 * 
 * Helper function to combine multiple transform values from different effects.
 * 
 * @param transforms - Array of transform strings
 * @returns Combined transform string
 * 
 * @example
 * ```tsx
 * const kenBurns = useKenBurns({ duration: 300 });
 * const parallax = useParallax({ duration: 300, intensity: 0.5 });
 * const transform = combineCinematicTransforms([kenBurns.transform, parallax]);
 * return <div style={{ transform }}>Content</div>;
 * ```
 */
export function combineCinematicTransforms(transforms: string[]): string {
	return transforms.filter(Boolean).join(" ");
}
