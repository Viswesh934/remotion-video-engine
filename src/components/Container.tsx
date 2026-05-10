/**
 * Container Component
 * 
 * A flexible container component for content wrapping with theme-aware styling,
 * positioning, and animation support. Provides centering, sizing, and background options.
 */

import React, { type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { ContainerProps } from "../types";
import { useTheme } from "../themes/useTheme";

/**
 * Container component for wrapping and positioning content
 * 
 * @example
 * ```tsx
 * // Basic container
 * <Container>
 *   <Text content="Hello World" />
 * </Container>
 * 
 * // Centered container with custom size
 * <Container 
 *   width={800} 
 *   height={600}
 *   centerX
 *   centerY
 *   background="#000000"
 * >
 *   <Title text="Centered Content" />
 * </Container>
 * 
 * // With animation
 * <Container 
 *   padding={32}
 *   borderRadius={8}
 *   animation={{ type: "fadeIn", duration: 30 }}
 * >
 *   <Text content="Animated container" />
 * </Container>
 * ```
 */
export const Container: React.FC<ContainerProps> = ({
	children,
	width,
	height,
	padding,
	background,
	borderRadius,
	position,
	centerX = false,
	centerY = false,
	className,
	style,
	// animation, // TODO: Implement animation support
}) => {
	useTheme(); // Ensure theme context is available
	useCurrentFrame(); // Ensure component re-renders on frame changes
	
	// Build component styles
	const componentStyle: CSSProperties = (() => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: typeof height === "number" ? `${height}px` : height,
			padding: typeof padding === "number" ? `${padding}px` : padding,
			background: background || "transparent",
			borderRadius: borderRadius ? `${borderRadius}px` : undefined,
		};
		
		// Apply positioning
		if (position) {
			if (position.x !== undefined) {
				baseStyle.left = typeof position.x === "number" ? `${position.x}px` : position.x;
			}
			if (position.y !== undefined) {
				baseStyle.top = typeof position.y === "number" ? `${position.y}px` : position.y;
			}
		}
		
		// Apply centering
		if (centerX || centerY) {
			baseStyle.display = "flex";
			if (centerX) {
				baseStyle.justifyContent = "center";
			}
			if (centerY) {
				baseStyle.alignItems = "center";
			}
		}
		
		return {
			...baseStyle,
			...style,
		};
	})();
	
	// Determine CSS class
	const containerClass = className || "";
	
	return (
		<div 
			className={containerClass}
			style={componentStyle}
		>
			{children}
		</div>
	);
};
