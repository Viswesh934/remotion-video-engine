/**
 * Theme Utility Functions
 * 
 * Helper functions for working with themes, including theme switching,
 * theme selection, and theme property access.
 */

import type { Theme } from "./types";
import { darkTheme } from "./dark";
import { retroTheme } from "./retro";
import { neonTheme } from "./neon";
import { documentaryTheme } from "./documentary";

/**
 * All available themes
 */
export const availableThemes: Theme[] = [
	darkTheme,
	retroTheme,
	neonTheme,
	documentaryTheme,
];

/**
 * Get a theme by its ID
 * 
 * @param themeId - The unique identifier of the theme
 * @returns The theme object, or undefined if not found
 * 
 * @example
 * ```ts
 * const theme = getThemeById('neon');
 * if (theme) {
 *   console.log(theme.name); // "Neon"
 * }
 * ```
 */
export function getThemeById(themeId: string): Theme | undefined {
	return availableThemes.find((theme) => theme.id === themeId);
}

/**
 * Get a theme by its ID, with fallback to default theme
 * 
 * @param themeId - The unique identifier of the theme
 * @param fallback - Fallback theme (defaults to dark theme)
 * @returns The theme object, or fallback if not found
 * 
 * @example
 * ```ts
 * const theme = getThemeByIdOrDefault('invalid-id');
 * console.log(theme.name); // "Dark" (fallback)
 * ```
 */
export function getThemeByIdOrDefault(
	themeId: string,
	fallback: Theme = darkTheme
): Theme {
	return getThemeById(themeId) || fallback;
}

/**
 * Get all theme IDs
 * 
 * @returns Array of all theme IDs
 * 
 * @example
 * ```ts
 * const ids = getAllThemeIds();
 * console.log(ids); // ['dark', 'retro', 'neon', 'documentary']
 * ```
 */
export function getAllThemeIds(): string[] {
	return availableThemes.map((theme) => theme.id);
}

/**
 * Get all theme names
 * 
 * @returns Array of all theme names
 * 
 * @example
 * ```ts
 * const names = getAllThemeNames();
 * console.log(names); // ['Dark', 'Retro', 'Neon', 'Documentary']
 * ```
 */
export function getAllThemeNames(): string[] {
	return availableThemes.map((theme) => theme.name);
}

/**
 * Check if a theme ID exists
 * 
 * @param themeId - The theme ID to check
 * @returns True if the theme exists, false otherwise
 * 
 * @example
 * ```ts
 * if (isValidThemeId('neon')) {
 *   console.log('Valid theme!');
 * }
 * ```
 */
export function isValidThemeId(themeId: string): boolean {
	return availableThemes.some((theme) => theme.id === themeId);
}

/**
 * Get themes by tag
 * 
 * @param tag - The tag to filter by
 * @returns Array of themes that have the specified tag
 * 
 * @example
 * ```ts
 * const professionalThemes = getThemesByTag('professional');
 * console.log(professionalThemes.map(t => t.name)); // ['Dark', 'Documentary']
 * ```
 */
export function getThemesByTag(tag: string): Theme[] {
	return availableThemes.filter((theme) =>
		theme.metadata?.tags?.includes(tag)
	);
}

/**
 * Create a theme switcher function for use in components
 * 
 * @param setTheme - The setTheme function from useTheme hook
 * @returns Object with theme switching utilities
 * 
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * const switcher = createThemeSwitcher(setTheme);
 * 
 * // Switch to next theme
 * switcher.next();
 * 
 * // Switch to previous theme
 * switcher.previous();
 * 
 * // Switch to specific theme
 * switcher.switchTo('neon');
 * ```
 */
export function createThemeSwitcher(setTheme: (themeId: string) => void) {
	return {
		/**
		 * Switch to a specific theme by ID
		 */
		switchTo: (themeId: string) => {
			if (isValidThemeId(themeId)) {
				setTheme(themeId);
			} else {
				console.warn(`Invalid theme ID: ${themeId}`);
			}
		},
		
		/**
		 * Switch to the next theme in the list (cycles back to first)
		 */
		next: (currentThemeId: string) => {
			const currentIndex = availableThemes.findIndex(
				(t) => t.id === currentThemeId
			);
			const nextIndex = (currentIndex + 1) % availableThemes.length;
			setTheme(availableThemes[nextIndex].id);
		},
		
		/**
		 * Switch to the previous theme in the list (cycles to last)
		 */
		previous: (currentThemeId: string) => {
			const currentIndex = availableThemes.findIndex(
				(t) => t.id === currentThemeId
			);
			const previousIndex =
				currentIndex === 0 ? availableThemes.length - 1 : currentIndex - 1;
			setTheme(availableThemes[previousIndex].id);
		},
		
		/**
		 * Get all available themes
		 */
		getAvailableThemes: () => availableThemes,
		
		/**
		 * Get all theme IDs
		 */
		getThemeIds: () => getAllThemeIds(),
	};
}

/**
 * Generate CSS variables from a theme
 * 
 * @param theme - The theme to generate CSS variables from
 * @returns Object with CSS variable names and values
 * 
 * @example
 * ```ts
 * const cssVars = generateThemeCSSVariables(neonTheme);
 * console.log(cssVars['--color-primary']); // '#00ffff'
 * ```
 */
export function generateThemeCSSVariables(
	theme: Theme
): Record<string, string> {
	const { colors, typography, spacing, effects } = theme;
	
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
		"--font-family-heading":
			typography.headingFontFamily || typography.fontFamily,
		"--font-family-mono": typography.monoFontFamily || "monospace",
		"--font-size-base": `${typography.baseFontSize}px`,
		"--line-height": String(typography.lineHeight),
		"--font-weight-normal": String(typography.fontWeightNormal || 400),
		"--font-weight-medium": String(typography.fontWeightMedium || 500),
		"--font-weight-bold": String(typography.fontWeightBold || 700),
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
		"--shadow-intensity": String(effects?.shadowIntensity || 0.3),
		"--blur-amount": `${effects?.blurAmount || 8}px`,
		"--overlay-opacity": String(effects?.overlayOpacity || 0.8),
		"--glow-intensity": String(effects?.glowIntensity || 0.5),
		"--animation-duration": `${effects?.animationDuration || 300}ms`,
	};
}
