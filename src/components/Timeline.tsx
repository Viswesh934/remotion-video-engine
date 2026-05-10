/**
 * Timeline Component
 * 
 * A chronological visualization component for displaying events along a timeline.
 * Supports both horizontal and vertical orientations with animated progression.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { TimelineProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn, useSlideIn } from "../animations";

/**
 * Timeline component for chronological visualization
 * 
 * @example
 * ```tsx
 * // Horizontal timeline
 * <Timeline 
 *   orientation="horizontal"
 *   events={[
 *     { id: "1", label: "2020", description: "Project started" },
 *     { id: "2", label: "2021", description: "First release" },
 *     { id: "3", label: "2022", description: "Major update" }
 *   ]}
 *   progress={0.5}
 *   animateProgress={true}
 * />
 * 
 * // Vertical timeline with custom colors
 * <Timeline 
 *   orientation="vertical"
 *   events={[
 *     { id: "1", label: "Phase 1", description: "Planning", color: "#3b82f6" },
 *     { id: "2", label: "Phase 2", description: "Development", color: "#10b981" }
 *   ]}
 * />
 * ```
 */
export const Timeline: React.FC<TimelineProps> = ({
	orientation = "horizontal",
	events,
	progress = 1,
	animateProgress = false,
	showMarkers = true,
	showLine = true,
	lineThickness = 2,
	width = "100%",
	height = "100%",
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
				const opacity = useFadeIn({ start, duration: duration / 2, easing });
				animationStyle = { transform, opacity };
				break;
			}
		}
	}
	
	// Calculate animated progress
	const currentProgress = useMemo(() => {
		if (!animateProgress) return progress;
		
		// Animate from 0 to progress over 60 frames
		const animationDuration = 60;
		const progressValue = Math.min(frame / animationDuration, 1) * progress;
		return progressValue;
	}, [animateProgress, progress, frame]);
	
	// Build component styles
	const timelineStyle = useMemo((): CSSProperties => {
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
	
	// Calculate event positions
	const eventPositions = useMemo(() => {
		if (events.length === 0) return [];
		
		return events.map((_, index) => {
			const position = events.length === 1 ? 0.5 : index / (events.length - 1);
			return position;
		});
	}, [events]);
	
	// Render timeline line
	const renderLine = () => {
		if (!showLine) return null;
		
		const lineStyle: CSSProperties = {
			backgroundColor: theme.colors.border,
			...(orientation === "horizontal" ? {
				width: "100%",
				height: `${lineThickness}px`,
			} : {
				width: `${lineThickness}px`,
				height: "100%",
			}),
		};
		
		const progressLineStyle: CSSProperties = {
			backgroundColor: theme.colors.primary,
			...(orientation === "horizontal" ? {
				width: `${currentProgress * 100}%`,
				height: "100%",
			} : {
				width: "100%",
				height: `${currentProgress * 100}%`,
			}),
			transition: animateProgress ? "none" : "all 0.3s ease",
		};
		
		return (
			<div className="" style={lineStyle}>
				<div className="" style={progressLineStyle} />
			</div>
		);
	};
	
	// Render event markers
	const renderEvents = () => {
		return events.map((event, index) => {
			const position = eventPositions[index];
			const isActive = currentProgress >= position;
			
			// Calculate fade-in for each event
			const eventDelay = index * 5;
			const eventOpacity = useFadeIn({ start: eventDelay, duration: 20, easing: "easeOut" });
			
			const markerStyle: CSSProperties = {
				...(orientation === "horizontal" ? {
					left: `${position * 100}%`,
				} : {
					top: `${position * 100}%`,
				}),
				opacity: eventOpacity,
			};
			
			const markerDotStyle: CSSProperties = {
				backgroundColor: isActive 
					? (event.color || theme.colors.primary)
					: theme.colors.border,
				borderColor: isActive 
					? (event.color || theme.colors.primary)
					: theme.colors.border,
				transform: isActive ? "scale(1.2)" : "scale(1)",
				transition: "all 0.3s ease",
			};
			
			return (
				<div 
					key={event.id}
					className=""
					style={markerStyle}
					data-orientation={orientation}
				>
					{showMarkers && (
						<div className="">
							{event.icon ? (
								<div className="">{event.icon}</div>
							) : (
								<div className="" style={markerDotStyle} />
							)}
						</div>
					)}
					
					<div className="">
						<div 
							className=""
							style={{ color: isActive ? theme.colors.text : theme.colors.textSecondary }}
						>
							{event.label}
						</div>
						
						{event.description && (
							<div 
								className=""
								style={{ color: theme.colors.textSecondary }}
							>
								{event.description}
							</div>
						)}
						
						{event.date && (
							<div 
								className=""
								style={{ color: theme.colors.textSecondary }}
							>
								{event.date}
							</div>
						)}
					</div>
				</div>
			);
		});
	};
	
	// Determine CSS classes
	const timelineClass = className || "";
	
	return (
		<div 
			className={timelineClass}
			style={timelineStyle}
			data-orientation={orientation}
		>
			<div className="">
				{renderLine()}
				<div className="">
					{renderEvents()}
				</div>
			</div>
		</div>
	);
};
