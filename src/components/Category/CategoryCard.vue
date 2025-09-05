<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  id: string | number
  name: string
}

const props = defineProps<Props>()
const to = `/category/${String(props.id)}`
</script>

<template>
  <article
    class="group select-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow] hover:shadow-md active:scale-[.99] focus-within:ring-2 focus-within:ring-indigo-500"
  >
    <RouterLink
      :to="to"
      class="block w-full p-4 focus:outline-none"
      :aria-label="`Open category ${name}`"
    >
      <h3 class="text-base font-medium text-gray-900 group-hover:text-indigo-600">
        {{ name }}
      </h3>
    </RouterLink>
  </article>
</template>
