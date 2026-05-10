/**
 * Template Props Interfaces
 * 
 * This file defines TypeScript interfaces for all video template props.
 * Templates are high-level video patterns that compose multiple components and scenes.
 */

import type { ReactNode } from "react";
import type { AssetReference, SceneConfig, ThemeConfig } from "./video-config";

/**
 * Base props shared by all templates
 */
export interface BaseTemplateProps {
	/** Template configuration */
	config: SceneConfig[];
	/** Theme configuration or theme ID */
	theme?: string | ThemeConfig;
	/** Global assets */
	assets?: AssetReference[];
	/** Frame rate */
	fps?: number;
}

/**
 * TechEvolution template configuration
 * 
 * Template for showcasing technology evolution over time with timeline visualization,
 * before/after comparisons, and chronological progression.
 */
export interface TechEvolutionProps extends BaseTemplateProps {
	/** Intro scene configuration */
	intro: {
		/** Main title */
		title: string;
		/** Subtitle */
		subtitle?: string;
		/** Background image or color */
		background?: string | AssetReference;
		/** Duration in frames */
		duration: number;
	};
	/** Timeline scene configuration */
	timeline: {
		/** Timeline title */
		title?: string;
		/** Timeline events */
		events: Array<{
			/** Event year or date */
			date: string;
			/** Event label */
			label: string;
			/** Event description */
			description?: string;
			/** Event icon or image */
			icon?: ReactNode | AssetReference;
		}>;
		/** Timeline orientation */
		orientation?: "horizontal" | "vertical";
		/** Duration in frames */
		duration: number;
	};
	/** Comparison scenes (before/after, old/new) */
	comparisons?: Array<{
		/** Comparison title */
		title: string;
		/** Before/old content */
		before: {
			/** Label */
			label: string;
			/** Content (code, image, or component) */
			content: ReactNode | string | AssetReference;
		};
		/** After/new content */
		after: {
			/** Label */
			label: string;
			/** Content (code, image, or component) */
			content: ReactNode | string | AssetReference;
		};
		/** Duration in frames */
		duration: number;
	}>;
	/** Outro scene configuration */
	outro: {
		/** Closing message */
		message: string;
		/** Call-to-action text */
		callToAction?: string;
		/** Background image or color */
		background?: string | AssetReference;
		/** Duration in frames */
		duration: number;
	};
	/** Background music */
	backgroundMusic?: AssetReference;
}

/**
 * CodeExplainer template configuration
 * 
 * Template for explaining code concepts with step-by-step walkthroughs,
 * visualizations, and synchronized explanations.
 */
export interface CodeExplainerProps extends BaseTemplateProps {
	/** Intro scene configuration */
	intro: {
		/** Topic title */
		title: string;
		/** Topic description */
		description?: string;
		/** Duration in frames */
		duration: number;
	};
	/** Code walkthrough scenes */
	walkthrough: Array<{
		/** Step title */
		title: string;
		/** Code to display */
		code: string;
		/** Programming language */
		language: string;
		/** Lines to highlight */
		highlightLines?: number[];
		/** Explanation text */
		explanation: string;
		/** Terminal commands (optional) */
		terminalCommands?: Array<{
			command: string;
			output?: string;
		}>;
		/** Duration in frames */
		duration: number;
	}>;
	/** Visualization scenes */
	visualizations?: Array<{
		/** Visualization title */
		title: string;
		/** Diagram or chart configuration */
		diagram?: {
			nodes: Array<{
				id: string;
				label: string;
				x: number;
				y: number;
			}>;
			connections?: Array<{
				from: string;
				to: string;
				label?: string;
			}>;
		};
		/** Explanation text */
		explanation?: string;
		/** Duration in frames */
		duration: number;
	}>;
	/** Summary scene configuration */
	summary: {
		/** Summary title */
		title: string;
		/** Key takeaways */
		takeaways: string[];
		/** Duration in frames */
		duration: number;
	};
	/** Background music */
	backgroundMusic?: AssetReference;
	/** Voiceover timing */
	voiceoverTimings?: Array<{
		/** Scene index */
		sceneIndex: number;
		/** Start time in frames */
		start: number;
		/** Duration in frames */
		duration: number;
		/** Voiceover audio file */
		audio: AssetReference;
	}>;
}

