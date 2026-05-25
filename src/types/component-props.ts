/**
 * Component Props Interfaces
 * 
 * This file defines TypeScript interfaces for all reusable component props.
 * These interfaces ensure type safety and provide clear contracts for component usage.
 */

import type { CSSProperties, ReactNode } from "react";
import type { AnimationConfig, Position, TextContent } from "./video-config";

/**
 * Base props shared by all components
 */
export interface BaseComponentProps {
	/** Optional CSS class name */
	className?: string;
	/** Optional inline styles */
	style?: CSSProperties;
	/** Optional animation configuration */
	animation?: AnimationConfig;
	/** Optional theme override */
	theme?: string;
}

/**
 * Text component props
 */
export interface TextProps extends BaseComponentProps {
	/** Text content configuration */
	content: string | TextContent;
	/** Typography variant */
	variant?: "body" | "caption" | "subtitle" | "label";
	/** Text size override */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	/** Text weight */
	weight?: "normal" | "medium" | "semibold" | "bold";
	/** Text color (hex or CSS color) */
	color?: string;
	/** Text alignment */
	align?: "left" | "center" | "right";
	/** Maximum width */
	maxWidth?: number | string;
}

/**
 * Title component props
 */
export interface TitleProps extends BaseComponentProps {
	/** Title text */
	text: string;
	/** Title level (h1-h6) */
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	/** Subtitle text */
	subtitle?: string;
	/** Title size */
	size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
	/** Text alignment */
	align?: "left" | "center" | "right";
	/** Animated entrance effect */
	effect?: "fadeIn" | "slideIn" | "scaleIn" | "typewriter" | "glitch";
	/** Text color */
	color?: string;
	/** Subtitle color */
	subtitleColor?: string;
}

/**
 * Container component props
 */
export interface ContainerProps extends BaseComponentProps {
	/** Child elements */
	children: ReactNode;
	/** Container width */
	width?: number | string;
	/** Container height */
	height?: number | string;
	/** Padding */
	padding?: number | string;
	/** Background color */
	background?: string;
	/** Border radius */
	borderRadius?: number;
	/** Border style (CSS border shorthand) */
	border?: string;
	/** Position configuration */
	position?: Position;
	/** Center content horizontally */
	centerX?: boolean;
	/** Center content vertically */
	centerY?: boolean;
}

/**
 * Grid component props
 */
export interface GridProps extends BaseComponentProps {
	/** Child elements */
	children: ReactNode;
	/** Number of columns */
	columns?: number;
	/** Number of rows */
	rows?: number;
	/** Gap between items */
	gap?: number | string;
	/** Column gap */
	columnGap?: number | string;
	/** Row gap */
	rowGap?: number | string;
	/** Grid template columns (CSS grid syntax) */
	templateColumns?: string;
	/** Grid template rows (CSS grid syntax) */
	templateRows?: string;
	/** Align items */
	alignItems?: "start" | "center" | "end" | "stretch";
	/** Justify items */
	justifyItems?: "start" | "center" | "end" | "stretch";
}

/**
 * Stack component props
 */
export interface StackProps extends BaseComponentProps {
	/** Child elements */
	children: ReactNode;
	/** Stack direction */
	direction?: "horizontal" | "vertical";
	/** Spacing between items */
	spacing?: number | string;
	/** Align items */
	align?: "start" | "center" | "end" | "stretch";
	/** Justify content */
	justify?: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly";
	/** Wrap items */
	wrap?: boolean;
}

/**
 * Browser component props
 */
export interface BrowserProps extends BaseComponentProps {
	/** URL to display in address bar */
	url: string;
	/** Page title */
	title?: string;
	/** Browser content (screenshot, iframe, or custom content) */
	content: ReactNode | string;
	/** Browser chrome style */
	chromeStyle?: "modern" | "classic" | "minimal";
	/** Show navigation buttons */
	showNavigation?: boolean;
	/** Show address bar */
	showAddressBar?: boolean;
	/** Loading state */
	loading?: boolean;
	/** Loading progress (0-100) */
	loadingProgress?: number;
	/** Browser width */
	width?: number | string;
	/** Browser height */
	height?: number | string;
	/** Window position */
	position?: Position;
}

/**
 * Terminal component props
 */
export interface TerminalProps extends BaseComponentProps {
	/** Terminal title */
	title?: string;
	/** Command history to display */
	commands: Array<{
		/** Command text */
		command: string;
		/** Command output */
		output?: string;
		/** Delay before showing (in frames) */
		delay?: number;
	}>;
	/** Terminal prompt symbol */
	prompt?: string;
	/** Show cursor */
	showCursor?: boolean;
	/** Cursor blink speed (in frames) */
	cursorBlinkSpeed?: number;
	/** Typewriter effect speed (characters per frame) */
	typewriterSpeed?: number;
	/** Terminal width */
	width?: number | string;
	/** Terminal height */
	height?: number | string;
	/** Window position */
	position?: Position;
	/** Terminal visual style */
	terminalStyle?: "modern" | "retro" | "minimal";
}

/**
 * CodeBlock component props
 */
