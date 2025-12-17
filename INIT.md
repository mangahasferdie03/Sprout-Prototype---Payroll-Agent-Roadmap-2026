# Roadmap Project Initialization Document

## Overview
This project showcases two distinct AI agent roadmaps for Sprout Solutions:
- **FRIDAY**: Payroll-focused AI agents
- **JARVIS**: HR-focused AI agents

## Critical Design Principles

### 1. Independent Roadmaps
FRIDAY and JARVIS are **separate and independent** roadmaps. Changes to one should NOT affect the other unless explicitly intended.

### 2. Key Differences Between FRIDAY and JARVIS

#### FRIDAY (Payroll Agents)
- **Title**: "Payroll Agent Roadmap 2026"
- **Subheader**: "A focused rollout plan for automating core payroll operations"
- **Layout**:
  - No category chips
  - Grid starts at `top-24` (96px)
  - Curve SVG starts at `top-32` (128px)
  - Header padding: `pb-0`
- **Data Source**: `ROADMAP_DATA` from `constants.tsx`
- **Agents**: 8 payroll-specific agents across Q1-Q4 2026

#### JARVIS (HR Agents)
- **Title**: "Jarvis Roadmap 2026"
- **Subheader**: "Intelligent HR agents designed to streamline people operations and employee experiences"
- **Layout**:
  - **Has category chips** (Employee, People Leader, HR Manager, Sprout Internal)
  - Grid starts at `top-44` (176px) - **extra space for chips**
  - Curve SVG starts at `top-44` (176px)
  - Header padding: `pb-10` - **extra padding for chips**
- **Data Source**: `JARVIS_ROADMAP_DATA` from `constants.tsx`
- **Categories**:
  1. **Employee**: Agents designed for individual employees
  2. **People Leader**: Agents for team managers and supervisors
  3. **HR Manager**: Agents for HR administrators
  4. **Sprout Internal**: Internal tools and admin agents

## Implementation Notes

### Conditional Rendering
All layout differences are controlled by the `selectedProduct` state:

```tsx
// Header padding
className={`relative z-10 bg-white ${selectedProduct === 'jarvis' ? 'pb-10' : 'pb-0'}`}

// Grid positioning
className={`absolute inset-0 ${selectedProduct === 'jarvis' ? 'top-44' : 'top-24'} ...`}

// Curve SVG positioning
className={`absolute inset-0 ${selectedProduct === 'jarvis' ? 'top-44' : 'top-32'} ...`}

// Category chips (only for JARVIS)
{selectedProduct === 'jarvis' && (
  <div className="flex items-center gap-2 mt-4">
    {/* Chip buttons */}
  </div>
)}
```

### Data Structure
Both roadmaps use the same `AgentItem` type but have separate data arrays:
- `ROADMAP_DATA` - FRIDAY agents
- `JARVIS_ROADMAP_DATA` - JARVIS agents (currently copied from FRIDAY, ready for customization)

## Future Customization

### JARVIS Roadmap Customization
To customize JARVIS agents:
1. Edit `JARVIS_ROADMAP_DATA` in `constants.tsx`
2. Update agent titles, descriptions, and scenarios
3. Add category filtering logic based on `selectedJarvisCategory` state

### Adding New Categories
To add a new category to JARVIS:
1. Update the `JarvisCategory` type in `App.tsx`
2. Add the category to the chip array
3. Update the data structure to include category metadata

## Design System

### Colors
- **Active chip**: `bg-sprout-500` (green)
- **Inactive chip**: `bg-slate-100` (light gray)
- **Hover state**: `bg-slate-200`

### Spacing
- Chip gap: `gap-2` (8px)
- Header to chips: `mt-4` (16px)
- JARVIS bottom padding: `pb-10` (40px)
- FRIDAY bottom padding: `pb-0` (0px)

### Grid System
- Grid cell size: `4rem x 4rem` (64px x 64px)
- Grid line color: `#f1f5f9` (slate-100)

## Maintenance Guidelines

### When Making Layout Changes
1. **Always check both roadmaps** - Test changes on both FRIDAY and JARVIS
2. **Use conditional logic** - Use `selectedProduct === 'jarvis'` for Jarvis-specific changes
3. **Preserve independence** - Ensure changes to one don't break the other
4. **Document changes** - Update this INIT.md file when adding new differences

### When Adding Features
1. Determine if the feature applies to both roadmaps or just one
2. Use conditional rendering if it's product-specific
3. Test both scenarios thoroughly
4. Update documentation

## File Structure

```
/
├── App.tsx                  # Main app logic, routing, conditional rendering
├── constants.tsx            # ROADMAP_DATA and JARVIS_ROADMAP_DATA
├── components/
│   ├── LandingPage.tsx     # Landing page with FRIDAY/JARVIS buttons
│   ├── AgentDetail.tsx     # Agent detail modal
│   └── UnifiedAgentChatModal.tsx  # Chat interface
├── types.ts                # Type definitions
└── INIT.md                 # This file
```

## Quick Reference

| Feature | FRIDAY | JARVIS |
|---------|--------|--------|
| Category Chips | ❌ No | ✅ Yes |
| Grid Start Position | `top-24` | `top-44` |
| Curve Start Position | `top-32` | `top-44` |
| Header Bottom Padding | `pb-0` | `pb-10` |
| Data Source | `ROADMAP_DATA` | `JARVIS_ROADMAP_DATA` |
| Subheader Focus | Payroll operations | People operations & employee experiences |

---

**Last Updated**: December 2024
**Maintainer**: Sprout Solutions Team
