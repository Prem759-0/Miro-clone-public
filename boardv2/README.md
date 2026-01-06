# Miro‑clone Board v2

## 📖 Overview
This repository contains a **web‑based collaborative whiteboard** that mimics the core features of Miro. Users can create boards, add sticky notes, draw shapes, and move objects in real‑time with other participants. The app is built with **Next.js 16**, **React**, **Tailwind CSS**, and **Liveblocks** for live synchronization.

> **Why this matters for non‑technical people?**
> - You can think of it as an online canvas where teams can brainstorm together, no installation required – just open a web browser.
> - The code is organized so that developers can easily add new tools (e.g., a new shape or a chat widget) without breaking existing functionality.

---

## ✨ Key Features
- **Real‑time collaboration** – changes appear instantly for all participants.
- **Infinite canvas** – pan and zoom to any size.
- **Sticky notes, shapes, and free‑hand drawing**.
- **User authentication** via Clerk (sign‑in with email, Google, etc.).
- **Dark / light mode** toggle.
- **Responsive design** – works on desktop, tablet, and mobile browsers.

---

## 🛠️ Tech Stack (Simplified)
| Layer | Technology | What it does |
|-------|------------|--------------|
| Front‑end framework | **Next.js 16** (React) | Renders pages, handles routing, and provides server‑side rendering for fast load times. |
| Styling | **Tailwind CSS** + custom CSS | Gives the app a modern, polished look without writing lots of CSS from scratch. |
| Real‑time sync | **Liveblocks** | Handles the live collaborative state so everyone sees the same board instantly. |
| Authentication | **Clerk** | Manages sign‑up / sign‑in flows securely. |
| Backend / data | **Convex** | Simple server‑less backend for storing board data. |
| Language | **TypeScript** | Adds type safety to JavaScript, reducing bugs. |

---

## 📦 Prerequisites (What you need before starting)
1. **Node.js** (v20 or later) – the JavaScript runtime. Download from [nodejs.org](https://nodejs.org/).
2. **Git** – for version control (already used for this repo).
3. An internet connection (to install dependencies and run the live‑sync service).
4. (Optional) A **GitHub** account if you want to push changes.

---

## 🚀 Getting Started – Step‑by‑Step Guide
1. **Clone the repository**
   ```bash
   git clone https://github.com/Prem759-0/Miro-clone-public.git
   cd Miro-clone-public/boardv2
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
   This reads the `package.json` file and downloads all required libraries.
3. **Create a `.env.local` file** (do not commit this file). Add the following keys (replace the placeholder values with the ones you obtain from the respective services):
   ```text
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your‑clerk‑publishable‑key
   CLERK_SECRET_KEY=your‑clerk‑secret‑key
   LIVEBLOCKS_PUBLIC_KEY=your‑liveblocks‑public‑key
   CONVEX_DEPLOYMENT=your‑convex‑deployment‑url
   ```
4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:3000`. You should see the whiteboard UI.
5. **Create a board** – click the “New Board” button, sign‑in with Clerk, and start drawing!

---

## 📦 Building for Production
When you are ready to share the app with others (e.g., on a public website):
```bash
npm run build   # creates an optimized production bundle
npm start       # serves the built app
```
You can also deploy to **Vercel** (the creators of Next.js) by connecting the GitHub repo – Vercel will automatically run the build step.

---

## 📁 Project Structure (What’s where?)
```
boardv2/
├─ app/                # Next.js app router – page components
├─ components/         # Re‑usable UI pieces (buttons, toolbars, etc.)
├─ hooks/              # Custom React hooks for logic
├─ lib/                # Utility functions
├─ providers/          # Context providers (Liveblocks, Convex, Clerk)
├─ public/             # Static assets (images, favicons)
├─ store/              # Zustand store for client‑side state
├─ convex/             # Convex backend schema & functions
├─ .gitignore          # Files Git should ignore
├─ package.json        # Project metadata & dependencies
├─ tsconfig.json       # TypeScript configuration
└─ README.md           # YOU ARE READING THIS!
```

---

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your‑feature`.
3. Make your changes.
4. Run `npm run lint` to ensure code quality.
5. Commit and push, then open a Pull Request.

---

## 📄 License
This project is licensed under the **MIT License** – you are free to use, modify, and distribute it.

---

## 📞 Contact & Support
- **Author**: Prem759‑0
- **GitHub**: https://github.com/Prem759-0
- For questions, open an issue in the repository or reach out via the GitHub Discussions page.
# Open an issue on the GitHub repository for any questions.
-Email - a70064182@gmail.com
-My WhatsApp Phone no - 9619111051
---

*Happy collaborating!*
