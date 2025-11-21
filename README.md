# Axiom Trade Clone

A high-performance token discovery platform replicating Axiom Trade's Pulse page. Built with Next.js 16, TypeScript, and modern web technologies.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```



## Features

**Token Discovery**
- Three categories: New Pairs, Final Stretch, Migrated
- Real-time price updates every 2 seconds
- Smooth color transitions on price changes
- Progressive loading (100 tokens per column)

**Responsive Design**
- Desktop (1024px+): Three-column layout with independent scrolling
- Tablet (640-1024px): Tab navigation inside grid
- Mobile (<640px): Tab navigation outside grid
- Optimized down to 320px width

**Interactive Components**
- Tooltips (Radix UI)
- Filter modal with settings
- Image preview popover
- Sorting by market cap, volume, price, age

**Performance**
- Lighthouse score: 90+ on mobile and desktop
- React Query infinite scroll
- Memoized components
- Lazy image loading
- Delayed WebSocket initialization

## Technical Stack

**Core**
- Next.js 16.0.3 (App Router, Turbopack)
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.1.17
- Redux Toolkit
- TanStack Query v5
- Radix UI

**Architecture**
- Atomic design pattern (atoms, molecules, organisms)
- Type-safe Redux with RTK
- Progressive data loading
- Client-side rendering with SSR-ready structure

## Project Structure

```
src/
├── components/
│   ├── atoms/          # Button, Badge, Avatar, IconButton
│   ├── molecules/      # Tooltip, Modal, Popover
│   ├── organisms/      # TokenCardGrid, TokenTable
│   └── providers/      # Redux, React Query
├── hooks/
│   └── useWebSocketMock.ts
├── lib/
│   ├── api.ts         # Data fetching with pagination
│   └── mockData.ts    # Token generation
├── store/
│   ├── slices/        # Redux state slices
│   └── hooks.ts       # Typed Redux hooks
├── types/             # TypeScript definitions
└── utils/             # Formatters and helpers

app/
├── layout.tsx         # Root layout with providers
├── page.tsx           # Main page component
└── globals.css        # Global styles and optimizations
```

## Key Implementation Details

**Infinite Scroll**
- Initial load: 60 tokens (20 per column)
- Progressive loading: 20 tokens per batch
- Total capacity: 100 tokens per column
- Scroll trigger: 200px from bottom

**Unique ID Generation**
```typescript
// Each status gets unique ID range to prevent conflicts
statusOffsets = {
  'new': 0,           // 0-999
  'final-stretch': 1000,  // 1000-1999
  'migrated': 2000,   // 2000-2999
}
```

**Real-Time Updates**
- WebSocket simulation with setInterval
- Updates 2-5 random tokens every 2 seconds
- Dual state: Redux (UI) + React Query (cache)
- Price changes: up to ±5% per update

**Memoization Strategy**
- TokenCard: React.memo on token prop
- TokenColumn: React.memo on status and sortBy
- Scroll handlers: useCallback with dependencies
- Derived values: useMemo for token arrays

## Performance Optimizations

**Bundle Size**
- Code splitting with dynamic imports
- Tree-shaking for Lucide icons
- CSS minification
- No source maps in production

**Rendering**
- React.memo on expensive components
- CSS containment for isolated repaints
- GPU-accelerated animations
- content-visibility for off-screen cards

**Data Management**
- React Query cache: 10 minutes
- Stale time: Infinity (no auto-refetch)
- Delayed WebSocket start (1.5s after mount)
- Pagination for reduced initial load

**Images**
- Lazy loading with loading="lazy"
- Async decoding
- Explicit width/height to prevent CLS
- AVIF and WebP formats

**Fonts**
- Inter font with display: swap
- Preload for critical font files
- Subset loading for reduced size


## Environment

No environment variables required. Works out of the box with mock data.

For production API integration, add:
```bash
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_WS_URL=your-websocket-url
```

## Development

**Code Quality**
- TypeScript strict mode
- ESLint with Next.js config
- Comprehensive type definitions
- No any types

**State Management**
- Redux: UI state, price updates
- React Query: Server state, caching
- Local state: Component-specific

**Component Patterns**
- Atomic design
- Props interfaces with JSDoc
- Display names for debugging
- Error boundaries

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with modern CSS support



## Performance Metrics

**Lighthouse Scores (Target)**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 100
- SEO: 100

**Core Web Vitals**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Bundle Size**
- Main bundle: ~256 KB
- Initial JS: ~142 KB
- CSS: ~12 KB

## Architecture Highlights

**Atomic Components**
- 5 atoms (Button, Badge, Avatar, IconButton, MiniChart)
- 4 molecules (Tooltip, Modal, Popover, SearchBar)
- 5 organisms (TokenCardGrid, TokenTable, ErrorBoundary, etc.)

**DRY Principles**
- Shared formatters (currency, price, percentage)
- Reusable hooks (useWebSocketMock)
- Centralized types (TokenPair, PriceUpdate)
- API abstraction layer

**Type Safety**
- 100% TypeScript coverage
- No any types
- Strict null checks
- Comprehensive interfaces

## Vercel Link
https://eterna-assignment-git-main-rahul-goyals-projects-1a5fee3f.vercel.app?_vercel_share=JJkTU1S6V3L0rEzQkHnnNgUrQ5dDeUuF


