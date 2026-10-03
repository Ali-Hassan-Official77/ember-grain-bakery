# Ember & Grain

Production-ready bakery storefront concept for Islamabad, Pakistan.

**Brand:** Ember & Grain
**Location:** F-6 Markaz, Islamabad, Pakistan
**Contact:** daniyal.sajid@embergrain.com · +92 301 728 4516

The commerce backend, cart, checkout and order APIs are retained from the supplied base project; product catalogue and presentation are brand-specific.

> Contact/location details in this concept are placeholders and should be verified/replaced before launch.

# Ember & Wheat — Artisan Bakehouse

A full-stack Next.js bakery storefront: browse, add to cart, and check out, with a
real (file-based) backend behind it — no external database required.

## What's inside

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS v4
- **Signature 3D product cards** — mouse-tracked tilt, parallax icon, and a spotlight
  hover effect, matching the reference design, built with Framer Motion
- **Original illustrated icon set** for every product (no stock photos, no copyright risk)
- **A genuine local backend**:
  - `data/products.json` / `data/orders.json` — the "database"
  - `src/lib/db.ts` — the data-access layer (reads/writes the JSON files)
  - `src/app/api/*` — real REST route handlers (`/api/products`, `/api/products/[slug]`,
    `/api/orders`, `/api/orders/[id]`). Pricing and totals are computed **server-side**
    from trusted product data, not trusted from the client.
- **Cart** — React Context, persisted to `localStorage`, live badge count in the header
- **Checkout** — delivery details form, delivery slot, payment method, submits to the
  API, writes a real order to `data/orders.json`, then redirects to a confirmation page
- Fully responsive, keyboard-focusable, and respects `prefers-reduced-motion`

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, categories, featured bakes, story, process, newsletter |
| `/shop` | Full menu with category filter + search |
| `/products/[slug]` | Product detail — quantity, add to cart, buy now, related items |
| `/cart` | Cart with quantity controls and order summary |
| `/checkout` | Delivery form, slot, payment method, order placement |
| `/order/[id]` | Order confirmation, pulled from the local order store |

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Notes

- Fonts (Fraunces + Work Sans) load from Google Fonts via a `<link>` tag in
  `src/app/layout.tsx`, so an internet connection is needed the first time a
  visitor loads the site (falls back to system serif/sans otherwise).
- The "database" is two JSON files under `/data`. To reset orders, empty
  `data/orders.json` back to `[]`. To edit the menu, edit `data/products.json`
  (id/slug must stay unique; `icon` must be one of the keys in
  `src/components/icons/BakeryIcons.tsx`).
- Cart state lives in the browser (`localStorage`), so it's per-device, same as
  most storefronts before login is added.
