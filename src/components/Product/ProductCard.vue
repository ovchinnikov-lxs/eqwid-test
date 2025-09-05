<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  id: string | number
  name: string
  price: string
  imageUrl?: string
}
const props = defineProps<Props>()
const to = `/product/${String(props.id)}`
</script>

<template>
  <article
    class="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[box-shadow,transform] hover:shadow-md active:scale-[.99]"
  >
    <RouterLink
      :to="to"
      class="block focus:outline-none focus:ring-2 focus:ring-indigo-500"
      :aria-label="`Open product ${name}`"
    >
      <div class="relative w-full bg-gray-100 pt-[125%]">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="name"
          loading="lazy"
          class="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div class="p-3">
        <h3
          class="text-sm font-medium text-gray-900 group-hover:text-indigo-600"
          :title="name"
        >
          {{ name }}
        </h3>
        <div class="mt-1 text-sm font-semibold text-gray-900">
          {{ price }}
        </div>
      </div>
    </RouterLink>
  </article>
</template>
