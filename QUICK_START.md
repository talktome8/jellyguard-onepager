# Quick Start Checklist

Follow these steps to get your JellyGuard one-pager running:

## ☐ Step 1: Install Dependencies

```bash
cd jellyguard-onepager
npm install
```

**Expected time**: 2-3 minutes

## ☐ Step 2: Start Development Server

```bash
npm run dev
```

**Expected time**: 10-15 seconds

## ☐ Step 3: Open in Browser

Visit these URLs:
- English: http://localhost:3000/en
- Hebrew: http://localhost:3000/he

## ☐ Step 4: Verify Features

### Navigation
- [ ] Header is sticky on scroll
- [ ] Language toggle switches between EN/HE
- [ ] CTA button links to contact form

### Animation
- [ ] Jellyfish sprites are visible in background
- [ ] Jellyfish move upward when scrolling
- [ ] Skim effect occurs at top of viewport
- [ ] Animation is smooth (no jank)

### Content (English)
- [ ] Hero section displays
- [ ] Opening section displays
- [ ] Promise section displays
- [ ] Global Impact (2 columns) displays
- [ ] Four Steps section displays
- [ ] Differentiators (4 cards) display
- [ ] Who We Serve section displays
- [ ] Site Requirements section displays
- [ ] Commercial Model section displays
- [ ] Safety & Ecology section displays
- [ ] Final CTA and contact form display
- [ ] Footer displays

### Content (Hebrew)
- [ ] All sections display in Hebrew
- [ ] Layout is RTL (right-to-left)
- [ ] Heebo font is applied
- [ ] Text alignment is correct
- [ ] Cards and layouts mirror properly

### Contact Form
- [ ] All fields are present (name, org, role, email, phone, region, message)
- [ ] Required fields show validation
- [ ] Email field validates email format
- [ ] Submit button works
- [ ] Success message appears on submit
- [ ] Form resets after successful submit

### Responsive Design
- [ ] Desktop layout looks good (>1024px)
- [ ] Tablet layout looks good (768px-1023px)
- [ ] Mobile layout looks good (<768px)
- [ ] No horizontal scroll on any size

### Accessibility
- [ ] Tab key navigates through interactive elements
- [ ] Focus indicators are visible
- [ ] Form labels are associated with inputs
- [ ] Error messages are readable

## ☐ Step 5: Build for Production

```bash
npm run build
```

Check for:
- [ ] Build completes without errors
- [ ] No TypeScript errors
- [ ] No build warnings (or expected warnings only)

## ☐ Step 6: Test Production Build

```bash
npm start
```

Verify:
- [ ] Site runs on http://localhost:3000
- [ ] All features work as in development
- [ ] Performance is good

## 🎨 Step 7: Customize (Optional)

### Add Your Logo
1. Place logo file in `/public/images/logo.svg`
2. Update `Header.tsx`:
```tsx
import Image from 'next/image';

<Image 
  src="/images/logo.svg" 
  alt="JellyGuard"
  width={150}
  height={40}
/>
```

### Update Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  navy: '#YOUR_COLOR',
  teal: '#YOUR_COLOR',
  sand: '#YOUR_COLOR',
  ink: '#YOUR_COLOR',
}
```

### Modify Content
Edit files in `/locales/`:
- `en.json` for English
- `he.json` for Hebrew

### Adjust Animation
Edit `JellyScroll.tsx`:
- Line 46: Change jellyfish count
- Line 51: Adjust speed range
- Line 85: Modify skim threshold

## 🚀 Step 8: Deploy

### Option A: Vercel (Easiest)
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "Import Project"
4. Select your repository
5. Click "Deploy"

### Option B: Netlify
1. Push code to GitHub
2. Go to https://netlify.com
3. Click "New site from Git"
4. Select repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

### Option C: Other Platforms
See `SETUP_GUIDE.md` for detailed instructions

## ✅ Completion Checklist

- [ ] Dependencies installed
- [ ] Development server running
- [ ] English version works
- [ ] Hebrew version works
- [ ] RTL layout correct
- [ ] Animation running smoothly
- [ ] All sections visible
- [ ] Contact form functional
- [ ] Responsive on all devices
- [ ] Production build successful
- [ ] Ready for deployment

## 📝 Notes

**Common Issues:**

1. **Port 3000 in use?**
   - Kill the process or use different port: `npm run dev -- -p 3001`

2. **Module not found?**
   - Delete `node_modules` and `.next`
   - Run `npm install` again

3. **TypeScript errors?**
   - These will resolve after `npm install`
   - Ensure `node_modules` and `.next` are generated

4. **Styles not applying?**
   - Clear browser cache
   - Ensure `globals.css` is imported in `layout.tsx`

5. **Animation not visible?**
   - Check browser console for errors
   - Verify SVG is rendering (inspect element)

## 🎯 Next Actions

After completing checklist:

1. **Add Content**: Update locale JSON files with your copy
2. **Add Images**: Place images in `/public/images/`
3. **Configure Email**: Set up contact form backend
4. **Add Analytics**: Install tracking code
5. **SEO Setup**: Add meta tags and sitemap
6. **Deploy**: Push to production hosting

## 📞 Support

- Review `README.md` for overview
- Check `SETUP_GUIDE.md` for detailed instructions
- Read `PROJECT_STRUCTURE.md` for architecture
- See `PROJECT_SUMMARY.md` for complete features list

---

**Estimated Setup Time**: 5-10 minutes (excluding customization)

**Ready to go?** Start with Step 1! ⬆️
