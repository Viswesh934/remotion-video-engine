/**
 * Video Configuration Schema
 * 
 * This file defines the base types and interfaces for video specifications.
 * These types are used to create JSON-based video configurations that define
 * scenes, timing, content, and rendering parameters.
 */

/**
 * Video format dimensions
 */
export type VideoFormat = 
	| "landscape" // 1920x1080 (16:9)
	| "portrait"  // 1080x1920 (9:16)
	| "square";   // 1080x1080 (1:1)

/**
 * Video quality presets
 */
export type VideoQuality = "draft" | "standard" | "high" | "ultra";

/**
 * Animation easing functions
 */
export type EasingFunction =
	| "linear"
	| "easeIn"
	| "easeOut"
	| "easeInOut"
	| "easeInCubic"
	| "easeOutCubic"
	| "easeInOutCubic"
	| "spring";

/**
 * Transition types between scenes
 */
export type TransitionType =
	| "cut"
	| "fade"
	| "dissolve"
	| "wipe"
	| "slide"
	| "zoom";

/**
 * Base animation configuration
 */
export interface AnimationConfig {
	/** Animation type */
	type: "fadeIn" | "fadeOut" | "slideIn" | "slideOut" | "scaleIn" | "scaleOut" | "zoom" | "rotate" | "blur";
	/** Duration in frames */
	duration: number;
	/** Delay before animation starts (in frames) */
	delay?: number;
	/** Easing function */
	easing?: EasingFunction;
	/** Animation-specific parameters */
	params?: Record<string, unknown>;
}

/**
 * Asset reference for fonts, images, audio, etc.
 */
export interface AssetReference {
	/** Asset type */
	type: "font" | "image" | "audio" | "video";
	/** Path to asset (relative to assets directory) */
	path: string;
	/** Optional asset ID for referencing */
	id?: string;
	/** Optional metadata */
	metadata?: Record<string, unknown>;
}

/**
 * Text content configuration
 */
export interface TextContent {
	/** Text to display */
	text: string;
	/** Font family */
	fontFamily?: string;
	/** Font size in pixels */
	fontSize?: number;
	/** Font weight */
	fontWeight?: number | "normal" | "bold";
	/** Text color (hex or CSS color) */
	color?: string;
	/** Text alignment */
	align?: "left" | "center" | "right";
	/** Line height multiplier */
	lineHeight?: number;
	/** Letter spacing in pixels */
	letterSpacing?: number;
	/** Entrance animation */
	animation?: AnimationConfig;
}

/**
 * Position configuration for elements
 */
export interface Position {
	/** X position (pixels or percentage) */
	x: number | string;
	/** Y position (pixels or percentage) */
	y: number | string;
	/** Width (pixels or percentage) */
	width?: number | string;
	/** Height (pixels or percentage) */
	height?: number | string;
}

/**
 * Scene timing configuration
 */
export interface SceneTiming {
	/** Start time in frames */
	start: number;
	/** Duration in frames */
	duration: number;
	/** Transition to next scene */
	transition?: {
		type: TransitionType;
		duration: number;
	};
}

/**
 * Base scene configuration
 */
export interface SceneConfig {
	/** Unique scene identifier */
	id: string;
	/** Scene type (template-specific) */
	type: string;
	/** Scene timing */
	timing: SceneTiming;
	/** Background color or image */
	background?: string | AssetReference;
	/** Background music or audio */
	audio?: AssetReference;
	/** Scene-specific content */
	content: Record<string, unknown>;
	/** Theme override for this scene */
	theme?: string;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
	/** Theme identifier */
	id: string;
	/** Theme name */
	name: string;
	/** Color palette */
	colors: {
		primary: string;
		secondary: string;
		background: string;
		foreground: string;
		accent: string;
		muted: string;
		[key: string]: string;
	};
	/** Typography settings */
	typography: {
		fontFamily: string;
		headingFontFamily?: string;
		monoFontFamily?: string;
		baseFontSize: number;
		lineHeight: number;
	};
	/** Spacing scale */
	spacing: {
		xs: number;
		sm: number;
		md: number;
		lg: number;
		xl: number;
		[key: string]: number;
	};
	/** Effects and styling */
	effects?: {
		borderRadius?: number;
		shadowIntensity?: number;
		blurAmount?: number;
		[key: string]: unknown;
	};
}

/**
 * Render settings configuration
 */
