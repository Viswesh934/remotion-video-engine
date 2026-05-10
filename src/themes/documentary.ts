/**
 * Documentary Theme
 * 
 * A clean, professional theme with subtle colors and refined typography.
 * Perfect for educational content, professional presentations, and documentary-style videos.
 */

import type { Theme } from "./types";

export const documentaryTheme: Theme = {
	id: "documentary",
	name: "Documentary",
	description: "Clean, professional theme with subtle colors and refined aesthetics",
	
	colors: {
		// Primary colors - sophisticated and muted
		primary: "#2c5f7c", // Deep teal
		secondary: "#8b7355", // Warm brown
		accent: "#d4a574", // Gold accent
		
		// Base colors - clean and neutral
		background: "#f8f9fa", // Off-white
		foreground: "#1a1a1a", // Near black
		muted: "#6c757d", // Medium gray
		
		// State colors - subtle and professional
		success: "#2d6a4f", // Forest green
		warning: "#b8860b", // Dark goldenrod
		error: "#8b3a3a", // Muted red
		info: "#2c5f7c", // Deep teal
		
		// UI colors
		border: "#dee2e6", // Light gray border
		surface: "#ffffff", // Pure white
		surfaceHover: "#f1f3f5", // Light hover
		
		// Code syntax colors - professional and readable
		codeBackground: "#f5f5f5",
		codeComment: "#6c757d",
		codeKeyword: "#2c5f7c",
		codeString: "#2d6a4f",
		codeFunction: "#8b7355",
		codeVariable: "#495057",
		codeNumber: "#b8860b",
		codeOperator: "#495057",
		
		// Additional documentary colors
		documentaryBeige: "#e8dcc4",
		documentaryNavy: "#1e3a5f",
		documentaryOlive: "#6b7c59",
		documentarySage: "#9caf88",
	},
	
	typography: {
		// Font families - classic and readable
		fontFamily: "'Merriweather', 'Georgia', 'Times New Roman', serif",
		headingFontFamily: "'Lato', 'Helvetica Neue', 'Arial', sans-serif",
		monoFontFamily: "'Source Code Pro', 'Menlo', 'Monaco', monospace",
		
		// Font sizes and spacing
		baseFontSize: 18,
		lineHeight: 1.7,
		
		// Font weights - refined and balanced
		fontWeightNormal: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		
		// Letter spacing - subtle and elegant
		letterSpacing: 0.01,
		headingLetterSpacing: -0.01,
	},
	
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 28,
		xl: 40,
		"2xl": 56,
		"3xl": 80,
	},
	
	effects: {
		// Border radius - subtle and refined
		borderRadius: 4,
		borderRadiusSm: 2,
		borderRadiusLg: 8,
		borderRadiusXl: 12,
		
		// Shadows - soft and natural
		shadowIntensity: 0.15,
		shadowSm: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
		shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
		shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
		shadowXl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
		
		// Blur - gentle and subtle
		blurAmount: 6,
		blurSm: 3,
		blurMd: 6,
		blurLg: 12,
		
		// Opacity
		overlayOpacity: 0.7,
		
		// Glow effects - minimal and refined
		glowIntensity: 0.2,
		glowPrimary: "0 0 15px rgba(44, 95, 124, 0.2)",
		glowAccent: "0 0 15px rgba(212, 165, 116, 0.2)",
		
		// Animation - smooth and elegant
		animationDuration: 500,
		animationDurationFast: 250,
		animationDurationSlow: 800,
		
		// Documentary-specific effects
		vingnette: 0.3,
		filmGrain: 0.05,
		sepia: 0.1,
		contrast: 1.05,
	},
	
	metadata: {
		author: "Remotion Video Engine",
		version: "1.0.0",
		tags: ["documentary", "professional", "clean", "educational", "refined"],
	},
};
