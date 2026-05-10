/**
 * BarChart Component
 * 
 * A bar chart visualization component with animated data entry.
 * Supports both vertical and horizontal orientations.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { BarChartProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn } from "../animations";

/**
 * BarChart component for data visualization
 * 
 * @example
 * ```tsx
 * <BarChart 
 *   data={[
 *     { label: "Jan", value: 120, color: "#3b82f6" },
 *     { label: "Feb", value: 150, color: "#10b981" },
 *     { label: "Mar", value: 180, color: "#f59e0b" }
 *   ]}
 *   title="Monthly Sales"
 *   yAxisLabel="Revenue ($)"
 *   animateEntry={true}
 *   showValues={true}
 * />
 * ```
 */
export const BarChart: React.FC<BarChartProps> = ({
	data,
	title,
	xAxisLabel,
	yAxisLabel,
	showGrid = true,
	showValues = false,
	animateEntry = false,
	animationDuration = 60,
	barWidth = 40,
	barGap = 20,
	width = 600,
	height = 400,
	orientation = "vertical",
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	const frame = useCurrentFrame();
	
	// Calculate animation styles
	let animationStyle: CSSProperties = {};
	if (animation) {
		const { type, duration = 30, delay = 0, easing = "easeInOut" } = animation;
		const start = delay;
		
		if (type === "fadeIn") {
			const opacity = useFadeIn({ start, duration, easing });
			animationStyle = { opacity };
		}
	}
	
	// Chart dimensions
	const chartPadding = { top: 60, right: 40, bottom: 60, left: 60 };
	const chartWidth = (typeof width === "number" ? width : 600) - chartPadding.left - chartPadding.right;
	const chartHeight = (typeof height === "number" ? height : 400) - chartPadding.top - chartPadding.bottom;
	
	// Calculate scales
	const maxValue = useMemo(() => {
		return Math.max(...data.map(d => d.value), 0);
	}, [data]);
	
	const scale = useMemo(() => {
		return maxValue > 0 ? chartHeight / maxValue : 1;
	}, [maxValue, chartHeight]);
	
	// Calculate bar positions
	const totalWidth = data.length * barWidth + (data.length - 1) * barGap;
	const startX = (chartWidth - totalWidth) / 2;
	
	// Render grid lines
	const renderGrid = () => {
		if (!showGrid) return null;
		
		const gridLines = 5;
		const lines = [];
		
		for (let i = 0; i <= gridLines; i++) {
			const y = (chartHeight / gridLines) * i;
			const value = maxValue - (maxValue / gridLines) * i;
			
			lines.push(
				<g key={i}>
					<line
						x1={0}
						y1={y}
						x2={chartWidth}
						y2={y}
						stroke={theme.colors.border}
						strokeWidth={1}
						strokeDasharray="4,4"
						opacity={0.3}
					/>
					<text
						x={-10}
						y={y}
						textAnchor="end"
						dominantBaseline="middle"
						fill={theme.colors.textSecondary}
						fontSize={11}
						fontFamily={theme.typography.fontFamily}
					>
						{Math.round(value)}
					</text>
				</g>
			);
		}
		
		return <g className="">{lines}</g>;
	};
	
	// Render bars
	const renderBars = () => {
		return data.map((item, index) => {
			const x = startX + index * (barWidth + barGap);
			const barHeight = item.value * scale;
			
			// Calculate animation progress for this bar
			const barDelay = animateEntry ? (index / data.length) * animationDuration * 0.6 : 0;
			const barDuration = animateEntry ? animationDuration * 0.4 : 0;
			const barProgress = interpolate(
				frame,
				[barDelay, barDelay + barDuration],
				[0, 1],
				{ extrapolateRight: "clamp", extrapolateLeft: "clamp" }
			);
			
			const currentHeight = animateEntry ? barHeight * barProgress : barHeight;
			const currentY = chartHeight - currentHeight;
			
			const barColor = item.color || theme.colors.primary;
			
			return (
				<g key={index}>
					{/* Bar */}
					<rect
						x={x}
						y={currentY}
						width={barWidth}
						height={currentHeight}
						fill={barColor}
						rx={4}
					/>
					
					{/* Value label */}
					{showValues && barProgress > 0.8 && (
						<text
							x={x + barWidth / 2}
							y={currentY - 8}
							textAnchor="middle"
							fill={theme.colors.text}
							fontSize={12}
							fontWeight={600}
							fontFamily={theme.typography.fontFamily}
							opacity={interpolate(barProgress, [0.8, 1], [0, 1], { extrapolateRight: "clamp" })}
						>
							{item.value}
						</text>
					)}
					
					{/* X-axis label */}
					<text
						x={x + barWidth / 2}
						y={chartHeight + 20}
						textAnchor="middle"
						fill={theme.colors.text}
						fontSize={12}
						fontFamily={theme.typography.fontFamily}
					>
						{item.label}
					</text>
				</g>
			);
		});
	};
	
	// Build component styles
	const chartStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: typeof height === "number" ? `${height}px` : height,
		};
		
		return {
			...baseStyle,
			...animationStyle,
			...style,
		};
	}, [width, height, animationStyle, style]);
	
	return (
		<div className="" style={chartStyle}>
			<svg
				width="100%"
				height="100%"
				viewBox={`0 0 ${typeof width === "number" ? width : 600} ${typeof height === "number" ? height : 400}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				{/* Title */}
				{title && (
					<text
						x={(typeof width === "number" ? width : 600) / 2}
						y={30}
						textAnchor="middle"
						fill={theme.colors.text}
						fontSize={18}
						fontWeight={700}
						fontFamily={theme.typography.fontFamily}
					>
						{title}
					</text>
				)}
				
				{/* Chart area */}
				<g transform={`translate(${chartPadding.left}, ${chartPadding.top})`}>
					{/* Grid */}
					{renderGrid()}
					
					{/* Axes */}
					<line
						x1={0}
						y1={chartHeight}
						x2={chartWidth}
						y2={chartHeight}
						stroke={theme.colors.border}
						strokeWidth={2}
					/>
					<line
						x1={0}
						y1={0}
						x2={0}
						y2={chartHeight}
						stroke={theme.colors.border}
						strokeWidth={2}
					/>
					
					{/* Bars */}
					{renderBars()}
					
					{/* Y-axis label */}
					{yAxisLabel && (
						<text
							x={-chartHeight / 2}
							y={-40}
							textAnchor="middle"
							fill={theme.colors.text}
							fontSize={13}
							fontFamily={theme.typography.fontFamily}
							transform={`rotate(-90, -${chartHeight / 2}, -40)`}
						>
							{yAxisLabel}
						</text>
					)}
					
					{/* X-axis label */}
					{xAxisLabel && (
						<text
							x={chartWidth / 2}
							y={chartHeight + 45}
							textAnchor="middle"
							fill={theme.colors.text}
							fontSize={13}
							fontFamily={theme.typography.fontFamily}
						>
							{xAxisLabel}
						</text>
					)}
				</g>
			</svg>
		</div>
	);
};
