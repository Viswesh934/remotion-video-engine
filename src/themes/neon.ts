/**
 * Neon Theme
 * 
 * A cyberpunk-inspired theme with electric colors, high contrast, and futuristic aesthetics.
 * Perfect for tech-forward content, cybersecurity topics, and modern digital presentations.
 */

import type { Theme } from "./types";

export const neonTheme: Theme = {
	id: "neon",
	name: "Neon",
	description: "Cyberpunk-inspired theme with electric colors and futuristic aesthetics",
	
	colors: {
		// Primary colors - electric cyberpunk palette
		primary: "#00ffff", // Cyan neon
		secondary: "#ff00ff", // Magenta neon
		accent: "#00ff41", // Matrix green
		
		// Base colors - dark cyberpunk atmosphere
		background: "#0a0e27", // Deep space blue
		foreground: "#e0f7ff", // Electric white
		muted: "#4a5568", // Steel gray
		
		// State colors - vibrant neon indicators
		success: "#00ff41", // Matrix green
		warning: "#ffff00", // Electric yellow
		error: "#ff0055", // Hot pink
		info: "#00ffff", // Cyan neon
		
		// UI colors
		border: "#1a1f3a", // Dark blue border
		surface: "#0f1629", // Surface background
		surfaceHover: "#1a2332", // Surface hover state
		
		// Code syntax colors - cyberpunk terminal
		codeBackground: "#050814",
		codeComment: "#4a5568",
		codeKeyword: "#ff00ff",
		codeString: "#00ff41",
		codeFunction: "#00ffff",
		codeVariable: "#ff0099",
		codeNumber: "#ffff00",
		codeOperator: "#00ccff",
		
		// Additional neon colors
		neonPurple: "#b026ff",
		neonOrange: "#ff6600",
		neonBlue: "#0099ff",
		neonPink: "#ff0099",
		neonYellow: "#ffff00",
		neonLime: "#ccff00",
	},
	
	typography: {
		// Font families - futuristic and technical
		fontFamily: "'Rajdhani', 'Orbitron', 'Roboto', sans-serif",
		headingFontFamily: "'Orbitron', 'Rajdhani', 'Arial', sans-serif",
		monoFontFamily: "'Share Tech Mono', 'Roboto Mono', 'Courier New', monospace",
		
		// Font sizes and spacing
		baseFontSize: 16,
		lineHeight: 1.5,
		
		// Font weights - sharp and defined
		fontWeightNormal: 400,
		fontWeightMedium: 600,
		fontWeightBold: 800,
		
		// Letter spacing - wide for futuristic feel
		letterSpacing: 0.08,
		headingLetterSpacing: 0.15,
	},
	
	spacing: {
		xs: 4,
		sm: 8,
		md: 16,
		lg: 24,
		xl: 40,
		"2xl": 56,
		"3xl": 80,
	},
	
	effects: {
		// Border radius - minimal for sharp cyberpunk edges
		borderRadius: 2,
		borderRadiusSm: 1,
		borderRadiusLg: 4,
		borderRadiusXl: 6,
		
		// Shadows - intense neon glow shadows
		shadowIntensity: 1.0,
		shadowSm: "0 0 10px rgba(0, 255, 255, 0.8)",
		shadowMd: "0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)",
		shadowLg: "0 0 30px rgba(0, 255, 255, 1.0), 0 0 60px rgba(0, 255, 255, 0.6), 0 0 90px rgba(0, 255, 255, 0.3)",
		shadowXl: "0 0 40px rgba(0, 255, 255, 1.0), 0 0 80px rgba(0, 255, 255, 0.8), 0 0 120px rgba(0, 255, 255, 0.5)",
		
		// Blur - subtle for depth
		blurAmount: 12,
		blurSm: 4,
		blurMd: 12,
		blurLg: 24,
		
		// Opacity
		overlayOpacity: 0.85,
		
		// Glow effects - intense neon glow
		glowIntensity: 1.5,
		glowPrimary: "0 0 20px rgba(0, 255, 255, 1.0), 0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.5), 0 0 80px rgba(0, 255, 255, 0.3)",
		glowAccent: "0 0 20px rgba(0, 255, 65, 1.0), 0 0 40px rgba(0, 255, 65, 0.8), 0 0 60px rgba(0, 255, 65, 0.5), 0 0 80px rgba(0, 255, 65, 0.3)",
		glowSecondary: "0 0 20px rgba(255, 0, 255, 1.0), 0 0 40px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.5), 0 0 80px rgba(255, 0, 255, 0.3)",
		
		// Animation - smooth and fluid
		animationDuration: 400,
		animationDurationFast: 200,
		animationDurationSlow: 600,
		
		// Neon-specific effects
		flickerIntensity: 0.15,
		scanlineSpeed: 2,
		glitchIntensity: 0.05,
		hologramOpacity: 0.3,
	},
	
	metadata: {
		author: "Remotion Video Engine",
		version: "1.0.0",
		tags: ["neon", "cyberpunk", "futuristic", "electric", "high-tech"],
	},
};
