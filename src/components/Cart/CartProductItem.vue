<template>
  <li class="flex gap-3 p-3">
    <RouterLink
      :to="`/product/${id}`"
      class="relative h-25 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100"
      :aria-label="`Open ${name}`"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :alt="name"
        class="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
    </RouterLink>

    <div class="min-w-0 flex-1">
      <RouterLink
        :to="`/product/${id}`"
        class="block rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <h3 class="text-sm font-medium text-gray-900">{{ name }}</h3>
      </RouterLink>

      <div class="mt-1 flex items-center gap-2">
        <span class="text-sm text-gray-600">Qty:</span>
        <div class="inline-flex items-center rounded-lg border border-gray-300">
          <button
            class="px-2 py-1 text-sm"
            @click="cart.dec(id)"
          >
            −
          </button>
          <input
            class="w-12 border-0 p-1 text-center text-sm focus:outline-none"
            type="number"
            min="1"
            :value="inCartCount"
            @change="cart.setQty(id, Number(($event.target as HTMLInputElement).value))"
          />
          <button
            class="px-2 py-1 text-sm"
            @click="cart.add(id, 1)"
          >
            +
          </button>
        </div>
      </div>

      <div class="mt-1 text-sm font-semibold text-gray-900">{{ price }}</div>
    </div>

    <div class="flex items-start">
      <BaseButton
        variant="danger"
        size="sm"
        @click="cart.remove(id)"
      >
        Delete
      </BaseButton>
    </div>
  </li>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/Base/BaseButton.vue'
import { useCartStore } from '@/stores/cart.ts'
import type { EcwidProduct } from '@/composable/api.ts'
import { computed } from 'vue'

const props = defineProps<EcwidProduct>()
const cart = useCartStore()

const inCartCount = computed(() => cart.countById(props.id))
</script>