export interface RenderSettings {
	/** Video format/dimensions */
	format: VideoFormat;
	/** Frame rate (fps) */
	fps: number;
	/** Video quality preset */
	quality: VideoQuality;
	/** Custom width (overrides format) */
	width?: number;
	/** Custom height (overrides format) */
	height?: number;
	/** Codec settings */
	codec?: string;
	/** Audio settings */
	audio?: {
		codec?: string;
		bitrate?: string;
		sampleRate?: number;
	};
}

/**
 * Main video configuration
 */
export interface VideoConfig {
	/** Video metadata */
	metadata: {
		title: string;
		description?: string;
		author?: string;
		version?: string;
		createdAt?: string;
	};
	/** Template to use */
	template: "TechEvolution" | "CodeExplainer" | "Documentary" | "Shorts" | string;
	/** Render settings */
	render: RenderSettings;
	/** Theme configuration or theme ID */
	theme: string | ThemeConfig;
	/** Global assets */
	assets?: AssetReference[];
	/** Scene configurations */
	scenes: SceneConfig[];
	/** Total duration in frames (calculated from scenes) */
	duration?: number;
}

/**
 * Helper function to calculate total video duration from scenes
 */
export function calculateDuration(scenes: SceneConfig[]): number {
	if (scenes.length === 0) return 0;
	
	const lastScene = scenes.reduce((latest, scene) => {
		const sceneEnd = scene.timing.start + scene.timing.duration;
		const latestEnd = latest.timing.start + latest.timing.duration;
		return sceneEnd > latestEnd ? scene : latest;
	});
	
	return lastScene.timing.start + lastScene.timing.duration;
}

/**
 * Helper function to convert time (seconds) to frames
 */
export function timeToFrames(seconds: number, fps: number): number {
	return Math.round(seconds * fps);
}

/**
 * Helper function to convert frames to time (seconds)
 */
export function framesToTime(frames: number, fps: number): number {
	return frames / fps;
}

/**
 * Helper function to get video dimensions from format
 */
export function getVideoDimensions(format: VideoFormat): { width: number; height: number } {
	switch (format) {
		case "landscape":
			return { width: 1920, height: 1080 };
		case "portrait":
			return { width: 1080, height: 1920 };
		case "square":
			return { width: 1080, height: 1080 };
		default:
			return { width: 1920, height: 1080 };
	}
}

/**
 * Helper function to validate video configuration
 */
export function validateVideoConfig(config: VideoConfig): { valid: boolean; errors: string[] } {
	const errors: string[] = [];
	
	// Check required fields
	if (!config.metadata?.title) {
		errors.push("Video title is required");
	}
	
	if (!config.template) {
		errors.push("Template is required");
	}
	
	if (!config.render) {
		errors.push("Render settings are required");
	}
	
	if (!config.scenes || config.scenes.length === 0) {
		errors.push("At least one scene is required");
	}
	
	// Validate scenes
	if (config.scenes) {
		const sceneIds = new Set<string>();
		config.scenes.forEach((scene, index) => {
			if (!scene.id) {
				errors.push(`Scene at index ${index} is missing an ID`);
			} else if (sceneIds.has(scene.id)) {
				errors.push(`Duplicate scene ID: ${scene.id}`);
			} else {
				sceneIds.add(scene.id);
			}
			
			if (!scene.type) {
				errors.push(`Scene ${scene.id || index} is missing a type`);
			}
			
			if (!scene.timing) {
				errors.push(`Scene ${scene.id || index} is missing timing configuration`);
			} else {
				if (scene.timing.start < 0) {
					errors.push(`Scene ${scene.id || index} has negative start time`);
				}
				if (scene.timing.duration <= 0) {
					errors.push(`Scene ${scene.id || index} has invalid duration`);
				}
			}
		});
		
		// Check for overlapping scenes
		const sortedScenes = [...config.scenes].sort((a, b) => a.timing.start - b.timing.start);
		for (let i = 0; i < sortedScenes.length - 1; i++) {
			const currentEnd = sortedScenes[i].timing.start + sortedScenes[i].timing.duration;
			const nextStart = sortedScenes[i + 1].timing.start;
			if (currentEnd > nextStart) {
				errors.push(
					`Scene ${sortedScenes[i].id} overlaps with scene ${sortedScenes[i + 1].id}`
				);
			}
		}
	}
	
	return {
		valid: errors.length === 0,
		errors,
	};
}
