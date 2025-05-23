<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { useCartStore } from '@/stores/cartStore.ts'
import type { Product } from '@/product-services/ProductDTO.ts'

const productsByCategory = ref<Record<string, Product[]>>({})
const cartStore = useCartStore()

onMounted(() => {
  fetchProductsByCategory(['womens-watches', 'womens-jewellery', 'womens-bags'])
})

async function fetchProductsByCategory(categories: string[]) {
  try {
    // Create an array of promises for each category fetch
    const categoryPromises = categories.map(async (category) => {
      const response = await fetch(`https://dummyjson.com/products/category/${category}`)
      const data = await response.json()

      return {
        category,
        products: data.products,
      }
    })

    // Wait for all fetches to complete
    const categoryResults: {
      category: string
      products: Product[]
    }[] = await Promise.all(categoryPromises)

    // Convert the results into an object where keys are categories
    const results: Record<string, Product[]> = {}
    categoryResults.forEach((item) => {
      results[item.category] = item.products
    })

    productsByCategory.value = results
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

function addToCart(productId: number) {
  cartStore.addToCart(productId)
}

function formatCategoryName(category: string) {
  // Convert 'womens-watches' to 'Women's Watches' etc
  return category
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace('Womens', "Women's")
}
</script>

<template>
  <div class="my-10">
    <h2 class="text-5xl font-bold">Products</h2>
    <div class="flex overflow-scroll py-5 gap-3 sticky top-16 z-50 bg-base-100">
      <a
        v-for="(products, category) in productsByCategory"
        :key="category"
        :href="'#' + category"
        class="btn"
      >
        {{ formatCategoryName(category) }}
      </a>
    </div>
    <div
      class="my-15 scroll-mt-40"
      v-for="(products, category) in productsByCategory"
      :key="category"
      :id="category"
    >
      <h3 class="text-3xl font-bold">
        {{ formatCategoryName(category) }}
      </h3>
      <hr class="mt-5 border-1 border-base-300" />
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full my-10">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart(product.id)"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
