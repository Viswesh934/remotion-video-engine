/**
 * Animation System Index
 * 
 * Central export point for all animation utilities
 */

// Core animation hooks and utilities
export {
	useFadeIn,
	useFadeOut,
	useSlideIn,
	useSlideOut,
	useScaleIn,
	useScaleOut,
	useZoom,
	useRotate,
	useBlur,
	useAnimationProgress,
	combineTransforms,
	useDelay,
} from "./core";

// Core animation types
export type {
	AnimationParams,
	SlideDirection,
	SlideParams,
	RotateParams,
	BlurParams,
	ZoomParams,
} from "./core";

// Cinematic effects and transitions
export {
	useKenBurns,
	useParallax,
	useGlitch,
	useTypewriter,
	useWipe,
	useDissolve,
	combineCinematicTransforms,
} from "./cinematic";

// Cinematic effect types
export type {
	CinematicParams,
	KenBurnsParams,
	ParallaxParams,
	GlitchParams,
	TypewriterParams,
	WipeParams,
	DissolveParams,
} from "./cinematic";

// Sequencing utilities
export {
	useStagger,
	useTimeline,
	getActiveStep,
	delayFromSeconds,
	durationFromSeconds,
	framesToSeconds,
	secondsToFrames,
	useCurrentTime,
	useDuration,
	calculateEndFrame,
	useIsInRange,
	useRangeProgress,
	createSequence,
	batchTimelineSteps,
	calculateStaggerStart,
	calculateStaggerDuration,
	calculateOverlap,
	hasOverlap,
} from "./sequencing";

// Sequencing types
export type {
	TimelineStep,
	TimelineConfig,
	TimelineResult,
	StaggerConfig,
	StaggerResult,
} from "./sequencing";
