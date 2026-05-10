/**
 * Retro Theme
 * 
 * An 80s/90s inspired theme with vibrant colors, bold typography, and nostalgic aesthetics.
 * Perfect for tech history content, vintage computing topics, and retro-styled presentations.
 */

import type { Theme } from "./types";

export const retroTheme: Theme = {
	id: "retro",
	name: "Retro",
	description: "80s/90s inspired theme with vibrant colors and nostalgic aesthetics",
	
	colors: {
		// Primary colors - vibrant 80s palette
		primary: "#ff6b9d", // Hot pink
		secondary: "#ffd93d", // Bright yellow
		accent: "#6bcf7f", // Neon green
		
		// Base colors - warm retro tones
		background: "#2d1b4e", // Deep purple
		foreground: "#fef9ef", // Cream white
		muted: "#a78bca", // Muted purple
		
		// State colors - vibrant and bold
		success: "#6bcf7f", // Neon green
		warning: "#ffd93d", // Bright yellow
		error: "#ff6b9d", // Hot pink
		info: "#6ec3f4", // Sky blue
		
		// UI colors
		border: "#5a3d7a", // Medium purple
		surface: "#3d2661", // Lighter purple
		surfaceHover: "#4a3270", // Hover purple
		
		// Code syntax colors - retro terminal style
		codeBackground: "#1a0f2e",
		codeComment: "#a78bca",
		codeKeyword: "#ff6b9d",
		codeString: "#6bcf7f",
		codeFunction: "#ffd93d",
		codeVariable: "#6ec3f4",
		codeNumber: "#ff9f43",
		codeOperator: "#fef9ef",
		
		// Additional retro colors
		retroOrange: "#ff9f43",
		retroCyan: "#00d9ff",
		retroMagenta: "#ff00ff",
		retroLime: "#ccff00",
	},
	
	typography: {
		// Font families - bold and geometric
		fontFamily: "'Press Start 2P', 'Courier New', monospace",
		headingFontFamily: "'Press Start 2P', 'Impact', 'Arial Black', sans-serif",
		monoFontFamily: "'Courier New', 'Courier', monospace",
		
		// Font sizes and spacing
		baseFontSize: 14,
		lineHeight: 1.8,
		
		// Font weights - bold for retro impact
		fontWeightNormal: 400,
		fontWeightMedium: 600,
		fontWeightBold: 900,
		
		// Letter spacing - wider for retro feel
		letterSpacing: 0.05,
		headingLetterSpacing: 0.1,
	},
	
	spacing: {
		xs: 6,
		sm: 12,
		md: 20,
		lg: 32,
		xl: 48,
		"2xl": 64,
		"3xl": 96,
	},
	
	effects: {
		// Border radius - sharp corners for retro aesthetic
		borderRadius: 0,
		borderRadiusSm: 0,
		borderRadiusLg: 2,
		borderRadiusXl: 4,
		
		// Shadows - strong and colorful
		shadowIntensity: 0.8,
		shadowSm: "2px 2px 0 rgba(255, 107, 157, 0.8)",
		shadowMd: "4px 4px 0 rgba(255, 107, 157, 0.8)",
		shadowLg: "8px 8px 0 rgba(255, 107, 157, 0.8)",
		shadowXl: "12px 12px 0 rgba(255, 107, 157, 0.8)",
		
		// Blur - minimal for sharp retro look
		blurAmount: 0,
		blurSm: 0,
		blurMd: 2,
		blurLg: 4,
		
		// Opacity
		overlayOpacity: 0.9,
		
		// Glow effects - vibrant neon glow
		glowIntensity: 1.0,
		glowPrimary: "0 0 30px rgba(255, 107, 157, 1.0), 0 0 60px rgba(255, 107, 157, 0.6)",
		glowAccent: "0 0 30px rgba(107, 207, 127, 1.0), 0 0 60px rgba(107, 207, 127, 0.6)",
		glowSecondary: "0 0 30px rgba(255, 217, 61, 1.0), 0 0 60px rgba(255, 217, 61, 0.6)",
		
		// Animation - snappy and immediate
		animationDuration: 200,
		animationDurationFast: 100,
		animationDurationSlow: 400,
		
		// Retro-specific effects
		scanlineOpacity: 0.1,
		chromaticAberration: 2,
		pixelation: 1,
	},
	
	metadata: {
		author: "Remotion Video Engine",
		version: "1.0.0",
		tags: ["retro", "80s", "90s", "vintage", "nostalgic", "vibrant"],
	},
};
