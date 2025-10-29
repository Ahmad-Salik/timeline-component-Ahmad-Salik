# Quick Start Guide

## 🚀 Getting Started

This Timeline/Gantt View component is ready to use! Follow these simple steps:

### 1. Install Dependencies (Already Done ✅)

```bash
yarn install
```

### 2. View Components in Storybook

```bash
yarn storybook
```

This will open Storybook at `http://localhost:6006` where you can:
- Browse all 10+ component stories
- Interact with the timeline
- Test different view modes
- Try accessibility features
- View mobile responsive design

### 3. Build Production Bundle

```bash
yarn build
```

### 4. Build Storybook for Deployment

```bash
yarn build-storybook
```

This creates a static `storybook-static` folder that you can deploy.

## 📦 Deployment Options

### Option 1: Chromatic (Recommended)

```bash
# Install Chromatic
yarn add --dev chromatic

# Deploy (you'll need to create account)
npx chromatic --project-token=<your-token>
```

### Option 2: Vercel

```bash
# Install Vercel CLI
yarn global add vercel

# Deploy storybook
cd storybook-static
vercel
```

### Option 3: Netlify

```bash
# Install Netlify CLI
yarn global add netlify-cli

# Deploy storybook
netlify deploy --dir=storybook-static --prod
```

### Option 4: GitHub Pages

1. Build storybook: `yarn build-storybook`
2. Push `storybook-static` to gh-pages branch
3. Enable GitHub Pages in repository settings

## 🎨 Using the Component

### Basic Usage

```tsx
import { TimelineView } from './components/Timeline';
import type { TimelineRow, TimelineTask } from './types/timeline.types';

const rows: TimelineRow[] = [
  { id: 'row-1', label: 'Frontend Team', tasks: ['task-1'] },
];

const tasks: Record<string, TimelineTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Build UI',
    startDate: new Date(2024, 0, 1),
    endDate: new Date(2024, 0, 15),
    progress: 60,
    rowId: 'row-1',
    color: '#3b82f6',
    isMilestone: false,
  },
};

<TimelineView
  rows={rows}
  tasks={tasks}
  startDate={new Date(2024, 0, 1)}
  endDate={new Date(2024, 2, 31)}
  viewMode="week"
/>
```

## 📖 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Run development server |
| `yarn build` | Build for production |
| `yarn preview` | Preview production build |
| `yarn storybook` | Run Storybook |
| `yarn build-storybook` | Build Storybook for deployment |

## 🔧 Project Structure

```
src/
├── components/Timeline/    # Main timeline components
├── components/primitives/  # Reusable UI (Button, Modal, Slider)
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions
├── types/                  # TypeScript definitions
├── constants/              # Configuration
└── styles/                 # Global styles
```

## ✅ What's Included

- ✅ 10+ Storybook stories demonstrating all features
- ✅ Full TypeScript support with strict mode
- ✅ Tailwind CSS with custom design tokens
- ✅ WCAG 2.1 AA accessibility compliance
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Row-based task organization
- ✅ Task dependencies with visual arrows
- ✅ Progress tracking
- ✅ Task detail editing sidebar
- ✅ Multiple view modes (day/week/month)
- ✅ Current date indicator
- ✅ Milestone support

## 🎯 Next Steps for Submission

1. **Test Storybook locally** - `yarn storybook`
2. **Build Storybook** - `yarn build-storybook`
3. **Deploy to hosting platform** (Chromatic/Vercel/Netlify)
4. **Create GitHub repo** - `timeline-component-[yourname]`
5. **Update README.md** with deployed Storybook URL
6. **Push to GitHub** with meaningful commits
7. **Submit via Internshala** with repo and Storybook URLs

## 🐛 Troubleshooting

### Port Already in Use

If port 6006 is already in use:
```bash
yarn storybook -p 6007
```

### Dependencies Issues

If you encounter dependency issues:
```bash
rm -rf node_modules yarn.lock
yarn install
```

### Build Errors

Make sure you're using Node.js 16+ and Yarn 1.22+:
```bash
node --version
yarn --version
```

## 📝 Important Notes

- All dependencies are compliant with assignment requirements
- No forbidden libraries used (no Radix, MUI, styled-components, etc.)
- All components built from scratch
- TypeScript strict mode enabled
- Full accessibility implementation

## 🆘 Need Help?

- Check `README.md` for detailed documentation
- Review `PROJECT_SUMMARY.md` for implementation details
- Browse Storybook stories for usage examples
- All components have comprehensive TypeScript types

---

**Ready to deploy!** 🚀

