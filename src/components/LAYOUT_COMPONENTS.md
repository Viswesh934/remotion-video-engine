# Layout Components Implementation

## Overview

This document describes the implementation of the three layout components: Container, Grid, and Stack.

## Components Implemented

### 1. Container Component (`Container.tsx`)

A flexible container component for content wrapping with theme-aware styling and positioning support.

**Features:**
- Custom width and height (number or string)
- Padding support
- Background color
- Border radius
- Absolute positioning (x, y coordinates)
- Horizontal and vertical centering
- Theme-aware (uses ThemeProvider context)
- CSS modules for styling

**Props:**
- `children`: ReactNode - Child elements to wrap
- `width`: number | string - Container width
- `height`: number | string - Container height
- `padding`: number | string - Internal padding
- `background`: string - Background color
- `borderRadius`: number - Border radius in pixels
- `position`: Position - Absolute positioning (x, y)
- `centerX`: boolean - Center content horizontally
- `centerY`: boolean - Center content vertically
- `className`: string - Additional CSS class
- `style`: CSSProperties - Inline styles
- `animation`: AnimationConfig - Animation configuration (TODO)

**Example:**
```tsx
<Container
  width={800}
  height={600}
  padding={32}
  background="#000000"
  borderRadius={8}
  centerX
  centerY
>
  <Text content="Centered content" />
</Container>
```

### 2. Grid Component (`Grid.tsx`)

A flexible grid layout component with theme-aware spacing.

**Features:**
- Simple column/row configuration
- Advanced CSS grid templates
- Gap control (overall, column-specific, row-specific)
- Alignment and justification
- Theme-aware
- CSS modules for styling

**Props:**
- `children`: ReactNode - Grid items
- `columns`: number - Number of columns (creates equal-width columns)
- `rows`: number - Number of rows (creates equal-height rows)
- `gap`: number | string - Gap between all items
- `columnGap`: number | string - Gap between columns
- `rowGap`: number | string - Gap between rows
- `templateColumns`: string - CSS grid-template-columns value
- `templateRows`: string - CSS grid-template-rows value
- `alignItems`: "start" | "center" | "end" | "stretch" - Vertical alignment
- `justifyItems`: "start" | "center" | "end" | "stretch" - Horizontal alignment
- `className`: string - Additional CSS class
- `style`: CSSProperties - Inline styles
- `animation`: AnimationConfig - Animation configuration (TODO)

**Example:**
```tsx
// Simple 3-column grid
<Grid columns={3} gap={16}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

// Advanced grid with custom template
<Grid
  templateColumns="1fr 2fr 1fr"
  templateRows="auto 1fr auto"
  gap={24}
  alignItems="center"
>
  <div>Header</div>
  <div>Main Content</div>
  <div>Sidebar</div>
</Grid>
```

### 3. Stack Component (`Stack.tsx`)

A flexible stack layout component for vertical or horizontal stacking.

**Features:**
- Vertical or horizontal direction
- Spacing control
- Alignment and justification
- Wrapping support
- Theme-aware
- CSS modules for styling

**Props:**
- `children`: ReactNode - Stack items
- `direction`: "horizontal" | "vertical" - Stack direction (default: "vertical")
- `spacing`: number | string - Space between items
- `align`: "start" | "center" | "end" | "stretch" - Cross-axis alignment
- `justify`: "start" | "center" | "end" | "space-between" | "space-around" | "space-evenly" - Main-axis justification
- `wrap`: boolean - Allow items to wrap
- `className`: string - Additional CSS class
- `style`: CSSProperties - Inline styles
- `animation`: AnimationConfig - Animation configuration (TODO)

**Example:**
```tsx
// Vertical stack (default)
<Stack spacing={16}>
  <Text content="Item 1" />
  <Text content="Item 2" />
  <Text content="Item 3" />
</Stack>

// Horizontal stack with center alignment
<Stack
  direction="horizontal"
  spacing={24}
  align="center"
  justify="space-between"
>
  <Button>Left</Button>
  <Button>Right</Button>
</Stack>
```

## Files Created

1. `src/components/Container.tsx` - Container component implementation
2. `src/components/Container.module.css` - Container styles
3. `src/components/Grid.tsx` - Grid component implementation
4. `src/components/Grid.module.css` - Grid styles
5. `src/components/Stack.tsx` - Stack component implementation
6. `src/components/Stack.module.css` - Stack styles
7. `src/components/LayoutDemo.tsx` - Demo composition showcasing all layout components
8. `src/components/index.ts` - Updated to export new components

## Demo Composition

A `LayoutDemo` composition was created to demonstrate all three layout components in action. It can be viewed in the Remotion Studio by selecting the "LayoutDemo" composition.

The demo shows:
- Container with centering
- Grid with 3 columns
- Horizontal Stack with multiple items
- All components using the dark theme

## Technical Details

### Theme Integration

All components use the `useTheme()` hook to access the current theme context. This ensures they work seamlessly with the theme system.

### CSS Modules

Each component has a corresponding `.module.css` file for base styles. This follows the project's pattern of using plain CSS modules without external CSS libraries.

### Animation Support

The `animation` prop is defined in the component interfaces but not yet implemented. This is marked with TODO comments and can be implemented in a future task. The prop is commented out in the destructuring to avoid linting errors.

### Responsive Sizing

All size-related props (width, height, padding, spacing, gap) accept both numbers (interpreted as pixels) and strings (for CSS values like "100%", "50vw", etc.).

## Testing

The components have been verified to:
- Compile without TypeScript errors
- Pass ESLint checks
- Work with the theme system
- Render correctly in the Remotion Studio (via LayoutDemo composition)

## Future Enhancements

1. **Animation Support**: Implement the `animation` prop to support fadeIn, slideIn, and scaleIn animations
2. **Responsive Breakpoints**: Add support for responsive sizing based on video dimensions
3. **Additional Layout Patterns**: Consider adding more layout utilities like Flex, Absolute, etc.
