# 🚀 Netlify Deployment Guide

Your portfolio is ready to be deployed on Netlify! Follow these simple steps:

## 📋 Prerequisites

- ✅ GitHub account (you already have the repo: Portfolio)
- ✅ All changes committed to GitHub
- ✅ Netlify configuration file created (`netlify.toml`)

## 🌐 Method 1: Deploy via GitHub (Recommended)

### Step 1: Commit Configuration Files

First, let's commit the new Netlify configuration:

```bash
git add netlify.toml
git commit -m "Add Netlify configuration for deployment"
git push origin main
```

### Step 2: Sign Up / Login to Netlify

1. Go to [https://www.netlify.com/](https://www.netlify.com/)
2. Click **"Sign Up"** or **"Log In"**
3. Choose **"Sign up with GitHub"** (easiest option)
4. Authorize Netlify to access your GitHub account

### Step 3: Create New Site

1. Click **"Add new site"** button (top right)
2. Select **"Import an existing project"**
3. Choose **"Deploy with GitHub"**
4. Select your repository: **harshraj677/Portfolio**

### Step 4: Configure Build Settings

Netlify will auto-detect your settings, but verify:

- **Branch to deploy**: `main`
- **Build command**: `npm run build`
- **Publish directory**: `dist`

Click **"Deploy site"**

### Step 5: Wait for Deployment

- First build takes 2-5 minutes
- You'll see a random URL like: `random-name-123456.netlify.app`
- Once done, your site is LIVE! 🎉

### Step 6: Customize Domain (Optional)

1. Click **"Site settings"**
2. Go to **"Domain management"**
3. Click **"Options"** → **"Edit site name"**
4. Change to something like: `harshraj-portfolio.netlify.app`

## 🖱️ Method 2: Drag & Drop Deploy (Quick Test)

If you want to test quickly without GitHub integration:

### Step 1: Build Your Project Locally

```bash
npm run build
```

This creates a `dist` folder with your built site.

### Step 2: Deploy to Netlify

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `dist` folder onto the page
3. Wait for upload to complete
4. Your site is live!

**Note:** This method doesn't auto-deploy when you push changes to GitHub.

## 🔄 Automatic Deployments

Once connected via GitHub:

- ✅ Every `git push` to main branch automatically deploys
- ✅ See build logs in Netlify dashboard
- ✅ Rollback to previous versions if needed
- ✅ Preview deployments for pull requests

## ⚙️ Environment Variables (If Needed)

If you need to add environment variables:

1. Go to **Site settings** → **Build & deploy** → **Environment**
2. Click **"Add environment variable"**
3. Add any variables your app needs
4. Redeploy the site

## 🎨 Custom Domain (Optional)

Want to use your own domain like `harshraj.com`?

1. Buy a domain from Namecheap, GoDaddy, etc.
2. In Netlify: **Domain settings** → **Add custom domain**
3. Follow Netlify's instructions to update DNS
4. Netlify provides free HTTPS certificate automatically!

## 🐛 Troubleshooting

### Build Fails?

**Check the build log** in Netlify dashboard:

- Missing dependencies? Run `npm install` locally to update `package.json`
- Build errors? Fix them locally first with `npm run build`
- Node version issues? Netlify uses Node 18 (specified in `netlify.toml`)

### Site Loads but Shows 404?

- Make sure `publish` directory is `dist` (not `build`)
- Check that `netlify.toml` is in root directory
- Verify redirects rule is in place for SPA routing

### Images Not Loading?

- Check image paths in your code (should be relative or absolute from root)
- Images in `public` folder are served from root: `/image.png`
- Images in `src` should be imported in components

### Contact Form Not Working?

- EmailJS works on any domain, no changes needed
- But verify your EmailJS credentials in `src/config.js`
- Test the form after deployment

## 📊 Monitor Your Site

Netlify Dashboard provides:

- 📈 Analytics (visitors, page views)
- 🏗️ Build history and logs
- 🔄 Deploy status
- 📉 Bandwidth usage
- ⚡ Performance metrics

## 🚀 Quick Deploy Checklist

Before deploying, make sure:

- [ ] All code is committed and pushed to GitHub
- [ ] `npm run build` works locally without errors
- [ ] EmailJS credentials are configured
- [ ] Images are properly referenced
- [ ] `netlify.toml` is in project root
- [ ] `package.json` has correct build script

## 🎯 Next Steps After Deployment

1. **Test Everything**:
   - Navigation works
   - All images load
   - Contact form sends emails
   - Responsive on mobile
   - Dark mode toggle works

2. **Share Your Portfolio**:
   - Add the URL to your GitHub profile
   - Share on LinkedIn
   - Add to your resume
   - Share with potential employers

3. **Keep Updating**:
   - Push changes to GitHub
   - Netlify auto-deploys
   - Check build logs if issues arise

## 💡 Pro Tips

1. **Branch Previews**: Create feature branches and Netlify will create preview URLs
2. **Deploy Previews**: Every pull request gets its own preview URL
3. **Form Submissions**: Enable Netlify Forms for simple contact forms (alternative to EmailJS)
4. **Analytics**: Enable Netlify Analytics for detailed visitor stats
5. **Functions**: Use Netlify Functions for serverless backend features

## 🔗 Useful Links

- [Netlify Dashboard](https://app.netlify.com/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Community](https://answers.netlify.com/)
- [Status Page](https://www.netlifystatus.com/)

---

## 🎉 Ready to Deploy!

Your project is configured and ready. Just follow **Method 1** above to deploy via GitHub.

Your portfolio will be live at: `https://your-site-name.netlify.app`

**Questions?** Check Netlify's excellent documentation or their community forums!

Good luck with your deployment! 🚀
