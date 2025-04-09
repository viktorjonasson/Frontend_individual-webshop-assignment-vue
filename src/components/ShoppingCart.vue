<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Product } from '@/product-services/product-dto.ts'
import ProductListItem from '@/components/ProductListItem.vue'

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
</script>

<template>
  <h2 class="text-5xl">Cart</h2>
  <div class="mt-8">
    <div class="flow-root">
      <ul role="list" class="-my-6 divide-y divide-base-200">
        <ProductListItem v-for="product in products" :key="product.id" :product="product" />
      </ul>
    </div>
  </div>
  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
    <div class="flex justify-between text-base font-medium text-gray-900">
      <p>Subtotal</p>
      <!--TODO fetch subtotal-->
      <p>$262.00</p>
    </div>
    <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    <div class="mt-6">
      <a
        href="#"
        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700"
        >Checkout</a
      >
    </div>
    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
      <p>
        or{{ ' ' }}
        <button
          type="button"
          class="font-medium text-indigo-600 hover:text-indigo-500"
          @click="open = false"
        >
          Continue Shopping
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
</template>
