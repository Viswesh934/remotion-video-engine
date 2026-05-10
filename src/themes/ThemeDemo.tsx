/**
 * Theme System Demo Component
 * 
 * Visual demonstration of the theme system in action.
 * Shows how to use ThemeProvider, useTheme hook, and theme values.
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { darkTheme } from "./dark";
import { retroTheme } from "./retro";
import { neonTheme } from "./neon";
import { documentaryTheme } from "./documentary";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme, useThemeColors, useThemeSpacing } from "./useTheme";

/**
 * Inner component that uses theme values
 */
const ThemedContent: React.FC = () => {
	const { theme } = useTheme();
	const colors = useThemeColors();
	const spacing = useThemeSpacing();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: colors.background,
				color: colors.foreground,
				padding: spacing.xl,
				fontFamily: theme.typography.fontFamily,
			}}
		>
			{/* Title */}
			<div
				style={{
					fontSize: 48,
					fontWeight: theme.typography.fontWeightBold,
					color: colors.primary,
					marginBottom: spacing.lg,
					textAlign: "center",
				}}
			>
				{theme.name} Theme Demo
			</div>

			{/* Description */}
			<div
				style={{
					fontSize: theme.typography.baseFontSize,
					color: colors.muted,
					marginBottom: spacing.xl,
					textAlign: "center",
				}}
			>
				{theme.description}
			</div>

			{/* Color Palette */}
			<div style={{ marginBottom: spacing.xl }}>
				<h2
					style={{
						fontSize: 32,
						fontWeight: theme.typography.fontWeightBold,
						color: colors.foreground,
						marginBottom: spacing.md,
					}}
				>
					Color Palette
				</h2>
				<div
					style={{
						display: "flex",
						gap: spacing.md,
						flexWrap: "wrap",
					}}
				>
					{Object.entries(colors).map(([name, value]) => (
						<div
							key={name}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: spacing.xs,
							}}
						>
							<div
								style={{
									width: 80,
									height: 80,
									backgroundColor: value,
									borderRadius: theme.effects?.borderRadius || 8,
									border: `2px solid ${colors.border}`,
								}}
							/>
							<div
								style={{
									fontSize: 12,
									color: colors.muted,
									textAlign: "center",
								}}
							>
								{name}
							</div>
							<div
								style={{
									fontSize: 10,
									color: colors.muted,
									fontFamily: theme.typography.monoFontFamily,
								}}
							>
								{value}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Typography */}
			<div style={{ marginBottom: spacing.xl }}>
				<h2
					style={{
						fontSize: 32,
						fontWeight: theme.typography.fontWeightBold,
						color: colors.foreground,
						marginBottom: spacing.md,
					}}
				>
					Typography
				</h2>
				<div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
					<div style={{ fontSize: 36, fontWeight: theme.typography.fontWeightBold }}>
						Heading (Bold)
					</div>
					<div style={{ fontSize: 24, fontWeight: theme.typography.fontWeightMedium }}>
						Subheading (Medium)
					</div>
					<div style={{ fontSize: theme.typography.baseFontSize }}>
						Body text (Normal)
					</div>
					<div
						style={{
							fontSize: 14,
							fontFamily: theme.typography.monoFontFamily,
							color: colors.accent,
						}}
					>
						Code text (Monospace)
					</div>
				</div>
			</div>

			{/* Spacing */}
			<div style={{ marginBottom: spacing.xl }}>
				<h2
					style={{
						fontSize: 32,
						fontWeight: theme.typography.fontWeightBold,
						color: colors.foreground,
						marginBottom: spacing.md,
					}}
				>
					Spacing Scale
				</h2>
				<div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
					{Object.entries(theme.spacing).map(([name, value]) => (
						<div
							key={name}
							style={{
								display: "flex",
								alignItems: "center",
								gap: spacing.md,
							}}
						>
							<div
								style={{
									width: 60,
									fontSize: 14,
									color: colors.muted,
								}}
							>
								{name}:
							</div>
							<div
								style={{
									width: value,
									height: 20,
									backgroundColor: colors.primary,
									borderRadius: 4,
								}}
							/>
							<div
								style={{
									fontSize: 12,
									color: colors.muted,
									fontFamily: theme.typography.monoFontFamily,
								}}
							>
								{value}px
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Effects */}
			{theme.effects && (
				<div>
					<h2
						style={{
							fontSize: 32,
							fontWeight: theme.typography.fontWeightBold,
							color: colors.foreground,
							marginBottom: spacing.md,
						}}
					>
						Effects
					</h2>
					<div style={{ display: "flex", gap: spacing.lg }}>
						<div
							style={{
								padding: spacing.md,
								backgroundColor: colors.primary,
								borderRadius: theme.effects.borderRadius,
								color: colors.background,
							}}
						>
							Border Radius: {theme.effects.borderRadius}px
						</div>
						<div
							style={{
								padding: spacing.md,
								backgroundColor: colors.secondary,
								borderRadius: theme.effects.borderRadius,
								color: colors.background,
								boxShadow: theme.effects.shadowMd as string,
							}}
						>
							With Shadow
						</div>
						<div
							style={{
								padding: spacing.md,
								backgroundColor: colors.accent,
								borderRadius: theme.effects.borderRadius,
								color: colors.background,
								filter: `drop-shadow(${theme.effects.glowPrimary})`,
							}}
						>
							With Glow
						</div>
					</div>
				</div>
			)}
		</AbsoluteFill>
	);
};

/**
 * Main demo component with ThemeProvider
 */
export const ThemeDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={darkTheme}>
			<ThemedContent />
		</ThemeProvider>
	);
};

/**
 * Demo component for a specific theme
 */
export const DarkThemeDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={darkTheme}>
			<ThemedContent />
		</ThemeProvider>
	);
};

export const RetroThemeDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={retroTheme}>
			<ThemedContent />
		</ThemeProvider>
	);
};

export const NeonThemeDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={neonTheme}>
			<ThemedContent />
		</ThemeProvider>
	);
};

export const DocumentaryThemeDemo: React.FC = () => {
	return (
		<ThemeProvider initialTheme={documentaryTheme}>
			<ThemedContent />
		</ThemeProvider>
	);
};

/**
 * Cycling demo that shows all themes in sequence
 * Each theme is shown for 90 frames (3 seconds at 30fps)
 */
export const AllThemesDemo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	
	// Switch theme every 3 seconds
	const framesPerTheme = fps * 3;
	const themes = [darkTheme, retroTheme, neonTheme, documentaryTheme];
	const currentThemeIndex = Math.floor(frame / framesPerTheme) % themes.length;
	const currentTheme = themes[currentThemeIndex];
	
	return (
		<ThemeProvider initialTheme={currentTheme} themes={themes}>
			<ThemedContent />
		</ThemeProvider>
	);
};
