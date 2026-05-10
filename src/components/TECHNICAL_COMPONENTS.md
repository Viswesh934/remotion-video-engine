# Technical Components

This document describes the technical components for code demonstrations and tech content in the Remotion Video Engine.

## Overview

The technical components provide simulated interfaces for displaying code, terminal commands, and browser windows in video content. All components support:

- Theme-aware styling using the theme system
- Animation support (fade, slide, etc.)
- Customizable dimensions and positioning
- TypeScript type safety

## Components

### Browser

Simulates a browser window with address bar, navigation buttons, and content area.

**Props:**
- `url` (string, required): URL to display in address bar
- `title` (string, optional): Page title
- `content` (ReactNode | string, required): Browser content (screenshot, iframe, or custom content)
- `chromeStyle` ("modern" | "classic" | "minimal", default: "modern"): Browser chrome style
- `showNavigation` (boolean, default: true): Show navigation buttons
- `showAddressBar` (boolean, default: true): Show address bar
- `loading` (boolean, default: false): Loading state
- `loadingProgress` (number, 0-100): Loading progress percentage
- `width` (number | string, default: "100%"): Browser width
- `height` (number | string, default: "100%"): Browser height
- `position` (Position, optional): Window position
- `animation` (AnimationConfig, optional): Animation configuration

**Features:**
- Window control buttons (red, yellow, green dots)
- Back/forward/refresh navigation buttons
- Address bar with lock icon and URL
- Loading progress bar
- Three chrome styles: modern, classic, minimal
- Support for image URLs or custom React content

**Example:**
```tsx
<Browser 
  url="https://example.com"
  title="Example Website"
  content={<img src="screenshot.png" />}
  chromeStyle="modern"
  width={1200}
  height={800}
  loading={true}
  loadingProgress={75}
  animation={{ type: "fadeIn", duration: 30 }}
/>
```

### Terminal

Simulates a terminal window with command prompt and command history display.

**Props:**
- `title` (string, default: "Terminal"): Terminal title
- `commands` (array, required): Command history to display
  - Each command object has:
    - `command` (string): Command text
    - `output` (string, optional): Command output
    - `delay` (number, optional): Delay before showing (in frames)
- `prompt` (string, default: "$"): Terminal prompt symbol
- `showCursor` (boolean, default: true): Show cursor
- `cursorBlinkSpeed` (number, default: 15): Cursor blink speed (in frames)
- `typewriterSpeed` (number, default: 1): Typewriter effect speed (characters per frame)
- `width` (number | string, default: "100%"): Terminal width
- `height` (number | string, default: "100%"): Terminal height
- `position` (Position, optional): Window position
- `terminalStyle` ("modern" | "retro" | "minimal", default: "modern"): Terminal visual style
- `animation` (AnimationConfig, optional): Animation configuration

**Features:**
- Window control buttons
- Customizable title bar
- Command prompt with typewriter effect
- Syntax highlighting for shell commands (command names, flags, strings)
- Blinking cursor animation
- Three terminal styles: modern, retro (green on black), minimal
- Sequential command display with delays

**Example:**
```tsx
<Terminal 
  title="bash"
  commands={[
    { command: "npm install", output: "Installing packages..." },
    { command: "npm run build", output: "Build successful!", delay: 60 }
  ]}
  prompt="$"
  typewriterSpeed={0.5}
  terminalStyle="retro"
  width={800}
  height={600}
  animation={{ type: "slideIn", duration: 30 }}
/>
```

### CodeBlock

Displays code with syntax highlighting, line numbers, and animated reveal effects.

**Props:**
- `code` (string, required): Code content
- `language` (string, required): Programming language (typescript, javascript, python, java, cpp, rust, go, html, css, json, yaml, bash, sql, etc.)
- `showLineNumbers` (boolean, default: true): Show line numbers
- `highlightLines` (number[], default: []): Highlighted line numbers
- `startLineNumber` (number, default: 1): Starting line number
- `fileName` (string, optional): File name to display in header
- `revealAnimation` ("none" | "line-by-line" | "character-by-character" | "fade", default: "none"): Code reveal animation
- `revealSpeed` (number, default: 1): Reveal speed (lines or characters per frame)
- `fontSize` (number, optional): Font size override
- `width` (number | string, default: "100%"): Code block width
- `height` (number | string, optional): Code block height
- `maxHeight` (number | string, optional): Maximum height (scrollable)
- `animation` (AnimationConfig, optional): Animation configuration

**Features:**
- Syntax highlighting for multiple languages using plain CSS
- Line numbering with customizable start
- Line highlighting for emphasis
- File name header with language badge
- Four reveal animations: none, line-by-line, character-by-character, fade
- Scrollable content area
- Monospace font styling
- Token-based syntax highlighting (keywords, strings, numbers, comments, classes, punctuation)

**Supported Languages:**
- TypeScript/JavaScript
- Python
- Java
- C++
- Rust
- Go
- HTML/CSS
- JSON/YAML
- Bash/Shell
- SQL

**Example:**
```tsx
const code = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}`;

<CodeBlock 
  code={code}
  language="typescript"
  fileName="greet.ts"
  showLineNumbers={true}
  highlightLines={[2]}
  revealAnimation="line-by-line"
  revealSpeed={0.5}
  width={800}
  animation={{ type: "fadeIn", duration: 30 }}
/>
```

## Styling

All components use CSS modules with theme-aware styling through CSS variables:

- `--color-*`: Color variables from theme
- `--font-family-*`: Font family variables
- `--spacing-*`: Spacing scale variables
- `--border-radius`: Border radius from theme effects

Components automatically adapt to the active theme through the ThemeProvider.

## Animation Support

All components support the standard animation configuration:

```typescript
animation={{
  type: "fadeIn" | "slideIn",
  duration: 30,  // frames
  delay: 0,      // frames
  easing: "easeInOut"
}}
```

For `slideIn` animations, additional properties:
- `direction`: "left" | "right" | "top" | "bottom"
- `distance`: number (pixels)

## Usage with Theme System

Wrap components in ThemeProvider to enable theme support:

```tsx
import { ThemeProvider } from "../themes/ThemeProvider";
import { darkTheme } from "../themes/dark";
import { Browser, Terminal, CodeBlock } from "../components";

<ThemeProvider initialTheme={darkTheme}>
  <Browser url="https://example.com" content={...} />
  <Terminal commands={[...]} />
  <CodeBlock code="..." language="typescript" />
</ThemeProvider>
```

## Demo Composition

See `TechnicalComponentsDemo.tsx` for a complete example showcasing all three components with animations and theme integration.

## Implementation Notes

- **Browser**: Uses SVG icons for navigation buttons, supports both image URLs and custom React content
- **Terminal**: Implements typewriter effect using the `useTypewriter` hook from cinematic animations
- **CodeBlock**: Uses token-based syntax highlighting without external libraries, purely CSS-based

All components are fully typed with TypeScript and follow the project's component patterns and conventions.
