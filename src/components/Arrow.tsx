/**
 * Arrow Component
 * 
 * A directional indicator component for connecting elements in diagrams.
 * Supports straight and curved arrows with animated drawing effects.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { ArrowProps } from "../types";
import { useTheme } from "../themes/useTheme";

/**
 * Arrow component for directional indicators
 * 
 * @example
 * ```tsx
 * // Straight arrow
 * <Arrow 
 *   start={{ x: 100, y: 100 }}
 *   end={{ x: 300, y: 200 }}
 *   color="#3b82f6"
 *   thickness={2}
 * />
 * 
 * // Curved arrow with animation
 * <Arrow 
 *   start={{ x: 100, y: 100 }}
 *   end={{ x: 300, y: 100 }}
 *   curved={true}
 *   curvature={0.5}
 *   animateDrawing={true}
 *   drawingDuration={30}
 *   label="Connection"
 * />
 * ```
 */
export const Arrow: React.FC<ArrowProps> = ({
	start,
	end,
	color,
	thickness = 2,
	headSize = 10,
	lineStyle = "solid",
	curved = false,
	curvature = 0.3,
	animateDrawing = false,
	drawingDuration = 30,
	label,
	labelPosition = 0.5,
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	const frame = useCurrentFrame();
	
	const arrowColor = color || theme.colors.primary;
	
	// Calculate drawing progress
	const drawProgress = useMemo(() => {
		if (!animateDrawing) return 1;
		
		return interpolate(
			frame,
			[0, drawingDuration],
			[0, 1],
			{ extrapolateRight: "clamp" }
		);
	}, [animateDrawing, drawingDuration, frame]);
	
	// Calculate SVG viewBox and dimensions
	const { viewBox, width, height } = useMemo(() => {
		const padding = headSize + 10;
		const minX = Math.min(start.x, end.x) - padding;
		const minY = Math.min(start.y, end.y) - padding;
		const maxX = Math.max(start.x, end.x) + padding;
		const maxY = Math.max(start.y, end.y) + padding;
		
		return {
			viewBox: `${minX} ${minY} ${maxX - minX} ${maxY - minY}`,
			width: maxX - minX,
			height: maxY - minY,
		};
	}, [start, end, headSize]);
	
	// Calculate path
	const path = useMemo(() => {
		if (!curved) {
			return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
		}
		
		// Calculate control point for curved line
		const midX = (start.x + end.x) / 2;
		const midY = (start.y + end.y) / 2;
		
		// Perpendicular offset
		const dx = end.x - start.x;
		const dy = end.y - start.y;
		const length = Math.sqrt(dx * dx + dy * dy);
		const offsetX = (-dy / length) * length * curvature;
		const offsetY = (dx / length) * length * curvature;
		
		const controlX = midX + offsetX;
		const controlY = midY + offsetY;
		
		return `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
	}, [start, end, curved, curvature]);
	
	// Calculate arrow head angle
	const arrowAngle = useMemo(() => {
		if (!curved) {
			return Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);
		}
		
		// For curved arrows, calculate tangent at end point
		const midX = (start.x + end.x) / 2;
		const midY = (start.y + end.y) / 2;
		const dx = end.x - start.x;
		const dy = end.y - start.y;
		const length = Math.sqrt(dx * dx + dy * dy);
		const offsetX = (-dy / length) * length * curvature;
		const offsetY = (dx / length) * length * curvature;
		const controlX = midX + offsetX;
		const controlY = midY + offsetY;
		
		// Tangent at end point
		const tangentX = end.x - controlX;
		const tangentY = end.y - controlY;
		
		return Math.atan2(tangentY, tangentX) * (180 / Math.PI);
	}, [start, end, curved, curvature]);
	
	// Calculate label position
	const labelPos = useMemo(() => {
		if (!label) return null;
		
		if (!curved) {
			return {
				x: start.x + (end.x - start.x) * labelPosition,
				y: start.y + (end.y - start.y) * labelPosition,
			};
		}
		
		// For curved path, approximate position
		const midX = (start.x + end.x) / 2;
		const midY = (start.y + end.y) / 2;
		const dx = end.x - start.x;
		const dy = end.y - start.y;
		const length = Math.sqrt(dx * dx + dy * dy);
		const offsetX = (-dy / length) * length * curvature;
		const offsetY = (dx / length) * length * curvature;
		
		// Approximate curve position
		const t = labelPosition;
		const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * (midX + offsetX) + t * t * end.x;
		const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * (midY + offsetY) + t * t * end.y;
		
		return { x, y };
	}, [label, start, end, curved, curvature, labelPosition]);
	
	// Stroke dash array for line styles
	const strokeDashArray = useMemo(() => {
		switch (lineStyle) {
			case "dashed":
				return "8,4";
			case "dotted":
				return "2,4";
			default:
				return "none";
		}
	}, [lineStyle]);
	
	// Build component styles
	const arrowStyle = useMemo((): CSSProperties => {
		return {
			width: `${width}px`,
			height: `${height}px`,
			...style,
		};
	}, [width, height, style]);
	
	return (
		<div className="" style={arrowStyle}>
			<svg
				viewBox={viewBox}
				width={width}
				height={height}
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Arrow line */}
				<path
					d={path}
					stroke={arrowColor}
					strokeWidth={thickness}
					strokeDasharray={strokeDashArray}
					strokeLinecap="round"
					fill="none"
					strokeDashoffset={animateDrawing ? (1 - drawProgress) * 1000 : 0}
				/>
				
				{/* Arrow head */}
				{drawProgress > 0.8 && (
					<polygon
						points={`0,-${headSize / 2} ${headSize},0 0,${headSize / 2}`}
						fill={arrowColor}
						transform={`translate(${end.x}, ${end.y}) rotate(${arrowAngle})`}
						opacity={interpolate(drawProgress, [0.8, 1], [0, 1], { extrapolateRight: "clamp" })}
					/>
				)}
				
				{/* Label */}
				{label && labelPos && drawProgress > 0.5 && (
					<g opacity={interpolate(drawProgress, [0.5, 0.7], [0, 1], { extrapolateRight: "clamp" })}>
						<rect
							x={labelPos.x - 30}
							y={labelPos.y - 12}
							width={60}
							height={24}
							fill={theme.colors.background}
							stroke={arrowColor}
							strokeWidth={1}
							rx={4}
						/>
						<text
							x={labelPos.x}
							y={labelPos.y}
							textAnchor="middle"
							dominantBaseline="middle"
							fill={theme.colors.text}
							fontSize={12}
							fontFamily={theme.typography.fontFamily}
						>
							{label}
						</text>
					</g>
				)}
			</svg>
		</div>
	);
};
