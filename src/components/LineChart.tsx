/**
 * LineChart Component
 * 
 * A line chart visualization component with animated drawing.
 * Supports multiple data series and smooth curves.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import type { LineChartProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn } from "../animations";

/**
 * LineChart component for data visualization
 * 
 * @example
 * ```tsx
 * <LineChart 
 *   data={[
 *     {
 *       label: "Series A",
 *       points: [{ x: 0, y: 10 }, { x: 1, y: 20 }, { x: 2, y: 15 }],
 *       color: "#3b82f6"
 *     },
 *     {
 *       label: "Series B",
 *       points: [{ x: 0, y: 5 }, { x: 1, y: 15 }, { x: 2, y: 25 }],
 *       color: "#10b981"
 *     }
 *   ]}
 *   title="Performance Over Time"
 *   animateDrawing={true}
 *   showPoints={true}
 *   showLegend={true}
 * />
 * ```
 */
export const LineChart: React.FC<LineChartProps> = ({
	data,
	title,
	xAxisLabel,
	yAxisLabel,
	showGrid = true,
	showPoints = false,
	showLegend = true,
	animateDrawing = false,
	animationDuration = 60,
	width = 600,
	height = 400,
	smooth = false,
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
	const { minX, maxX, minY, maxY } = useMemo(() => {
		let minX = Infinity, maxX = -Infinity;
		let minY = Infinity, maxY = -Infinity;
		
		data.forEach(series => {
			series.points.forEach(point => {
				minX = Math.min(minX, point.x);
				maxX = Math.max(maxX, point.x);
				minY = Math.min(minY, point.y);
				maxY = Math.max(maxY, point.y);
			});
		});
		
		return { minX, maxX, minY, maxY };
	}, [data]);
	
	const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * chartWidth;
	const scaleY = (y: number) => chartHeight - ((y - minY) / (maxY - minY)) * chartHeight;
	
	// Generate path for a series
	const generatePath = (points: Array<{ x: number; y: number }>, progress: number = 1) => {
		if (points.length === 0) return "";
		
		const visiblePoints = Math.ceil(points.length * progress);
		const pathPoints = points.slice(0, visiblePoints);
		
		if (pathPoints.length === 0) return "";
		
		if (!smooth || pathPoints.length < 3) {
			// Straight lines
			let path = `M ${scaleX(pathPoints[0].x)} ${scaleY(pathPoints[0].y)}`;
			for (let i = 1; i < pathPoints.length; i++) {
				path += ` L ${scaleX(pathPoints[i].x)} ${scaleY(pathPoints[i].y)}`;
			}
			return path;
		}
		
		// Smooth curves using quadratic bezier
		let path = `M ${scaleX(pathPoints[0].x)} ${scaleY(pathPoints[0].y)}`;
		
		for (let i = 1; i < pathPoints.length; i++) {
			const prev = pathPoints[i - 1];
			const curr = pathPoints[i];
			
			// Control point at midpoint
			const cpX = (scaleX(prev.x) + scaleX(curr.x)) / 2;
			const cpY = (scaleY(prev.y) + scaleY(curr.y)) / 2;
			
			path += ` Q ${scaleX(prev.x)} ${scaleY(prev.y)}, ${cpX} ${cpY}`;
			
			if (i === pathPoints.length - 1) {
				path += ` L ${scaleX(curr.x)} ${scaleY(curr.y)}`;
			}
		}
		
		return path;
	};
	
	// Render grid lines
	const renderGrid = () => {
		if (!showGrid) return null;
		
		const gridLines = 5;
		const lines = [];
		
		// Horizontal grid lines
		for (let i = 0; i <= gridLines; i++) {
			const y = (chartHeight / gridLines) * i;
			const value = maxY - ((maxY - minY) / gridLines) * i;
			
			lines.push(
				<g key={`h-${i}`}>
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
						{value.toFixed(1)}
					</text>
				</g>
			);
		}
		
		// Vertical grid lines
		for (let i = 0; i <= gridLines; i++) {
			const x = (chartWidth / gridLines) * i;
			const value = minX + ((maxX - minX) / gridLines) * i;
			
			lines.push(
				<g key={`v-${i}`}>
					<line
						x1={x}
						y1={0}
						x2={x}
						y2={chartHeight}
						stroke={theme.colors.border}
						strokeWidth={1}
						strokeDasharray="4,4"
						opacity={0.3}
					/>
					<text
						x={x}
						y={chartHeight + 20}
						textAnchor="middle"
						fill={theme.colors.textSecondary}
						fontSize={11}
						fontFamily={theme.typography.fontFamily}
					>
						{value.toFixed(1)}
					</text>
				</g>
			);
		}
		
		return <g className="">{lines}</g>;
	};
	
	// Render data series
	const renderSeries = () => {
		return data.map((series, seriesIndex) => {
			const seriesColor = series.color || theme.colors.primary;
			const lineThickness = series.thickness || 2;
			
			// Calculate animation progress for this series
			const seriesDelay = animateDrawing ? (seriesIndex / data.length) * animationDuration * 0.3 : 0;
			const seriesDuration = animateDrawing ? animationDuration * 0.7 : 0;
			const seriesProgress = interpolate(
				frame,
				[seriesDelay, seriesDelay + seriesDuration],
				[0, 1],
				{ extrapolateRight: "clamp", extrapolateLeft: "clamp" }
			);
			
			const progress = animateDrawing ? seriesProgress : 1;
			const path = generatePath(series.points, progress);
			
			const visiblePointCount = Math.ceil(series.points.length * progress);
			
			return (
				<g key={seriesIndex}>
					{/* Line path */}
					<path
						d={path}
						stroke={seriesColor}
						strokeWidth={lineThickness}
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					
					{/* Data points */}
					{showPoints && series.points.slice(0, visiblePointCount).map((point, pointIndex) => {
						const pointOpacity = interpolate(
							frame,
							[seriesDelay + (pointIndex / series.points.length) * seriesDuration,
							 seriesDelay + (pointIndex / series.points.length) * seriesDuration + 10],
							[0, 1],
							{ extrapolateRight: "clamp", extrapolateLeft: "clamp" }
						);
						
						return (
							<circle
								key={pointIndex}
								cx={scaleX(point.x)}
								cy={scaleY(point.y)}
								r={4}
								fill={seriesColor}
								opacity={animateDrawing ? pointOpacity : 1}
							/>
						);
					})}
				</g>
			);
		});
	};
	
	// Render legend
	const renderLegend = () => {
		if (!showLegend || data.length === 0) return null;
		
		const legendX = chartWidth - 120;
		const legendY = 20;
		
		return (
			<g className="">
				{data.map((series, index) => {
					const y = legendY + index * 25;
					const seriesColor = series.color || theme.colors.primary;
					
					return (
						<g key={index}>
							<line
								x1={legendX}
								y1={y}
								x2={legendX + 30}
								y2={y}
								stroke={seriesColor}
								strokeWidth={series.thickness || 2}
							/>
							<text
								x={legendX + 40}
								y={y}
								dominantBaseline="middle"
								fill={theme.colors.text}
								fontSize={12}
								fontFamily={theme.typography.fontFamily}
							>
								{series.label}
							</text>
						</g>
					);
				})}
			</g>
		);
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
					
					{/* Data series */}
					{renderSeries()}
					
					{/* Legend */}
					{renderLegend()}
					
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
