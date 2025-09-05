<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface Crumb {
  label: string
  to?: string
}
defineProps<{ items: Crumb[] }>()
</script>

<template>
  <nav
    class="w-full overflow-x-auto"
    aria-label="Breadcrumb"
  >
    <ol class="flex items-center gap-1 text-sm text-gray-600">
      <li
        v-for="(c, i) in items"
        :key="i"
        class="flex items-center gap-1"
      >
        <RouterLink
          v-if="c.to && i < items.length - 1"
          :to="c.to"
          class="px-1 py-0.5 hover:text-indigo-600 focus:outline-none"
        >
          {{ c.label }}
        </RouterLink>
        <span
          v-else
          class="px-1 py-0.5 font-medium text-gray-900"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
        >
          {{ c.label }}
        </span>

        <svg
          v-if="i < items.length - 1"
          class="h-4 w-4 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.22 14.78a.75.75 0 0 1 0-1.06L10.94 10 7.22 6.28a.75.75 0 1 1 1.06-1.06l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </li>
    </ol>
  </nav>
</template>
