# DesiBazar

Grocery-style ecommerce app — React storefront on the left, Express API on the right. Cart, checkout with Razorpay, orders, addresses, Google login, and a seller panel where you can list products (images go through Cloudinary). There’s also an AI marketing page for sellers that hits OpenAI when you’ve got a key; if not, it still returns sensible fallback copy.

Stack in one line: **React 19 + Vite 6 + Tailwind 4** / **Express + Mongoose**. PWA is wired up with `vite-plugin-pwa` so you can install it on a phone if you want.

Repo: https://github.com/Nicksuraj21/Test---DesiBazar

## What actually works

Buyers: browse by category, product pages, cart, checkout, order history, profile, saved addresses. The app nags for browser location on home/cart for the “fast delivery” banner — you can ignore it or allow it.

Sellers: log in, add/edit products, see orders. AI Marketing + reward points live under `/seller` routes.

Backend: JWT cookies for users, separate seller auth, Razorpay including a **POST `/api/webhook`** handler (raw body + signature check) so refunds can update order status. There’s a `setInterval` that auto-packs orders every minute — check `orderController` if that sounds scary for your use case. Telegram hooks exist if you set the env vars. Some Stripe paths are still in the file history / commented chunks; Razorpay is what’s wired for real in `server.js`.

## Folder structure

```
client/   → Vite + React (buyer UI + seller UI)
server/   → Express, models, routes
```

## Running it locally

You’ll need Node (18+ is fine), MongoDB, and accounts for whatever you want to exercise (Cloudinary, Razorpay, Google OAuth, OpenAI optional).

```bash
git clone https://github.com/Nicksuraj21/Test---DesiBazar.git
cd Test---DesiBazar

cd server
npm install
# copy .env.example → .env and fill it

cd ../client
npm install
# add .env with VITE_* vars (see below)
```

**Server** (`server/.env` — start from `.env.example`):

- `JWT_SECRET`, `MONGODB_URI`
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`
- `GOOGLE_CLIENT_ID` (must match the client)
- `SELLER_EMAIL` / `SELLER_PASSWORD` for the seller login
- `OPENAI_API_KEY` + `OPENAI_MODEL` if you want real AI output
- Optional: `MSG91_*`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `PORT`, `NODE_ENV`

**Client** (`client/.env`):

- `VITE_BACKEND_URL` → e.g. `http://localhost:4000`
- `VITE_GOOGLE_CLIENT_ID`
- `VITE_RAZORPAY_KEY_ID`
- `VITE_CURRENCY` (display only)

Then two terminals:

```bash
# terminal 1
cd server && npm run server

# terminal 2  
cd client && npm run dev
```

(PowerShell sometimes complains about `&&` — run the `cd` and `npm` lines separately if needed.)

Vite defaults to `http://localhost:5173`. API listens on `PORT` or **4000**.

Production-ish frontend check: `cd client && npm run build && npm run preview`.

## API routes (rough map)

Everything is under `/api/...` — `user`, `seller`, `product`, `cart`, `address`, `order`, `payment`, `marketing`. Root `GET /` is just a alive check.

If you deploy, remember to add your frontend origin to the CORS list in `server/server.js` — easy to forget and then everything looks “broken” in the network tab.

## Deploying

There are `vercel.json` files in both packages. Point Razorpay’s webhook at your public `/api/webhook` URL and use the same secret you put in env. Don’t ship `.env` to git.

## Contributing

PRs welcome. Keep changes small and match how the existing code is written. No secrets in commits. If it’s a big refactor, open an issue first so we’re not both solving the same thing twice.

## License / legal stuff

`server/package.json` says **ISC**. Root `LICENSE` file is on the todo list — until then, treat `package.json` as the source of truth.

Security: don’t post exploit details in public issues; use maintainer contact from GitHub profile or a private channel.
