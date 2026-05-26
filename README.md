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

## App Configuration

Public app configuration is centralized in [`app/config.js`](app/config.js). Use that file for app-level defaults such as business contact info, booking fees, success delays, EmailJS IDs, and Contentful IDs.

At runtime, the root route loads the `GeneralBusinessInformation` entry from Contentful and merges available CMS values, such as phone number, email, Facebook link, and Instagram link, into the app config. If a CMS value is missing, the local default remains in place.

Because this is client-side configuration, do not treat these values as secrets. EmailJS public keys and Contentful delivery tokens are intended to be client-exposed. Replace the placeholder strings in `app/config.js` before deploying:

```js
emailjs: {
    serviceId: "your_emailjs_service_id",
    publicKey: "your_emailjs_public_key",
    contactInternalTemplateId: "your_emailjs_contact_internal_template_id",
    contactAutoReplyTemplateId: "your_emailjs_contact_auto_reply_template_id",
    cartInternalTemplateId: "your_emailjs_cart_internal_template_id",
    cartAutoReplyTemplateId: "your_emailjs_cart_auto_reply_template_id",
},
contentful: {
    spaceId: "your_contentful_space_id",
    accessToken: "your_contentful_delivery_access_token",
}
```

The shared EmailJS client lives in `app/lib/emailjs-client.ts` and is used by both the contact form and cart review request flow.

## Environment Variables

Runtime app configuration does not require Vite env variables.

The code generation script still uses `.env` values when regenerating Contentful GraphQL types:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token
```

---

## Deployment

This project is configured for Vercel via `@vercel/react-router`. Update `app/config.js` with the public client-side values, then push to your connected branch and Vercel handles the rest.

```bash
# Or deploy manually via Vercel CLI
vercel deploy
```
