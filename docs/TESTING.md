# Testing Guide

This project uses Vitest, jsdom, and React Testing Library for fast regression coverage around data contracts, shared UI, cart state, and the request/contact workflows.

## Run Tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

Use `npm test` before opening a pull request or deploying. Use watch mode while changing components or route behavior.

## Current Coverage Areas

### Data Integrity

- Rental category IDs are unique and URL-safe.
- Required category display fields are present.
- Rental item lookup helpers return expected items and safe fallbacks.
- Rental item data has positive costs and required display fields.

### Cart State

- Adding new items and merging duplicate items.
- Removing items and clearing the cart.
- Quantity updates, including zero/negative quantity removal.
- `totalItems` derived state.
- Local storage hydration, persistence, invalid JSON recovery, unsupported version recovery, and invalid item filtering.

### Shared UI

- Dropdown open/close behavior.
- Escape key and outside-click dismissal.
- ARIA expanded state.
- Rental item card rendering, missing-image fallback, add-to-cart behavior, toast feedback, and mouse/keyboard navigation.

### Contact Flow

- Required contact fields.
- Email format validation.
- Successful EmailJS submission payloads.
- Optional phone fallback.
- EmailJS failure messaging without clearing user-entered values.

### Cart Request Flow

- Details page required-field validation.
- Live phone masking and backspace behavior.
- Phone digit cap and letter filtering.
- State and ZIP normalization.
- Review button disabled/muted state until the form is valid.
- Review submission acknowledgement requirement.
- Empty-cart submission prevention.
- EmailJS request payload formatting for customer info, address, cart items, notes, and totals.
- Review-page edit/save behavior.
- EmailJS failure messaging.

## Manual QA Checklist

Run this checklist in a browser before production deployment:

- Browse home, rentals, item details, cart, details, review, contact, FAQ, about, and location pages.
- Add one item, add the same item again, update quantity, remove item, and confirm totals.
- Complete the details form using keyboard only.
- Confirm phone input formats as `(555) 123-4567`, rejects letters, caps at 10 digits, and allows backspace through the area code.
- Confirm required-field messages reserve space without shifting nearby fields.
- Confirm the Review Request button turns accent-colored only when all required details are valid.
- Submit a cart request using test EmailJS templates.
- Submit a contact message using test EmailJS templates.
- Confirm internal and auto-reply emails contain the expected template variables.
- Test mobile widths for the details and review pages, especially validation text wrapping.

## Testing Notes

- EmailJS route tests mock the shared EmailJS client and assert template parameters instead of sending real email.
- Route tests use in-memory React Router routes with outlet context to mirror the cart details/review flow.
- Cart persistence tests use jsdom localStorage and clear storage after each test via `app/test/setup.ts`.
- Existing `npm run typecheck` currently reports unrelated project-wide TypeScript issues; use `npm test` and `npm run build` as the passing verification commands until those type issues are cleaned up.
