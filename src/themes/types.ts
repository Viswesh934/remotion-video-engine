/**
 * Theme Type Definitions
 * 
 * This file defines the Theme interface and related types for the theme system.
 * Themes provide consistent visual styling across all components and templates.
 */

/**
 * Color palette for a theme
 */
export interface ColorPalette {
	/** Primary brand color */
	primary: string;
	/** Secondary brand color */
	secondary: string;
	/** Background color */
	background: string;
	/** Foreground/text color */
	foreground: string;
	/** Accent color for highlights */
	accent: string;
	/** Muted/subdued color */
	muted: string;
	/** Success state color */
	success?: string;
	/** Warning state color */
	warning?: string;
	/** Error state color */
	error?: string;
	/** Info state color */
	info?: string;
	/** Border color */
	border?: string;
	/** Additional custom colors */
	[key: string]: string | undefined;
}

/**
 * Typography configuration for a theme
 */
export interface Typography {
	/** Base font family for body text */
	fontFamily: string;
	/** Font family for headings */
	headingFontFamily?: string;
	/** Font family for monospace/code */
	monoFontFamily?: string;
	/** Base font size in pixels */
	baseFontSize: number;
	/** Base line height multiplier */
	lineHeight: number;
	/** Font weight for normal text */
	fontWeightNormal?: number;
	/** Font weight for medium text */
	fontWeightMedium?: number;
	/** Font weight for bold text */
	fontWeightBold?: number;
	/** Letter spacing for body text */
	letterSpacing?: number;
	/** Letter spacing for headings */
	headingLetterSpacing?: number;
}

/**
 * Spacing scale for a theme
 */
export interface Spacing {
	/** Extra small spacing */
	xs: number;
	/** Small spacing */
	sm: number;
	/** Medium spacing */
	md: number;
	/** Large spacing */
	lg: number;
	/** Extra large spacing */
	xl: number;
	/** 2x extra large spacing */
	"2xl"?: number;
	/** 3x extra large spacing */
	"3xl"?: number;
	/** Additional custom spacing values */
	[key: string]: number | undefined;
}

/**
 * Visual effects configuration for a theme
 */
export interface Effects {
	/** Border radius in pixels */
	borderRadius?: number;
	/** Shadow intensity (0-1) */
	shadowIntensity?: number;
	/** Blur amount in pixels */
	blurAmount?: number;
	/** Opacity for overlays (0-1) */
	overlayOpacity?: number;
	/** Glow intensity (0-1) */
	glowIntensity?: number;
	/** Animation duration in milliseconds */
	animationDuration?: number;
	/** Additional custom effects */
	[key: string]: number | string | undefined;
}

/**
 * Complete theme interface
 */
export interface Theme {
	/** Unique theme identifier */
	id: string;
	/** Human-readable theme name */
	name: string;
	/** Theme description */
	description?: string;
	/** Color palette */
	colors: ColorPalette;
	/** Typography settings */
	typography: Typography;
	/** Spacing scale */
	spacing: Spacing;
	/** Visual effects */
	effects?: Effects;
	/** Additional theme metadata */
	metadata?: {
		/** Theme author */
		author?: string;
		/** Theme version */
		version?: string;
		/** Theme tags/categories */
		tags?: string[];
		/** Additional custom metadata */
		[key: string]: unknown;
	};
}

/**
 * Theme context value for React context
 */
export interface ThemeContextValue {
	/** Current active theme */
	theme: Theme;
	/** Function to switch themes */
	setTheme: (themeId: string) => void;
	/** Available themes */
	availableThemes: Theme[];
}
