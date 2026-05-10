/**
 * Stack Component
 * 
 * A flexible stack layout component for vertical or horizontal stacking with
 * theme-aware spacing, alignment, and animation support.
 */

import React, { type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { StackProps } from "../types";
import { useTheme } from "../themes/useTheme";

/**
 * Stack component for vertical or horizontal layouts
 * 
 * @example
 * ```tsx
 * // Vertical stack (default)
 * <Stack spacing={16}>
 *   <Text content="Item 1" />
 *   <Text content="Item 2" />
 *   <Text content="Item 3" />
 * </Stack>
 * 
 * // Horizontal stack with center alignment
 * <Stack 
 *   direction="horizontal"
 *   spacing={24}
 *   align="center"
 *   justify="space-between"
 * >
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </Stack>
 * 
 * // With wrapping and animation
 * <Stack 
 *   direction="horizontal"
 *   spacing={16}
 *   wrap
 *   animation={{ type: "fadeIn", duration: 30 }}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack: React.FC<StackProps> = ({
	children,
	direction = "vertical",
	spacing,
	align,
	justify,
	wrap = false,
	className,
	style,
	// animation, // TODO: Implement animation support
}) => {
	useTheme(); // Ensure theme context is available
	useCurrentFrame(); // Ensure component re-renders on frame changes
	
	// Build component styles
	const componentStyle: CSSProperties = (() => {
		const baseStyle: CSSProperties = {
			display: "flex",
			flexDirection: direction === "horizontal" ? "row" : "column",
		};
		
		// Apply spacing
		if (spacing !== undefined) {
			const spacingValue = typeof spacing === "number" ? `${spacing}px` : spacing;
			baseStyle.gap = spacingValue;
		}
		
		// Apply alignment
		if (align) {
			// align maps to alignItems for flex
			baseStyle.alignItems = align;
		}
		
		// Apply justify
		if (justify) {
			// justify maps to justifyContent for flex
			baseStyle.justifyContent = justify;
		}
		
		// Apply wrapping
		if (wrap) {
			baseStyle.flexWrap = "wrap";
		}
		
		return {
			...baseStyle,
			...style,
		};
	})();
	
	// Determine CSS class
	const stackClass = className || "";
	
	return (
		<div 
			className={stackClass}
			style={componentStyle}
			data-direction={direction}
		>
			{children}
		</div>
	);
};
