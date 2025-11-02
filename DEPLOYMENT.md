# 🚀 Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended) ⭐

Vercel offers the best experience for Vite + React apps with zero configuration.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the web interface:
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click Deploy (automatic build settings detected)
4. Done! 🎉

**Free Tier**: Unlimited deployments, custom domain, automatic HTTPS

### 2. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or drag-and-drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

**Free Tier**: 100GB bandwidth/month, custom domain, automatic HTTPS

### 3. GitHub Pages

Add to `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/',
})
```

Then deploy:
```bash
npm run build
npx gh-pages -d dist
```

### 4. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Build
npm run build

# Deploy
firebase deploy
```

## Build Settings

All platforms should detect these automatically:

- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

## Environment Variables

If you add backend later, create `.env` file:

```env
VITE_API_URL=your-api-url
VITE_EMAIL_SERVICE=your-email-service
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

## Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Configure DNS

## Performance Optimization

The build is already optimized with:
- ✅ Code splitting
- ✅ Tree shaking
- ✅ Minification
- ✅ Asset optimization

### Additional Tips:

1. **Enable Compression**
   - Vercel/Netlify do this automatically
   - For other hosts, enable gzip/brotli

2. **CDN Caching**
   - Configure cache headers for static assets
   - Most platforms handle this automatically

3. **Image Optimization**
   - Use WebP format for images
   - Add images to `/public` folder

## Testing Production Build Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test

## Troubleshooting

### Issue: White screen after deployment
**Solution**: Check console for errors. Usually a base URL issue.
Add to `vite.config.js`:
```javascript
base: '/'
```

### Issue: 404 on refresh
**Solution**: Configure redirects for SPA

**Netlify** - Create `public/_redirects`:
```
/*    /index.html   200
```

**Vercel** - Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Issue: Build fails
**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## SSL Certificate

All recommended platforms provide free SSL certificates automatically via Let's Encrypt.

## Monitoring

### Free Options:
- **Vercel Analytics** (built-in)
- **Google Analytics** (add to `index.html`)
- **Plausible** (privacy-friendly)

## Budget Breakdown

### Free Forever:
- Vercel: Perfect for college fest
- Netlify: Great alternative
- GitHub Pages: Basic hosting

### Paid (Optional):
- Custom domain: ₹500-1000/year
- Backend hosting: ₹0-500/month (if needed later)

## Recommended: Vercel

For TECHVIDYA 2K25, I recommend **Vercel** because:
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free for personal/college projects
- Automatic preview deployments
- Easy custom domain setup

## Quick Deploy to Vercel

```bash
# One command deployment
npx vercel --prod
```

That's it! Your site will be live at `your-project.vercel.app`

---

Need help? Contact the TECHVIDYA tech team! 🚀

