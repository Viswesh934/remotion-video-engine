# Remotion Video Engine Configuration

## Overview

This document describes the configuration system for the Remotion Video Engine, including Remotion settings, environment variables, and video specifications.

## Remotion Configuration

The `remotion.config.ts` file contains the default settings for video rendering:

### Default Video Settings

- **Dimensions**: 1920x1080 (Full HD, 16:9 aspect ratio)
- **Frame Rate**: 30 fps
- **Image Format**: JPEG
- **Codec**: H.264
- **Overwrite Output**: Enabled

### Webpack Asset Handling

The configuration includes custom webpack overrides for handling various asset types:

#### Fonts
- Supported formats: `.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`
- Output directory: `fonts/`

#### Images
- Supported formats: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`
- Output directory: `images/`

#### Audio
- Supported formats: `.mp3`, `.wav`, `.ogg`, `.m4a`
- Output directory: `audio/`

## Environment Variables

Copy `.env.example` to `.env` and customize the following settings:

### Video Quality Settings

```bash
REMOTION_QUALITY=80              # JPEG quality (0-100)
REMOTION_CONCURRENCY=50%         # CPU cores to use (percentage or number)
```

### Output Settings

```bash
REMOTION_OUTPUT_DIR=./out        # Output directory for rendered videos
REMOTION_OVERWRITE=true          # Overwrite existing output files
```

### Performance Settings

```bash
REMOTION_TIMEOUT=30000           # Render timeout in milliseconds
REMOTION_BROWSER_EXECUTABLE=     # Custom browser path (optional)
```

### Codec Settings

```bash
REMOTION_CODEC=h264              # Video codec (h264, h265, vp8, vp9)
REMOTION_PIXEL_FORMAT=yuv420p    # Pixel format
REMOTION_CRF=18                  # Constant Rate Factor (0-51, lower = better quality)
```

### Audio Settings

```bash
REMOTION_AUDIO_CODEC=aac         # Audio codec
REMOTION_AUDIO_BITRATE=320k      # Audio bitrate
```

### Preview Settings

```bash
REMOTION_STUDIO_PORT=3000        # Port for Remotion Studio
```

## Video Configuration Schema

The video configuration schema is defined in `/src/types/video-config.ts` and provides a structured way to define video specifications using JSON.

### Video Formats

Three predefined formats are available:

- **landscape**: 1920x1080 (16:9) - Standard horizontal video
- **portrait**: 1080x1920 (9:16) - Vertical video for social media
- **square**: 1080x1080 (1:1) - Square video for social media

### Video Quality Presets

- **draft**: Fast rendering, lower quality
- **standard**: Balanced quality and speed
- **high**: High quality, slower rendering
- **ultra**: Maximum quality, slowest rendering

### Basic Video Config Structure

```typescript
{
  "metadata": {
    "title": "My Video",
    "description": "Video description",
    "author": "Author Name",
    "version": "1.0.0"
  },
  "template": "TechEvolution",
  "render": {
    "format": "landscape",
    "fps": 30,
    "quality": "high"
  },
  "theme": "dark",
  "scenes": [
    {
      "id": "intro",
      "type": "title",
      "timing": {
        "start": 0,
        "duration": 90
      },
      "content": {
        "title": "Welcome",
        "subtitle": "To my video"
      }
    }
  ]
}
```

### Scene Configuration

Each scene requires:

- **id**: Unique identifier
- **type**: Scene type (template-specific)
- **timing**: Start frame and duration
- **content**: Scene-specific content object

Optional scene properties:

- **background**: Color or image asset
- **audio**: Background audio asset
- **theme**: Theme override for this scene
- **transition**: Transition to next scene

### Animation Configuration

Animations can be applied to text and elements:

```typescript
{
  "type": "fadeIn",
  "duration": 30,
  "delay": 0,
  "easing": "easeInOut"
}
```

Available animation types:
- `fadeIn`, `fadeOut`
- `slideIn`, `slideOut`
- `scaleIn`, `scaleOut`
- `zoom`, `rotate`, `blur`

Available easing functions:
- `linear`
- `easeIn`, `easeOut`, `easeInOut`
- `easeInCubic`, `easeOutCubic`, `easeInOutCubic`
- `spring`

### Asset References

Assets are referenced using the `AssetReference` type:

```typescript
{
  "type": "image",
  "path": "images/logo.png",
  "id": "logo",
  "metadata": {
    "alt": "Company Logo"
  }
}
```

Asset types:
- `font`: Custom fonts
- `image`: Images and graphics
- `audio`: Music and sound effects
- `video`: Video clips

### Theme Configuration

Themes define the visual style of the video:

```typescript
{
  "id": "dark",
  "name": "Dark Theme",
  "colors": {
    "primary": "#3b82f6",
    "secondary": "#8b5cf6",
    "background": "#0f172a",
    "foreground": "#f8fafc",
    "accent": "#06b6d4",
    "muted": "#64748b"
  },
  "typography": {
    "fontFamily": "Inter, sans-serif",
    "headingFontFamily": "Poppins, sans-serif",
    "monoFontFamily": "JetBrains Mono, monospace",
    "baseFontSize": 16,
    "lineHeight": 1.5
  },
  "spacing": {
    "xs": 4,
    "sm": 8,
    "md": 16,
    "lg": 32,
    "xl": 64
  }
}
```

## Utility Functions

The video config module provides several utility functions:

### `calculateDuration(scenes: SceneConfig[]): number`

Calculates the total video duration from scene configurations.

### `timeToFrames(seconds: number, fps: number): number`

Converts time in seconds to frame count.

### `framesToTime(frames: number, fps: number): number`

Converts frame count to time in seconds.

### `getVideoDimensions(format: VideoFormat): { width: number; height: number }`

Returns the width and height for a given video format.

### `validateVideoConfig(config: VideoConfig): { valid: boolean; errors: string[] }`

Validates a video configuration and returns any errors found.

## Usage Example

```typescript
import { VideoConfig, validateVideoConfig, timeToFrames } from './types';

const config: VideoConfig = {
  metadata: {
    title: "My Tech Video",
    author: "John Doe"
  },
  template: "TechEvolution",
  render: {
    format: "landscape",
    fps: 30,
    quality: "high"
  },
  theme: "dark",
  scenes: [
    {
      id: "intro",
      type: "title",
      timing: {
        start: 0,
        duration: timeToFrames(3, 30) // 3 seconds at 30fps = 90 frames
      },
      content: {
        title: "The Evolution of JavaScript"
      }
    }
  ]
};

// Validate the configuration
const validation = validateVideoConfig(config);
if (!validation.valid) {
  console.error("Configuration errors:", validation.errors);
}
```

## Next Steps

- Implement theme system (Task 4)
- Create template components (Tasks 9-12)
- Build component library (Tasks 5-7)
- Set up asset management (Task 14)