export interface CodeBlockProps extends BaseComponentProps {
	/** Code content */
	code: string;
	/** Programming language */
	language: "typescript" | "javascript" | "python" | "java" | "cpp" | "rust" | "go" | "html" | "css" | "json" | "yaml" | "bash" | "sql" | string;
	/** Show line numbers */
	showLineNumbers?: boolean;
	/** Highlighted line numbers */
	highlightLines?: number[];
	/** Starting line number */
	startLineNumber?: number;
	/** File name to display */
	fileName?: string;
	/** Code reveal animation */
	revealAnimation?: "none" | "line-by-line" | "character-by-character" | "fade";
	/** Reveal speed (lines or characters per frame) */
	revealSpeed?: number;
	/** Font size */
	fontSize?: number;
	/** Code color */
	codeColor?: string;
	/** Code block width */
	width?: number | string;
	/** Code block height */
	height?: number | string;
	/** Maximum height (scrollable) */
	maxHeight?: number | string;
}

/**
 * Timeline component props
 */
export interface TimelineProps extends BaseComponentProps {
	/** Timeline orientation */
	orientation?: "horizontal" | "vertical";
	/** Timeline events */
	events: Array<{
		/** Event ID */
		id: string;
		/** Event label */
		label: string;
		/** Event description */
		description?: string;
		/** Event date/time */
		date?: string;
		/** Event icon */
		icon?: ReactNode;
		/** Event color */
		color?: string;
	}>;
	/** Current progress (0-1) */
	progress?: number;
	/** Animate progression */
	animateProgress?: boolean;
	/** Show event markers */
	showMarkers?: boolean;
	/** Show connecting line */
	showLine?: boolean;
	/** Line thickness */
	lineThickness?: number;
	/** Timeline width (for horizontal) */
	width?: number | string;
	/** Timeline height (for vertical) */
	height?: number | string;
}

/**
 * Diagram component props
 */
export interface DiagramProps extends BaseComponentProps {
	/** Diagram nodes */
	nodes: Array<{
		/** Node ID */
		id: string;
		/** Node label */
		label: string;
		/** Node position */
		x: number;
		y: number;
		/** Node width */
		width?: number;
		/** Node height */
		height?: number;
		/** Node shape */
		shape?: "rectangle" | "circle" | "ellipse" | "diamond";
		/** Node color */
		color?: string;
		/** Node icon */
		icon?: ReactNode;
	}>;
	/** Diagram connections */
	connections?: Array<{
		/** Connection ID */
		id: string;
		/** Source node ID */
		from: string;
		/** Target node ID */
		to: string;
		/** Connection label */
		label?: string;
		/** Connection line style */
		lineStyle?: "solid" | "dashed" | "dotted";
		/** Connection color */
		color?: string;
		/** Arrow type */
		arrow?: "none" | "forward" | "backward" | "both";
	}>;
	/** Animate drawing */
	animateDrawing?: boolean;
	/** Drawing animation duration (in frames) */
	drawingDuration?: number;
	/** Diagram width */
	width?: number | string;
	/** Diagram height */
	height?: number | string;
}

/**
 * Arrow component props
 */
export interface ArrowProps extends BaseComponentProps {
	/** Start position */
	start: { x: number; y: number };
	/** End position */
	end: { x: number; y: number };
	/** Arrow color */
	color?: string;
	/** Arrow thickness */
	thickness?: number;
	/** Arrow head size */
	headSize?: number;
	/** Arrow line style */
	lineStyle?: "solid" | "dashed" | "dotted";
	/** Curved arrow */
	curved?: boolean;
	/** Curve amount (0-1) */
	curvature?: number;
	/** Animate drawing */
	animateDrawing?: boolean;
	/** Drawing duration (in frames) */
	drawingDuration?: number;
	/** Label text */
	label?: string;
	/** Label position (0-1 along arrow) */
	labelPosition?: number;
}

/**
 * BarChart component props
 */
export interface BarChartProps extends BaseComponentProps {
	/** Chart data */
	data: Array<{
		/** Data label */
		label: string;
		/** Data value */
		value: number;
		/** Bar color */
		color?: string;
	}>;
	/** Chart title */
	title?: string;
	/** X-axis label */
	xAxisLabel?: string;
	/** Y-axis label */
	yAxisLabel?: string;
	/** Show grid lines */
	showGrid?: boolean;
	/** Show values on bars */
	showValues?: boolean;
	/** Animate data entry */
	animateEntry?: boolean;
	/** Animation duration (in frames) */
	animationDuration?: number;
	/** Bar width */
	barWidth?: number;
	/** Gap between bars */
	barGap?: number;
	/** Chart width */
	width?: number | string;
	/** Chart height */
	height?: number | string;
	/** Orientation */
	orientation?: "vertical" | "horizontal";
}

/**
 * LineChart component props
 */
export interface LineChartProps extends BaseComponentProps {
	/** Chart data series */
	data: Array<{
		/** Series label */
		label: string;
		/** Series data points */
		points: Array<{ x: number; y: number }>;
		/** Line color */
		color?: string;
		/** Line thickness */
		thickness?: number;
	}>;
	/** Chart title */
	title?: string;
	/** X-axis label */
	xAxisLabel?: string;
	/** Y-axis label */
	yAxisLabel?: string;
	/** Show grid lines */
	showGrid?: boolean;
	/** Show data points */
	showPoints?: boolean;
	/** Show legend */
	showLegend?: boolean;
	/** Animate drawing */
	animateDrawing?: boolean;
	/** Animation duration (in frames) */
	animationDuration?: number;
	/** Chart width */
	width?: number | string;
	/** Chart height */
	height?: number | string;
	/** Smooth curves */
	smooth?: boolean;
}
