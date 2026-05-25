/**
 * Theme System Exports
 * 
 * Central export point for all theme-related functionality.
 */

// Type definitions
export type {
	Theme,
	ColorPalette,
	Typography,
	Spacing,
	Effects,
	ThemeContextValue,
} from "./types";

// Theme provider and context
export { ThemeProvider, ThemeContext } from "./ThemeProvider";
export type { ThemeProviderProps } from "./ThemeProvider";

// Theme hooks
export {
	useTheme,
	useCurrentTheme,
	useThemeColors,
	useThemeSpacing,
	useThemeTypography,
} from "./useTheme";

// Built-in themes
export { lightTheme } from "./light";
export { darkTheme } from "./dark";
export { retroTheme } from "./retro";
export { neonTheme } from "./neon";
export { documentaryTheme } from "./documentary";

// Default theme
export { darkTheme as defaultTheme } from "./dark";

// All themes array for easy access
import { darkTheme } from "./dark";
import { retroTheme } from "./retro";
import { neonTheme } from "./neon";
import { documentaryTheme } from "./documentary";

export const allThemes = [darkTheme, retroTheme, neonTheme, documentaryTheme];

// Theme utilities
export {
	availableThemes,
	getThemeById,
	getThemeByIdOrDefault,
	getAllThemeIds,
	getAllThemeNames,
	isValidThemeId,
	getThemesByTag,
	createThemeSwitcher,
	generateThemeCSSVariables,
} from "./utils";
