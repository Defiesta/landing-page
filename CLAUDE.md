# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page for Defiesta - a DeFi AI marketplace. The project uses TypeScript, TailwindCSS 4, and follows a component-based architecture.

## Development Commands

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js configuration

## Project Architecture

### Application Structure
- **App Router**: Uses Next.js App Router with `src/app/` directory structure
- **Component Organization**: All reusable components are in `src/app/components/`
- **Page Structure**: 
  - Main landing page: `src/app/page.tsx`
  - Roadmap page: `src/app/roadmap/page.tsx`
  - Whitepaper page: `src/app/whitepaper/page.tsx`

### Key Components
- `HeroSection`: Main landing page hero with animations
- `AnimatedBackground`: Shared animated background component used across pages
- `Header`/`Footer`: Consistent navigation and footer
- `FuturisticFeatures`, `CapitalMarketsSection`, `PillarsSection`: Content sections
- `InteractiveRoadmap`: Full-screen roadmap with custom scroll behavior
- `ExecutionWorkflowDiagram`, `ProofGenerationPipeline`: Technical diagrams for whitepaper

### Styling & Design System
- **TailwindCSS 4**: Uses the new TailwindCSS v4 with `@theme inline` syntax
- **Color Scheme**: Dark theme with cyan, purple, and emerald accent colors
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Animations**: Custom CSS animations with intersection observer triggers

### TypeScript Configuration
- Path alias `@/*` maps to `./src/*`
- Strict mode enabled
- Next.js TypeScript plugin configured

### State Management
- Uses React hooks for local state (useState, useEffect)
- Client-side components marked with 'use client' directive

## Special Considerations

- The roadmap page (`/roadmap`) disables body scrolling and uses fixed positioning
- Animation components use IntersectionObserver for performance
- All pages share the AnimatedBackground component but can control its visibility
- Components are designed to be responsive with mobile-friendly layouts