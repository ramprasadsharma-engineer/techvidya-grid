# PWA & Mobile Optimization Setup Guide

## 🎯 PWA Icons Required

You need to create the following icon files in the `public` folder:

### Required Icons:
1. **pwa-192x192.png** - 192x192 pixels
2. **pwa-512x512.png** - 512x512 pixels
3. **apple-touch-icon.png** - 180x180 pixels
4. **og-image.png** - 1200x630 pixels (for social media)

### Quick Way to Generate Icons:

**Option 1: Use Online Tool (Recommended)**
- Go to https://realfavicongenerator.net/
- Upload your logo/icon
- Download the generated files
- Place them in the `public` folder

**Option 2: Use Figma/Photoshop**
- Create a square canvas with your logo
- Export as PNG in the required sizes
- Ensure high contrast and visibility at small sizes

**Option 3: Use ImageMagick (Command Line)**
```bash
# If you have a single logo.png file
magick logo.png -resize 192x192 public/pwa-192x192.png
magick logo.png -resize 512x512 public/pwa-512x512.png
magick logo.png -resize 180x180 public/apple-touch-icon.png
magick logo.png -resize 1200x630 public/og-image.png
```

## 📱 Testing Your PWA

### On Desktop (Chrome/Edge):
1. Run `npm run dev` or `npm run build && npm run preview`
2. Open Chrome DevTools (F12)
3. Go to "Application" tab → "Manifest"
4. Check for any errors
5. Go to "Service Workers" to verify registration

### On Mobile (Android):
1. Deploy your site (or use ngrok for local testing)
2. Open in Chrome
3. Click the "Add to Home Screen" prompt
4. Test offline functionality

### On Mobile (iOS):
1. Open in Safari
2. Tap Share button → "Add to Home Screen"
3. The app will appear on your home screen

## 🚀 Build and Deploy

```bash
# Install dependencies (if not done)
npm install

# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## ✅ What's Been Implemented

### ✅ PWA Features:
- [x] Service Worker with auto-update
- [x] Offline caching for assets
- [x] Google Fonts caching
- [x] PWA manifest with proper metadata
- [x] Install prompt support
- [x] Background sync ready

### ✅ Mobile Optimizations:
- [x] Responsive meta tags
- [x] Touch-friendly target sizes (44x44px minimum)
- [x] Optimized font sizes for mobile
- [x] Reduced backdrop blur on mobile
- [x] Safe area insets for notched devices (iPhone X+)
- [x] Prevents zoom on input focus (iOS)
- [x] Smooth scrolling with momentum
- [x] Loading screen for better UX
- [x] Reduced motion support (accessibility)

### ✅ Performance:
- [x] Code splitting (vendor, motion, three.js)
- [x] Lazy loading ready
- [x] Font preconnect
- [x] Image optimization
- [x] Asset caching

## 🔍 Verify Installation Worked

Check your `package.json` should now include:
```json
{
  "devDependencies": {
    "vite-plugin-pwa": "^x.x.x",
    "workbox-window": "^x.x.x"
  }
}
```

## 🐛 Troubleshooting

### Service Worker not registering?
- Make sure you're accessing via HTTPS or localhost
- Check browser console for errors
- Clear browser cache and reload

### Icons not showing?
- Ensure files are in `/public` folder
- Check file names match exactly
- Clear site data in DevTools

### Mobile performance issues?
- Reduce particle count in ParticleBackground component
- Disable heavy animations on mobile
- Use lazy loading for images

## 📊 Performance Tips

### For Better Mobile Performance:

1. **Reduce Three.js complexity on mobile:**
```javascript
// In your Three.js components
const isMobile = window.innerWidth < 768
const particleCount = isMobile ? 500 : 2000
```

2. **Lazy load components:**
```javascript
const Events = lazy(() => import('./components/Events'))
```

3. **Use lighter images:**
- Use WebP format
- Compress images before upload
- Use appropriate sizes for mobile

## 🎨 Customization

Edit `vite.config.js` to customize PWA settings:
- Change theme colors
- Modify caching strategies
- Add more runtime caching patterns
- Adjust manifest settings
