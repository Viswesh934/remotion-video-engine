/**
 * Terminal Component
 * 
 * A simulated terminal window component with command prompt, command history,
 * and typewriter effects. Supports syntax highlighting and theme-aware styling.
 */

import React, { useMemo, type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { TerminalProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn, useSlideIn } from "../animations";
import { useTypewriter } from "../animations/cinematic";

/**
 * Terminal component for displaying command-line interfaces
 * 
 * @example
 * ```tsx
 * // Basic terminal
 * <Terminal 
 *   title="bash"
 *   commands={[
 *     { command: "npm install", output: "Installing packages..." },
 *     { command: "npm run build", output: "Build successful!", delay: 60 }
 *   ]}
 * />
 * 
 * // With typewriter effect
 * <Terminal 
 *   commands={[
 *     { command: "git status", output: "On branch main" }
 *   ]}
 *   typewriterSpeed={0.5}
 *   showCursor={true}
 * />
 * 
 * // Custom styling
 * <Terminal 
 *   title="zsh"
 *   commands={[{ command: "ls -la" }]}
 *   terminalStyle="retro"
 *   width={800}
 *   height={600}
 *   animation={{ type: "slideIn", duration: 30 }}
 * />
 * ```
 */
export const Terminal: React.FC<TerminalProps> = ({
	title = "Terminal",
	commands,
	prompt = "$",
	showCursor = true,
	cursorBlinkSpeed = 15,
	typewriterSpeed = 1,
	width = "100%",
	height = "100%",
	position,
	terminalStyle = "modern",
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
	const terminalContainerStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: typeof height === "number" ? `${height}px` : height,
			backgroundColor: terminalStyle === "retro" 
				? "#000000" 
				: theme.colors.background,
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
	}, [width, height, position, terminalStyle, theme, animationStyle, style]);
	
	// Title bar styles
	const titleBarStyle = useMemo((): CSSProperties => {
		return {
			backgroundColor: terminalStyle === "retro"
				? "#1a1a1a"
				: theme.colors.muted,
			borderBottom: `1px solid ${theme.colors.border || "rgba(255, 255, 255, 0.1)"}`,
		};
	}, [terminalStyle, theme]);
	
	// Content area styles
	const contentStyle = useMemo((): CSSProperties => {
		return {
			fontFamily: theme.typography.monoFontFamily || "monospace",
			fontSize: `${theme.typography.baseFontSize * 0.875}px`,
			color: terminalStyle === "retro" ? "#00ff00" : theme.colors.foreground,
		};
	}, [terminalStyle, theme]);
	
	// Cursor blink animation
	const cursorVisible = useMemo(() => {
		if (!showCursor) return false;
		return Math.floor(frame / cursorBlinkSpeed) % 2 === 0;
	}, [frame, showCursor, cursorBlinkSpeed]);
	
	// Render command lines with typewriter effect
	const renderCommands = () => {
		let cumulativeDelay = 0;
		
		return commands.map((cmd, index) => {
			const commandDelay = cmd.delay || 0;
			const commandStart = cumulativeDelay + commandDelay;
			
			// Calculate typewriter effect for command
			const commandDuration = Math.ceil(cmd.command.length / typewriterSpeed);
			const commandTypewriter = useTypewriter({
				text: cmd.command,
				duration: commandDuration,
				start: commandStart,
				speed: typewriterSpeed,
			});
			
			// Calculate when output should appear
			const outputStart = commandStart + commandDuration + 5; // Small delay after command
			const outputDuration = cmd.output ? Math.ceil(cmd.output.length / typewriterSpeed) : 0;
			const outputTypewriter = cmd.output ? useTypewriter({
				text: cmd.output,
				duration: outputDuration,
				start: outputStart,
				speed: typewriterSpeed,
			}) : null;
			
			// Update cumulative delay for next command
			cumulativeDelay = outputStart + outputDuration + 10;
			
			// Determine if this is the active command (for cursor)
			const isActiveCommand = frame >= commandStart && frame < commandStart + commandDuration;
			const isActiveOutput = outputTypewriter && frame >= outputStart && frame < outputStart + outputDuration;
			
			// Only show if we've reached this command's start time
			if (frame < commandStart) {
				return null;
			}
			
			return (
				<div key={index} className="">
					{/* Command line */}
					<div className="">
						<span className="">{prompt}</span>
						<span className="">
							{highlightCommand(commandTypewriter.visibleText)}
						</span>
						{isActiveCommand && cursorVisible && (
							<span className="">▊</span>
						)}
					</div>
					
					{/* Output */}
					{outputTypewriter && frame >= outputStart && (
						<div className="">
							{outputTypewriter.visibleText}
							{isActiveOutput && cursorVisible && (
								<span className="">▊</span>
							)}
						</div>
					)}
				</div>
			);
		});
	};
	
	// Simple syntax highlighting for shell commands
	const highlightCommand = (text: string): React.ReactNode => {
		// Split by spaces to identify command parts
		const parts = text.split(/(\s+)/);
		
		return parts.map((part, index) => {
			// First non-whitespace part is the command
			if (index === 0 && part.trim()) {
				return <span key={index} className="">{part}</span>;
			}
			// Flags (start with -)
			if (part.startsWith("-")) {
				return <span key={index} className="">{part}</span>;
			}
			// Strings (quoted)
			if (part.startsWith('"') || part.startsWith("'")) {
				return <span key={index} className="">{part}</span>;
			}
			// Default
			return <span key={index}>{part}</span>;
		});
	};
	
	// Determine CSS classes
	const terminalClass = className || "";
	
	return (
		<div 
			className={terminalClass}
			style={terminalContainerStyle}
			data-terminal-style={terminalStyle}
		>
			{/* Title Bar */}
			<div className="" style={titleBarStyle}>
				{/* Window Controls */}
				<div className="">
					<span className="" data-color="red" />
					<span className="" data-color="yellow" />
					<span className="" data-color="green" />
				</div>
				
				{/* Title */}
				<div className="">{title}</div>
			</div>
			
			{/* Content Area */}
			<div className="" style={contentStyle}>
				{renderCommands()}
			</div>
		</div>
	);
};
