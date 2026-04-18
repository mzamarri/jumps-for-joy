# Jump For Joy Inflatables — Business Website

A full-featured business website for an inflatable and event rental company. Built with React 19, React Router v7, TypeScript, and Tailwind CSS v4. Deployed on Vercel.

---

## Features

- **Home** — Animated hero section, service overview, featured rentals, locations, and rental category preview
- **Rental Catalog** — Browse rentals by category with filtering, item details, and image carousels
- **Cart & Checkout** — Multi-step flow: cart → event details → review & submit
- **Contact Form** — EmailJS-powered contact form with auto-reply email templates
- **About** — Company values, stats, and team overview
- **FAQ** — Accordion-style frequently asked questions
- **Locations** — Delivery info, setup requirements, and service area details

---

## Tech Stack

| Category | Tool |
|---|---|
| Framework | [React 19](https://react.dev) + [React Router v7](https://reactrouter.com) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Animations | [Motion (Framer Motion)](https://motion.dev) |
| Icons | [Lucide React](https://lucide.dev) |
| Email | [EmailJS](https://www.emailjs.com) |
| Build Tool | [Vite](https://vite.dev) |
| Testing | [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com) |
| Deployment | [Vercel](https://vercel.com) |

**Fonts:** Fredoka (headings) · Nunito (body) via Google Fonts

---

## Project Structure

```
app/
├── routes/
│   ├── home/         # Landing page sections
│   ├── rentals/      # Catalog, item details, layout
│   ├── cart/         # Cart, event details, review steps
│   ├── about.tsx
│   ├── contact.tsx
│   ├── faq.tsx
│   └── location.tsx
├── components/ui/    # Shared UI components (Carousel, Accordion, etc.)
├── context/          # Cart, Booking, Request, Toast contexts
├── data/             # Rental items, categories, location info
└── assets/           # Local images and icons
emailTemplates/       # HTML email templates (contact form + cart submission)
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |

---

## Environment Variables

Create a `.env` file at the root for EmailJS integration:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Never commit `.env` files. Add them to Vercel's environment variables for production.

---

## Deployment

This project is configured for Vercel via `@vercel/react-router`. Push to your connected branch and Vercel handles the rest.

```bash
# Or deploy manually via Vercel CLI
vercel deploy
```
