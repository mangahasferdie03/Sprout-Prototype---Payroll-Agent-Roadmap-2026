# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive roadmap visualization for **Sprout Solutions' AI Agent ecosystem**, showcasing two independent product lines:
- **FRIDAY**: Payroll-focused AI agents (8 agents across Q1-Q4 2026)
- **JARVIS**: HR-focused AI agents (categorized by user type)

Built with React, TypeScript, Vite, and Tailwind CSS.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Start production server (Railway deployment)
npm start
```

## Environment Setup

Set `GEMINI_API_KEY` in `.env.local` for Gemini API integration:
```
GEMINI_API_KEY=your_api_key_here
```

The API key is exposed to the client via Vite's define config as `process.env.GEMINI_API_KEY`.

## Architecture & Data Flow

### Two Independent Roadmaps

**Critical**: FRIDAY and JARVIS are **separate and independent**. Changes to one must NOT affect the other unless explicitly intended.

#### State Management
- `selectedProduct: 'friday' | 'jarvis'` - Controls which roadmap is displayed
- `selectedJarvisCategory: JarvisCategory` - Controls JARVIS category filter (Employee, People Leader, HR Manager, Sprout Internal)
- `visibleStage: 0-4` - Controls Q1-Q4 reveal animation (0=initial, 1=Q1, 2=Q2, 3=Q3, 4=Q4)
- `isMerging: boolean` - Controls merge animation when "Try it Now" is clicked
- `showUnifiedModal: boolean` - Controls unified chat modal visibility

#### Data Sources
Located in `constants.tsx`:
- `ROADMAP_DATA` - FRIDAY payroll agents (8 agents)
- `JARVIS_ROADMAP_DATA` - JARVIS HR agents (currently copied from FRIDAY, ready for customization)

Both use the `AgentItem` type from `types.ts`.

### Conditional Rendering Pattern

All product-specific layouts use conditional logic based on `selectedProduct`:

```tsx
// FRIDAY: pb-0, grid top-24, curve top-32
// JARVIS: pb-10, grid top-44, curve top-44

className={`relative z-10 bg-white ${selectedProduct === 'jarvis' ? 'pb-10' : 'pb-0'}`}
className={`absolute inset-0 ${selectedProduct === 'jarvis' ? 'top-44' : 'top-24'} ...`}
```

**Why different values?**
- JARVIS has category chips that need space → more bottom padding + higher grid start
- FRIDAY has no chips → minimal padding + lower grid start

### Key Layout Differences

| Feature | FRIDAY | JARVIS |
|---------|--------|--------|
| Category Chips | None | 4 chips (Employee, People Leader, HR Manager, Sprout Internal) |
| Grid Start | `top-24` (96px) | `top-44` (176px) |
| Curve SVG Start | `top-32` (128px) | `top-44` (176px) |
| Header Padding Bottom | `pb-0` | `pb-10` (40px) |

### Animation System

1. **Reveal Animation** (Q1 → Q4):
   - Triggered via `visibleStage` state (0→1→2→3→4)
   - Each stage reveals with 1.2s interval
   - Uses CSS transitions and clip-path for smooth reveals

2. **Merge Animation** (Try it Now):
   - Scales all agent cards to center
   - Fades out roadmap
   - Shows unified chat modal

3. **Curve Animation**:
   - SVG path with pulsing gradient
   - Animated dashed line flowing along curve
   - Controlled via clip-path based on `visibleStage`

## Component Architecture

### App.tsx
Main orchestrator that:
- Manages global state (product selection, animations, modals)
- Conditionally renders FRIDAY vs JARVIS layouts
- Filters agents by quarter (Q1-Q4)
- Handles merge animation and modal transitions

### LandingPage.tsx
Entry point with:
- FRIDAY and JARVIS selection buttons
- Floating orbs background (FloatingOrbs.tsx)
- Grid warp cursor effect (GridWarp.tsx)
- Fade-out animation on product selection

### AgentDetail.tsx
Modal for individual agent details:
- Agent profile (What it Solves, How it Drives 2026)
- Chat scenarios with prototype conversations
- Technical details and goals

### UnifiedAgentChatModal.tsx
Unified chat interface after merge animation:
- Simulates conversations with all 8 agents
- Uses Claude Sonnet 4.5 API (`@anthropic-ai/sdk`)
- Shows animated transitions between agents

## Data Structure

### AgentItem Type
```typescript
interface AgentItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  horizon: Horizon; // Q1, Q2, Q3, or Q4 2026
  icon: string; // SVG string or emoji
  goals: GoalMetric[];
  technicalDetails: string[];
  chatScenarios: ChatScenario[];
  whatItSolves?: { paragraphs: string[] };
  howItDrives2026?: {
    mau: string;
    adoption: string;
    capacity: string;
    accuracy: string;
  };
}
```

### Adding New Agents
1. Add to `ROADMAP_DATA` or `JARVIS_ROADMAP_DATA` in `constants.tsx`
2. Set appropriate `horizon` (Q1/Q2/Q3/Q4)
3. Include chat scenarios for prototype conversations
4. For JARVIS: consider adding category metadata for filtering

## Styling System

### Tailwind Configuration
- Custom color: `sprout-500` (green brand color)
- Grid pattern: 4rem x 4rem cells, `#f1f5f9` lines
- Typography: Default sans-serif stack

