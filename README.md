# Saumay Pathak — 3D Portfolio

An immersive Three.js portfolio website that transforms a traditional portfolio into a fully navigable 3D "World of Code" experience.

## ✨ Features

- **Fully 3D Environment**: Every section exists as a spatial zone in 3D space
- **Scroll Navigation**: Scroll to move through the world (Z-axis depth)
- **Mouse Parallax**: Subtle camera movement following mouse position
- **Keyboard Controls**: WASD/Arrow keys for navigation
- **Glassmorphism UI**: Apple Vision Pro-inspired design
- **Smooth Animations**: GSAP-powered camera transitions
- **Responsive**: Works on desktop and mobile
- **Accessibility**: Respects `prefers-reduced-motion`

## 🗺️ World Zones

| Zone | Original Page | Z Position |
|------|--------------|------------|
| Entry Gate | Home | 0 |
| About Chamber | About | -60 |
| Skills Core | Skills | -120 |
| Project Nodes | Projects | -180 |
| Timeline Tunnel | Experience | -240 |
| Blog Zone | Blog | -300 |
| Terminal Core | Contact | -360 |

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **3D Engine**: Three.js
- **React Three Fiber**: @react-three/fiber, @react-three/drei
- **Animation**: GSAP
- **State Management**: Zustand
- **Styling**: Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to project directory
cd saumay-3d-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Type Check

```bash
npm run check
```

## 📁 Project Structure

```
src/
├── components/
│   ├── canvas/          # 3D scene components
│   │   ├── Scene.tsx
│   │   ├── CameraController.tsx
│   │   ├── ParticleField.tsx
│   │   └── CodeRain.tsx
│   ├── zones/           # Each zone = original page
│   │   ├── EntryGate.tsx
│   │   ├── AboutChamber.tsx
│   │   ├── SkillsCore.tsx
│   │   ├── ProjectNodes.tsx
│   │   ├── TimelineTunnel.tsx
│   │   ├── BlogZone.tsx
│   │   └── TerminalCore.tsx
│   └── ui/              # 2D overlay components
│       ├── Header.tsx
│       ├── NavIndicator.tsx
│       └── LoadingScreen.tsx
├── data/
│   └── portfolio.ts     # All content data
├── hooks/
│   ├── useWorldState.ts
│   └── useReducedMotion.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎮 Controls

| Input | Action |
|-------|--------|
| Scroll | Move forward/backward through zones |
| Mouse Move | Subtle parallax camera rotation |
| W / ↑ | Move forward |
| S / ↓ | Move backward |
| Click Nav | Jump to specific zone |

## 🚢 Deployment

### Vercel

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify

```bash
npm run build
# Drag dist/ folder to Netlify
```

## 📄 License

MIT

---

Built with ❤️ using Three.js and React
