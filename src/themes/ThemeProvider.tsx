/**
 * ThemeProvider Component
 * 
 * Provides theme context to all child components.
 * Manages theme state and allows theme switching.
 */

import React, { createContext, useMemo, useState, type ReactNode } from "react";
import type { Theme, ThemeContextValue } from "./types";
import { darkTheme } from "./dark";

/**
 * Theme context for accessing theme throughout the component tree
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Props for ThemeProvider component
 */
export interface ThemeProviderProps {
	/** Child components */
	children: ReactNode;
	/** Initial theme (defaults to dark theme) */
	initialTheme?: Theme;
	/** Available themes for switching */
	themes?: Theme[];
}

/**
 * ThemeProvider component
 * 
 * Wraps the application and provides theme context to all child components.
 * Supports theme switching and provides access to theme values.
 * 
 * @example
 * ```tsx
 * import { ThemeProvider } from './themes/ThemeProvider';
 * import { darkTheme } from './themes/dark';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider initialTheme={darkTheme}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
	children,
	initialTheme = darkTheme,
	themes = [darkTheme],
}) => {
	const [currentTheme, setCurrentTheme] = useState<Theme>(initialTheme);
	
	/**
	 * Memoized context value to prevent unnecessary re-renders
	 */
	const contextValue = useMemo<ThemeContextValue>(() => {
		/**
		 * Switch to a different theme by ID
		 */
		const setTheme = (themeId: string) => {
			const theme = themes.find((t) => t.id === themeId);
			if (theme) {
				setCurrentTheme(theme);
			} else {
				console.warn(`Theme with id "${themeId}" not found. Available themes:`, themes.map(t => t.id));
			}
		};
		
		return {
			theme: currentTheme,
			setTheme,
			availableThemes: themes,
		};
	}, [currentTheme, themes]);
	
	/**
	 * Apply theme CSS variables to the root element
	 * This allows components to use CSS variables for theming
	 */
	const themeStyles: React.CSSProperties = useMemo(() => {
		const { colors, typography, spacing, effects } = currentTheme;
		
		return {
			// Color variables
			"--color-primary": colors.primary,
			"--color-secondary": colors.secondary,
			"--color-accent": colors.accent,
			"--color-background": colors.background,
			"--color-foreground": colors.foreground,
			"--color-muted": colors.muted,
			"--color-success": colors.success || colors.primary,
			"--color-warning": colors.warning || colors.accent,
			"--color-error": colors.error || colors.secondary,
			"--color-info": colors.info || colors.primary,
			"--color-border": colors.border || colors.muted,
			
			// Typography variables
			"--font-family": typography.fontFamily,
			"--font-family-heading": typography.headingFontFamily || typography.fontFamily,
			"--font-family-mono": typography.monoFontFamily || "monospace",
			"--font-size-base": `${typography.baseFontSize}px`,
			"--line-height": typography.lineHeight,
			"--font-weight-normal": typography.fontWeightNormal || 400,
			"--font-weight-medium": typography.fontWeightMedium || 500,
			"--font-weight-bold": typography.fontWeightBold || 700,
			"--letter-spacing": `${typography.letterSpacing || 0}em`,
			"--letter-spacing-heading": `${typography.headingLetterSpacing || 0}em`,
			
			// Spacing variables
			"--spacing-xs": `${spacing.xs}px`,
			"--spacing-sm": `${spacing.sm}px`,
			"--spacing-md": `${spacing.md}px`,
			"--spacing-lg": `${spacing.lg}px`,
			"--spacing-xl": `${spacing.xl}px`,
			"--spacing-2xl": `${spacing["2xl"] || spacing.xl * 1.5}px`,
			"--spacing-3xl": `${spacing["3xl"] || spacing.xl * 2}px`,
			
			// Effects variables
			"--border-radius": `${effects?.borderRadius || 8}px`,
			"--shadow-intensity": effects?.shadowIntensity || 0.3,
			"--blur-amount": `${effects?.blurAmount || 8}px`,
			"--overlay-opacity": effects?.overlayOpacity || 0.8,
			"--glow-intensity": effects?.glowIntensity || 0.5,
			"--animation-duration": `${effects?.animationDuration || 300}ms`,
		} as React.CSSProperties;
	}, [currentTheme]);
	
	return (
		<ThemeContext.Provider value={contextValue}>
			<div style={themeStyles} data-theme={currentTheme.id}>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};
