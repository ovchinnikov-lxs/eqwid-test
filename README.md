# Ecwid Test Shop (Vue 3 + TypeScript)

Demo shop that implements the test task: products & categories list, category view, product details, and a shopping cart. Deployed to GitHub Pages via GitHub Actions.

---

## Features

* **Pages**: Home (categories + products), Category, Product, Cart
* **Components**: `CategoryCard`, `ProductCard`, `BaseBreadcrumbs`, `BaseButton`
* **Cart**: Pinia store with localStorage persistence (`add/remove/setQty/dec/clear`, counters on header and product)
* **API**: lightweight `useApi()` composable using native `fetch` + `Authorization: Bearer <token>`
* **Skeletons**: loading placeholders for home lists and product view
* **Routing**: URL‑driven state, direct‑linkable
* **Mobile‑first UI**: Tailwind CSS v4, clean cards and grids

---

## Stack

* Vue 3 + TypeScript + Vite
* Tailwind CSS v4
* Vue Router
* Pinia

Node engines (from `package.json`): `^20.19.0 || >=22.12.0`

Package manager: **pnpm** (version is pinned in `package.json` via `packageManager`).

---

## Getting Started

```bash
pnpm i
pnpm dev           # http://localhost:5173
pnpm build         # build to dist/
pnpm preview       # preview built app
pnpm lint          # eslint --fix
pnpm format        # prettier format src/
```

### Environment variables

Create a local `.env`

```ini
VITE_ECWID_STORE_ID=108362264
VITE_ECWID_PUBLIC_TOKEN=public_RiNvjTVVzKLhFNWyzR5fNY68u1GMHLEs
```

---

## Project Structure (key parts)

```
src/
  components/
    base/
      BaseBreadcrumbs.vue
      BaseButton.vue
    CategoryCard.vue
    ProductCard.vue
  composables/
    useApi.ts
  stores/
    cart.ts
  views/
    HomeView.vue
    CategoryView.vue
    ProductView.vue
    CartView.vue
  router/
    index.ts
  App.vue
```

---

## Routing

```ts
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/HomeView.vue') },
    { path: '/category/:id', component: () => import('@/views/CategoryView.vue') },
    { path: '/product/:id', component: () => import('@/views/ProductView.vue') },
    { path: '/cart', component: () => import('@/views/CartView.vue') },
  ],
})
```

> If you navigate between `/category/:id` values and want full remount, key the view: `<RouterView :key="$route.params.id" />`. Otherwise use `onBeforeRouteUpdate`/`watch` to reload data.

---

## API Composable (`useApi()`)

Native `fetch` with `Authorization: Bearer <token>`. Selected response fields to keep payloads small.

---

## Cart Store (Pinia)

* State persisted to `localStorage` via `watch`.
* API: `add`, `remove`, `setQty`, `dec`, `clear`, `count`, `countById`.
* Cross‑tab sync.

---

## CI/CD — GitHub Pages

**Workflow:** `.github/workflows/deploy.yml` builds with pnpm and deploys the `dist` artifact.
