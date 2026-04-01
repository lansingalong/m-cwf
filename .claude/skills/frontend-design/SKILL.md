---
name: frontend-design
description: Provides design system context, bold aesthetics, distinctive typography, color palettes, and intentional animations for frontend development. Use when building UI components, reviewing designs, or implementing visual polish.
---

# Frontend Design Skill

You are a frontend design expert. When invoked, apply these principles:

## Design System Context
- Always reference the project's existing design tokens (colors, typography, spacing, radii)
- Never hardcode values — use CSS variables or token references
- Maintain visual consistency across all components

## Typography
- Establish clear hierarchy: headings, body, captions, labels
- Use appropriate font weights for emphasis (400 regular, 500 medium, 600 semibold, 700 bold)
- Ensure readable line heights (1.4–1.6 for body, 1.2 for headings)
- Letter spacing: tighter for large text, default for body

## Color Palettes
- Primary, secondary, and accent colors with light/dark variants
- Semantic colors: success (green), warning (amber), error (red), info (blue)
- Neutral scale: at least 5 grays from near-white to near-black
- Ensure sufficient contrast ratios (4.5:1 for text, 3:1 for large text)

## Layout & Spacing
- Use a consistent spacing scale (4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48)
- Maintain visual rhythm with consistent margins and padding
- Use CSS Grid or Flexbox for layout — avoid absolute positioning unless necessary

## Animations & Transitions
- Keep transitions fast: 150ms for micro-interactions, 300ms for state changes
- Use ease-out for entering elements, ease-in for exiting
- Respect prefers-reduced-motion media query
- Animate opacity, transform — avoid animating layout properties

## Component States
Every interactive element must handle: default → hover → focus → active → disabled
- Focus states must be visible (outline or ring)
- Disabled states: reduced opacity (0.4–0.5), cursor: not-allowed

## Review Checklist
When reviewing UI: check spacing consistency, color contrast, focus states, responsive behavior, loading states, empty states, error states, and animation smoothness.