/**
 * Documentary template configuration
 * 
 * Template for creating professional documentary-style videos with narrative content,
 * text overlays, and cinematic effects.
 */
export interface DocumentaryProps extends BaseTemplateProps {
	/** Opening scene configuration */
	opening: {
		/** Title card text */
		title: string;
		/** Subtitle */
		subtitle?: string;
		/** Background image or video */
		background?: AssetReference;
		/** Duration in frames */
		duration: number;
	};
	/** Narrative scenes */
	narrative: Array<{
		/** Scene title (optional) */
		title?: string;
		/** Narrative text */
		text: string;
		/** Background image or video */
		background?: AssetReference;
		/** Text position */
		textPosition?: "top" | "center" | "bottom" | "left" | "right";
		/** Ken Burns effect */
		kenBurns?: {
			/** Enable effect */
			enabled: boolean;
			/** Zoom direction */
			direction?: "in" | "out";
			/** Pan direction */
			pan?: "left" | "right" | "up" | "down";
		};
		/** Duration in frames */
		duration: number;
	}>;
	/** Interview/quote scenes */
	interviews?: Array<{
		/** Quote text */
		quote: string;
		/** Speaker name */
		speaker: string;
		/** Speaker title/role */
		title?: string;
		/** Speaker image */
		image?: AssetReference;
		/** Background */
		background?: AssetReference;
		/** Duration in frames */
		duration: number;
	}>;
	/** Closing scene configuration */
	closing: {
		/** Closing message */
		message?: string;
		/** Credits */
		credits?: Array<{
			/** Credit role */
			role: string;
			/** Credit name */
			name: string;
		}>;
		/** Background */
		background?: AssetReference;
		/** Duration in frames */
		duration: number;
	};
	/** Background music */
	backgroundMusic?: AssetReference;
	/** Ambient sound effects */
	ambientSound?: AssetReference;
	/** Subtitle/caption configuration */
	subtitles?: Array<{
		/** Start time in frames */
		start: number;
		/** End time in frames */
		end: number;
		/** Subtitle text */
		text: string;
	}>;
}

/**
 * Shorts template configuration
 * 
 * Template for creating short-form vertical videos optimized for social media
 * (TikTok, Instagram Reels, YouTube Shorts).
 */
export interface ShortsProps extends BaseTemplateProps {
	/** Hook scene (first 3 seconds) */
	hook: {
		/** Hook text */
		text: string;
		/** Hook visual (image, video, or component) */
		visual?: ReactNode | AssetReference;
		/** Text animation effect */
		textEffect?: "fadeIn" | "slideIn" | "scaleIn" | "glitch" | "typewriter";
		/** Duration in frames */
		duration: number;
	};
	/** Main content scene */
	content: {
		/** Content type */
		type: "code" | "text" | "visualization" | "comparison" | "list";
		/** Content data */
		data: {
			/** For code type */
			code?: string;
			language?: string;
			/** For text type */
			text?: string;
			/** For visualization type */
			diagram?: {
				nodes: Array<{ id: string; label: string; x: number; y: number }>;
				connections?: Array<{ from: string; to: string }>;
			};
			/** For comparison type */
			comparison?: {
				before: { label: string; content: ReactNode | string };
				after: { label: string; content: ReactNode | string };
			};
			/** For list type */
			items?: string[];
		};
		/** Background */
		background?: string | AssetReference;
		/** Duration in frames */
		duration: number;
	};
	/** Call-to-action scene (final 3 seconds) */
	callToAction: {
		/** CTA text */
		text: string;
		/** CTA button text */
		buttonText?: string;
		/** CTA icon */
		icon?: ReactNode;
		/** Duration in frames */
		duration: number;
	};
	/** Trending audio/music */
	audio?: AssetReference;
	/** Text overlay configuration */
	textOverlays?: Array<{
		/** Overlay text */
		text: string;
		/** Start time in frames */
		start: number;
		/** End time in frames */
		end: number;
		/** Position */
		position?: "top" | "center" | "bottom";
		/** Font size (large for mobile) */
		fontSize?: number;
		/** Animation effect */
		effect?: "fadeIn" | "slideIn" | "bounce" | "pulse";
	}>;
	/** Pacing configuration */
	pacing?: {
		/** Transition speed */
		transitionSpeed?: "fast" | "normal" | "slow";
		/** Text display duration multiplier */
		textDurationMultiplier?: number;
	};
}
