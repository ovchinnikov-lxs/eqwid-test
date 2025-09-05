<template>
  <section class="space-y-6">
    <BaseBreadcrumbs :items="crumbs" />

    <header>
      <div
        v-if="loadingCategoryDetail"
        class="h-7 w-48 sm:w-64 rounded bg-gray-200 animate-pulse"
        aria-busy="true"
      />

      <h1
        v-else
        class="text-xl font-semibold"
      >
        {{ categoryDetail?.name }}
      </h1>
    </header>

    <div v-if="showSubCats">
      <h2 class="mb-3 text-lg font-semibold">Subcategories</h2>

      <div
        v-if="loadingSubCats"
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
          v-for="c in subcategoriesList"
          :key="c.id"
          v-bind="c"
          class="grow basis-[calc(50%-theme(spacing.3))] sm:basis-[calc(33.333%-theme(spacing.3))]"
        />
      </div>
    </div>

    <div>
      <h2 class="mb-3 text-lg font-semibold">Products</h2>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import CategoryCard from '@/components/Category/CategoryCard.vue'
import ProductCard from '@/components/Product/ProductCard.vue'
import BaseBreadcrumbs from '@/components/Base/BaseBreadcrumbs.vue'
import { type EcwidCategory, type EcwidProduct, useApi } from '@/composable/api.ts'
import { computed, onMounted, ref } from 'vue'
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton.vue'
import CategoryCardSkeleton from '@/components/Category/CategoryCardSkeleton.vue'

const categoryDetail = ref<EcwidCategory>()
const subcategoriesList = ref<EcwidCategory[]>([])
const productsList = ref<EcwidProduct[]>([])
const route = useRoute()
const router = useRouter()
const categoryId = Number(route.params.id)

const loadingCategoryDetail = ref(true)
const loadingSubCats = ref(true)
const showSubCats = ref(true)
const loadingProds = ref(true)

const { getCategoryById, getProducts, getCategories } = useApi()

const fetchCategoryDetail = async () => {
  try {
    const res = await getCategoryById(categoryId)

    if (!res) {
      throw new Error('Category not found')
    }

    categoryDetail.value = res
  } catch (e) {
    console.error('Error fetching category:', e)
    return router.push('/')
  } finally {
    loadingCategoryDetail.value = false
  }
}

const fetchSubcategories = async () => {
  try {
    subcategoriesList.value =
      (
        await getCategories({
          parent: Number(categoryId),
        })
      ).items || []
  } catch (e) {
    console.error('Error fetching subcategories:', e)
  } finally {
    loadingSubCats.value = false
    showSubCats.value = subcategoriesList.value.length > 0
  }
}

const fetchProducts = async () => {
  try {
    productsList.value =
      (
        await getProducts({
          category: categoryId,
        })
      ).items || []
  } catch (e) {
    console.error('Error fetching products:', e)
  } finally {
    loadingProds.value = false
  }
}

const fetchInitialData = () => {
  Promise.all([fetchCategoryDetail(), fetchSubcategories(), fetchProducts()])
}

onMounted(async () => {
  fetchInitialData()
})

const crumbs = computed(() => {
  return [{ label: 'Home', to: '/' }, { label: categoryDetail.value?.name || 'Category' }]
})
</script>
