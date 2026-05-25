/**
 * CodeBlock Component
 * 
 * A code display component with syntax highlighting, line numbers, and animated
 * code reveal effects. Supports multiple programming languages with plain CSS styling.
 */

import React, {useMemo, type CSSProperties } from "react";
import { useCurrentFrame } from "remotion";
import type { CodeBlockProps } from "../types";
import { useTheme } from "../themes/useTheme";
import { useFadeIn, useSlideIn } from "../animations";

/**
 * CodeBlock component for displaying code with syntax highlighting
 * 
 * @example
 * ```tsx
 * // Basic code block
 * <CodeBlock 
 *   code="const hello = 'world';"
 *   language="typescript"
 * />
 * 
 * // With line numbers and highlighting
 * <CodeBlock 
 *   code={multilineCode}
 *   language="python"
 *   showLineNumbers={true}
 *   highlightLines={[3, 4, 5]}
 * />
 * 
 * // With animated reveal
 * <CodeBlock 
 *   code={code}
 *   language="javascript"
 *   fileName="app.js"
 *   revealAnimation="line-by-line"
 *   revealSpeed={0.5}
 * />
 * ```
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({
	code,
	language,
	showLineNumbers = true,
	highlightLines = [],
	startLineNumber = 1,
	fileName,
	revealAnimation = "none",
	revealSpeed = 1,
	fontSize,
	codeColor,
	width = "100%",
	height,
	maxHeight,
	className,
	style,
	animation,
}) => {
	const { theme } = useTheme();
	const frame = useCurrentFrame();
	
	// Split code into lines
	const lines = code.split("\n");
	
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
	
	// Build component styles
	const codeBlockStyle = useMemo((): CSSProperties => {
		const baseStyle: CSSProperties = {
			width: typeof width === "number" ? `${width}px` : width,
			height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
			maxHeight: maxHeight ? (typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight) : undefined,
			backgroundColor: theme.colors.background,
			borderRadius: theme.effects?.borderRadius || 8,
			overflow: "hidden",
			boxShadow: `0 2px 10px rgba(0, 0, 0, ${theme.effects?.shadowIntensity || 0.2})`,
			fontSize: fontSize ? `${fontSize}px` : `${theme.typography.baseFontSize * 0.875}px`,
		};
		
		return {
			...baseStyle,
			...animationStyle,
			...style,
		};
	}, [width, height, maxHeight, fontSize, theme, animationStyle, style]);
	
	// Calculate reveal animation
	const getVisibleLines = (): number => {
		if (revealAnimation === "none") return lines.length;
		
		if (revealAnimation === "line-by-line") {
			const linesPerFrame = revealSpeed / 30; // Convert to lines per frame
			return Math.min(Math.ceil(frame * linesPerFrame), lines.length);
		}
		
		if (revealAnimation === "fade") {
			// All lines visible, but with fade effect
			return lines.length;
		}
		
		return lines.length;
	};
	
	const getVisibleCharacters = (lineIndex: number): number => {
		if (revealAnimation !== "character-by-character") return lines[lineIndex].length;
		
		const charsPerFrame = revealSpeed;
		const totalCharsBeforeLine = lines.slice(0, lineIndex).reduce((sum, line) => sum + line.length + 1, 0);
		const totalVisibleChars = Math.floor(frame * charsPerFrame);
		const charsInThisLine = Math.max(0, totalVisibleChars - totalCharsBeforeLine);
		
		return Math.min(charsInThisLine, lines[lineIndex].length);
	};
	
	const visibleLines = getVisibleLines();
	
	// Syntax highlighting (simple token-based)
	const highlightSyntax = (line: string, lang: string): React.ReactNode => {
		// Keywords by language
		const keywords: Record<string, string[]> = {
			typescript: ["const", "let", "var", "function", "class", "interface", "type", "enum", "import", "export", "from", "return", "if", "else", "for", "while", "async", "await", "new", "this", "extends", "implements"],
			javascript: ["const", "let", "var", "function", "class", "import", "export", "from", "return", "if", "else", "for", "while", "async", "await", "new", "this", "extends"],
			python: ["def", "class", "import", "from", "return", "if", "else", "elif", "for", "while", "async", "await", "with", "as", "try", "except", "finally", "raise", "lambda"],
			java: ["public", "private", "protected", "class", "interface", "extends", "implements", "import", "return", "if", "else", "for", "while", "new", "this", "static", "final", "void"],
			rust: ["fn", "let", "mut", "const", "struct", "enum", "impl", "trait", "use", "pub", "return", "if", "else", "for", "while", "match", "async", "await"],
			go: ["func", "var", "const", "type", "struct", "interface", "import", "return", "if", "else", "for", "range", "go", "defer", "package"],
		};
		
		const langKeywords = keywords[lang] || keywords.typescript;
		
		// Simple tokenization
		const tokens: Array<{ type: string; value: string }> = [];
		let current = "";
		let inString = false;
		let stringChar = "";
		let inComment = false;
		
		for (let i = 0; i < line.length; i++) {
			const char = line[i];
			const nextChar = line[i + 1];
			
			// Comments
			if (!inString && char === "/" && nextChar === "/") {
				if (current) tokens.push({ type: "text", value: current });
				tokens.push({ type: "comment", value: line.slice(i) });
				break;
			}
			
			if (!inString && char === "/" && nextChar === "*") {
				if (current) tokens.push({ type: "text", value: current });
				inComment = true;
				current = "/*";
				i++;
				continue;
			}
			
			if (inComment && char === "*" && nextChar === "/") {
				current += "*/";
				tokens.push({ type: "comment", value: current });
				current = "";
				inComment = false;
				i++;
				continue;
			}
			
			if (inComment) {
				current += char;
				continue;
			}
			
			// Strings
			if (!inString && (char === '"' || char === "'" || char === "`")) {
				if (current) tokens.push({ type: "text", value: current });
				current = char;
				inString = true;
				stringChar = char;
				continue;
			}
			
			if (inString && char === stringChar && line[i - 1] !== "\\") {
				current += char;
				tokens.push({ type: "string", value: current });
				current = "";
				inString = false;
				stringChar = "";
				continue;
			}
			
			if (inString) {
				current += char;
				continue;
			}
			
			// Word boundaries
			if (/\s/.test(char) || /[{}()\[\];,.]/.test(char)) {
				if (current) {
					// Check if keyword
					if (langKeywords.includes(current)) {
						tokens.push({ type: "keyword", value: current });
					} else if (/^\d+$/.test(current)) {
						tokens.push({ type: "number", value: current });
					} else if (/^[A-Z][a-zA-Z0-9]*$/.test(current)) {
						tokens.push({ type: "class", value: current });
					} else {
						tokens.push({ type: "text", value: current });
					}
					current = "";
				}
				
				if (/[{}()\[\];,.]/.test(char)) {
					tokens.push({ type: "punctuation", value: char });
				} else {
					tokens.push({ type: "text", value: char });
				}
			} else {
				current += char;
			}
		}
		
		// Push remaining
		if (current) {
			if (inString) {
				tokens.push({ type: "string", value: current });
			} else if (langKeywords.includes(current)) {
				tokens.push({ type: "keyword", value: current });
			} else if (/^\d+$/.test(current)) {
				tokens.push({ type: "number", value: current });
			} else {
				tokens.push({ type: "text", value: current });
			}
		}
		
		// Token color helper
		const getTokenColor = (type: string): string => {
			switch (type) {
				case "keyword": return "#c678dd";
				case "string": return "#98c379";
				case "number": return "#d19a66";
				case "comment": return "#5c6370";
				case "class": return "#e5c07b";
				case "punctuation": return "#abb2bf";
				default: return "#abb2bf";
			}
		};
		
		return tokens.map((token, i) => (
			<span key={i} style={{ color: getTokenColor(token.type) }}>
				{token.value}
			</span>
		));
	};
	
	// Render lines
	const renderLines = () => {
		return lines.map((line, index) => {
			if (index >= visibleLines) return null;
			
			const lineNumber = startLineNumber + index;
			
			// Get visible portion of line for character-by-character reveal
			const visibleChars = getVisibleCharacters(index);
			const visibleLine = revealAnimation === "character-by-character" 
				? line.slice(0, visibleChars)
				: line;
			
			// Calculate fade for fade animation
			const lineFadeOpacity = revealAnimation === "fade"
				? useFadeIn({ start: index * 2, duration: 20, easing: "easeOut" })
				: 1;
			
			return (
				<div 
					key={index}
					className=""
					style={{ opacity: lineFadeOpacity }}
					data-line-number={lineNumber}
				>
					{showLineNumbers && (
						<span className="">{lineNumber}</span>
					)}
					<span className="">
						{highlightSyntax(visibleLine, language)}
					</span>
				</div>
			);
		});
	};
	
	// Determine CSS classes
	const codeBlockClass = className || "";
	
	return (
		<div 
			className={codeBlockClass}
			style={codeBlockStyle}
			data-language={language}
		>
			{/* File name header */}
			{fileName && (
				<div className="">
					<span className="">{fileName}</span>
					<span className="">{language}</span>
				</div>
			)}
			
			{/* Code content */}
			<div className="">
				<pre className="">
					<code className="">
						{renderLines()}
					</code>
				</pre>
			</div>
		</div>
	);
};
