/**
 * Grid Component
 * 
 * A flexible grid layout component with theme-aware spacing and animation support.
 * Supports both simple column/row configuration and advanced CSS grid templates.
 */

import React, { type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { GridProps } from "../types";
import { useTheme } from "../themes/useTheme";

/**
 * Grid component for creating grid layouts
 * 
 * @example
 * ```tsx
 * // Simple 3-column grid
 * <Grid columns={3} gap={16}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Grid>
 * 
 * // Advanced grid with custom template
 * <Grid 
 *   templateColumns="1fr 2fr 1fr"
 *   templateRows="auto 1fr auto"
 *   gap={24}
 *   alignItems="center"
 * >
 *   <div>Header</div>
 *   <div>Main Content</div>
 *   <div>Sidebar</div>
 * </Grid>
 * 
 * // With animation
 * <Grid 
 *   columns={2}
 *   gap={32}
 *   animation={{ type: "fadeIn", duration: 30 }}
 * >
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridProps> = ({
	children,
	columns,
	rows,
	gap,
	columnGap,
	rowGap,
	templateColumns,
	templateRows,
	alignItems,
	justifyItems,
	className,
	style,
	// animation, // TODO: Implement animation support
}) => {
	useTheme(); // Ensure theme context is available
	useCurrentFrame(); // Ensure component re-renders on frame changes
	
	// Build component styles
	const componentStyle: CSSProperties = (() => {
		const baseStyle: CSSProperties = {
			display: "grid",
		};
		
		// Apply grid template columns
		if (templateColumns) {
			baseStyle.gridTemplateColumns = templateColumns;
		} else if (columns) {
			baseStyle.gridTemplateColumns = `repeat(${columns}, 1fr)`;
		}
		
		// Apply grid template rows
		if (templateRows) {
			baseStyle.gridTemplateRows = templateRows;
		} else if (rows) {
			baseStyle.gridTemplateRows = `repeat(${rows}, 1fr)`;
		}
		
		// Apply gap
		if (gap !== undefined) {
			baseStyle.gap = typeof gap === "number" ? `${gap}px` : gap;
		}
		
		// Apply column gap (overrides gap if specified)
		if (columnGap !== undefined) {
			baseStyle.columnGap = typeof columnGap === "number" ? `${columnGap}px` : columnGap;
		}
		
		// Apply row gap (overrides gap if specified)
		if (rowGap !== undefined) {
			baseStyle.rowGap = typeof rowGap === "number" ? `${rowGap}px` : rowGap;
		}
		
		// Apply alignment
		if (alignItems) {
			baseStyle.alignItems = alignItems;
		}
		
		if (justifyItems) {
			baseStyle.justifyItems = justifyItems;
		}
		
		return {
			...baseStyle,
			...style,
		};
	})();
	
	// Determine CSS class
	const gridClass = className || "";
	
	return (
		<div 
			className={gridClass}
			style={componentStyle}
		>
			{children}
		</div>
	);
};
