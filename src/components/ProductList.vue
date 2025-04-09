<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/product-services/product-dto.ts'

const products = ref<Product[]>([])

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products/category/sunglasses')
    const data = await response.json()
    products.value = data.products
    console.log(products.value)
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

function handleAddToCart(productId: number | string) {
  // TODO: Handle adding product to cart
  console.log(`Adding product ${productId} to cart`)
}
</script>

<template>
  <h2 class="text-5xl">Products</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full my-10">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>
<style scoped></style>
