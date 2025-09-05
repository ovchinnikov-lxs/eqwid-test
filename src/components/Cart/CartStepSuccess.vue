<template>
  <div
    class="rounded-2xl border border-green-200 bg-green-50 p-6 text-center"
    role="status"
    aria-live="polite"
  >
    <div
      class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white"
    >
      <svg
        viewBox="0 0 24 24"
        class="h-6 w-6"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          d="M20 6 9 17l-5-5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <p class="text-base font-semibold text-green-800">Congratulations on your purchase!</p>
    <p class="mt-1 text-sm text-green-800/90">Your order has been placed successfully.</p>
    <div class="mt-4 flex justify-center">
      <RouterLink
        to="/"
        class="rounded text-sm font-semibold text-green-800 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600"
      >
        Back to catalog
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
