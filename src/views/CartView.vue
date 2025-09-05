<template>
  <section class="space-y-4">
    <BaseBreadcrumbs :items="crumbs" />

    <h1 class="text-xl font-semibold">Shopping cart</h1>

    <CartStepSuccess v-if="orderPlaced" />

    <div v-else>
      <div
        v-if="cart.items.length"
        class="space-y-3"
      >
        <ul
          v-if="productsLoading"
          class="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white"
        >
          <CartProductItemSkeleton
            v-for="it in cart.items"
            :key="it.id"
          />
        </ul>

        <ul
          v-else
          class="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white"
        >
          <CartProductItem
            v-for="it in productsList"
            :key="it.id"
            v-bind="it"
          />
        </ul>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <RouterLink
            to="/"
            class="w-fit rounded text-sm text-gray-600 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Continue shopping
          </RouterLink>

          <BaseButton
            variant="primary"
            size="md"
            block
            @click="placeOrder"
          >
            Place order
          </BaseButton>
        </div>
      </div>

      <div
        v-else
        class="rounded-2xl border border-dashed border-gray-300 p-6 text-center"
      >
        <p class="text-sm text-gray-600">Your cart is empty.</p>
        <div class="mt-3">
          <RouterLink
            to="/"
            class="rounded text-sm font-semibold text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Go to catalog
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import CartProductItem from '@/components/Cart/CartProductItem.vue'
import { type EcwidProduct, useApi } from '@/composable/api.ts'
import CartProductItemSkeleton from '@/components/Cart/CartProductItemSkeleton.vue'
const CartStepSuccess = defineAsyncComponent(() => import('@/components/Cart/CartStepSuccess.vue'))
const { getProducts } = useApi()

const productsList = ref<EcwidProduct[]>([])
const productsLoading = ref(true)

const fetchProducts = async () => {
  try {
    const res = await getProducts({
      productId: cart.items.map((i) => i.id).join(','),
    })

    productsList.value = res.items || []
    console.log('productsList', productsList.value)
  } catch (e) {
    console.error('Error fetching products:', e)
  } finally {
    productsLoading.value = false
  }
}

onMounted(fetchProducts)

const cart = useCartStore()
const crumbs = [{ label: 'Home', to: '/' }, { label: 'Cart' }]

const orderPlaced = ref(false)
function placeOrder() {
  orderPlaced.value = true
  cart.clear()
}
</script>
