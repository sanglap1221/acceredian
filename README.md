# Accredian Enterprise Platform (Partial Clone)

A high-performance, responsive Enterprise Learning Platform built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**. This project is a partial clone of the Accredian Enterprise website, focusing on premium UI/UX, modular component architecture, and seamless navigation.

## 🚀 Live Demo
- **Live Deployed Link**: acceredian-e2x4xsy08-sanglaps-projects-85b580ac.vercel.app
- **GitHub Repository**: [https://github.com/sanglap1221/acceredian](https://github.com/sanglap1221/acceredian)

## 🛠️ Tech Stack
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide-React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🧩 Approach Taken
1.  **Modular Component Design**: Built reusable components (Navbar, Footer, Hero, Stats, Programs, etc.) to ensure a clean and maintainable codebase.
2.  **Mobile-First Responsiveness**: Used Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) to ensure the layout adapts perfectly from mobile phones to ultra-wide displays.
3.  **Premium Aesthetics**: Followed the "UI Rules" specified in the brief—using consistent 2.5rem/3rem rounded corners, smooth gradients, and cohesive blue-themed typography.
4.  **Mock Functional Requirements**: Implemented the lead capture form with a mock API route and created dedicated `/login` and `/signup` pages with mock authentication logic.

## 🤖 AI Usage
This project was developed using **Antigravity (AI Coding Assistant)**.

### Where AI Helped:
- **Component Structure**: AI provided the initial scaffolding for modular React components.
- **Tailwind Styling**: AI suggested efficient Tailwind class combinations for complex layouts (e.g., the glassmorphism effect in the Navbar).
- **User Profile UI**: AI implemented the premium user avatar system and colorful gradient name styling.
- **API Route Setup**: AI generated the Next.js App Router API directory and POST handler structure.

### Manual Improvements:
- **UI Spacing & Hierarchy**: Adjusted padding and margins manually to match the premium enterprise feel.
- **Responsiveness**: Refined grid configurations for tablet and small-screen layouts.
- **Component Reuse**: Refactored logic to keep components like cards and buttons highly reusable.
- **Signup Logic**: Manually removed the "Company" field from the signup page as per final refinements.

## 🔐 Backend Authentication
- **Next.js API Routes**: Authentication is handled directly within the Next.js project using App Router API routes (`/api/auth`). It uses `bcryptjs` for password hashing and `jsonwebtoken` (JWT) for secure session management. Data is persisted directly to **MongoDB Atlas**.

## ⚙️ Setup Instructions
1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sanglap1221/acceredian.git
    cd acceredian
    ```
2.  **Environment Variables**: Create a `.env` file in the root and add:
    ```env
    MONGODB_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Run the development server**:
    ```bash
    npm run dev
    ```
5.  **Open the app**:
    Navigate to [http://localhost:3000](http://localhost:3000)

---
*Created as part of the Full Stack Developer Intern assignment.*