### Animation Classes
- `animate-fade-in` - Component mount animations
- `animate-fade-in-up` - Upward slide + fade
- `animate-pulse-border` - Pulsing border effect (Try it Now button)

## Deployment

### Railway Configuration
- Runs on Railway: `sprout-prototype-payroll-agent-roadmap-2026-production.up.railway.app`
- Uses `vite preview` with host `0.0.0.0` and dynamic `$PORT`
- Allowed hosts configured in `vite.config.ts`

### Build Process
```bash
npm run build  # → dist/
npm start      # Serves from dist/ on Railway
```

## Critical Maintenance Rules

### When Making Layout Changes
1. **Test both roadmaps**: Changes must work for both FRIDAY and JARVIS
2. **Use conditional logic**: Wrap product-specific code in `selectedProduct === 'jarvis'` checks
3. **Preserve spacing**: JARVIS needs extra space for chips (see layout table above)
4. **Update INIT.md**: Document any new differences between roadmaps

### When Adding Features
1. Determine scope: Does it apply to FRIDAY, JARVIS, or both?
2. Use conditional rendering for product-specific features
3. Test animation interactions (reveal, merge, modals)
4. Verify responsive behavior

### Future JARVIS Customization
To add category filtering for JARVIS agents:
1. Add `category` field to `AgentItem` type
2. Filter `activeRoadmapData` by `selectedJarvisCategory`
3. Update `JARVIS_ROADMAP_DATA` with category metadata
4. Test chip selection updates agent display

## Quick Reference

### File Structure
```
/
├── App.tsx                     # Main app logic, state, routing
├── constants.tsx               # ROADMAP_DATA, JARVIS_ROADMAP_DATA
├── types.ts                    # TypeScript type definitions
├── components/
│   ├── LandingPage.tsx        # Product selection screen
│   ├── AgentDetail.tsx        # Agent detail modal
│   ├── UnifiedAgentChatModal.tsx  # Chat interface
│   ├── FloatingOrbs.tsx       # Background animation
│   ├── GridWarp.tsx           # Cursor effect
│   └── MetricPill.tsx         # Goal metric display
├── services/
│   └── geminiService.ts       # Gemini API integration
├── vite.config.ts             # Vite configuration
├── INIT.md                    # Detailed roadmap documentation
└── CLAUDE.md                  # This file
```

### Common Tasks

**Add a new agent:**
Edit `constants.tsx` → Add to `ROADMAP_DATA` or `JARVIS_ROADMAP_DATA`

**Change grid spacing:**
Update `App.tsx` → Modify conditional `top-*` values (maintain FRIDAY vs JARVIS difference)

**Update animations:**
Edit `App.tsx` → Adjust `visibleStage` intervals or CSS transition durations

**Add JARVIS category:**
1. Update `JarvisCategory` type in `App.tsx`
2. Add to chip array in render
3. Implement filtering logic

---

**For detailed roadmap specifications, see INIT.md**
