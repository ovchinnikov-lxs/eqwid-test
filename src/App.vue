<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { onMounted } from 'vue'
import AppHeader from '@/components/App/AppHeader.vue'

const cart = useCartStore()
onMounted(() => cart.init())
</script>

<template>
  <div class="min-h-dvh bg-gray-50 text-gray-900">
    <AppHeader />

    <main class="mx-auto max-w-6xl px-4 py-4">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>
