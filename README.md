# 🚀 Harsh Raj - Professional 3D MERN Stack Portfolio

A stunning, fully animated, and interactive personal portfolio website built with React.js, Tailwind CSS, Framer Motion, and React Three Fiber.

![Portfolio Preview](https://img.shields.io/badge/Status-Complete-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-cyan)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.16-purple)

## ✨ Features

- 🎨 **3D Animations** - Interactive 3D elements using React Three Fiber
- 🌓 **Dark/Light Mode** - Smooth theme switching with persistent storage
- 📱 **Fully Responsive** - Perfect on all devices
- ⚡ **Smooth Animations** - Beautiful Framer Motion transitions
- 🎯 **Modern UI/UX** - Glassmorphism and gradient effects
- 📧 **Contact Form** - Integrated with EmailJS
- 🖼️ **Masonry Gallery** - Dynamic achievements showcase with lightbox
- 🎭 **Custom Cursor** - Interactive cursor animation (desktop)
- 🔄 **Animated Preloader** - Engaging loading experience
- 🎪 **Project Filtering** - Dynamic project category filtering
- 📊 **Skill Progress** - Animated skill bars and cards
- ⏰ **Timeline Layout** - Beautiful experience and education timeline

## 📁 Project Structure

```
harx/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Achievements.jsx
│   │   ├── Contact.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Navbar.jsx
│   │   ├── Preloader.jsx
│   │   ├── Projects.jsx
│   │   └── Skills.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Three Fiber** - 3D graphics with Three.js
- **React Icons** - Icon library

### Build Tools
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### Additional
- **EmailJS** - Contact form integration
- **React Three Drei** - Useful helpers for React Three Fiber

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory**
   ```bash
   cd harx
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized build will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📧 EmailJS Configuration

To enable the contact form:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service
3. Create an email template
4. Get your credentials
5. Update `src/components/Contact.jsx`:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your service ID
  'YOUR_TEMPLATE_ID',   // Replace with your template ID
  {
    from_name: formData.name,
    from_email: formData.email,
    message: formData.message,
    to_name: 'Harsh Raj'
  },
  'YOUR_PUBLIC_KEY'     // Replace with your public key
)
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize colors:

```javascript
colors: {
  primary: {
    // Your primary color shades
  },
  accent: {
    // Your accent color shades
  }
}
```

### Content

Update the following files with your information:

- **Hero Section**: `src/components/Hero.jsx`
- **About Section**: `src/components/About.jsx`
- **Skills**: `src/components/Skills.jsx`
- **Projects**: `src/components/Projects.jsx`
- **Achievements**: `src/components/Achievements.jsx`
- **Experience**: `src/components/Experience.jsx`
- **Contact Info**: `src/components/Contact.jsx`

### Images

Replace placeholder images with your own:
- Add your photos to `public/` folder
- Update image paths in components

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Deploy with one click

### Deploy to Netlify

1. Push code to GitHub
2. Import repository on [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`

## 📱 Sections

1. **Hero** - Animated introduction with 3D elements
2. **About** - Personal information and highlights
3. **Skills** - Technology stack with progress indicators
4. **Projects** - Portfolio showcase with filtering
5. **Achievements** - Masonry gallery with lightbox
6. **Experience** - Timeline of work and education
7. **Contact** - Contact form and information
8. **Footer** - Social links and copyright

## 🎯 Key Features Explained

### 3D Hero Animation
Uses React Three Fiber to create an interactive 3D sphere that rotates and responds to user interaction.

### Dark Mode
Implemented using React Context API with localStorage persistence for theme preferences.

### Smooth Scroll
CSS `scroll-behavior: smooth` for seamless navigation between sections.

### Framer Motion Animations
- Scroll-triggered animations
- Hover effects
- Page transitions
- Staggered children animations

### Responsive Design
Mobile-first approach with Tailwind's responsive utilities ensuring perfect display on all devices.

## 🐛 Troubleshooting

### CSS Tailwind Warnings
The `@apply` and `@tailwind` warnings in VSCode are normal - they're processed by PostCSS during build.

### 3D Performance
If 3D elements lag, consider:
- Reducing polygon count
- Disabling auto-rotate
- Using lower-quality materials

### EmailJS Not Working
Ensure you've:
- Created an account
- Configured service and template
- Updated credentials in Contact.jsx
- Verified email template variables

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Harsh Raj**
- Email: harshraj@gmail.com
- GitHub: [@harshraj](https://github.com/harshraj)
- LinkedIn: [Harsh Raj](https://linkedin.com/in/harshraj)

## 🙏 Acknowledgments

- Design inspiration from modern portfolio trends
- Icons from React Icons
- Images from Unsplash
- Animations powered by Framer Motion
- 3D graphics by Three.js

## 📞 Support

For support, email harshraj@gmail.com or open an issue in the repository.

---

**Made with ❤️ by Harsh Raj | © 2025 All Rights Reserved**
