# Yashkumar M. Panchal — Developer Portfolio

A modern, responsive personal portfolio built with **React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, and Three.js**.

## 🚀 Live Demo
- **Portfolio:** [yashpanchal22.github.io/yash-portfolio](https://yashpanchal22.github.io/yash-portfolio/)
- **GitHub:** [github.com/YashPanchal22/yash-portfolio](https://github.com/YashPanchal22/yash-portfolio)

---

## 🛠️ Tech Stack
- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS
- **3D & Animations:** Three.js, @react-three/fiber, @react-three/drei, Framer Motion
- **Icons:** Lucide React
- **Deployment:** GitHub Pages (automated via GitHub Actions)

---

## 💻 Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 📂 Project Structure

```
portfolio/
├── .github/workflows/deploy.yml   # Automatic GitHub Pages CI/CD workflow
├── public/                        # Static assets (Resume PDF, icons, images)
├── src/
│   ├── components/                # React UI components (Hero, Navbar, About, Skills, Projects, etc.)
│   │   └── three/                 # 3D Three.js canvas & particle scenes
│   ├── data/                      # Data source (portfolio.ts)
│   ├── hooks/                     # Custom React hooks
│   ├── utils/                     # Utility functions
│   ├── App.tsx                    # Main app entry
│   ├── main.tsx                   # DOM render entry
│   └── index.css                  # Styling and Tailwind configuration
├── index.html                     # HTML root & SEO metadata
├── package.json                   # Dependencies and scripts
└── vite.config.ts                 # Vite bundler configuration
```

---

## 📄 License
MIT License. Created by Yashkumar M. Panchal.

