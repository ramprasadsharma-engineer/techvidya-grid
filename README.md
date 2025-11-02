# 🎉 TECHVIDYA 2K25 - TANTROTSAVA

A stunning React-based portfolio website for the annual technical festival by Sai Vidya Institute of Technology.

## ✨ Features

- 🎨 **Glassmorphism Effects** - Modern glass-like UI components
- ✨ **React Three Fiber** - 3D particle background animations
- 🎭 **Framer Motion** - Smooth, buttery animations throughout
- 📱 **Fully Responsive** - Looks great on all devices
- 🌈 **Gradient Accents** - Beautiful neon blue and purple gradients
- 💎 **Liquid Mirror Text Effect** - Animated metallic text
- 🎪 **Interactive Event Cards** - 3D tilt and hover effects

## 🚀 Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **3D Graphics**: React Three Fiber + Drei
- **Animations**: Framer Motion
- **Styling**: Custom CSS with Glassmorphism
- **Fonts**: Space Grotesk, JetBrains Mono

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
portfolio/
├── src/
│   ├── components/
│   │   ├── ParticleBackground.jsx  # 3D particle system
│   │   ├── Navbar.jsx              # Navigation with glassmorphism
│   │   ├── Hero.jsx                # Hero section with CTA
│   │   ├── About.jsx               # About section with stats
│   │   ├── Events.jsx              # Event cards with animations
│   │   ├── Sponsors.jsx            # Sponsor tiers
│   │   ├── Contact.jsx             # Contact form
│   │   └── Footer.jsx              # Footer section
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # Global styles
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Base styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
└── vite.config.js                  # Vite configuration

# Old Files (Backed Up)
├── index-old.html                  # Original HTML
├── styles-old.css                  # Original CSS
└── script-old.js                   # Original JavaScript
```

## 🎨 Customization

### Update Events
Edit the `eventData` array in `src/components/Events.jsx`:

```javascript
const eventData = [
  {
    id: 1,
    title: "Your Event",
    description: "Event description",
    icon: "💻",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    prize: "₹15,000"
  },
  // Add more events...
]
```

### Change Colors
Update CSS variables in `src/App.css`:

```css
:root {
  --neon-blue: #00F0FF;
  --neon-purple: #B026FF;
  --anime-pink: #FF69B4;
  /* Add your colors */
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

### ParticleBackground
3D particle system using React Three Fiber with automatic rotation and mouse interaction.

### Glassmorphism Cards
All cards use the `.glass` or `.glass-strong` classes for beautiful glassmorphism effects.

### Framer Motion Animations
- Scroll-based reveals
- Hover interactions
- Page load animations
- Smooth transitions

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

## 🐛 Known Issues

- None! Fresh build 🎉

## 📄 License

© 2025 Sai Vidya Institute of Technology. All rights reserved.

## 🤝 Contributing

This is a college fest website. For contributions, please contact the TECHVIDYA team.

## 📞 Contact

- **Email**: techvidya@svit.ac.in
- **Location**: Bangalore, India

---

Built with ❤️ by TECHVIDYA Team

