<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'

interface Product {
  id: number | string
  title: string
  brand: string
  price: number
  thumbnail: string
  description: string
  category: string
  tags: string[]
}

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
  <div class="product-list flex items-center justify-center w-full">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
      @add-to-cart="handleAddToCart"
    />
  </div>
</template>
<style scoped></style>
