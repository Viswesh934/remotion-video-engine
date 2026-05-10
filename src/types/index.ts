/**
 * Type Definitions Index
 * 
 * Central export point for all TypeScript types and interfaces
 */

// Video configuration types
export type {
	VideoFormat,
	VideoQuality,
	EasingFunction,
	TransitionType,
	AnimationConfig,
	AssetReference,
	TextContent,
	Position,
	SceneTiming,
	SceneConfig,
	ThemeConfig,
	RenderSettings,
	VideoConfig,
} from "./video-config";

// Video configuration utilities
export {
	calculateDuration,
	timeToFrames,
	framesToTime,
	getVideoDimensions,
	validateVideoConfig,
} from "./video-config";

// Component props types
export type {
	BaseComponentProps,
	TextProps,
	TitleProps,
	ContainerProps,
	GridProps,
	StackProps,
	BrowserProps,
	TerminalProps,
	CodeBlockProps,
	TimelineProps,
	DiagramProps,
	ArrowProps,
	BarChartProps,
	LineChartProps,
} from "./component-props";

// Template props types
export type {
	BaseTemplateProps,
	TechEvolutionProps,
	CodeExplainerProps,
	DocumentaryProps,
	ShortsProps,
} from "./template-props";
