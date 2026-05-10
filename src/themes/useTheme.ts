/**
 * useTheme Hook
 * 
 * Custom React hook for accessing theme context in components.
 * Provides access to the current theme, theme switching, and available themes.
 */

import { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import type { ThemeContextValue } from "./types";

/**
 * useTheme hook
 * 
 * Access the current theme and theme utilities from any component.
 * Must be used within a ThemeProvider.
 * 
 * @returns Theme context value with current theme, setTheme function, and available themes
 * @throws Error if used outside of ThemeProvider
 * 
 * @example
 * ```tsx
 * import { useTheme } from './themes/useTheme';
 * 
 * function MyComponent() {
 *   const { theme, setTheme, availableThemes } = useTheme();
 *   
 *   return (
 *     <div style={{ backgroundColor: theme.colors.background }}>
 *       <h1 style={{ color: theme.colors.primary }}>
 *         Hello from {theme.name} theme!
 *       </h1>
 *       <button onClick={() => setTheme('retro')}>
 *         Switch to Retro Theme
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useTheme(): ThemeContextValue {
	const context = useContext(ThemeContext);
	
	if (context === undefined) {
		throw new Error(
			"useTheme must be used within a ThemeProvider. " +
			"Wrap your component tree with <ThemeProvider> to use theme functionality."
		);
	}
	
	return context;
}

/**
 * Helper hook to get only the current theme (without setTheme)
 * Useful when you only need to read theme values
 * 
 * @returns Current theme object
 * 
 * @example
 * ```tsx
 * import { useCurrentTheme } from './themes/useTheme';
 * 
 * function MyComponent() {
 *   const theme = useCurrentTheme();
 *   
 *   return (
 *     <div style={{ 
 *       color: theme.colors.foreground,
 *       padding: theme.spacing.md 
 *     }}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useCurrentTheme() {
	const { theme } = useTheme();
	return theme;
}

/**
 * Helper hook to get theme colors
 * Convenient shorthand for accessing color palette
 * 
 * @returns Color palette from current theme
 * 
 * @example
 * ```tsx
 * import { useThemeColors } from './themes/useTheme';
 * 
 * function MyComponent() {
 *   const colors = useThemeColors();
 *   
 *   return (
 *     <div style={{ backgroundColor: colors.background }}>
 *       <h1 style={{ color: colors.primary }}>Title</h1>
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeColors() {
	const { theme } = useTheme();
	return theme.colors;
}

/**
 * Helper hook to get theme spacing
 * Convenient shorthand for accessing spacing scale
 * 
 * @returns Spacing scale from current theme
 * 
 * @example
 * ```tsx
 * import { useThemeSpacing } from './themes/useTheme';
 * 
 * function MyComponent() {
 *   const spacing = useThemeSpacing();
 *   
 *   return (
 *     <div style={{ 
 *       padding: spacing.md,
 *       marginBottom: spacing.lg 
 *     }}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useThemeSpacing() {
	const { theme } = useTheme();
	return theme.spacing;
}

/**
 * Helper hook to get theme typography
 * Convenient shorthand for accessing typography settings
 * 
 * @returns Typography settings from current theme
 * 
 * @example
 * ```tsx
 * import { useThemeTypography } from './themes/useTheme';
 * 
 * function MyComponent() {
 *   const typography = useThemeTypography();
 *   
 *   return (
 *     <p style={{ 
 *       fontFamily: typography.fontFamily,
 *       fontSize: typography.baseFontSize,
 *       lineHeight: typography.lineHeight
 *     }}>
 *       Text content
 *     </p>
 *   );
 * }
 * ```
 */
export function useThemeTypography() {
	const { theme } = useTheme();
	return theme.typography;
}
