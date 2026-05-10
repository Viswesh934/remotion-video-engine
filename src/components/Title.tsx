/**
 * Title Component
 * 
 * An animated title component with multiple heading levels, subtitle support,
 * and various entrance effects. Fully theme-aware with customizable styling.
 */

import React, {useMemo, type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { TitleProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { 
	useFadeIn, 
	useSlideIn, 
	useScaleIn
} from "../animations";
import { useTypewriter, useGlitch } from "../animations/cinematic";

/**
 * Title component for displaying headings with animated entrance effects
 * 
 * @example
 * ```tsx
 * // Basic title
 * <Title text="Welcome" level={1} />
 * 
 * // With subtitle and animation
 * <Title 
 *   text="Main Title"
 *   subtitle="Supporting text"
 *   level={2}
 *   effect="slideIn"
 *   animation={{ type: "fadeIn", duration: 30 }}
 * />
 * 
 * // Custom styling
 * <Title 
 *   text="Custom Title"
 *   size="3xl"
 *   align="center"
 *   color="#ff0000"
 * />
 * ```
 */
export const Title: React.FC<TitleProps> = ({
	text,
	level = 1,
	subtitle,
	size,
	align = "left",
	effect,
	color,
	subtitleColor,
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	const frame = useCurrentFrame();
	
	// Calculate effect-based animations
	let effectStyle: CSSProperties = {};
	if (effect) {
		const duration = 45; // Default effect duration
		
		switch (effect) {
			case "fadeIn": {
				const opacity = useFadeIn({ duration, easing: "easeOut" });
				effectStyle = { opacity };
				break;
			}
			case "slideIn": {
				const transform = useSlideIn({ 
					duration, 
					easing: "easeOut", 
					direction: "bottom",
					distance: 50 
				});
				const opacity = useFadeIn({ duration, easing: "easeOut" });
				effectStyle = { opacity, transform };
				break;
			}
			case "scaleIn": {
				const transform = useScaleIn({ duration, easing: "spring" });
				const opacity = useFadeIn({ duration: duration / 2, easing: "easeOut" });
				effectStyle = { opacity, transform };
				break;
			}
			case "typewriter": {
				// Typewriter effect is handled separately in render
				effectStyle = {};
				break;
			}
			case "glitch": {
				const glitchEffect = useGlitch({ 
					duration, 
					intensity: 0.3,
					frequency: 0.1 
				});
				effectStyle = { 
					transform: glitchEffect.transform,
					filter: glitchEffect.filter,
					opacity: glitchEffect.opacity
				};
				break;
			}
		}
	}
	
	// Calculate additional animation styles
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
				const distance = (animation as any).distance || 100;
				const transform = useSlideIn({ start, duration, easing, direction, distance });
				animationStyle = { transform };
				break;
			}
		}
	}
	
	// Typewriter effect for text
	const typewriterResult = useTypewriter({
		text,
		duration: 60,
		speed: 1,
	});
	
	const displayText = effect === "typewriter" ? typewriterResult.visibleText : text;
	
	// Build title styles
	const titleStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			color: color || theme.colors.foreground,
			textAlign: align,
			fontFamily: theme.typography.headingFontFamily || theme.typography.fontFamily,
			letterSpacing: theme.typography.headingLetterSpacing 
				? `${theme.typography.headingLetterSpacing}em` 
				: "-0.02em",
			margin: 0,
			padding: 0,
		};
		
		// Apply size
		if (size) {
			const sizeMap = {
				sm: theme.typography.baseFontSize * 1.5,
				md: theme.typography.baseFontSize * 2,
				lg: theme.typography.baseFontSize * 2.5,
				xl: theme.typography.baseFontSize * 3,
				"2xl": theme.typography.baseFontSize * 3.75,
				"3xl": theme.typography.baseFontSize * 4.5,
			};
			baseStyle.fontSize = `${sizeMap[size]}px`;
		} else {
			// Default sizes based on heading level
			const levelSizeMap = {
				1: theme.typography.baseFontSize * 3,
				2: theme.typography.baseFontSize * 2.5,
				3: theme.typography.baseFontSize * 2,
				4: theme.typography.baseFontSize * 1.5,
				5: theme.typography.baseFontSize * 1.25,
				6: theme.typography.baseFontSize * 1.125,
			};
			baseStyle.fontSize = `${levelSizeMap[level as keyof typeof levelSizeMap]}px`;
		}
		
		// Apply font weight
		baseStyle.fontWeight = theme.typography.fontWeightBold || 700;
		
		// Combine all styles
		return {
			...baseStyle,
			...effectStyle,
			...animationStyle,
			...style,
		};
	}, [theme, level, size, color, align, effectStyle, animationStyle, style]);
	
	// Build subtitle styles
	const subtitleStyle = useMemo((): CSSProperties => {
		if (!subtitle) return {};
		
		// Subtitle appears slightly after title
		const subtitleDelay = effect ? 20 : 0;
		const subtitleOpacity = useFadeIn({ 
			start: subtitleDelay, 
			duration: 30, 
			easing: "easeOut" 
		});
		
		return {
			color: subtitleColor || theme.colors.muted,
			textAlign: align,
			fontFamily: theme.typography.fontFamily,
			fontSize: `${theme.typography.baseFontSize * 1.125}px`,
			fontWeight: theme.typography.fontWeightNormal || 400,
			lineHeight: theme.typography.lineHeight,
			margin: 0,
			marginTop: `${theme.spacing.sm}px`,
			padding: 0,
			opacity: subtitleOpacity,
		};
	}, [subtitle, subtitleColor, theme, align, frame]);
	
	// Determine heading tag
	const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	
	// Determine CSS class
	const titleClass = className || "";
	
	return (
		<div className="">
			<HeadingTag 
				className={titleClass}
				style={titleStyle}
				data-level={level}
				data-effect={effect}
			>
				{displayText}
			</HeadingTag>
			
			{subtitle && (
				<p 
					className=""
					style={subtitleStyle}
				>
					{subtitle}
				</p>
			)}
		</div>
	);
};
