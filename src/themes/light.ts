/**
 * Light Theme
 * 
 * A clean, accessible light theme for high-visibility content.
 * Ideal for educational videos, presentations, and teaching materials.
 */

import type { Theme } from "./types";

export const lightTheme: Theme = {
	id: "light",
	name: "Light",
	description: "Clean light theme with high contrast for educational content",
	
	colors: {
		// Primary colors
		primary: "#0066cc", // Blue
		secondary: "#cc0066", // Magenta
		accent: "#00aa00", // Green
		
		// Base colors
		background: "#ffffff", // White
		foreground: "#000000", // Black
		muted: "#666666", // Medium gray
		
		// State colors
		success: "#00aa00", // Green
		warning: "#ff6600", // Orange
		error: "#cc0000", // Red
		info: "#0066cc", // Blue
		
		// UI colors
		border: "#cccccc", // Light gray
		surface: "#f5f5f5", // Light gray background
		surfaceHover: "#eeeeee", // Surface hover state
		
		// Code syntax colors
		codeBackground: "#f5f5f5",
		codeComment: "#666666",
		codeKeyword: "#0066cc",
		codeString: "#00aa00",
		codeFunction: "#0066cc",
		codeVariable: "#cc0066",
		codeNumber: "#ff6600",
		codeOperator: "#333333",
	},
	
	typography: {
		// Font families
		fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
		headingFontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
		monoFontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
		
		// Font sizes and spacing
		baseFontSize: 16,
		lineHeight: 1.6,
		
		// Font weights
		fontWeightNormal: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		
		// Letter spacing
		letterSpacing: 0,
		headingLetterSpacing: -0.02,
	},
	
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 32,
		"2xl": 48,
		"3xl": 64,
	},
	
	effects: {
		// Border radius
		borderRadius: 8,
		borderRadiusSm: 4,
		borderRadiusLg: 12,
		borderRadiusXl: 16,
		
		// Shadows
		shadowIntensity: 0.1,
		shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
		shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
		shadowXl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
		
		// Blur
		blurAmount: 8,
		blurSm: 4,
		blurMd: 8,
		blurLg: 16,
		
		// Opacity
		overlayOpacity: 0.8,
		
		// Glow effects
		glowIntensity: 0.2,
		glowPrimary: "0 0 20px rgba(0, 102, 204, 0.2)",
		glowAccent: "0 0 20px rgba(0, 170, 0, 0.2)",
		
		// Animation
		animationDuration: 300,
		animationDurationFast: 150,
		animationDurationSlow: 500,
	},
	
	metadata: {
		author: "Remotion Video Engine",
		version: "1.0.0",
		tags: ["light", "educational", "high-contrast", "accessible"],
	},
};
