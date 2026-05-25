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
docs/                 # Testing and QA documentation
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

## Testing and QA

The app includes Vitest and React Testing Library coverage for rental data, cart persistence, shared UI behavior, the event-details validation flow, contact submission, and cart request submission.

```bash
npm test
npm run test:coverage
```

See [`docs/TESTING.md`](docs/TESTING.md) for the current coverage map, manual QA checklist, EmailJS testing notes, and regression cases to run before deployment.

Key flows covered by automated tests:

- Cart add/remove/update behavior and localStorage recovery
- Rental item cards, dropdown interactions, and route navigation behavior
- Details-page live validation, phone masking, ZIP/state normalization, and review-button state
- Contact form validation, successful EmailJS payloads, and EmailJS failure handling
- Review-page acknowledgement gating, empty-cart prevention, editable customer details, and cart request EmailJS payloads

---

## Environment Variables

Create a `.env` file at the root for EmailJS integration:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_CONTACT_INTERNAL_TEMPLATE_ID=your_contact_internal_template_id
VITE_EMAILJS_CONTACT_AUTO_REPLY_TEMPLATE_ID=your_contact_auto_reply_template_id
VITE_EMAILJS_CART_INTERNAL_TEMPLATE_ID=your_cart_internal_template_id
VITE_EMAILJS_CART_AUTO_REPLY_TEMPLATE_ID=your_cart_auto_reply_template_id
```

`VITE_EMAILJS_TEMPLATE_ID` is also supported as a fallback if you only want to configure one template while testing.

> Never commit `.env` files. Add them to Vercel's environment variables for production.

The shared EmailJS client lives in `app/lib/emailjs-client.ts` and is used by both the contact form and cart review request flow.

---

## Deployment

This project is configured for Vercel via `@vercel/react-router`. Add the EmailJS values above to Vercel Environment Variables, then push to your connected branch and Vercel handles the rest.

```bash
# Or deploy manually via Vercel CLI
vercel deploy
```
