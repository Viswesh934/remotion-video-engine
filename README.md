# Remotion Video Engine

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

A reusable, AI-friendly framework for rapid technical video creation. Built with React, Remotion, and TypeScript.

## Overview

The Remotion Video Engine provides a modular architecture with pre-built components, templates, and animation systems that enable quick video production from concept to render. The engine emphasizes minimal dependencies, maximum reusability, and AI-agent compatibility.

## Project Structure

```
src/
├── animations/      # Animation utilities and timing functions
├── assets/          # Fonts, audio, textures, icons
├── components/      # Reusable UI components (Browser, Terminal, CodeBlock, etc.)
├── compositions/    # Remotion composition definitions
├── templates/       # Pre-built video templates (TechEvolution, CodeExplainer, etc.)
├── themes/          # Visual styling systems (dark, retro, neon, documentary)
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers
```

## Features

- **Modular Architecture**: Composable components and templates
- **TypeScript**: Full type safety with strict mode enabled
- **Minimal Dependencies**: React, Remotion, TypeScript, plain CSS only
- **AI-Friendly**: Structured patterns for programmatic video generation
- **Multiple Templates**: Support for long-form documentaries and short-form content
- **Theme System**: Multiple visual styles with consistent design language
- **Code Quality**: ESLint and Prettier configured out of the box

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

This opens the Remotion Studio where you can preview and edit your videos.

### Render Video

```bash
npx remotion render
```

### Lint Code

```bash
npm run lint
```

## Workflow

The engine follows a clear workflow:

1. **Idea** → Define your video concept
2. **Script** → Create JSON-based video specifications
3. **Scenes** → Compose templates and components
4. **Render** → Export to MP4

## Configuration

- **TypeScript**: `tsconfig.json` (strict mode enabled)
- **ESLint**: `eslint.config.mjs`
- **Prettier**: `.prettierrc`
- **Remotion**: `remotion.config.ts`

## Documentation

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Fundamentals](https://www.remotion.dev/docs/the-fundamentals)
- [Component Guidelines](./src/components/README.md)
- [Template Guidelines](./src/templates/README.md)

## Support

- [Remotion Discord](https://discord.gg/6VzzNDwUwV)
- [File an Issue](https://github.com/remotion-dev/remotion/issues/new)

## License

Note that for some entities a company license is needed. [Read the terms here](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md).
