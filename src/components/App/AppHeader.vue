<template>
  <header class="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
    <div class="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
      <RouterLink
        to="/"
        class="text-base font-semibold tracking-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
      >
        Ecwid Demo
      </RouterLink>

      <RouterLink
        to="/cart"
        class="relative inline-flex items-center gap-2 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Open cart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 .001 3.999A2 2 0 0 0 17 18ZM6.2 5l.4 2H21l-2 8H8l-2.4-12H3V1h3.2a2 2 0 0 1 2 1.6L8.7 5H6.2Z"
          />
        </svg>
        <span
          class="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[11px] font-semibold leading-5 text-white"
          aria-live="polite"
        >
          {{ cart.count }}
        </span>
      </RouterLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'

const cart = useCartStore()
</script>
