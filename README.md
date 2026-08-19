# Abrahamic Faith Christian Assembly (AFCA)

A modern, high-performance web application for **Abrahamic Faith Christian Assembly** (formerly known as Faith In Action Ministries / Triumph Christian Center). Built with React, TypeScript, Tailwind CSS, and Node.js/Express, integrated with Gemini AI for daily inspirational verses.

---

## 🌟 Key Features

- **Dynamic Home & Modern Aesthetic**: A clean, high-contrast visual layout highlighting worship, community, and active faith.
- **AI Daily Bible Verse**: Powered by the Google Gemini API (`@google/genai`), providing fresh daily Bible verses with key themes and instant fallback support.
- **The 6 P's Core Values**: Interactive presentation of the foundational pillars—*Passion for the Word, Prayer, Purity, Perfected Praise, Prosperity, and Power*.
- **Upcoming Events & RSVP**: Interactive event calendar with category filtering, live attendee count updates, and persistent user RSVP status (`localStorage`).
- **Newsletter Subscription**: Real-time newsletter subscription form embedded in the footer to keep members informed on church events and new sermon releases.
- **Ministries & Sermons**: Showcase of specialized church ministries and spiritual teachings.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, `motion` (Framer Motion), Lucide React Icons
- **Backend & Dev Server**: Express, TypeScript (`tsx`), Vite
- **AI Integration**: `@google/genai` (Google Gemini API)
- **Icons & Branding**: Custom SVG favicon and vector styling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation & Execution

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Copy `.env.example` to `.env` and set your secrets:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Development Mode**
   Start the Express + Vite dev server on port 3000:
   ```bash
   npm run dev
   ```

4. **Production Build**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure

```text
├── server.ts              # Express server with Vite middleware & Gemini API endpoint
├── index.html             # HTML entry point with favicon & metadata
├── src/
│   ├── App.tsx            # Main router and layout shell
│   ├── main.tsx           # React entry point
│   ├── components/        # Extracted components (UpcomingEvents, DailyVerse, Footer, etc.)
│   ├── pages/             # Page views (Home, About, Ministries, Sermons)
│   └── index.css          # Global Tailwind CSS imports
└── README.md              # Project documentation
```
