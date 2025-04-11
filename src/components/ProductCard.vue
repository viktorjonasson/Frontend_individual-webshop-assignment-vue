<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import type { Product } from '@/product-services/ProductDTO.ts'

const props = defineProps({
  product: {
    type: Object as () => Product,
    required: true,
    validator(value: never): boolean {
      return [
        'id',
        'title',
        'brand',
        'price',
        'thumbnail',
        'description',
        'category',
        'tags',
      ].every((key) => key in value)
    },
  },
})

const emit = defineEmits<{
  (e: 'add-to-cart', id: number): void
}>()

function addToCart() {
  emit('add-to-cart', props.product.id)
}
</script>

<template>
  <div class="card bg-base-200 card-border border-base-300 card-sm">
    <figure class="m-2 bg-base-100/60 rounded-[calc(var(--radius-box)-.5rem)]">
      <img
        class="rounded-[calc(var(--radius-box)-.5rem)]"
        :src="product.thumbnail"
        :alt="product.title"
      />
      <!-- Colon : is short for v-bind, meaning dynamically bind attributes and so on-->
    </figure>
    <div class="card-body justify-between">
      <div class="flex flex-col gap-3">
        <h2 class="flex items-center justify-between">
          <span class="text-lg font-semibold">{{ product.title }}</span>
        </h2>
        <p class="text-sm opacity-60">{{ product.description }}</p>
      </div>
      <div class="flex items-center justify-between mt-8">
        <span class="text-2xl font-semibold">€{{ product.price }}</span>
        <button class="btn btn-primary btn-sm" @click="addToCart">
          Add to cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
