# Themes Overview

Quick reference guide for all available themes in the Remotion Video Engine.

## Theme Comparison

| Feature | Dark | Retro | Neon | Documentary |
|---------|------|-------|------|-------------|
| **Background** | Dark slate (#0f172a) | Deep purple (#2d1b4e) | Deep space blue (#0a0e27) | Off-white (#f8f9fa) |
| **Primary Color** | Blue (#3b82f6) | Hot pink (#ff6b9d) | Cyan neon (#00ffff) | Deep teal (#2c5f7c) |
| **Aesthetic** | Modern, professional | Vibrant, nostalgic | Electric, futuristic | Clean, refined |
| **Glow Intensity** | 0.5 (subtle) | 1.0 (strong) | 1.5 (intense) | 0.2 (minimal) |
| **Border Radius** | 8px (rounded) | 0px (sharp) | 2px (minimal) | 4px (subtle) |
| **Font Style** | Sans-serif, clean | Pixel/retro, bold | Futuristic, wide | Serif, classic |
| **Best For** | Technical content | Retro tech topics | Cyberpunk content | Educational videos |

## Color Palettes

### Dark Theme
```
Primary:    #3b82f6 (Blue)
Secondary:  #8b5cf6 (Purple)
Accent:     #06b6d4 (Cyan)
Background: #0f172a (Dark slate)
Foreground: #f1f5f9 (Light slate)
```

### Retro Theme
```
Primary:    #ff6b9d (Hot pink)
Secondary:  #ffd93d (Bright yellow)
Accent:     #6bcf7f (Neon green)
Background: #2d1b4e (Deep purple)
Foreground: #fef9ef (Cream white)
```

### Neon Theme
```
Primary:    #00ffff (Cyan neon)
Secondary:  #ff00ff (Magenta neon)
Accent:     #00ff41 (Matrix green)
Background: #0a0e27 (Deep space blue)
Foreground: #e0f7ff (Electric white)
```

### Documentary Theme
```
Primary:    #2c5f7c (Deep teal)
Secondary:  #8b7355 (Warm brown)
Accent:     #d4a574 (Gold accent)
Background: #f8f9fa (Off-white)
Foreground: #1a1a1a (Near black)
```

## Typography

### Dark Theme
- **Body**: Inter, system sans-serif
- **Heading**: Inter
- **Code**: JetBrains Mono, Fira Code
- **Size**: 16px base
- **Weight**: 400/500/700

### Retro Theme
- **Body**: Press Start 2P, Courier New (pixel style)
- **Heading**: Press Start 2P, Impact
- **Code**: Courier New
- **Size**: 14px base
- **Weight**: 400/600/900 (bold for impact)

### Neon Theme
- **Body**: Rajdhani, Orbitron (futuristic)
- **Heading**: Orbitron, Rajdhani
- **Code**: Share Tech Mono, Roboto Mono
- **Size**: 16px base
- **Weight**: 400/600/800

### Documentary Theme
- **Body**: Merriweather, Georgia (serif)
- **Heading**: Lato, Helvetica Neue (sans-serif)
- **Code**: Source Code Pro, Menlo
- **Size**: 18px base (larger for readability)
- **Weight**: 400/500/700

## Visual Effects

### Dark Theme
- Subtle shadows with moderate intensity
- Smooth rounded corners (8px)
- Moderate glow effects
- Professional and polished

### Retro Theme
- Strong, colorful shadows (offset style)
- Sharp corners (0px) for retro aesthetic
- Intense neon glow with multiple layers
- Scanline and chromatic aberration effects

### Neon Theme
- Intense glowing shadows
- Minimal corners (2px)
- Multi-layer neon glow effects
- Flicker, glitch, and hologram effects

### Documentary Theme
- Soft, natural shadows
- Subtle corners (4px)
- Minimal glow effects
- Vignette, film grain, and sepia tones

## Usage Recommendations

### Dark Theme
✅ Technical tutorials  
✅ Code walkthroughs  
✅ Professional presentations  
✅ Modern tech content  
❌ Vintage/retro content  
❌ Light, airy content  

### Retro Theme
✅ Tech history videos  
✅ Vintage computing topics  
✅ 80s/90s nostalgia content  
✅ Gaming history  
❌ Modern, sleek content  
❌ Professional business content  

### Neon Theme
✅ Cybersecurity topics  
✅ Futuristic tech  
✅ Hacking/coding content  
✅ Cyberpunk aesthetics  
❌ Traditional/conservative content  
❌ Educational/academic content  

### Documentary Theme
✅ Educational videos  
✅ Historical content  
✅ Professional documentaries  
✅ Academic presentations  
❌ High-energy content  
❌ Gaming/entertainment content  

## Animation Characteristics

| Theme | Duration | Style | Energy |
|-------|----------|-------|--------|
| **Dark** | 300ms | Smooth, professional | Medium |
| **Retro** | 200ms | Snappy, immediate | High |
| **Neon** | 400ms | Fluid, smooth | Medium-High |
| **Documentary** | 500ms | Elegant, refined | Low-Medium |

## Quick Start Examples

### Using Dark Theme
```tsx
import { ThemeProvider, darkTheme } from './themes';

<ThemeProvider initialTheme={darkTheme}>
  <YourVideo />
</ThemeProvider>
```

### Using Retro Theme
```tsx
import { ThemeProvider, retroTheme } from './themes';

<ThemeProvider initialTheme={retroTheme}>
  <YourVideo />
</ThemeProvider>
```

### Using Neon Theme
```tsx
import { ThemeProvider, neonTheme } from './themes';

<ThemeProvider initialTheme={neonTheme}>
  <YourVideo />
</ThemeProvider>
```

### Using Documentary Theme
```tsx
import { ThemeProvider, documentaryTheme } from './themes';

<ThemeProvider initialTheme={documentaryTheme}>
  <YourVideo />
</ThemeProvider>
```

### Switching Between Themes
```tsx
import { ThemeProvider, allThemes } from './themes';

<ThemeProvider initialTheme={allThemes[0]} themes={allThemes}>
  <YourVideo />
</ThemeProvider>
```
