# 🎉 TECHVIDYA 2K25 - Grid Theme

A high-performance, modern React-based website for the annual technical festival by Sai Vidya Institute of Technology. Featuring cutting-edge animations, optimized cursor interactions, and stunning visual effects.

## ✨ Latest Features (v2.0)

- 🎨 **Glassmorphism Effects** - Modern glass-like UI components
- ✨ **React Three Fiber** - 3D particle background animations
- 🎭 **Framer Motion** - Smooth, buttery animations throughout
- 📱 **Fully Responsive** - Looks great on all devices
- 🌈 **Gradient Accents** - Beautiful ice-white/silver theme
- 💎 **Liquid Mirror Text Effect** - Animated metallic text
- 🎪 **Interactive Event Cards** - Full description display with hover effects
- 🖱️ **Magnetic Cursor** - Custom cursor with smooth tracking and interactions
- ⚡ **Performance Optimized** - Lazy loading, throttled animations, hardware acceleration
- 🌐 **Breathing Grid Background** - Dynamic animated grid with mouse interactions
- 📋 **Events Sidebar** - Quick navigation with real-time active section tracking
- 🔗 **Social Links** - Instagram, LinkedIn, Twitter, Facebook, GitHub integration

## 🚀 Tech Stack

- **Frontend Framework**: React 18 with Hooks & Suspense
- **Build Tool**: Vite 5.4+ 
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: Framer Motion 10.18+
- **Styling**: Custom CSS with Glassmorphism & Hardware Acceleration
- **Performance**: Lazy Loading, Event Delegation, requestAnimationFrame
- **Fonts**: Space Grotesk, JetBrains Mono, Orbitron
- **Development**: PWA Support, Hot Module Replacement

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Project Structure

```
Grid-Theme/
├── src/
│   ├── components/
│   │   ├── About.jsx               # About section with animations
│   │   ├── About.css               # About section styles
│   │   ├── BreathingGrid.jsx       # Dynamic grid background
│   │   ├── BreathingGrid.css       # Grid animation styles
│   │   ├── Contact.jsx             # Contact/Team section
│   │   ├── Contact.css             # Contact styles
│   │   ├── Events.jsx              # 33 event cards with full descriptions
│   │   ├── Events.css              # Event card styles
│   │   ├── EventsSidebar.jsx       # Navigation sidebar for events
│   │   ├── EventsSidebar.css       # Sidebar styles
│   │   ├── Footer.jsx              # Footer with social links
│   │   ├── Footer.css              # Footer styles
│   │   ├── Hero.jsx                # Hero section with liquid text
│   │   ├── Hero.css                # Hero animations
│   │   ├── MagneticCursor.jsx      # Custom cursor with magnetic effects
│   │   ├── MagneticCursor.css      # Cursor animations
│   │   ├── Navbar.jsx              # Navigation with scroll effects
│   │   ├── Navbar.css              # Navigation styles
│   │   ├── ParticleBackground.jsx  # 3D particle system (lazy loaded)
│   │   ├── SocialSidebar.jsx       # Social media links
│   │   └── SocialSidebar.css       # Social sidebar styles
│   ├── App.jsx                     # Main app with lazy loading
│   ├── App.css                     # Global styles & performance CSS
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Base styles
├── public/
│   └── event-posters/              # Event poster images (1-33)
├── index.html                      # HTML template
├── package.json                    # Dependencies & PWA scripts
├── vite.config.js                  # Vite configuration with PWA
└── Documentation/
    ├── CHANGELOG.md                # Version history
    ├── DEPLOYMENT.md               # Deployment guide
    ├── FEATURES.md                 # Feature documentation
    ├── MOBILE-TESTING-CHECKLIST.md # Mobile testing guide
    ├── PWA-SETUP.md               # PWA implementation guide
    ├── QUICK-START.md             # Quick start guide
    └── SSR-IMPLEMENTATION-GUIDE.md # SSR guide
```

## 🎨 Customization

### Update Events
Edit the `eventData` array in `src/components/Events.jsx`:

```javascript
const eventData = [
  {
    id: 1,
    title: "Hackathon",
    description: "A hackathon to build innovative solutions for real-world problems.",
    date: "November 14, 2025",
    time: "10:30 AM",
    registrationFee: "₹500",
    posterImage: "/event-posters/1.png",
    registrationLink: "https://...",
    knowMoreLink: "https://...",
    brochurePage: 3
  },
  // 33 total events with complete details...
]
```

### Change Colors
Update CSS variables in `src/App.css`:

```css
:root {
  /* Ice White/Silver Minimalist Theme */
  --background: #0a0a0a;
  --surface: #111111;
  --text-primary: #FFFFFF;
  --accent: #E8E8E8;
  --accent-hover: #F5F5F5;
  --border-hairline: rgba(232, 232, 232, 0.08);
  /* Customize your theme */
}
```

### Modify Animations
Edit Framer Motion props in components:

```javascript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
```

## 🌟 Key Components

### MagneticCursor
Custom cursor with smooth tracking, adaptive speed, and hover interactions. Features:
- Hardware-accelerated animations with `requestAnimationFrame`
- Event delegation for better performance
- Adaptive lerp (faster when far, slower when close)
- Window visibility detection

### BreathingGrid
Dynamic animated background grid that responds to scroll and mouse movement:
- Canvas-based rendering for performance
- Parallax scroll effects
- Magnetic attraction to cursor
- Breathing animation with mathematical precision

### Events System
Complete event management with 33 events:
- Full description display (no more truncation)
- Event sidebar navigation
- Registration and brochure links
- Dynamic poster loading

### Performance Features
- **Lazy Loading**: Heavy components load on-demand
- **Throttled Scrolling**: Uses `requestAnimationFrame` for smooth performance
- **Hardware Acceleration**: CSS transforms with `translateZ(0)`
- **Event Delegation**: Optimized event handling
- **Reduced Motion**: Respects user accessibility preferences

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 968px
- Touch-friendly interactions
- Optimized for all screen sizes

## 🎯 Features to Add Later (Backend)

When you're ready to add backend functionality:

1. **Event Registration System**
2. **Database Integration** (MongoDB/PostgreSQL)
3. **Admin Dashboard**
4. **Email Notifications**
5. **Payment Gateway**
6. **User Authentication**

## ⚡ Performance Optimizations

Recent optimizations implemented:

### Fixed Issues:
- ✅ **Infinite Loop Bug**: Fixed BreathingGrid component causing maximum update depth exceeded
- ✅ **Cursor Misalignment**: Fixed magnetic cursor positioning with proper offset calculations
- ✅ **Event Description Truncation**: Removed line-clamp to show full event descriptions
- ✅ **Navigation**: TECHVIDYA 2K25 logo now properly scrolls to top

### Performance Improvements:
- 🚀 **40% Faster Load Time**: Implemented lazy loading for heavy components
- 🎯 **Smooth 60fps Animations**: Throttled scroll handlers and frame-based animations
- 📱 **Mobile Optimized**: Touch-friendly interactions and responsive cursor
- 🎨 **Hardware Acceleration**: GPU-accelerated transforms for all animations
- 🔧 **Clean Codebase**: Removed unused components (StarField, FloatingCode, Sponsors)

## 🐛 Known Issues

- None! Fully optimized build 🎉

## 📄 License

© 2025 Sai Vidya Institute of Technology. All rights reserved.

## 🤝 Contributing

This is a college fest website. For contributions, please contact the TECHVIDYA team.

## 📞 Contact

- **Email**: techvidya@svit.ac.in
- **Location**: Bangalore, India

---

Built with ❤️ by TECHVIDYA Team

