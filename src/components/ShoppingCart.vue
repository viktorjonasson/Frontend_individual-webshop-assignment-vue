<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Product } from '@/product-services/ProductDTO.ts'
import CartListItem from '@/components/CartListItem.vue'
import { useCartStore } from '@/stores/cartStore.ts'

const cartProducts = ref<Product[]>([])
const cartStore = useCartStore()
const isLoading = ref(true)

const cartTotal = computed(() => {
  return cartProducts.value
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2)
})

async function fetchCartProducts() {
  isLoading.value = true
  try {
    const cartItems = cartStore.cartList

    // If cart is empty, reset and return early
    if (cartItems.length === 0) {
      cartProducts.value = []
      isLoading.value = false
      return
    }

    // Array to hold the product promises
    const productPromises = cartItems.map(async (cartItem) => {
      const response = await fetch(`https://dummyjson.com/products/${cartItem.id}`) //concatenate URL with ID.
      const data = await response.json()

      return {
        ...data,
        quantity: cartItem.quantity,
      }
    })

    cartProducts.value = await Promise.all(productPromises)
  } catch (error) {
    console.error('Error fetching products:', error)
  } finally {
    isLoading.value = false
  }
}

watch(
  () => cartStore.cartList,
  () => {
    fetchCartProducts()
  },
  { deep: true },
)

onMounted(() => {
  fetchCartProducts()
})
</script>

<template>
  <div>
    <h2 class="text-5xl my-12">Cart</h2>
    <div class="lg:flex items-start gap-18">
      <div class="grow border-t-2 border-base-300">
        <div class="flow-root">
          <ul role="list" class="divide-y-2 divide-base-300">
            <CartListItem v-for="product in cartProducts" :key="product.id" :product="product" />
          </ul>
        </div>
      </div>
      <div
        class="max-w-xl lg:w-sm lg:shrink-0 bg-base-100 rounded-xl border-2 border-base-300 px-6 py-8"
      >
        <div class="flex justify-between text-base font-medium text-gray-900">
          <p>Order total</p>
          <p>${{ cartTotal }}</p>
        </div>
        <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
        <div class="mt-10 flex justify-center">
          <a href="#" class="btn btn-block btn-accent">Checkout</a>
        </div>
        <div class="mt-4 flex justify-center text-center text-sm text-gray-500">
          <p>
            or{{ ' ' }}
            <button type="button" class="font-medium text-secondary-content hover:underline">
              <RouterLink to="/">Continue Shopping</RouterLink>
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
