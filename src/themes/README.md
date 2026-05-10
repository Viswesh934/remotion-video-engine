# Themes

This directory contains visual styling systems and theme configurations for the Remotion Video Engine.

## Purpose
- Define color palettes, typography, and visual styles
- Support multiple themes (dark, retro, neon, documentary)
- Provide consistent visual language across components
- Enable easy theme switching and customization

## Structure

### Core Files
- **`types.ts`** - TypeScript interfaces for theme structure
- **`ThemeProvider.tsx`** - React context provider for theme management
- **`useTheme.ts`** - Custom hooks for accessing theme values
- **`index.ts`** - Central export point for all theme functionality

### Theme Definitions
- **`dark.ts`** - Modern dark theme with high contrast (default)
- **`retro.ts`** - 80s/90s retro aesthetic with vibrant colors
- **`neon.ts`** - Cyberpunk neon aesthetic with electric colors
- **`documentary.ts`** - Clean, professional documentary style
- **`utils.ts`** - Theme utility functions for switching and management

### Demo
- **`ThemeDemo.tsx`** - Visual demonstration of theme system

## Usage

### Basic Setup

Wrap your application with `ThemeProvider`:

```tsx
import { ThemeProvider, darkTheme } from './themes';

function App() {
  return (
    <ThemeProvider initialTheme={darkTheme}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Using Theme Values

Access theme values using the `useTheme` hook:

```tsx
import { useTheme } from './themes';

function MyComponent() {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground,
      padding: theme.spacing.md 
    }}>
      Content
    </div>
  );
}
```

### Convenient Helper Hooks

Use specialized hooks for specific theme properties:

```tsx
import { useThemeColors, useThemeSpacing, useThemeTypography } from './themes';

function MyComponent() {
  const colors = useThemeColors();
  const spacing = useThemeSpacing();
  const typography = useThemeTypography();
  
  return (
    <div style={{ 
      backgroundColor: colors.background,
      padding: spacing.lg,
      fontFamily: typography.fontFamily
    }}>
      Content
    </div>
  );
}
```

### Theme Switching

Switch themes dynamically:

```tsx
import { useTheme } from './themes';

function ThemeSwitcher() {
  const { theme, setTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme.name}</p>
      {availableThemes.map(t => (
        <button key={t.id} onClick={() => setTheme(t.id)}>
          {t.name}
        </button>
      ))}
    </div>
  );
}
```

### CSS Variables

The ThemeProvider automatically applies CSS variables that can be used in CSS modules:

```css
.myComponent {
  background-color: var(--color-background);
  color: var(--color-foreground);
  padding: var(--spacing-md);
  font-family: var(--font-family);
  border-radius: var(--border-radius);
}
```

## Theme Structure

Each theme includes:

### Colors
- **Primary**: Main brand color
- **Secondary**: Secondary brand color
- **Accent**: Highlight color
- **Background**: Base background color
- **Foreground**: Text color
- **Muted**: Subdued/secondary text
- **Success/Warning/Error/Info**: State colors
- **Border**: Border and divider colors

### Typography
- **fontFamily**: Base font for body text
- **headingFontFamily**: Font for headings
- **monoFontFamily**: Monospace font for code
- **baseFontSize**: Base font size in pixels
- **lineHeight**: Line height multiplier
- **fontWeight**: Normal, medium, and bold weights
- **letterSpacing**: Letter spacing values

### Spacing
- **xs, sm, md, lg, xl, 2xl, 3xl**: Spacing scale in pixels

### Effects
- **borderRadius**: Corner rounding
- **shadowIntensity**: Shadow strength
- **blurAmount**: Blur effect strength
- **overlayOpacity**: Overlay transparency
- **glowIntensity**: Glow effect strength
- **animationDuration**: Default animation timing

## Creating Custom Themes

To create a new theme:

1. Create a new file (e.g., `custom.ts`)
2. Define a theme object following the `Theme` interface
3. Export the theme
4. Add it to the available themes in your ThemeProvider

```tsx
import type { Theme } from './types';

export const customTheme: Theme = {
  id: 'custom',
  name: 'Custom',
  description: 'My custom theme',
  colors: {
    primary: '#ff0000',
    secondary: '#00ff00',
    // ... other colors
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    baseFontSize: 16,
    lineHeight: 1.5,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  effects: {
    borderRadius: 8,
    shadowIntensity: 0.3,
  },
};
```

## Guidelines
- Use CSS variables for theme values when possible
- Keep themes minimal and focused
- Ensure accessibility (contrast ratios, readability)
- Test themes with all components
- Document theme-specific features or limitations
- Maintain consistent spacing and typography scales across themes

## Available Themes

### Dark Theme
**ID**: `dark`  
**Aesthetic**: Modern, professional, high contrast  
**Best for**: Technical content, code demonstrations, professional presentations

A modern dark theme with excellent readability and professional aesthetics. Features a dark slate background with blue and purple accents.

### Retro Theme
**ID**: `retro`  
**Aesthetic**: 80s/90s inspired, vibrant, nostalgic  
**Best for**: Tech history content, vintage computing topics, retro-styled presentations

An 80s/90s inspired theme with vibrant hot pink, bright yellow, and neon green colors. Features bold typography, sharp corners, and strong neon glow effects. Perfect for nostalgic content about vintage technology.

### Neon Theme
**ID**: `neon`  
**Aesthetic**: Cyberpunk, futuristic, electric  
**Best for**: Tech-forward content, cybersecurity topics, modern digital presentations

A cyberpunk-inspired theme with electric cyan, magenta, and matrix green colors. Features intense neon glow effects, minimal borders, and futuristic typography. Perfect for cutting-edge technology content.

### Documentary Theme
**ID**: `documentary`  
**Aesthetic**: Clean, professional, refined  
**Best for**: Educational content, professional presentations, documentary-style videos

A clean, professional theme with subtle colors and refined typography. Features a light background with muted teal, brown, and gold accents. Perfect for serious educational content and professional presentations.

## Theme Utilities

The theme system includes utility functions for advanced theme management:

### Get Theme by ID

```tsx
import { getThemeById, getThemeByIdOrDefault } from './themes';

const theme = getThemeById('neon');
const themeWithFallback = getThemeByIdOrDefault('invalid-id'); // Returns dark theme
```

### Theme Validation

```tsx
import { isValidThemeId, getAllThemeIds } from './themes';

if (isValidThemeId('neon')) {
  console.log('Valid theme!');
}

const allIds = getAllThemeIds(); // ['dark', 'retro', 'neon', 'documentary']
```

### Theme Switching Utility

```tsx
import { createThemeSwitcher, useTheme } from './themes';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  const switcher = createThemeSwitcher(setTheme);
  
  return (
    <div>
      <button onClick={() => switcher.next(theme.id)}>Next Theme</button>
      <button onClick={() => switcher.previous(theme.id)}>Previous Theme</button>
      <button onClick={() => switcher.switchTo('neon')}>Neon Theme</button>
    </div>
  );
}
```

### Get Themes by Tag

```tsx
import { getThemesByTag } from './themes';

const professionalThemes = getThemesByTag('professional'); // [darkTheme, documentaryTheme]
const vibrantThemes = getThemesByTag('vibrant'); // [retroTheme]
```

### Generate CSS Variables

```tsx
import { generateThemeCSSVariables } from './themes';

const cssVars = generateThemeCSSVariables(neonTheme);
// Returns object with CSS variable names and values
// { '--color-primary': '#00ffff', '--color-background': '#0a0e27', ... }
```
