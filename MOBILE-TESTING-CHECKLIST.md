# 📱 Mobile Testing Checklist

## Before Testing - Icon Requirements

⚠️ **IMPORTANT**: Create these icon files in `/public` folder first:
- `pwa-192x192.png` (192x192px)
- `pwa-512x512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

See `PWA-SETUP.md` for detailed instructions on creating these icons.

---

## 🧪 Testing Steps

### 1. Local Development Testing

```bash
# Start dev server
npm run dev

# Or build and preview production
npm run build
npm run preview
```

### 2. Desktop Browser Testing (Chrome/Edge)

#### ✅ PWA Manifest Check:
- [ ] Open DevTools (F12)
- [ ] Go to **Application** → **Manifest**
- [ ] Verify all fields are populated
- [ ] Check icons load correctly
- [ ] No errors in console

#### ✅ Service Worker Check:
- [ ] Go to **Application** → **Service Workers**
- [ ] Verify service worker is registered
- [ ] Status should be "activated and running"
- [ ] Test offline mode (Network → Offline checkbox)
- [ ] Reload page - should work offline

#### ✅ Responsive Design:
- [ ] Open DevTools Device Toolbar (Ctrl+Shift+M)
- [ ] Test these viewports:
  - iPhone SE (375x667)
  - iPhone 12 Pro (390x844)
  - Pixel 5 (393x851)
  - iPad (768x1024)
  - Galaxy S20 (360x800)
- [ ] Check for horizontal scroll
- [ ] Verify touch targets are large enough
- [ ] Test landscape orientation

### 3. Mobile Testing (Android)

#### Using Chrome DevTools Remote Debugging:
1. Enable USB Debugging on Android
2. Connect phone via USB
3. Open `chrome://inspect` in desktop Chrome
4. Click "Inspect" on your device

#### ✅ On-Device Testing:
- [ ] Navigate to your site (use ngrok for local: `npx ngrok http 5173`)
- [ ] Check page loads correctly
- [ ] Test scrolling performance
- [ ] Tap buttons - verify no delays
- [ ] Check animations are smooth
- [ ] Test form inputs (no zoom on focus)
- [ ] Verify safe area on notched devices

#### ✅ PWA Installation (Android):
- [ ] See "Add to Home Screen" banner
- [ ] Tap "Install"
- [ ] App appears on home screen
- [ ] Icon loads correctly
- [ ] Open from home screen - full screen mode
- [ ] Test offline functionality
- [ ] Check splash screen appears

### 4. Mobile Testing (iOS/Safari)

#### ✅ Safari Testing:
- [ ] Open in Safari browser
- [ ] Check layout is correct
- [ ] Test scrolling smoothness
- [ ] Verify backdrop blur works
- [ ] Check safe area insets (notch)
- [ ] Test form inputs

#### ✅ PWA Installation (iOS):
- [ ] Tap **Share** button (bottom middle)
- [ ] Tap **"Add to Home Screen"**
- [ ] Edit name if needed
- [ ] Tap "Add"
- [ ] App appears on home screen
- [ ] Open from home screen
- [ ] Check status bar styling
- [ ] Test offline mode

### 5. Performance Testing

#### ✅ Lighthouse Audit:
- [ ] Open DevTools → Lighthouse
- [ ] Run audit on Mobile
- [ ] Check scores:
  - Performance: > 90
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90
  - PWA: ✓ Installable

#### ✅ Network Throttling:
- [ ] DevTools → Network → Slow 3G
- [ ] Test page load time
- [ ] Check loading states
- [ ] Verify progressive loading

### 6. Cross-Browser Testing

