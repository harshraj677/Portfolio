# EmailJS Troubleshooting Guide

## 🔍 Current Configuration

Your EmailJS credentials in `src/config.js`:
- **Service ID**: `service_vpyc56w`
- **Template ID**: `template_svhhre88`  
- **Public Key**: `YMwP4UROtFPDGOKUek`

## ✅ Step-by-Step Verification

### 1. Check EmailJS Dashboard

Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/) and verify:

#### Email Service (Left Menu → Email Services)
- ✓ Service ID matches: `service_vpyc56w`
- ✓ Service is connected (shows green checkmark)
- ✓ Gmail account is properly linked

#### Email Template (Left Menu → Email Templates)
- ✓ Template ID matches: `template_svhhre88`
- ✓ Template contains these variables:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{message}}`
  - `{{to_name}}`
  - `{{reply_to}}`

**IMPORTANT**: Your template should look like this:

**Subject:**
```
New Message from {{from_name}}
```

**Content:**
```html
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

**To Email:** Make sure you set the recipient email to `rajharsh7070@gmail.com` in the template settings!

### 2. Test Email Template in EmailJS Dashboard

1. Go to your template in EmailJS dashboard
2. Click **"Test It"** button
3. Fill in test values
4. Click **"Send Test Email"**
5. Check if email arrives at `rajharsh7070@gmail.com`

If test email works → Configuration is correct, issue is in code
If test email fails → Fix template configuration first

### 3. Check Browser Console

1. Open your portfolio website
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Try submitting the contact form
5. Look for error messages

Common errors:
- `"Invalid public key"` → Public key is wrong
- `"Template not found"` → Template ID is wrong
- `"Service not found"` → Service ID is wrong
- `"The service is not configured"` → Gmail not connected

### 4. Verify Template Settings

In EmailJS Dashboard → Email Templates → Your Template:

1. Click **Settings** (gear icon)
2. Check **"To email"** field → Should be: `rajharsh7070@gmail.com`
3. Check **"From name"** field → Can use: `{{from_name}}`
4. Check **"Reply to"** field → Should use: `{{reply_to}}`

### 5. Check Gmail Settings

Sometimes Gmail blocks EmailJS. To fix:

1. Go to [https://myaccount.google.com/security](https://myaccount.google.com/security)
2. Enable **"Less secure app access"** (if available)
3. Or check **"Connected apps & sites"** and allow EmailJS

### 6. Test with Simple Template

Create a minimal test template:

**Subject:**
```
Test from Portfolio
```

**Content:**
```
Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}
```

**To Email:**
```
rajharsh7070@gmail.com
```

Save and test this simple template first.

## 🐛 Common Issues & Fixes

### Issue 1: "The service is not configured"
**Fix:** Reconnect your Gmail in Email Services section

### Issue 2: Getting success message but no email
**Fix:** 
- Check spam folder
- Verify "To Email" in template settings
- Test template directly in EmailJS dashboard

### Issue 3: "Invalid public key"
**Fix:** 
- Go to Account → General (in EmailJS dashboard)
- Copy the Public Key again
- Update in `src/config.js`

### Issue 4: Template variables not working
**Fix:** Make sure template uses exact variable names:
- `{{from_name}}` (not from-name or fromName)
- `{{from_email}}`
- `{{message}}`

### Issue 5: Rate limit exceeded
**Fix:** EmailJS free plan allows 200 emails/month
- Check your usage in dashboard
- Wait for next month or upgrade plan

## 🧪 Quick Test Steps

1. **Open your portfolio**: Navigate to Contact section
2. **Fill the form**:
   - Name: Test User
   - Email: test@example.com
   - Message: This is a test message
3. **Submit** and watch the console (F12)
4. **Look for**:
   - "Sending email with config:" → Shows your IDs
   - "EmailJS Response:" → Shows success/error
5. **Check email** at rajharsh7070@gmail.com (including spam)

## 📧 Manual Email Test

If form still not working, test EmailJS directly:

```javascript
// Paste this in browser console (F12)
emailjs.send(
  'service_vpyc56w',
  'template_svhhre88',
  {
    from_name: 'Test User',
    from_email: 'test@example.com',
    message: 'Test message from console',
    to_name: 'Harsh Raj',
    reply_to: 'test@example.com'
  }
).then(
  (response) => console.log('SUCCESS!', response),
  (error) => console.log('FAILED...', error)
)
```

## 🔧 Updated Code Features

I've added:
- ✅ Proper EmailJS initialization with `emailjs.init()`
- ✅ Better error messages showing actual error details
- ✅ Console logging for debugging
- ✅ Form validation
- ✅ Reply-to field for easier responses

## 📞 Next Steps

1. **First**: Test your template directly in EmailJS dashboard
2. **Second**: Check browser console for errors when submitting
3. **Third**: Verify all IDs match exactly (no extra spaces)
4. **Fourth**: Check spam folder in rajharsh7070@gmail.com

If still not working, share the exact error message from the console!

## 🎯 Most Common Solution

**90% of email issues are caused by incorrect "To Email" in template settings!**

Go to: EmailJS Dashboard → Email Templates → Your Template → Settings → To Email
Make sure it says: `rajharsh7070@gmail.com`

---

**Still stuck?** Check the browser console (F12) and share the error message for more specific help.
