<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import type { Product } from '@/product-services/ProductDTO.ts'
import { useCartStore } from '@/stores/cartStore.ts'

const products = ref<Product[]>([])
const cartStore = useCartStore()

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products/category/sunglasses')
    const data = await response.json()
    products.value = data.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

function handleAddToCart(productId: number) {
  cartStore.addToCart(productId)
}
</script>

<template>
  <h2 class="text-5xl">Products</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full my-10">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart(product.id)"
    />
  </div>
</template>
<style scoped></style>
