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
      const response = await fetch(`https://dummyjson.com/products/${cartItem.id}`)
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

function clearCart() {
  cartStore.clearCart()
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
  <div class="my-10">
    <div class="flex space-between items-center">
      <h2 class="grow text-5xl font-bold">Cart</h2>
      <button class="btn" @click="clearCart">
        Empty cart
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
    <div class="lg:flex items-start gap-18 my-10 flex-wrap justify-center">
      <div class="grow border-y-2 border-base-300 mb-15">
        <div class="flow-root">
          <ul role="list" class="divide-y-2 divide-base-300">
            <CartListItem v-for="product in cartProducts" :key="product.id" :product="product" />
          </ul>
        </div>
      </div>
      <div
        class="max-w-xl lg:w-sm lg:shrink-0 bg-base-200 rounded-xl border-2 border-base-300 px-6 py-8 mx-auto"
      >
        <div class="flex justify-between text-lg font-semibold">
          <p>Order total</p>
          <p>${{ cartTotal }}</p>
        </div>
        <p class="mt-0.5 text-sm text-base-content/50">
          Shipping and taxes calculated at checkout.
        </p>
        <div class="mt-10 flex justify-center">
          <a href="#" class="btn btn-block btn-accent">Checkout</a>
        </div>
        <div class="mt-4 flex justify-center text-center text-sm text-base-content/50">
          <p>
            or{{ ' ' }}
            <button
              type="button"
              class="font-medium link text-base-content hover:text-base-content/50"
            >
              <RouterLink to="/">Continue Shopping</RouterLink>
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
