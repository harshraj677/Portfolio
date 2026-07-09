# Harsh Raj — Portfolio

A modern, 3D-animated personal portfolio for **Harsh Raj**, MERN Stack Developer and CSE student. Built with React, Tailwind CSS, Framer Motion, and React Three Fiber, and featuring an integrated **RAG-based AI assistant** that answers visitor questions about my background, skills, and projects.

![Status](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.6-06B6D4?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.18-EF008F?logo=framer&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow)

## Overview

This repository contains the source code for my personal portfolio website — a single-page application showcasing my projects, skills, achievements, and experience through smooth scroll-triggered animations and interactive 3D visuals. It also includes a custom AI chat assistant that retrieves relevant context from my profile data and answers questions in real time.

## Features

- **3D Hero Animation** — Interactive 3D visuals powered by React Three Fiber and Three.js
- **AI Assistant (RAG)** — Floating chat widget backed by a retrieval-augmented generation pipeline that answers questions about me using my own portfolio data
- **Dark / Light Mode** — Theme toggle with persisted preference via Context API + localStorage
- **Fully Responsive** — Mobile-first layout that adapts cleanly across devices
- **Smooth Animations** — Scroll-triggered transitions, hover effects, and staggered reveals via Framer Motion
- **Project Showcase** — Filterable project gallery by category
- **Achievements Gallery** — Masonry layout with lightbox viewer
- **Experience Timeline** — Combined work and education timeline
- **Animated Skill Indicators** — Visual proficiency bars per technology
- **Contact Form** — Client-side validated form integrated with EmailJS
- **Custom Cursor** — Interactive cursor effect on desktop

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, React Router, Tailwind CSS, Framer Motion |
| 3D / Graphics | Three.js, React Three Fiber, React Three Drei |
| AI Assistant | Netlify Functions, Groq / OpenRouter / Cerebras LLM APIs, custom retrieval pipeline |
| Build Tooling | Vite, PostCSS, Autoprefixer, ESLint |
| Integrations | EmailJS, Embla Carousel |
| Hosting | Netlify (functions + static hosting) |

## Project Structure

```
harx/
├── netlify/
│   ├── functions/
│   │   └── chat.js            # Serverless endpoint for the AI assistant
│   └── lib/
│       └── chatCore.js        # BM25 retrieval + prompt building + LLM calling logic
├── scripts/
│   ├── generateChunks.mjs     # Compiles data/*.json into data/chunks.json
│   └── generateVectors.mjs    # Optional: generates data/vectors.json for cosine-similarity search
├── data/
│   ├── about.json, education.json, experience.json,
│   │   projects.json, skills.json, achievements.json,
│   │   hackathons.json, certifications.json, leadership.json,
│   │   goals.json, current_focus.json, timeline.json,
│   │   socials.json, knowledge.json    # Source content for the AI assistant
│   ├── chunks.json            # Generated knowledge base (build artifact)
│   └── vectors.json           # Optional generated embeddings (build artifact)
├── src/
│   ├── components/
│   │   ├── chat/              # AI chat widget UI (window, input, messages, etc.)
│   │   ├── ui/                # Shared UI primitives (button, carousel, dock, ...)
│   │   ├── Hero.jsx, About.jsx, Skills.jsx, Projects.jsx, Achievements.jsx,
│   │       Experience.jsx, Contact.jsx, Navbar.jsx, Footer.jsx, ...
│   ├── context/
│   │   └── ThemeContext.jsx   # Dark/light theme provider
│   ├── hooks/
│   │   └── useChatMemory.js   # Persists chat history across sessions
│   ├── lib/
│   │   ├── loadKnowledge.js   # Loads/caches the chat knowledge base client-side
│   │   ├── search.js          # BM25-style ranking used by the assistant
│   │   └── utils.js
│   ├── config.js               # Centralized personal/profile content for the UI
│   ├── App.jsx
│   └── main.jsx
├── public/
├── index.html
├── netlify.toml
├── vite.config.js
└── tailwind.config.js
```

## Getting Started

### Prerequisites

- Node.js v18 or higher
- npm

### Installation

```bash
git clone https://github.com/harshraj677/Portfolio.git
cd Portfolio
npm install
```

### Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173` (Vite's default port).

### Build for production

```bash
npm run build
```

The optimized build runs `scripts/generateChunks.mjs` (to regenerate the AI assistant's knowledge base) and outputs static assets to `dist/`.

### Preview the production build

```bash
npm run preview
```

## AI Assistant Setup

The chat assistant runs as a Netlify Function (`netlify/functions/chat.js`) backed by a small retrieval pipeline (`netlify/lib/chatCore.js`):

1. Structured profile content in `data/*.json` (about, education, experience, projects, skills, achievements, etc.) is compiled into a flat knowledge base of text chunks via `npm run generate:chunks` — this runs automatically as part of `npm run build`.
2. At query time, the user's message is ranked against those chunks with a BM25-style search (`src/lib/search.js` on the client, mirrored in `netlify/lib/chatCore.js` on the server) — no external embedding API required.
3. The retrieved context is passed to an LLM (Groq, OpenRouter, or Cerebras — whichever key is configured) to generate a grounded answer with cited sources.
4. Optionally, `npm run generate:vectors` can pre-compute cosine-similarity embeddings into `data/vectors.json` for semantic search; this requires `@xenova/transformers` (not installed by default — `npm install --save-dev @xenova/transformers` first).

To enable it locally or in deployment, set one or more of the following environment variables:

```
GROQ_API_KEY=your_key
OPENROUTER_API_KEY=your_key
CEREBRAS_API_KEY=your_key
```

## Contact Form Setup (EmailJS)

1. Create an account at [EmailJS](https://www.emailjs.com/) and set up a service + template.
2. Update the credentials in `src/config.js` under `EMAILJS_CONFIG`:

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key'
}
```

## Customization

Most personal content (name, bio, skills, projects, experience, social links, SEO metadata) is centralized in [src/config.js](src/config.js) for easy editing without touching component logic. Theme colors can be adjusted in `tailwind.config.js`.

## Deployment

This project is configured for **Netlify** out of the box (see `netlify.toml`):

- Build command: `node scripts/generateChunks.mjs && vite build`
- Publish directory: `dist`
- Serverless functions directory: `netlify/functions`
- API requests to `/api/*` are routed to Netlify Functions; all other routes fall back to the SPA.

It can also be deployed to Vercel or any static host, though the AI assistant function requires a Netlify Functions–compatible (or equivalent serverless) environment.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Generate the AI knowledge base and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |
| `npm run generate:chunks` | Rebuild the AI assistant's knowledge base |
| `npm run generate:vectors` | Optional: regenerate embeddings for semantic search (requires `@xenova/transformers`) |

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Harsh Raj**
MERN Stack Developer · CSE Student · PES Institute of Technology and Management

- Email: rajharsh7070@gmail.com
- GitHub: [@harshraj677](https://github.com/harshraj677)
- LinkedIn: [Harsh Raj](https://www.linkedin.com/in/harsh-raj-697858228)

---

© 2026 Harsh Raj. All rights reserved.