#### ✅ Test on Multiple Browsers:
- [ ] Chrome (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet (Android)
- [ ] Firefox (Mobile)
- [ ] Edge (Mobile)

### 7. Interaction Testing

#### ✅ Touch Gestures:
- [ ] Tap buttons - no delay
- [ ] Swipe scroll - smooth
- [ ] Pinch zoom (on images if enabled)
- [ ] Pull to refresh (should work)
- [ ] Long press (check behavior)

#### ✅ Forms & Inputs:
- [ ] Text input - no zoom on focus
- [ ] Email input - shows @ key
- [ ] Phone input - shows numeric keyboard
- [ ] Date pickers work correctly
- [ ] Form validation works

#### ✅ Navigation:
- [ ] Menu toggle works
- [ ] Links open correctly
- [ ] Back button behavior
- [ ] Anchor links scroll smoothly
- [ ] External links open in new tab

### 8. Visual Testing

#### ✅ Layout Check:
- [ ] No horizontal scroll
- [ ] All images load
- [ ] No text overflow
- [ ] Proper spacing on all screens
- [ ] Typography is readable
- [ ] Colors have good contrast

#### ✅ Animation Performance:
- [ ] Particle background (check FPS)
- [ ] Framer Motion animations smooth
- [ ] No jank during scroll
- [ ] Transitions are fluid
- [ ] Consider reducing on low-end devices

### 9. Orientation Testing

#### ✅ Portrait Mode:
- [ ] Layout stacks vertically
- [ ] Content is readable
- [ ] Navigation accessible

#### ✅ Landscape Mode:
- [ ] Layout adapts correctly
- [ ] No content cut off
- [ ] Safe areas respected

### 10. Offline Testing

#### ✅ Offline Functionality:
- [ ] Turn on Airplane mode
- [ ] Open installed PWA
- [ ] App should still work
- [ ] Cached pages load
- [ ] Proper offline message if needed
- [ ] Google Fonts still load

---

## 🐛 Common Issues & Fixes

### Issue: Service Worker not registering
**Fix**: 
- Clear browser cache
- Check console for errors
- Ensure you're on HTTPS or localhost

### Issue: Icons not showing
**Fix**:
- Verify files exist in `/public` folder
- Check file names match exactly
- Clear application cache in DevTools

### Issue: Horizontal scroll on mobile
**Fix**:
- Check for `overflow-x: hidden` on body
- Look for elements wider than viewport
- Use Chrome DevTools to identify culprit

### Issue: Input zoom on iOS
**Fix**:
- Ensure font-size is at least 16px
- Already implemented in App.css

### Issue: Slow performance on mobile
**Fix**:
- Reduce particle count on mobile
- Optimize images
- Check for heavy animations
- Use Chrome DevTools Performance tab

### Issue: PWA install prompt not showing
**Fix**:
- Ensure manifest is valid
- Check all required icons exist
- Verify service worker is active
- Some browsers require HTTPS

---

## 📊 Expected Scores

### Lighthouse Mobile Scores:
- **Performance**: 85-95
- **Accessibility**: 90-100
- **Best Practices**: 90-100
- **SEO**: 90-100
- **PWA**: ✓ Installable

### Load Times (on 4G):
- **First Contentful Paint**: < 2s
- **Time to Interactive**: < 3s
- **Speed Index**: < 3s

---

## 🎯 Real Device Testing Tools

### Remote Testing Services:
- **BrowserStack** - Test on real devices
- **LambdaTest** - Cross-browser testing
- **Sauce Labs** - Mobile testing
- **ngrok** - Expose localhost to internet

### Quick ngrok Usage:
```bash
# Install ngrok
npm install -g ngrok

# Start your dev server
npm run dev

# In another terminal
ngrok http 5173

# Use the https URL on your mobile device
```

---

## ✅ Final Pre-Deployment Checklist

Before deploying to production:

- [ ] All icons created and optimized
- [ ] Service worker registers correctly
- [ ] Tested on iOS (Safari)
- [ ] Tested on Android (Chrome)
- [ ] Lighthouse scores > 90
- [ ] No console errors
- [ ] Forms work correctly
- [ ] Navigation works smoothly
- [ ] Offline mode works
- [ ] Install prompt appears
- [ ] Safe area insets work on notched devices
- [ ] All event registration links work
- [ ] Performance is acceptable on slow networks

---

## 🚀 Deploy When Ready

Once all checks pass:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod

# Or Netlify
netlify deploy --prod
```

Your mobile-optimized PWA is ready! 🎉
