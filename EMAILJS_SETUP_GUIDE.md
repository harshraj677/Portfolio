# EmailJS Setup Guide for Contact Form

Your contact form is now connected to EmailJS! Follow these steps to complete the setup:

## 📧 Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **Sign Up** (it's free!)
3. Sign up with your email or Google account

## 📬 Step 2: Add Email Service

1. After logging in, go to **Email Services** in the left menu
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended):
   - Select **Gmail**
   - Click **Connect Account**
   - Sign in with your Gmail account (use: rajharsh7070@gmail.com)
   - Allow EmailJS to send emails on your behalf
4. Give your service a name (e.g., "Portfolio Contact Form")
5. Copy the **Service ID** (something like `service_abc123`)

## 📝 Step 3: Create Email Template

1. Go to **Email Templates** in the left menu
2. Click **Create New Template**
3. Use this template setup:

### Template Settings:
- **Template Name**: Portfolio Contact Form

### Email Content:
**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Body (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
  <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #0ea5e9; margin-bottom: 20px;">New Message from Portfolio Contact Form</h2>
    
    <div style="margin-bottom: 20px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #0ea5e9;">
      <p style="margin: 5px 0;"><strong>From:</strong> {{from_name}}</p>
      <p style="margin: 5px 0;"><strong>Email:</strong> {{from_email}}</p>
    </div>
    
    <div style="margin-top: 20px;">
      <h3 style="color: #333; margin-bottom: 10px;">Message:</h3>
      <div style="padding: 15px; background-color: #f8f9fa; border-radius: 5px; white-space: pre-wrap;">
        {{message}}
      </div>
    </div>
    
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
    
    <p style="color: #666; font-size: 12px; margin-top: 20px;">
      This email was sent from your portfolio website contact form.
    </p>
  </div>
</div>
```

4. **Important**: Set the recipient email to your email: `rajharsh7070@gmail.com`
5. Click **Save**
6. Copy the **Template ID** (something like `template_xyz789`)

## 🔑 Step 4: Get Public Key

1. Go to **Account** in the left menu (top icon)
2. Find **Public Key** section
3. Copy your **Public Key** (something like `aBcD123eFg456`)

## ⚙️ Step 5: Update Configuration

Open the file `src/config.js` and update the EmailJS configuration:

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'service_abc123',    // Replace with your Service ID from Step 2
  templateId: 'template_xyz789',   // Replace with your Template ID from Step 3
  publicKey: 'aBcD123eFg456'      // Replace with your Public Key from Step 4
}
```

## ✅ Step 6: Test Your Contact Form

1. Make sure your development server is running (`npm run dev`)
2. Navigate to the Contact section on your portfolio
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email inbox (rajharsh7070@gmail.com) for the test message

## 🎉 That's It!

Your contact form is now fully functional and will send emails directly to your inbox!

## 🔧 Troubleshooting

### Form not sending?
- Check browser console for errors (F12 → Console tab)
- Verify all three IDs are correctly copied in `config.js`
- Make sure there are no extra spaces in the IDs

### Not receiving emails?
- Check your spam folder
- Verify the recipient email in EmailJS template settings
- Test the template directly from EmailJS dashboard

### Rate Limits
- EmailJS free plan allows 200 emails/month
- Upgrade if you need more capacity

## 📱 Template Variables Available

Your form sends these variables to EmailJS:
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - The message content
- `{{to_name}}` - Your name (Harsh Raj)

## 🎨 Customization

You can customize the email template design in the EmailJS dashboard:
- Change colors to match your brand
- Add your logo
- Modify the layout
- Add more fields

## 📚 Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Templates Guide](https://www.emailjs.com/docs/user-guide/creating-email-template/)
- [EmailJS React Guide](https://www.emailjs.com/docs/examples/reactjs/)

---

**Need Help?** If you encounter any issues, check the EmailJS documentation or reach out to their support team.
