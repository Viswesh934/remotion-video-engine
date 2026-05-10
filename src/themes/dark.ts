/**
 * Dark Theme
 * 
 * A modern dark theme with high contrast and excellent readability.
 * Ideal for technical content, code demonstrations, and professional presentations.
 */

import type { Theme } from "./types";

export const darkTheme: Theme = {
	id: "dark",
	name: "Dark",
	description: "Modern dark theme with high contrast and professional aesthetics",
	
	colors: {
		// Primary colors
		primary: "#3b82f6", // Blue
		secondary: "#8b5cf6", // Purple
		accent: "#06b6d4", // Cyan
		
		// Base colors
		background: "#0f172a", // Dark slate
		foreground: "#f1f5f9", // Light slate
		muted: "#64748b", // Slate gray
		
		// State colors
		success: "#10b981", // Green
		warning: "#f59e0b", // Amber
		error: "#ef4444", // Red
		info: "#3b82f6", // Blue
		
		// UI colors
		border: "#1e293b", // Darker slate
		surface: "#1e293b", // Surface background
		surfaceHover: "#334155", // Surface hover state
		
		// Code syntax colors
		codeBackground: "#1e293b",
		codeComment: "#64748b",
		codeKeyword: "#c084fc",
		codeString: "#34d399",
		codeFunction: "#60a5fa",
		codeVariable: "#f472b6",
		codeNumber: "#fb923c",
		codeOperator: "#94a3b8",
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
		shadowIntensity: 0.3,
		shadowSm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
		shadowMd: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
		shadowLg: "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)",
		shadowXl: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
		
		// Blur
		blurAmount: 8,
		blurSm: 4,
		blurMd: 8,
		blurLg: 16,
		
		// Opacity
		overlayOpacity: 0.8,
		
		// Glow effects
		glowIntensity: 0.5,
		glowPrimary: "0 0 20px rgba(59, 130, 246, 0.5)",
		glowAccent: "0 0 20px rgba(6, 182, 212, 0.5)",
		
		// Animation
		animationDuration: 300,
		animationDurationFast: 150,
		animationDurationSlow: 500,
	},
	
	metadata: {
		author: "Remotion Video Engine",
		version: "1.0.0",
		tags: ["dark", "modern", "professional", "technical"],
	},
};
