<template>
  <section class="space-y-4">
    <BaseBreadcrumbs :items="crumbs" />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        class="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 pt-[125%]"
      >
        <div
          v-if="productDetailLoading"
          class="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200"
          aria-busy="true"
        />
        <img
          v-else-if="productDetail?.imageUrl"
          :src="productDetail?.imageUrl"
          :alt="productDetail?.name"
          class="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div class="space-y-4">
        <div
          v-if="productDetailLoading"
          class="h-7 w-3/4 rounded bg-gray-200 animate-pulse"
          aria-busy="true"
        />
        <h1
          v-else
          class="text-xl font-semibold text-gray-900"
        >
          {{ productDetail?.name }}
        </h1>

        <div class="flex items-center gap-3">
          <div
            v-if="productDetailLoading"
            class="h-5 w-24 rounded bg-gray-200 animate-pulse"
          />
          <div
            v-else
            class="text-lg font-semibold text-gray-900"
          >
            {{ productDetail?.defaultDisplayedPriceFormatted }}
          </div>

          <div
            class="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-700"
          >
            <span class="opacity-70">In cart:</span>
            <span class="font-semibold">{{ inCartCount }}</span>
          </div>
        </div>

        <div
          v-if="productDetailLoading"
          class="space-y-2"
        >
          <div class="h-4 w-full rounded bg-gray-200 animate-pulse" />
          <div
            v-for="item in 10"
            :key="item"
            class="h-4 w-11/12 rounded bg-gray-200 animate-pulse"
          />

          <div
            v-for="item in 3"
            :key="item"
            class="h-4 w-10/12 rounded bg-gray-200 animate-pulse"
          />
        </div>
        <p
          v-else
          class="text-sm leading-6 text-gray-700"
          v-html="productDetail?.description"
        ></p>

        <div class="pt-2">
          <BaseButton
            variant="primary"
            size="md"
            :disabled="productDetailLoading"
            @click="buy"
          >
            Buy
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue'
import BaseButton from '@/components/Base/BaseButton.vue'
import { type EcwidProduct, useApi } from '@/composable/api.ts'

const router = useRouter()
const { getProductById } = useApi()
const cart = useCartStore()
const route = useRoute()

const productDetail = ref<EcwidProduct>()
const productDetailLoading = ref(true)

async function fetchProductDetail() {
  try {
    productDetailLoading.value = true
    productDetail.value = await getProductById(route.params.id as string)
    if (!productDetail.value) throw new Error('Product not found')
  } catch (e) {
    console.error('Error fetching product detail:', e)
    return router.push('/')
  } finally {
    productDetailLoading.value = false
  }
}

onMounted(fetchProductDetail)

const crumbs = computed(() => [
  { label: 'Home', to: '/' },
  { label: productDetailLoading.value ? 'Product' : productDetail.value?.name || 'Product' },
])

const inCartCount = computed(() => cart.countById(productDetail.value?.id!))

function buy() {
  if (!productDetail.value) return
  cart.add(productDetail.value.id, 1)
}
</script>
