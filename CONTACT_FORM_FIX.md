# 🔧 Contact Form - Netlify Deployment Fix

## Issues Fixed ✅

### 1. Photos Not Showing
**Problem:** Photos were in `port photo` folder but not copied to build
**Solution:** Moved all photos to `public/port photo/` folder
- Vite automatically copies `public` folder contents to `dist` during build
- All photos now included in production build

### 2. Contact Form Not Working on Netlify

The contact form should work on Netlify, but here's how to verify and fix:

## 📧 Verify EmailJS Configuration

Your EmailJS credentials are in `src/config.js`:
```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_50mn4th',
  templateId: 'template_svhhre8',
  publicKey: 'N4x7EQ9nFvFViVyeP'
}
```

## ✅ Steps to Test Contact Form on Netlify

### 1. Clear Browser Cache
- Press `Ctrl + Shift + Delete` (Windows) or `Cmd + Shift + Delete` (Mac)
- Select "Cached images and files"
- Click "Clear data"
- Refresh your Netlify site

### 2. Check EmailJS Dashboard

Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)

**Verify Service:**
- Email Services → Check service `service_50mn4th` is connected (green checkmark)
- If red X, reconnect your Gmail account

**Verify Template:**
- Email Templates → Open template `template_svhhre8`
- Settings (gear icon) → Check "To email" is set to: `rajharsh7070@gmail.com`
- Make sure template has these variables:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`
  - `{{reply_to}}`

**Check Public Key:**
- Account → General
- Verify public key matches: `N4x7EQ9nFvFViVyeP`

### 3. Test on Live Site

1. **Open your Netlify URL** in browser
2. **Press F12** to open Developer Console
3. **Go to Contact section**
4. **Fill out the form** with test data
5. **Submit and watch Console tab** for:
   - ✅ "EmailJS initialized successfully"
   - ✅ "Sending email with config:"
   - ✅ "EmailJS Response: {status: 200, text: 'OK'}"
   - ❌ Any error messages

### 4. Common Issues & Fixes

#### Issue: "EmailJS is not defined"
**Fix:** The library might not be loading. Check if you have internet connection.

#### Issue: "Invalid public key"
**Fix:** 
1. Go to EmailJS Dashboard → Account → General
2. Copy the public key again
3. Update in `src/config.js`
4. Rebuild and redeploy

#### Issue: "Template not found"
**Fix:**
1. Check template ID in EmailJS dashboard
2. Make sure it matches exactly in config.js
3. No extra spaces

#### Issue: "Service not found"
**Fix:**
1. Check service ID in EmailJS dashboard
2. Reconnect your Gmail if needed
3. Make sure service is active

#### Issue: Form submits but no email arrives
**Fix:**
1. Check spam folder in rajharsh7070@gmail.com
2. Verify "To email" in template settings
3. Test template directly in EmailJS dashboard (Test It button)

### 5. Alternative: Test EmailJS Directly

Use the test page we created:
```
https://your-site.netlify.app/test-email.html
```

This isolated test page can help identify if the issue is with EmailJS config or React code.

## 🔄 Redeploy to Netlify

If you connected Netlify to GitHub, it will auto-deploy when you push changes.

**To manually trigger a redeploy:**

1. **Option A: Push to GitHub** (Automatic)
   ```bash
   # Already done above! 
   # Netlify will detect and redeploy automatically
   ```

2. **Option B: Manual Deploy in Netlify Dashboard**
   - Go to your site in Netlify
   - Click "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

3. **Option C: Drag & Drop New Build**
   - Build locally: `npm run build`
   - Go to: https://app.netlify.com/drop
   - Drag the `dist` folder
   - This replaces your existing site

## 🧪 Testing Checklist After Redeployment

1. **Photos Load**
   - [ ] Hero section photo (photo3.png)
   - [ ] About section photo
   - [ ] Project images (PDF Maker, Gatecraft, Portfolio)
   - [ ] Achievement photos

2. **Contact Form Works**
   - [ ] Form fields are visible
   - [ ] Can type in all fields
   - [ ] Submit button works
   - [ ] Success/error message shows
   - [ ] Email arrives at rajharsh7070@gmail.com

3. **No Console Errors**
   - [ ] Open DevTools (F12)
   - [ ] No red error messages
   - [ ] EmailJS logs show success

## 📱 Mobile Testing

Don't forget to test on mobile:
1. Open site on your phone
2. Try the contact form
3. Check if photos load
4. Verify responsive layout

## 🆘 Still Not Working?

### Debug Steps:

1. **Check Netlify Build Logs**
   - Go to Deploys tab
   - Click on latest deploy
   - Check for any warnings or errors

2. **Check Netlify Functions (if used)**
   - We're using client-side EmailJS, so no functions needed
   - But check if any are accidentally created

3. **Environment Variables**
   - We're NOT using env variables
   - Config is directly in code
   - So no need to add them in Netlify

### Get Help:

If contact form still doesn't work:

1. **Share these details:**
   - Netlify site URL
   - Error messages from browser console
   - EmailJS dashboard status (service connected?)

2. **Test with Simple Form:**
   - Create a test with just HTML (test-email.html)
   - If that works → React code issue
   - If that fails → EmailJS config issue

## ✅ Summary of Fixes

1. ✅ **Photos Fixed**: Moved to `public/port photo/` folder
2. ✅ **Build Updated**: Rebuilt with photos included
3. ✅ **Changes Pushed**: Committed and pushed to GitHub
4. ✅ **Auto-Deploy**: Netlify will automatically redeploy from GitHub

**Next:** Wait 2-3 minutes for Netlify to auto-deploy, then test your site!

---

Your portfolio should now show all photos and the contact form should work! 🎉
