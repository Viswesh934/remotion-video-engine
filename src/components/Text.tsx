/**
 * Text Component
 * 
 * A flexible text component with typography variants, theme-aware styling,
 * and animation support. Supports multiple sizes, weights, and alignment options.
 */

import React, { type CSSProperties } from "react";
import type { TextProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn, useSlideIn } from "../animations";

/**
 * Text component for displaying body text, captions, subtitles, and labels
 * 
 * @example
 * ```tsx
 * // Basic text
 * <Text content="Hello World" variant="body" />
 * 
 * // With animation
 * <Text 
 *   content="Animated text" 
 *   variant="subtitle"
 *   animation={{ type: "fadeIn", duration: 30 }}
 * />
 * 
 * // Custom styling
 * <Text 
 *   content="Custom text"
 *   size="lg"
 *   weight="bold"
 *   color="#ff0000"
 *   align="center"
 * />
 * ```
 */
export const Text: React.FC<TextProps> = ({
	content,
	variant = "body",
	size,
	weight,
	color,
	align = "left",
	maxWidth,
	className,
	style,
	animation,
	theme: themeOverride,
}) => {
	const { theme } = useTheme();
	
	// Safety check for theme
	if (!theme) {
		return <p style={style}>{typeof content === "string" ? content : content.text}</p>;
	}
	
	// Extract text content
	const textContent = typeof content === "string" ? content : content.text;
	
	// Calculate animation styles
	let animationStyle: CSSProperties = {};
	if (animation) {
		const { type, duration = 30, delay = 0, easing = "easeInOut" } = animation;
		const start = delay;
		
		switch (type) {
			case "fadeIn": {
				const opacity = useFadeIn({ start, duration, easing });
				animationStyle = { opacity };
				break;
			}
			case "slideIn": {
				const direction = (animation as any).direction || "left";
				const distance = (animation as any).distance || 50;
				const transform = useSlideIn({ start, duration, easing, direction, distance });
				animationStyle = { transform };
				break;
			}
		}
	}
	
	// Build component styles
	const baseStyle: CSSProperties = {
		color: color || theme.colors.foreground,
		textAlign: align,
		maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
		fontFamily: theme.typography.fontFamily,
		lineHeight: theme.typography.lineHeight,
	};
	
	// Apply size
	if (size) {
		const sizeMap = {
			xs: theme.typography.baseFontSize * 0.75,
			sm: theme.typography.baseFontSize * 0.875,
			md: theme.typography.baseFontSize,
			lg: theme.typography.baseFontSize * 1.125,
			xl: theme.typography.baseFontSize * 1.25,
		};
		baseStyle.fontSize = `${sizeMap[size]}px`;
	}
	
	// Apply weight
	if (weight) {
		const weightMap = {
			normal: theme.typography.fontWeightNormal || 400,
			medium: theme.typography.fontWeightMedium || 500,
			semibold: 600,
			bold: theme.typography.fontWeightBold || 700,
		};
		baseStyle.fontWeight = weightMap[weight];
	}
	
	const componentStyle = {
		...baseStyle,
		...animationStyle,
		...style,
	};
	
	// Determine CSS class based on variant
	const combinedClassName = className || "";
	
	return (
		<p 
			className={combinedClassName}
			style={componentStyle}
			data-variant={variant}
		>
			{textContent}
		</p>
	);
};
