/**
 * Browser Component
 * 
 * A simulated browser window component with address bar, navigation buttons,
 * and content area. Supports loading states, animations, and theme-aware styling.
 */

import React, { useMemo, type CSSProperties, type ReactNode } from "react";
import type { BrowserProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn, useSlideIn } from "../animations";

/**
 * Browser component for displaying web content in a simulated browser window
 * 
 * @example
 * ```tsx
 * // Basic browser with URL
 * <Browser 
 *   url="https://example.com"
 *   title="Example Website"
 *   content={<img src="screenshot.png" />}
 * />
 * 
 * // With loading state
 * <Browser 
 *   url="https://example.com"
 *   loading={true}
 *   loadingProgress={75}
 *   content="Loading..."
 * />
 * 
 * // Custom styling and animation
 * <Browser 
 *   url="https://example.com"
 *   content={<div>Custom content</div>}
 *   chromeStyle="minimal"
 *   width={1200}
 *   height={800}
 *   animation={{ type: "fadeIn", duration: 30 }}
 * />
 * ```
 */
export const Browser: React.FC<BrowserProps> = ({
	url,
	title,
	content,
	chromeStyle = "modern",
	showNavigation = true,
	showAddressBar = true,
	loading = false,
	loadingProgress = 0,
	width = "100%",
	height = "100%",
	position,
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	
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
				const direction = (animation as any).direction || "bottom";
				const distance = (animation as any).distance || 50;
				const transform = useSlideIn({ start, duration, easing, direction, distance });
				const opacity = useFadeIn({ start, duration: duration / 2, easing });
				animationStyle = { transform, opacity };
				break;
			}
		}
	}
	
	// Build component styles
	const browserStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: typeof height === "number" ? `${height}px` : height,
			backgroundColor: theme.colors.background,
			borderRadius: theme.effects?.borderRadius || 8,
			overflow: "hidden",
			boxShadow: `0 4px 20px rgba(0, 0, 0, ${theme.effects?.shadowIntensity || 0.3})`,
		};
		
		// Apply positioning
		if (position) {
			baseStyle.position = "absolute";
			if (position.x !== undefined) {
				baseStyle.left = typeof position.x === "number" ? `${position.x}px` : position.x;
			}
			if (position.y !== undefined) {
				baseStyle.top = typeof position.y === "number" ? `${position.y}px` : position.y;
			}
		}
		
		return {
			...baseStyle,
			...animationStyle,
			...style,
		};
	}, [width, height, position, theme, animationStyle, style]);
	
	// Chrome header styles
	const chromeHeaderStyle = useMemo((): CSSProperties => {
		return {
			backgroundColor: chromeStyle === "minimal" 
				? theme.colors.background 
				: theme.colors.muted,
			borderBottom: `1px solid ${theme.colors.border || theme.colors.muted}`,
		};
	}, [chromeStyle, theme]);
	
	// Address bar styles
	const addressBarStyle = useMemo((): CSSProperties => {
		return {
			backgroundColor: chromeStyle === "minimal"
				? theme.colors.muted
				: theme.colors.background,
			color: theme.colors.foreground,
			fontFamily: theme.typography.fontFamily,
			fontSize: `${theme.typography.baseFontSize * 0.875}px`,
		};
	}, [chromeStyle, theme]);
	
	// Loading bar animation
	const loadingBarStyle = useMemo((): CSSProperties => {
		if (!loading) return { width: "0%" };
		
		// Animate loading progress
		const progress = Math.min(loadingProgress, 100);
		
		return {
			width: `${progress}%`,
			backgroundColor: theme.colors.accent,
			transition: "width 0.3s ease-out",
		};
	}, [loading, loadingProgress, theme]);
	
	// Render content
	const renderContent = (): ReactNode => {
		if (typeof content === "string") {
			// If content is a string (URL), render as iframe or image
			if (content.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
				return <img src={content} alt={title || "Browser content"} className="" />;
			}
			return <div className="">{content}</div>;
		}
		return content;
	};
	
	// Determine CSS classes
	const browserClass = className || "";
	
	return (
		<div 
			className={browserClass}
			style={browserStyle}
			data-chrome-style={chromeStyle}
		>
			{/* Browser Chrome Header */}
			<div className="" style={chromeHeaderStyle}>
				{/* Window Controls */}
				<div className="">
					<span className="" data-color="red" />
					<span className="" data-color="yellow" />
					<span className="" data-color="green" />
				</div>
				
				{/* Navigation Buttons */}
				{showNavigation && (
					<div className="">
						<button className="" aria-label="Back">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M10 2L4 8l6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<button className="" aria-label="Forward">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M6 2l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
							</svg>
						</button>
						<button className="" aria-label="Refresh">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
								<path d="M14 8a6 6 0 11-12 0 6 6 0 0112 0z" stroke="currentColor" strokeWidth="1.5" fill="none" />
								<path d="M8 4v4l2 2" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
							</svg>
						</button>
					</div>
				)}
				
				{/* Address Bar */}
				{showAddressBar && (
					<div className="">
						<div className="" style={addressBarStyle}>
							<svg className="" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
								<path d="M7 1a3 3 0 00-3 3v1H3a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V6a1 1 0 00-1-1H9V4a2 2 0 00-2-2zm0 1a2 2 0 012 2v1H5V4a2 2 0 012-2z" />
							</svg>
							<span className="">{url}</span>
						</div>
					</div>
				)}
				
				{/* Page Title (for classic style) */}
				{chromeStyle === "classic" && title && (
					<div className="">{title}</div>
				)}
			</div>
			
			{/* Loading Bar */}
			{loading && (
				<div className="">
					<div className="" style={loadingBarStyle} />
				</div>
			)}
			
			{/* Content Area */}
			<div className="">
				{renderContent()}
			</div>
		</div>
	);
};
