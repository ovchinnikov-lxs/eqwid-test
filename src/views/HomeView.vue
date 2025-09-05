<template>
  <section class="space-y-6">
    <div>
      <h2 class="mb-3 text-lg font-semibold">Categories</h2>

      <div
        v-if="loadingCats"
        class="flex flex-wrap gap-3"
        aria-busy="true"
      >
        <CategoryCardSkeleton
          v-for="i in 2"
          :key="`cat-skeleton-${i}`"
        />
      </div>

      <div
        v-else
        class="flex flex-wrap gap-3"
      >
        <CategoryCard
          v-for="c in categoriesList"
          :key="c.id"
          v-bind="c"
          class="grow basis-[calc(50%-theme(spacing.3))] sm:basis-[calc(33.333%-theme(spacing.3))]"
        />
      </div>
    </div>

    <div
      v-if="loadingProds"
      class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
      aria-busy="true"
    >
      <ProductCardSkeleton
        v-for="i in 6"
        :key="`prod-skeleton-${i}`"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3"
    >
      <ProductCard
        v-for="p in productsList"
        :key="p.id"
        :id="p.id"
        :image-url="p.imageUrl"
        :name="p.name"
        :price="p.defaultDisplayedPriceFormatted"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { type EcwidCategory, type EcwidProduct, useApi } from '@/composable/api.ts'
import CategoryCard from '@/components/Category/CategoryCard.vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import CategoryCardSkeleton from '@/components/Category/CategoryCardSkeleton.vue'
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton.vue'

const categoriesList = ref<EcwidCategory[]>([])
const productsList = ref<EcwidProduct[]>([])

const loadingCats = ref(true)
const loadingProds = ref(true)

const { getCategories, getProducts } = useApi()

const fetchCategories = async () => {
  try {
    categoriesList.value =
      (
        await getCategories({
          parent: 0,
          withSubcategories: false,
        })
      ).items || []
  } catch (e) {
    console.error('Error fetching categories:', e)
  } finally {
    loadingCats.value = false
  }
}

const fetchProducts = async () => {
  try {
    productsList.value = (await getProducts()).items || []
  } catch (e) {
    console.error('Error fetching products:', e)
  } finally {
    loadingProds.value = false
  }
}

const fetchInitialData = () => {
  Promise.all([fetchCategories(), fetchProducts()])
}

onMounted(async () => {
  fetchInitialData()
})
</script>
