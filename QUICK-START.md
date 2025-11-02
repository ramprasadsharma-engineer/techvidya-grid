# 🚀 Quick Start Guide

## What We Built

You now have a **stunning React-based portfolio website** with:

✨ **Glassmorphism UI** - Modern frosted glass effects everywhere
🎨 **3D Particle Background** - Interactive Three.js particles
🎭 **Smooth Animations** - Framer Motion throughout
📱 **Fully Responsive** - Works perfectly on all devices
💎 **Liquid Mirror Effect** - Animated metallic title
🎪 **6 Sample Events** - Beautiful event cards with hover effects

## Getting Started

### 1. Start Development Server

```bash
npm run dev
```

Your site will open at: `http://localhost:5173`

### 2. Make Changes

The site will **auto-reload** when you edit files! Try it:
- Edit `src/components/Hero.jsx` to change the hero text
- Edit `src/components/Events.jsx` to add/modify events
- Edit `src/App.css` to change colors

### 3. Build for Production

```bash
npm run build
```

Creates optimized files in the `dist` folder.

## 📂 What Files Do What?

### Main Files You'll Edit:

| File | Purpose |
|------|---------|
| `src/components/Events.jsx` | Add/edit events |
| `src/components/Hero.jsx` | Change hero section |
| `src/components/About.jsx` | Update about text & stats |
| `src/components/Contact.jsx` | Modify contact info |
| `src/components/Sponsors.jsx` | Add sponsor logos |
| `src/App.css` | Change colors & styles |

### Key Features in Each Component:

#### 🏠 Hero Section
- Liquid mirror animated title
- Floating gradient blobs
- CTA buttons with gradients
- Smooth fade-in animations

#### 📋 About Section
- Glassmorphism card
- 4 animated stat boxes
- Gradient accent line on top
- Scroll-triggered animations

#### 🎪 Events Section
- 6 event cards with glassmorphism
- Hover 3D tilt effects
- Color-coded with gradients
- Prize amounts displayed
- Register buttons

#### 💼 Sponsors Section
- Tiered sponsor display (Platinum, Gold, Silver)
- Glassmorphism placeholders
- "Become a Sponsor" CTA
- Gradient text for tiers

#### 📧 Contact Section
- Beautiful glassmorphism form
- Icon-based contact details
- Social media links
- Form validation
- Smooth animations on focus

#### 🌐 Footer
- Multi-column layout
- Quick links
- Social links
- Gradient branding

## 🎨 Customization Guide

### Change Main Colors

Edit `src/App.css`:

```css
:root {
  --neon-blue: #00F0FF;      /* Change to your color */
  --neon-purple: #B026FF;    /* Change to your color */
  --anime-pink: #FF69B4;     /* Change to your color */
}
```

### Add New Event

Edit `src/components/Events.jsx`:

```javascript
const eventData = [
  // ... existing events
  {
    id: 7,
    title: "Your New Event",
    description: "Amazing event description here!",
    icon: "🎯",  // Change emoji
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
    prize: "₹20,000"
  }
]
```

### Update Stats

Edit `src/components/About.jsx`:

```javascript
<div className="stat-item glass">
  <h3>500+</h3>  {/* Change number */}
  <p>Participants</p>  {/* Change label */}
</div>
```

### Change Contact Info

Edit `src/components/Contact.jsx`:

```javascript
<p>techvidya@svit.ac.in</p>  {/* Your email */}
<p>Bangalore, India</p>       {/* Your location */}
<p>+91 XXX XXX XXXX</p>        {/* Your phone */}
```

## 🎯 Common Tasks

### Add Images/Logos

1. Put images in `/public` folder
2. Reference them:
   ```jsx
   <img src="/logo.png" alt="Logo" />
   ```

### Change Font

Edit `src/App.css`:
```css
@import url("https://fonts.googleapis.com/css2?family=Your+Font&display=swap");

body {
  font-family: "Your Font", sans-serif;
}
```

### Disable Particle Background

Comment out in `src/App.jsx`:
```jsx
{/* <ParticleBackground /> */}
```

## 🐛 Troubleshooting

### Server won't start?
```bash
rm -rf node_modules
npm install
npm run dev
```

### Changes not showing?
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Clear browser cache
- Check console for errors

### Build fails?
```bash
npm run build -- --debug
```

## 📱 Test on Mobile

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac)
2. Start server: `npm run dev`
3. Visit from phone: `http://YOUR-IP:5173`

Make sure phone and computer are on same WiFi!

## 🚀 Deploy Live

See `DEPLOYMENT.md` for detailed instructions.

**Quickest way**:
```bash
npm run build
npx vercel --prod
```

## 💡 Pro Tips

1. **Keep it Fast**: Avoid adding too many heavy images
2. **Test Responsive**: Use browser dev tools (F12) → Device toolbar
3. **Backup**: Commit to Git regularly
4. **Customize**: Make it yours! Change colors, fonts, content
5. **Add Analytics**: Track visitors with Google Analytics

## 🎓 Learning Resources

- **React**: [react.dev](https://react.dev)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)
- **Three.js**: [threejs.org](https://threejs.org)
- **CSS Glassmorphism**: [glassmorphism.com](https://glassmorphism.com)

## 📞 Need Help?

Common issues:
1. **"Module not found"** → `npm install`
2. **"Port in use"** → Close other dev servers or use different port
3. **"Build failed"** → Check for syntax errors in console

## ✅ Checklist Before Launch

- [ ] Update all text content
- [ ] Add real event details
- [ ] Update contact information
- [ ] Add sponsor logos
- [ ] Test on mobile devices
- [ ] Test all forms
- [ ] Update social media links
- [ ] Add real images
- [ ] Test all buttons/links
- [ ] Run `npm run build` to check for errors
- [ ] Get feedback from team

---

## 🎉 You're All Set!

Your beautiful portfolio is ready. Start customizing and make it amazing! 🚀

**Dev Server Running?** Check: `http://localhost:5173`

Happy coding! 💻✨

