<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const cartStore = useCartStore()

const subtotal = computed(() => {
  return (props.product.price * props.product.quantity).toFixed(2)
})

function removeItem() {
  cartStore.removeFromCart(props.product.id)
}

function updateItemQuantity(adjustment: number) {
  cartStore.updateQuantity(props.product.id, adjustment)
}
</script>

<template>
  <li class="flex py-10 gap-x-8">
    <div class="size-48 shrink-0 overflow-hidden rounded-md border border-base-200 bg-base-300">
      <img :src="product.thumbnail" :alt="product.title" class="size-full object-cover" />
    </div>

    <div class="ml-4 flex justify-between flex-col grow">
      <div class="flex flex-col">
        <div class="flex justify-between">
          <h3 class="text-lg font-semibold">
            {{ product.title }}
          </h3>
          <button
            @click="removeItem"
            type="button"
            class="text-base-content/50 hover:text-base-content"
            aria-label="Remove item from cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-base-content/50">€{{ product.price }}/pc</p>
        <p class="mt-3 font-semibold">€{{ subtotal }}</p>
      </div>
      <div class="flex gap-x-2 items-center">
        <button
          @click="updateItemQuantity(-1)"
          type="button"
          class="btn btn-circle btn-xs"
          aria-label="Decrease quantity"
        >
          –
        </button>
        <p class="">{{ product.quantity }}</p>
        <button
          @click="updateItemQuantity(1)"
          type="button"
          class="btn btn-circle btn-xs"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
    </div>
  </li>
</template>
